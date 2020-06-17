import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormFields({ value, setNewImage, imgName }) {
  const classes = useStyles();
  const handleChange = (event) => {
    setNewImage(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <span style={{ fontSize: '1.5em' }}>{imgName}:</span>
      <TextField
        id="outlined-basic"
        label={value}
        variant="outlined"
        onChange={(event) => handleChange(event)}
      />
    </form>
  );
}
