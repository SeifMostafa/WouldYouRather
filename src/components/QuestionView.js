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
    const {
      name,
      avatar,
      optionOne,
      optionTwo,
      UsersWhoVotedOne,
      UsersWhoVotedTwo,
      hasAnsweredOne,
      hasAnsweredTwo,
      hasAnswered,
      totalVotes,
    } = question;

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
            <div className="card-body">
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
                  {question.hasAnsweredOne? ( <h3 className="text-end">
                    Your vote!
                  </h3>) : null}
                </li>
                <li
                  style={
                    question.hasAnsweredTwo
                      ? { background: `#83c283` }
                      : { background: `#ffffff` }
                  }
                >
                  <p>Would you rather {optionTwo.text}</p>
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
                  {question.hasAnsweredTwo? ( <h3 className="text-end">
                    Your vote!
                  </h3>) : null}
                </li>
              </ul>
            </div>
          </div>
        ) : (
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
