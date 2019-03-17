import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";

class EditClients extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  componentDidMount() {
    const { client } = this.props;
    if (client) {
      const { firstName, lastName, email, phone, balance } = client;
      this.setState({ firstName, lastName, email, phone, balance });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSave = e => {
    e.preventDefault();

    const { firestore, client, history } = this.props;

    const updatedClient = {
      ...this.state
    };
    console.log(updatedClient);

    firestore
      .update({ collection: "clients", doc: client.id }, updatedClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    const isBalanceDisabled = this.props.settings.DISABLE_BALANCE_ON_EDIT;
    if (client) {
      const { firstName, lastName, email, phone, balance } = client;

      return (
        <form onSubmit={this.onSave}>
          <h1 className="my-4">Add New Client: </h1>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              defaultValue={firstName}
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
              defaultValue={lastName}
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
              defaultValue={phone}
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
              defaultValue={email}
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
              defaultValue={balance}
              placeholder="write client's balance..."
              onChange={this.onChange}
              disabled={isBalanceDisabled}
            />
          </div>
          <button className="btn btn-primary btn-block">Save</button>
        </form>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClients.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", doc: props.match.params.id, storeAs: "client" }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0], //array with one object represents the client
    settings
  }))
)(EditClients);
