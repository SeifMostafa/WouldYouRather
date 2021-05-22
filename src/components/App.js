import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import CustomRoute from "./CustomRoute";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route, Switch , Redirect} from "react-router-dom";
import View from "./View";
import "../index.css"
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
                  <Route path="/login" component={Login} />
                  <CustomRoute path="/" exact component={Home} />
                  <CustomRoute path="/question/:id" exact component={View} />
                  <CustomRoute path="/add" exact component={NewQuestion} />
                  <CustomRoute
                    path="/Leaderboard"
                    exact
                    component={Leaderboard}
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
