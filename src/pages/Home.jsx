import React from 'react';
import { Alert } from '../components/Alert';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  homeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '10rem'
  },
  homeContent: {
    display: 'flex',
    textAlign: 'center'
  }
}));

export const Home = () => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.loggedIn);

  if(!loggedIn) {
    return <Alert text="Secret info. Log in to see" closeButton={false} />
  };

  return (
    <div className={classes.homeContainer}>
      <Typography
        className={classes.homeContent}
        variant="h1"
      >
        <HomeIcon 
          fontSize="inherit"
        />
        <span>Home</span>
      </Typography>
    </div>
  );
};
