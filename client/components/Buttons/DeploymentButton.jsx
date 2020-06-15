import AssignmentIcon from '@material-ui/icons/Assignment';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function DeploymentButton() {
  const classes = useStyles();

  return (
    <Button variant='contained' color='primary'>
      Update Deployment
      <AssignmentIcon />
    </Button>
  );
}
