import React, { useState } from 'react';
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

const handleSubmit = async (type, modifiedYaml, setValidJSON) => {
  try {
    JSON.parse(modifiedYaml);
  } catch (err) {
    setValidJSON(false);
    console.log(err);
  }
  try {
    const config = JSON.parse(modifiedYaml);
    const result = await fetch(`/api/${type}?name=${config.metadata.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
  } catch (err) {
    console.log(`Couldn't update the ${type.slice(0, -1)}, ${err}`);
  }
};

export default function SubmitButton({ type }) {
  const classes = useStyles();
  const [validJSON, setValidJSON] = useState(true);
  return validJSON ? (
    <Button
      variant="contained"
      color="primary"
      onClick={() =>
        handleSubmit(
          type,
          document.querySelector('#editYaml').value,
          setValidJSON
        )
      }
    >
      Submit Changes
    </Button>
  ) : (
    <p>That wasn't valid JSON!</p>
  );
}
