import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, loggedUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={function (props) {
        return loggedUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
