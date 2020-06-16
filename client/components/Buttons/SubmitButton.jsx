import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const handleSubmit = async (modifiedYaml) => {
  const config = JSON.parse(modifiedYaml);
  try {
    const result = await fetch(
      `/api/deployments?name=${config.metadata.name}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      }
    );
    setRedirect(true);
  } catch (err) {
    console.log("Couldn't update the deployment");
  }
};

export default function SubmitButton({ type, onClick }) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() =>
        handleSubmit(type, document.querySelector('#editYaml').value)
      }
    >
      Submit Changes
    </Button>
  );
}
