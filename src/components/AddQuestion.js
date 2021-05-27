import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

function AddQuestion(props) {
  const [option1, setSelectedOption1] = useState("");
  const [option2, setSelectedOption2] = useState("");
  const [redirectToRefer, setRedirectToRefer] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = props;
    dispatch(handleAddQuestion(option1.trim(), option2.trim()));

    setSelectedOption1("");
    setSelectedOption2("");
    setRedirectToRefer(true);
  };

  const handleChangeOption1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleChangeOption2 = (e) => {
    setSelectedOption2(e.target.value);
  };

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (redirectToRefer === true) {
    return <Redirect to={from} />;
  }
  return (
    <div className="card">
      <h3 className="center">Create New Question</h3>
        <h3 className="mt-5 mb-5 mr-3 ml-3">Would you rather...</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Option One Text Here"
              name="option1"
              onChange={handleChangeOption1}
            />

            <h3 className="text-center mt-4 mb-2">OR</h3>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Option Two Text Here"
              name="option2"
              onChange={handleChangeOption2}
            />
            <div className="center">
              <button
                type="submit"
                disabled={option1 === "" || option2 === ""}
                className="btn btn-primary col-md-3  mt-2 mb-3"
              >
                Add
              </button>
            </div>
          </div>
        </form>
    </div>
  );
}

export default connect()(AddQuestion);
