import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import { setLoggedUser } from "../actions/loggedUser";
import { withRouter } from "react-router-dom";

class Navigationbar extends Component {
  render() {
    const { loggedUser, users } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light border-bottom ">
        <div className="container-fluid g-5">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
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
                <NavLink to="/Leaderboard" activeClassName="active">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
            <div>
              {loggedUser === null ? (
                <span className="message">You are not logged in</span>
              ) : (
                <div className="d-flex">
                  <div className="mr-3">
                    <p className="mb-0" style={{ padding: `5px 0` }}>
                      {users[loggedUser].name}
                    </p>
                  </div>

                  <button
                    className="btn btn-outline-success"
                    onClick={this.handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  handleLogout = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(setLoggedUser(null));
    this.props.history.push(`/login`);
  };
}

function mapStateToProps({ loggedUser, users }) {
  return {
    loggedUser,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Navigationbar));
