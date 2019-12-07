import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: theme.spacing(1.5),
    backgroundColor: theme.palette.secondary.main,
    padding: '10px 15px',
  },
  message: {
    display: 'flex',
    textAlign: 'center',
    color: theme.palette.secondary.primary,
  },
  closeButton: {
    marginLeft: 'auto',
    padding: '5px 0 5px 10px',
    color: theme.palette.secondary.secondary,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.secondary.primary
    }
  }
}));

export const Alert = ({ text, closeButton = true }) => {
  const classes = useStyles();

  const [visible, setVisible] = useState(true);

  const invalidEmail = useSelector(state => state.invalidEmail);
  const invalidPassword = useSelector(state => state.invalidPassword);
  const uniqEmail = useSelector(state => state.uniqEmail);
  const uniqUsername = useSelector(state => state.uniqUsername);

  useEffect(() => {
    setVisible(true);
  }, [invalidEmail, invalidPassword, uniqEmail, uniqUsername]);

  return (
    <Grow 
      in={visible}
      timeout={{ enter: 500, exit: 350 }}
      mountOnEnter
      unmountOnExit
    >
      <Paper
        className={classes.container}  
      >
        <Typography
          variant="h6"
          className={classes.message}
        >
          {text}
        </Typography>
        {
          closeButton &&
          <CloseIcon 
            className={classes.closeButton}
            onClick={() => setVisible(false)}
          />
        }
      </Paper>
    </Grow>
  );
};