import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";

class ClientDetails extends Component {
  state = {
    showEditBalance: false,
    updatedBalance: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSave = e => {
    e.preventDefault();

    const { firestore, client } = this.props;
    const { updatedBalance } = this.state;

    const updatedClient = {
      balance: parseFloat(updatedBalance)
    };
    console.log(updatedClient);

    firestore.update({ collection: "clients", doc: client.id }, updatedClient);
  };

  onDelete = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  render() {
    const { showEditBalance } = this.state;
    const { client, history, match } = this.props;
    if (client) {
      const { id, firstName, lastName, email, phone, balance } = client;

      const balanceForm = showEditBalance ? (
        <form
          onSubmit={this.onSave}
          className="col-12 d-flex justify-content-end input-group"
        >
          <input
            type="text"
            className="form-control"
            id="updatedBalance"
            placeholder="write client's balance..."
            onChange={this.onChange}
          />
          <div className="input-group-append">
            <input
              className="btn btn-outline-primary"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      ) : null;

      return (
        <div className="row mt-4">
          <div className="col-6">
            <Link to="/" className=" text-primary">
              <i className="fas fa-arrow-left fa-sm" /> Back to Dashboard
            </Link>
          </div>
          <div className="col-6 justify-content-end d-flex">
            <button
              type="button"
              className="btn btn-secondary px-3 mr-2"
              style={{ letterSpacing: 1 }}
              onClick={() => {
                history.push(`${match.params.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onDelete}
            >
              Delete
            </button>
          </div>
          <div className="card col-12 mt-3">
            <h3 className="card-header bg-transparent">{`${firstName} ${lastName}`}</h3>
            <div className="card-body row">
              <h4 className="col-md-6">
                Client ID: <span className="text-secondary">{id}</span>
              </h4>
              <h4 className="col-md-6 row justify-content-end">
                <div className="col-12 d-flex justify-content-end">
                  Balance:{" "}
                  <span
                    className={classnames({
                      "ml-2": true,
                      "text-danger": balance > 0,
                      "text-success": balance <= 0
                    })}
                  >
                    ${balance}
                  </span>
                  <span
                    className="ml-1"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      this.setState({ showEditBalance: !showEditBalance })
                    }
                  >
                    <i className="fas fa-pencil-alt fa-xs" />
                  </span>
                </div>
                {balanceForm}
              </h4>
              <hr />
              <ul className="list-group list-group-flush col-12">
                <li className="list-group-item border-0 py-2">
                  Phone: {phone}
                </li>
                <li className="list-group-item border-0 py-2">
                  Email: {email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", doc: props.match.params.id, storeAs: "client" }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0] //array with one object represents the client
  }))
)(ClientDetails);
