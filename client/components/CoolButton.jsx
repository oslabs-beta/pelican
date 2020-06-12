import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
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
    <IconButton color='primary' size='small' aria-label='edit'>
      <SettingsIcon fontSize='large' />
    </IconButton>
  );
}
