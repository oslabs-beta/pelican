import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '0px 0px 0px 0px',
      padding: '0px 0px 0px 0px',
    },
  },
}));

export default function AddButton() {
  const classes = useStyles();

  return (
    <Button variant="text" color="primary">
      <AddCircleOutlineRoundedIcon />
    </Button>
  );
}
