import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/api";
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
  const question = questions[id];

  return {
    loggedUser,
    question: formatQuestion(question, users[question.author], loggedUser),
  };
}

export default withRouter(connect(mapStateToProps)(Question));
