// ref:: https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function CustomRoute({ component: Component, loggedUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: props.location },
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

export default connect(mapStateToProps)(CustomRoute);
