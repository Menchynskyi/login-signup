import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  homeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '10rem'
  },
  homeContent: {
    display: 'flex',
    flexFlow: 'column wrap',
    textAlign: 'center'
  }
}));

export const Profile = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);

  if (!currentUser) {
    return <Redirect to="/" />
  };

  return (
    <div className={classes.homeContainer}>
      <Typography
        className={classes.homeContent}
        variant="h6"
      >
        <span>Email: {currentUser.email}</span>
        <span>Username: {currentUser.username}</span>
      </Typography>
    </div>
  );
};
