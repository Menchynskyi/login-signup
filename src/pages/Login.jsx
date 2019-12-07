import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '../redux/actionCreators';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '../components/Alert';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    marginTop: '10rem',
  },
  formContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexFlow: 'column wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  loginButton: {
    alignSelf: 'center',
    marginTop: theme.spacing(1.5),
    width: 200
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    alignSelf: 'center',
    marginTop: theme.spacing(1),
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  linkText: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    '& :last-child': {
      fontWeight: 'bold'
    }
  },

}));

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const dispatch = useDispatch();
  const { loggedIn, invalidEmail, invalidPassword } = useSelector(state => {
    return {
      loggedIn: state.loggedIn,
      invalidEmail: state.invalidEmail,
      invalidPassword: state.invalidPassword
    }
  });

  const disableSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoggedIn(email, password));
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

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
      <form 
        className={classes.formContainer}
        onSubmit={onSubmit}
        onKeyPress={disableSpace}
      > 
        <TextField
          error={invalidEmail}
          onChange={handlerEmail}
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={email}
        />
        <TextField
          error={invalidPassword}
          onChange={handlerPassword}
          required
          type="password"
          label="Password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.loginButton}
        >
          Log in
        </Button>
        <Link 
          to="/signup"
          className={classes.link}
        >
          <Typography
            variant="body2"
            className={classes.linkText}
          >
            <span>Don't have an account?</span>
            <span>Sign up</span>
          </Typography>
        </Link>
      </form>
    </div>
  );
};