import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import AddQuestion from "./AddQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import My404Component from "./My404Component";
import CustomRoute from "./CustomRoute";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestionView from "./QuestionView";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navigationbar from "./Navigationbar";
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
              <Navigationbar />
              <div>
                <Switch>
                 
                  <Route exact path="/login" component={Login} />
                  <CustomRoute path="/" exact component={Home} />
                  <CustomRoute
                    path="/question/:id"
                    exact
                    component={QuestionView}
                  />
                  <CustomRoute path="/add" exact component={AddQuestion} />

                  <CustomRoute
                    path="/leaderboard"
                    exact
                    component={Leaderboard}
                  />
                   <CustomRoute component={My404Component} />
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
