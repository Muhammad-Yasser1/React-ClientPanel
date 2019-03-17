import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((acc, cur) => {
        return acc + parseFloat(cur.balance);
      }, 0);

      return { totalOwed: total };
    }
    return {
      totalOwed: null
    };
  }

  render() {
    const { clients } = this.props;

    if (clients) {
      return (
        <div className="row">
          <div className="col-md-6">
            {" "}
            <h2>
              <i className="fas fa-users fa-sm" /> Clients
            </h2>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-secondary mt-2">
              Total Owed:{" "}
              <span className="text-primary">
                ${this.state.totalOwed.toFixed(2)}
              </span>{" "}
            </h5>
          </div>

          <div className="table-responsive">
            <table className="table  table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.firstName + " " + client.lastName}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-dark btn-sm"
                      >
                        Details{" "}
                        <i className="fas fa-arrow-circle-right fa-sm" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
