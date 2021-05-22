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
    const { question, id } = this.props;
    const {
      name,
      avatar,
      per,
      optionOne,
      optionTwo,
      UsersWhoVotedOne,
      UsersWhoVotedTwo,
      hasAnsweredOne,
      hasAnsweredTwo,
      hasAnswered,
      totalVotes,
    } = question;

    const perPeopleWhoVotedOne = (UsersWhoVotedOne / totalVotes) * per;
    const perPeopleWhoVotedTwo = (UsersWhoVotedTwo / totalVotes) * per;
    const { selectedOption } = this.state;

    return (
      <Fragment>
        {hasAnswered ? (
          <div className="polls">
            <h5 className="questioner"> Asked by {name}</h5>
            <div className="poll">
              <img src={avatar} alt="" className="avatar" />
              <div className="poll-info ">
                <div className="mb-2 result">Results:</div>
                {hasAnsweredOne ? (
                  <div className="custom--card bad">
                    <div
                      className="option-one card__container"
                      style={{ background: `#83c283` }}
                    >
                      <p>Would you rather {optionOne.text}</p>
                      <div className="progress" style={{ height: `25px` }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${perPeopleWhoVotedOne}%`,
                          }}
                          aria-valuenow={perPeopleWhoVotedOne}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {perPeopleWhoVotedOne.toFixed(1)}%
                        </div>
                      </div>
                      <p className="text-center">
                        {UsersWhoVotedOne} of {totalVotes}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bad">
                    <div className="option-one card__container">
                      <p>Would you rather {optionOne.text}</p>
                      <div className="progress" style={{ height: `25px` }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${perPeopleWhoVotedOne}%`,
                          }}
                          aria-valuenow={perPeopleWhoVotedOne}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {perPeopleWhoVotedOne.toFixed(1)}%
                        </div>
                      </div>
                      <p className="text-center">
                        {UsersWhoVotedOne} of {totalVotes}
                      </p>
                    </div>
                  </div>
                )}
                {hasAnsweredTwo ? (
                  <div className="custom--card bad">
                    <div
                      className="option-two card__container"
                      style={{ background: `#83c283` }}
                    >
                      <p>Would you rather {optionTwo.text}</p>
                      <div className="progress" style={{ height: `25px` }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${perPeopleWhoVotedTwo}%`,
                          }}
                          aria-valuenow={perPeopleWhoVotedTwo}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {perPeopleWhoVotedTwo.toFixed(1)}%
                        </div>
                      </div>
                      <p className="text-center">
                        {UsersWhoVotedTwo} of {totalVotes}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bad">
                    <div className="option-two card__container">
                      <p>Would you rather {optionTwo.text}</p>
                      <div className="progress" style={{ height: `25px` }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${perPeopleWhoVotedTwo}%`,
                          }}
                          aria-valuenow={perPeopleWhoVotedTwo}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {perPeopleWhoVotedTwo.toFixed(1)}%
                        </div>
                      </div>
                      <p className="text-center">
                        {UsersWhoVotedTwo} of {totalVotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
