import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/api";
import { handleAddQuestionAnswer } from "../actions/questions";
import { withRouter, Redirect } from "react-router-dom";

class QuestionPage extends Component {
  state = {
    selectedOption: "",
  };

  handleOptionChange = (e) => {
    const selectedOption = e.target.value;

    this.setState(() => ({
      selectedOption,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedOption } = this.state;
    const { dispatch, id, loggedUser } = this.props;
    if (selectedOption !== "") {
      dispatch(handleAddQuestionAnswer(loggedUser, id, selectedOption));
    }

    this.setState(() => ({
      selectedOption: "",
    }));

    this.props.history.push(`/question/${id}`);
  };

  render() {
    const { question } = this.props;
    const { selectedOption } = this.state;

    const { name, avatar, optionOne, optionTwo, hasAnswered } = question;

    if (hasAnswered) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <div className="polls">
          <h5 className="questioner"> {name} asks:</h5>
          <div className="poll">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
            <div className="poll-info">
              <div className="">
                <span>Would you rather</span>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-check">
                    <label className="">
                      <input
                        type="radio"
                        value="optionOne"
                        onChange={this.handleOptionChange}
                        checked={this.state.selectedOption === "optionOne"}
                        className="form-check-input"
                      />
                      {optionOne.text}
                    </label>
                  </div>
                  <p>or</p>
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        value="optionTwo"
                        onChange={this.handleOptionChange}
                        checked={this.state.selectedOption === "optionTwo"}
                        className="form-check-input"
                      />
                      {optionTwo.text}
                    </label>
                  </div>

                  <div className="form-group">
                    <button
                      className="custom-btn btn-success remove-margin"
                      disabled={selectedOption === ""}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ loggedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    id,
    loggedUser,
    question: question
      ? formatQuestion(question, users[question.author], loggedUser)
      : null,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
