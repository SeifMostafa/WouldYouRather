import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import { setLoggedUser } from "../actions/loggedUser";
import { withRouter } from "react-router-dom";

class Navigationbar extends Component {
  render() {
    const { username } = this.props;
    return (
      <ul className="nav nav-pills nav-fill mt-2 mb-5">
        <li className="nav-item">
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/add" activeClassName="active">
            New Question
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>

        <li className="mr-2">
          {username === null ? (
            <span className="message">You are not logged in</span>
          ) : (
            <div className="d-flex">
              <div className="mr-3">{username}</div>
              <button
                className="btn btn-outline-success"
                onClick={this.handleLogout}
              >
                Sign out
              </button>
            </div>
          )}
        </li>
      </ul>
    );
  }
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setLoggedUser(null));
    this.props.history.push(`/login`);
  };
}

function mapStateToProps({ loggedUser, users }) {
  let username;
  loggedUser === null ? (username = null) : (username = users[loggedUser].name);
  return {
    username,
  };
}

export default withRouter(connect(mapStateToProps)(Navigationbar));
