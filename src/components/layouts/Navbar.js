import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { notifyAction } from "../../actions/notifyActions";

class Navbar extends Component {
  state = {
    isAuth: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth && auth.uid) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }

  logout = e => {
    e.preventDefault();
    const { firebase, notifyAction } = this.props;
    notifyAction("", "");
    firebase.logout();
  };

  render() {
    const { isAuth } = this.state;
    const { auth, settings } = this.props;
    return (
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
          />
          {isAuth ? (
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!" onClick={this.logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : null}

          {!isAuth && !settings.DISABLE_REGISTERATION ? (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      auth: state.firebase.auth,
      settings: state.settings
    }),
    { notifyAction }
  )
)(withRouter(Navbar));
