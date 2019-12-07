import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { userLoggedIn } from '../../redux/actionCreators';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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

export const LoginForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { invalidEmail, invalidPassword } = useSelector(state => {
    return {
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
  return (
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
  );
};
