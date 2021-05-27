import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setLoggedUser } from "../actions/loggedUser";
import { Redirect, withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    selectedOption: "none",
    toHome: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;

    if (this.state.selectedOption !== "none") {
      dispatch(setLoggedUser(this.state.selectedOption));
      this.setState(() => ({
        toHome: true,
        selectedOption: "none",
      }));
    }
  };

  handleChange = (event) => {
    const selectedUser = event.target.value;
    this.setState(() => ({
      ...this.state,
      selectedOption: selectedUser,
    }));
  };

  render() {
    const { users } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { toHome, selectedOption } = this.state;

    if (toHome === true) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        <div className="card">
          <div className="center">
            <p className="mb-2">Please sign in:</p>

            <form onSubmit={this.handleSubmit}>
              <select
                className="form-select form-select-lg mb-4 select"
                value={selectedOption}
                onChange={this.handleChange}
              >
                <option value="none" key={"none"}>
                  Open menu
                </option>

                {this.json2array(users).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary ml-5"
                disabled={selectedOption === "none"}
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
  json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  }
}

function mapStateToProps({ users }, { loggedUser }) {
  return {
    users,
    loggedUser: users[loggedUser],
  };
}

export default withRouter(connect(mapStateToProps)(Login));
