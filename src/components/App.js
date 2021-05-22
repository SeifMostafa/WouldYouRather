import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import View from "./View";
import "../index.css"
import "bootstrap/dist/css/bootstrap.css";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              <Nav />
              <div>
                <Switch>
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/" exact component={Home} />
                  <PrivateRoute path="/question/:id" exact component={View} />
                  <PrivateRoute path="/add" exact component={NewQuestion} />
                  <PrivateRoute
                    path="/leaderBoard"
                    exact
                    component={LeaderBoard}
                  />
                </Switch>
              </div>
            </div>
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(loggedUser) {
  return {
    loggedUser,
  };
}

export default connect(mapStateToProps)(App);
