import React, { useState, useRef } from 'react';
import {
  Button, 
  ClickAwayListener, 
  Grow, 
  Paper, 
  Popper, 
  MenuItem, 
  MenuList } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../redux/actionCreators';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
    paper: {
    marginRight: theme.spacing(2),
  },
  profile: {
    color: 'white',
    marginRight: theme.spacing(.5)
  },
  profileLink: {
    color: 'black',
    textDecoration: 'none'
  }
}));

export const UserPopup = ({ username }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.profile}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {username}
      </Button>
      <Popper 
        open={open} 
        anchorEl={anchorRef.current} 
        role={undefined} 
        transition 
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ 
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList 
                  autoFocusItem={open} 
                  id="menu-list-grow"
                >
                  <MenuItem onClick={handleClose}>
                    <Link 
                      to="/profile"
                      className={classes.profileLink}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem 
                    onClick={() => dispatch(userLoggedOut())}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

UserPopup.propTypes = {
  username: PropTypes.string
};