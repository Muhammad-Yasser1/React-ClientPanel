import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps, store } from "./store";

import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import { UserIsAuthenticated } from "./helpers/checkAuth";
import Settings from "./components/settings/Settings";
import Register from "./components/auth/Register";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                  exact
                />
                <Route
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  path="/client/:id/edit"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  path="/client/:id"
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}
