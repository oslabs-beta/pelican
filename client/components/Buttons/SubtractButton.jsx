import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));

export default function SubtractButton() {
  const classes = useStyles();

  return (
    <Button variant="text" color="primary" style={{ marginLeft: '-20px' }}>
      <RemoveCircleOutlineRoundedIcon />
    </Button>
  );
}
