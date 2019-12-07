import React from 'react';
import { Header } from './components/Header';
import { Home, Login, Signup, Profile } from './pages';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

export const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            component={Home}
            exact
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/signup"
            component={Signup}
          />
          <Route
            path="/profile"
            component={Profile}
          />
        </Switch>
      </Router>
    </div>
  );
};