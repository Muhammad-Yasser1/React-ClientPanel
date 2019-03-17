import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firestore, history } = this.props;
    const newClient = this.state;
    firestore.add({ collection: "clients" }, newClient).then(() => {
      history.push("/");
    });
  };
  render() {
    const isBalanceDisabled = this.props.settings.DISABLE_BALANCE_ON_ADD;
    return (
      <form onSubmit={this.onSubmit}>
        <h1 className="my-4">Add New Client: </h1>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="write client's first name..."
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="write client's last name..."
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="write client's phone number..."
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="write client's email..."
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="balance">Balance:</label>
          <input
            type="text"
            className="form-control"
            id="balance"
            placeholder="write client's balance..."
            onChange={this.onChange}
            disabled={isBalanceDisabled}
          />
        </div>
        <button className="btn btn-primary btn-block">Add</button>
      </form>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
