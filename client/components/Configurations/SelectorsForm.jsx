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

export default function SelectorsForm({
  newKey,
  setNewKey,
  value1,
  value2,
  index,
}) {
  const classes = useStyles();
  const handleChangeValue = (event) => {
    const obj = {};
    obj[value1] = event.target.value;
    newKey[index] = obj;
    console.log('after edit: ', copy);
    setNewKey(copy);
  };
  const handleChangeKey = (event) => {
    const obj = {};
    obj[event.target.value] = value2;
    newKey[index] = obj;
    setNewKey(newKey);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label={value1}
        variant="outlined"
        onBlur={(event) => handleChangeKey(event)}
      />
      :
      <TextField
        id="outlined-basic"
        label={value2}
        variant="outlined"
        onChange={(event) => handleChangeValue(event)}
      />
    </form>
  );
}
