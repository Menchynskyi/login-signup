import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '../components/Alert';
import { SignupForm } from '../components/SignupForm';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexFlow: 'column wrap',
    marginTop: '10rem'
  }
}));

export const Signup = () => {
  const classes = useStyles();

  const { loggedIn, uniqEmail, uniqUsername } = useSelector(state => {
    return {
      uniqUsername: state.uniqUsername,
      uniqEmail: state.uniqEmail,
      loggedIn: state.loggedIn
    }
  });

  if (loggedIn) {
    return <Redirect to="/" />
  };

  const alert = !uniqEmail ?
    <Alert text="User with this email is already exist" /> :
    !uniqUsername ?
    <Alert text="Username is already taken" /> :
    null;

  return (
    <div className={classes.container}>
        {alert}
        <SignupForm />
    </div>
  );
};