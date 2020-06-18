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
    const newObj = JSON.parse(JSON.stringify(newKey));
    newObj[index] = obj;
    setNewKey(newObj);
    // console.log('after change value: ', newKey);
  };
  const handleChangeKey = (event) => {
    const obj = {};
    obj[event.target.value] = value2;
    const newObj = JSON.parse(JSON.stringify(newKey));
    newObj[index] = obj;
    setNewKey(newObj);
    // console.log('after change key: ', newKey);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label={value1}
        variant="outlined"
        onChange={(event) => handleChangeKey(event)}
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
