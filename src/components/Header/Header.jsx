import React, { Fragment } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { UserPopup } from '../UserPopup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    textDecoration: 'none',
    color: 'white',
    marginRight: theme.spacing(.5)
  },
  login: {
    marginRight: theme.spacing(2)
  },
}));

export const Header = () => {
  const classes = useStyles();
  
  const history = useHistory();

  const { loggedIn, currentUser} = useSelector(({ loggedIn, currentUser }) => {
    return {
      loggedIn,
      currentUser
    };
  });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
          >
            <Link className={classes.links} to="/">
              Blog
            </Link>
          </Typography>

          {
            loggedIn ?
              <UserPopup username={currentUser.username} /> :
              <Fragment>
                  <Button color="inherit" onClick={() => history.push('/login')}>
                    Log in
                  </Button>
                  <Button color="inherit" onClick={() => history.push('/signup')}>
                    Sign up
                  </Button>
              </Fragment>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
};
