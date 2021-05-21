import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import Logout from "./Logout";

 function Nav() {
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
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo03"
                >
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" exact activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/add" activeClassName="active">
                                New Questions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/LeaderBoard" activeClassName="active">
                                Leader Board
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <Logout />


                    </div>
                </div>
            </div>
        </nav>
    );
}

function mapStateToProps(authedUser) {
     console.log('---', authedUser)
     return {
         authedUser,
     }
}

export default connect(mapStateToProps)( Nav)
