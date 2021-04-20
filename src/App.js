import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
import store from './store';
import Header from './components/layout/Header';
import Dashboard from './components/layout/Dashboard';
import Contact from './components/layout/Contact';
import NotFound from './components/layout/NotFound';
import Home from './components/layout/Home';
import ProfileDetails from './components/profile/ProfileDetails';
import Login from './components/auth/Login';

import "./scss/App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="react-app__inner">
            <Header />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Home}
                />
                <Route
                  exact
                  path="/contact/"
                  component={Contact}
                />
                <Route
                  exact
                  path="/profile/:id"
                  component={ProfileDetails}
                />
                <Route
                  exact
                  path="/dashboard/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
