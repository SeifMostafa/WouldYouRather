import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setLoggedUser } from "../actions/loggedUser";
import { Redirect, withRouter } from "react-router-dom";

function Login(props) {
  const [selectedOption, setSelectedOption] = useState("none");
  const [redirectToRefer, setRedirectToRefer] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = props;

    if (selectedOption !== "" && "none") {
      dispatch(setLoggedUser(selectedOption));
      setSelectedOption("none");
      setRedirectToRefer(true);
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { users } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (redirectToRefer === true) {
    return <Redirect to={from} />;
  }

  return (
    <Fragment>
      <div className="new-polls">
        <div className="center questioner">
          <h4 className="mb-0">Welcome to The Would You Rather App</h4>
          <p className="mb-0">Please sign in to continue</p>
        </div>
        <div className="new-polls-input">
          <form onSubmit={handleSubmit}>
            <select
              className="form-select form-select-lg mb-3 select "
              aria-label=".form-select-lg example"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="none" key={"none"}>
                Open this select menu
              </option>

              {json2array(users).map((user) => (
                <option key={user.id} className="" value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              className="custom-btn custom-btn-two btn-success custom-btn-three"
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

function mapStateToProps({ users }, { loggedUser }) {
  return {
    users,
    loggedUser: users[loggedUser],
  };
}

function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  return result;
}

export default withRouter(connect(mapStateToProps)(Login));
