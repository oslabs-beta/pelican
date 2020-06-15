import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import awsRegions from './constants/awsRegions';
import * as actions from './actions/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/oslabs-beta/pelican">
        Pelican
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapDispatchToProps = (dispatch) => ({
  setCredentials: (credentials) =>
    dispatch(actions.setCredentials(credentials)),
});

function SignInSide() {
  const classes = useStyles();
  const [region, changeRegion] = useState({ region: '' });

  const regionOptions = awsRegions.map((region) => (
    <option value={region.code} key={region.code}>
      {region.name} - {region.code}
    </option>
  ));

  const handleRegionChange = (event) => {
    changeRegion({
      ...region,
      region: event.target.value,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          {/* <Typography component='h1' variant='h3'>
            Pelican
          </Typography> */}
          <img
            src="/client/assets/pelicanLogo.png"
            alt="product's pelican logo"
            width="400vw"
            height="100vh"
          />
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="access key"
              label="Enter Access Key"
              name="access key"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Enter secret access key"
              label="Enter Secret Access Key"
              type="secret access"
              id="secret access"
              autoComplete="current-password"
            />

            <FormControl
              variant="outlined"
              fullWidth
              required
              margin="normal"
              id="aws-region"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                AWS Region
              </InputLabel>
              <Select
                native
                value={region.name}
                label="AWS Region"
                onChange={handleRegionChange}
              >
                {regionOptions}
              </Select>
            </FormControl>

            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="https://cloud.google.com/kubernetes-engine"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  Supports Google GKE
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://aws.amazon.com/eks/"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  Supports Amazon EKS
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default connect(null, mapDispatchToProps)(SignInSide);
