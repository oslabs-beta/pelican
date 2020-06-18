import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('standard');
  const [status, setStatus] = useState('Please select a deployment method');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    if (!targetNamespace || targetNamespace === 'All') {
      targetNamespace = JSON.parse(oldYaml).metadata.namespace;
    }
    if (value === 'blueGreen') {
      try {
        // create the new deployment with the new images
        setStatus('Creating the green deployment...');
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
          setStatus('Successfully created the green deployment');
          const body = await result.json();
          const { greenDeploymentName, podSelectors } = body;
          setStatus('Giving green deployment 10 seconds to deploy...');
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
              setStatus('Green deployment has desired replicasets!');
              const serviceResult = await fetch(
                `/api/services/?namespace=${targetNamespace}`
              );
              const services = await serviceResult.json();
              const service = services.filter(
                (service) =>
                  JSON.stringify(service.spec.selector) ==
                  JSON.stringify(
                    JSON.parse(oldYaml).spec.template.metadata.labels
                  )
              )[0];
              setStatus('Switching over the load balancer...');
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
              setStatus('Loadbalancer switched. Application Deployed!');
            } else {
              setStatus('Deployment failed.  Deleting green deployment');
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
        setStatus('Creating the canary deployment');
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
        // wait a certain amount of time and see if the deployment has one available pod
        setStatus('Giving the canary deployment 10 seconds of uptime');
        setTimeout(async () => {
          const canaryDeploymentOk = await (
            await fetch(
              `/api/deployments/?name=${canaryDeploymentName}&namespace=${targetNamespace}`
            )
          ).json();
          // if we have an available replica, rollout the new image to the old deployment and delete the canary deployment
          if (canaryDeploymentOk.status.availableReplicas === 1) {
            setStatus('Canary successful! Rolling out deployment...');
            const newConfig = JSON.parse(oldYaml);
            newConfig.spec.template.spec.containers[0].image = newImage;

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
            setStatus('The deployment has been updated!');
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
            setStatus('Canary failed...');
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
      setStatus('Rolling out the new deployment...');
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
      setStatus('Deployment successfully deployed!');
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
            {status}
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
