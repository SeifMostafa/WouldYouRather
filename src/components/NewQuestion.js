import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    option1: "",
    option2: "",
    toHome: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { option1, option2 } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(option1, option2));

    this.setState(() => ({
      option1: "",
      option2: "",
      toHome: id ? false : true,
    }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { toHome, option1, option2 } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="new-polls">
        <h3 className="center questioner">Create New Question</h3>
        <div className="new-polls-input">
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Option One Text Here"
                name="option1"
                onChange={this.handleChange}
              />

              <h3 className="text-center mt-4 mb-2">OR</h3>

              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter Option Two Text Here"
                name="option2"
                onChange={this.handleChange}
              />

              <button
                type="submit"
                disabled={option1 === "" || option2 === ""}
                className="btn-primary center mt-4 mb-0 remove-margin"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(NewQuestion);
