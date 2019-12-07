import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { userSignup } from '../redux/actionCreators';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '../components/Alert';
import { validateEmail, validatePassword } from '../validations';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexFlow: 'column wrap',
    marginTop: '10rem'
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    width: 200,
    alignSelf: 'center'
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
  }
}));

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const classes = useStyles();

  const dispatch = useDispatch();
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
  
  const validateUsername = (value) => {
    value.length > 10 ?
      setUsernameValid(false) :
      setUsernameValid(true)
  };
  
  const onSubmit = (e) => {
    e.preventDefault();

    const emailIsValid = validateEmail(email);

    !emailIsValid ?
      setEmailValid(false) :
      setEmailValid(true);

    const passwordIsValid = validatePassword(password);

    !passwordIsValid ?
      setPasswordValid(false) :
      setPasswordValid(true);

    if(usernameValid && emailIsValid && passwordIsValid) {
      dispatch(userSignup(username, email, password));
    };
  };

  const handlerUsername = (e) => {
    validateUsername(e.target.value);
    setUsername(e.target.value);
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const alert = !uniqEmail ?
    <Alert text="User with this email is already exist" /> :
    !uniqUsername ?
    <Alert text="Username is already taken" /> :
    null;

  return (
    <div className={classes.container}>
        {alert}
        <form 
          className={classes.formContainer}
          onSubmit={onSubmit}
        > 
        <TextField
          onChange={handlerUsername}
          required
          label={usernameValid ? 'Username' : 'Username is too long'}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          error={!usernameValid || !uniqUsername}
          value={username}
        />
        <TextField
          onChange={handlerEmail}
          required
          label={emailValid ? 'Email' : 'Email is not correct'}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          error={!emailValid || !uniqEmail}
          value={email}
          helperText={!emailValid && 'Email format should contain @'}
        />
        <TextField
          onChange={handlerPassword}
          required
          type="password"
          label={passwordValid ? 'Password' : 'Password is not correct'}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          error={!passwordValid}
          value={password}
          helperText={!passwordValid && 'Password should contain at list one number'}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.loginButton}
        >
          Sign up
        </Button>
        <Link 
          to="/login"
          className={classes.link}
        >
          <Typography
            variant="body2"
            className={classes.linkText}
          >
            <span>Already have an account?</span>
            <span>Log in</span>
          </Typography>
        </Link>
      </form>
    </div>
  );
};