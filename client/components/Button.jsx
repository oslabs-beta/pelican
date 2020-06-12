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

export default function EditButton() {
  const classes = useStyles();

  return (
    <Button variant='contained' color='primary'>
      <SettingsIcon />
    </Button>
  );
}
