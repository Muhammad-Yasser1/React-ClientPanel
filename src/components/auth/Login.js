import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { UserIsNotAuthenticated } from "../../helpers/checkAuth";
import { notifyAction } from "../../actions/notifyActions";
import Alert from "../layouts/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  login = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { firebase, notifyAction } = this.props;
    firebase
      .login({ email, password })
      .catch(err =>
        notifyAction("Invalid Credentials, please try again", "error")
      );
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <h1 className="text-primary text-center mb-5">
            <i className="fas fa-lock" /> Login
          </h1>
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <form onSubmit={this.login} className="border p-4">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="write your email..."
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="write your password..."
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyAction }
  )
)(UserIsNotAuthenticated(Login));
//I had to do it like this, don't put UserIsNotAuthenticated in compose or in App.js
