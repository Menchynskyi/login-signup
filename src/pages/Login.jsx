import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '../components/Alert';
import { LoginForm } from '../components/LoginForm';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    marginTop: '10rem',
  }
}));

export const Login = () => {
  const classes = useStyles();

  const { loggedIn, invalidEmail, invalidPassword } = useSelector(state => {
    return {
      loggedIn: state.loggedIn,
      invalidEmail: state.invalidEmail,
      invalidPassword: state.invalidPassword
    }
  });

  if (loggedIn) {
    return <Redirect to="/" />
  };

  const alertMessage = invalidEmail ? 
    <Alert text="No user with this email"/> :
    invalidPassword ?
    <Alert text="Password is not correct"/> :
    null;

  return (
    <div className={classes.container}>
      { alertMessage }            
      <LoginForm />
    </div>
  );
};