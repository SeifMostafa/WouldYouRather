import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/api";
import { handleAddQuestionAnswer } from "../actions/questions";
import { withRouter, Redirect } from "react-router-dom";

class QuestionView extends Component {
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
    return <Redirect to="/" />;
  };

  render() {
    const { question } = this.props;
    const vote1Percentage =
      (question.numOfOption1Votes / question.totalVotes) * 100;
    const vote2Percentage =
      (question.numOfOption2Votes / question.totalVotes) * 100;
    const { selectedOption } = this.state;

    return (
      <Fragment>
        {question.hasAnswered ? (
          <div className="media mr-3 ml-3">
            <h5 className="mt-5 mb-3 mr-4"> Asked by {question.askedBy}</h5>
            <img
              src={question.avatarURL}
              alt={`Avatar of ${question.askedBy}`}
              className="avatar center"
            />
            <div className="media-body">
              <ul>
                <li
                  style={
                    question.hasAnsweredOne
                      ? { background: `#83c283` }
                      : { background: `#ffffff` }
                  }
                >
                  <p>Would you rather {question.optionOne.text}</p>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${vote1Percentage}%`,
                      }}
                      aria-valuenow={vote1Percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {vote1Percentage.toFixed(1)}%
                    </div>
                  </div>
                  <p className="text-center">
                    {question.numOfOption1Votes} of {question.totalVotes}
                  </p>
                  {question.hasAnsweredOne ? (
                    <h3 className="text-end">Your vote!</h3>
                  ) : null}
                </li>
                <li
                  style={
                    question.hasAnsweredTwo
                      ? { background: `#83c283` }
                      : { background: `#ffffff` }
                  }
                >
                  <p>Would you rather {question.optionTwo.text}</p>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${vote2Percentage}%`,
                      }}
                      aria-valuenow={vote2Percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {vote2Percentage.toFixed(1)}%
                    </div>
                  </div>
                  <p className="text-center">
                    {question.numOfOption2Votes} of {question.totalVotes}
                  </p>
                  {question.hasAnsweredTwo ? (
                    <h3 className="text-end">Your vote!</h3>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="media mr-3 ml-3">
            <h3 className="mt-5 mb-3 mr-2 ml-4"> {question.askedBy} asks:</h3>

            <img
              src={question.avatarURL}
              alt={`Avatar of ${question.askedBy}`}
              className="avatar center"
            />
            <div className="media-body">
              <h3>Would you rather</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-check">
                  <label>
                    <input
                      type="radio"
                      value="optionOne"
                      onChange={this.handleOptionChange}
                      checked={this.state.selectedOption === "optionOne"}
                      className="form-check-input"
                    />
                    {question.optionOne.text}
                  </label>
                </div>
                <h2 className="text-start">or</h2>
                <div className="form-check">
                  <label>
                    <input
                      type="radio"
                      value="optionTwo"
                      onChange={this.handleOptionChange}
                      checked={this.state.selectedOption === "optionTwo"}
                      className="form-check-input"
                    />
                    {question.optionTwo.text}
                  </label>
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary col-md-3  mt-2 mb-3"
                    disabled={selectedOption === ""}
                    type="submit"
                  >
                    Answer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
    question: formatQuestion(question, users[question.author], loggedUser),
  };
}

export default withRouter(connect(mapStateToProps)(QuestionView));
