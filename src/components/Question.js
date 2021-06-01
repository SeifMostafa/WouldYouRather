import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  render() {
    const { question } = this.props;

    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
    return (
      <div className="card">
        <h5 className="mt-4 mb-2">{question.askedBy} asks:</h5>
        <div className="media">
          <img
            src={question.avatarURL}
            alt={`Avatar of ${question.askedBy}`}
            className="avatar"
          />
          <div className="card-content">
            <span>Would you rather</span>
            <div className="mt-2">{question.optionOne.text} </div>
            <div className="mt-2">OR ..</div>
            <Link to={`/question/${question.id}`}>
              <button
                type="submit"
                className="btn btn-secondary mt-2 mb-3"
                style={{ border: `1px solid green` }}
              >
                Show Poll
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ loggedUser, users, questions }, { id }) {
  const {  optionOne, optionTwo } = questions[id];
  const { name, avatarURL } = users[questions[id].author];
  const numOfOption1Votes = optionOne.votes.length;
  const numOfOption2Votes = optionTwo.votes.length;
  return {
    loggedUser,
    question: {
      id,
      askedBy: name,
      avatarURL,
      optionOne,
      optionTwo,
      numOfOption1Votes,
      numOfOption2Votes,
      hasAnsweredOne: optionOne.votes.includes(loggedUser),
      hasAnsweredTwo: optionTwo.votes.includes(loggedUser),
      hasAnswered:
        optionOne.votes.includes(loggedUser) ||
        optionTwo.votes.includes(loggedUser),
      totalVotes: numOfOption2Votes + numOfOption1Votes,
    },
  };
}

export default withRouter(connect(mapStateToProps)(Question));
