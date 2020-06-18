import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AssignmentIcon from '@material-ui/icons/Assignment';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function DeploymentModal({ newImage, oldImage, oldYaml }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState('standard');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDeploy = async (
    newImage,
    oldImage,
    oldYaml,
    value,
    targetNamespace
  ) => {
    console.log(value);
    if (!targetNamespace || targetNamespace === 'All') {
      targetNamespace = JSON.parse(oldYaml).metadata.namespace;
    }
    if (value === 'blueGreen') {
      try {
        // create the new deployment with the new images
        const result = await fetch('/api/deployments/bluegreen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldYaml: JSON.parse(oldYaml),
            newImage,
            targetNamespace,
          }),
        });

        if (result.status === 200) {
          const body = await result.json();
          const { greenDeploymentName, podSelectors } = body;
          setTimeout(async () => {
            // after 10 seconds, check to see if the there are as many pods as there should be
            const deploymentOk = await (
              await fetch(
                `/api/deployments/?name=${greenDeploymentName}&namespace=${targetNamespace}`
              )
            ).json();
            // if they are equal, then get the service that matches the old deployments pod's labels and we're going to switch its labels to the new deployments pods labels
            if (
              deploymentOk.status.availableReplicas ===
              deploymentOk.spec.replicas
            ) {
              const serviceResult = await fetch(
                `/api/services/?namespace=${targetNamespace}`
              );
              const services = await serviceResult.json();
              console.log(services);
              console.log(JSON.parse(oldYaml));
              const service = services.filter(
                (service) =>
                  JSON.stringify(service.spec.selector) ==
                  JSON.stringify(
                    JSON.parse(oldYaml).spec.template.metadata.labels
                  )
              )[0];
              const editServiceResult = await fetch(
                `/api/services/?name=${service.metadata.name}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    namespace: targetNamespace,
                    config: deploymentOk.spec.template.metadata.labels,
                    deployment: true,
                  }),
                }
              );
              console.log(editServiceResult.status);
            } else {
              console.log('something went wrong with deployment');
              await fetch(
                `/api/deployments?name=${greenDeploymentName}&namespace=${targetNamespace}`,
                {
                  method: 'DELETE',
                }
              );
            }
          }, 10000);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (value === 'canary') {
      try {
        // create the new deployment with the new images
        const result = await fetch('/api/deployments/canary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldYaml: JSON.parse(oldYaml),
            newImage,
            targetNamespace,
          }),
        });
        const canaryDeploymentName = await result.json();
        console.log('canary name: ', canaryDeploymentName);
        // wait a certain amount of time and see if the deployment has one available pod
        setTimeout(async () => {
          const canaryDeploymentOk = await (
            await fetch(
              `/api/deployments/?name=${canaryDeploymentName}&namespace=${targetNamespace}`
            )
          ).json();
          console.log('is ok canary: ', canaryDeploymentOk);
          // if we have an available replica, rollout the new image to the old deployment and delete the canary deployment
          if (canaryDeploymentOk.status.availableReplicas === 1) {
            const newConfig = JSON.parse(oldYaml);
            newConfig.spec.template.spec.containers[0].image = newImage;

            console.log('newConfig: ', newConfig);

            // begin rollout of new image
            const updateResult = await fetch(
              `/api/deployments/?name=${newConfig.metadata.name}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ config: newConfig }),
              }
            );
            console.log('updated the old deployment: ', updateResult);
            try {
              await fetch(
                `/api/deployments?name=${canaryDeploymentName}&namespace=${targetNamespace}`,
                {
                  method: 'DELETE',
                }
              );
            } catch (err) {
              console.log(`err deleting: ${err}`);
            }
          } else {
            await fetch(
              `/api/deployments?name=${canaryDeploymentName}&namespace=${targetNamespace}`,
              {
                method: 'DELETE',
              }
            );
          }
        }, 10000);
      } catch (err) {
        console.log(err);
      }
    }
    if (value === 'standard') {
      console.log('hi');
      const newConfig = JSON.parse(oldYaml);
      newConfig.spec.template.spec.containers[0].image = newImage;
      const updateResult = await fetch(
        `/api/deployments/?name=${newConfig.metadata.name}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ config: newConfig }),
        }
      );
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ fontWeight: 'bold' }}
        onClick={handleClickOpen}
      >
        Update Deployment <AssignmentIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Choose Deployment Method:'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select a deployment method for this rollout:
          </DialogContentText>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="deployment"
              name="Rollout"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard"
              />
              <FormControlLabel
                value="blueGreen"
                control={<Radio />}
                label="Blue-Green"
              />
              <FormControlLabel
                value="canary"
                control={<Radio />}
                label="Canary"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeploy(newImage, oldImage, oldYaml, value)}
            color="primary"
            autoFocus
          >
            Deploy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
