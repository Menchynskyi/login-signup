import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      loggedIn ?
        <Component {...props} /> :
        <Redirect to="/"/>      
    )}
  />
);

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};