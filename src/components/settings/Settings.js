import React, { Component } from "react";
import { connect } from "react-redux";
import {
  disableBalanceOnAdd,
  disableBalanceOnEdit,
  disableRegisteration
} from "../../actions/settingActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Settings extends Component {
  render() {
    const {
      DISABLE_BALANCE_ON_ADD,
      DISABLE_BALANCE_ON_EDIT,
      DISABLE_REGISTERATION
    } = this.props.settings;

    const {
      disableRegisteration,
      disableBalanceOnEdit,
      disableBalanceOnAdd
    } = this.props;
    return (
      <div className="my-3">
        <div className="row mb-3">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="DISABLE_REGISTERATION"
                  checked={!!DISABLE_REGISTERATION}
                  onChange={disableRegisteration}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input
                  type="checkbox"
                  name="DISABLE_BALANCE_ON_ADD"
                  checked={!!DISABLE_BALANCE_ON_ADD}
                  onChange={disableBalanceOnAdd}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance On Edit</label>{" "}
                <input
                  type="checkbox"
                  name="DISABLE_BALANCE_ON_EDIT"
                  checked={!!DISABLE_BALANCE_ON_EDIT}
                  onChange={disableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  disableBalanceOnAdd: PropTypes.func.isRequired,
  disableBalanceOnEdit: PropTypes.func.isRequired,
  disableRegisteration: PropTypes.func.isRequired
};
export default connect(
  (state, props) => ({ settings: state.settings }),
  { disableBalanceOnAdd, disableBalanceOnEdit, disableRegisteration }
)(Settings);
