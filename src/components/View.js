import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import QuestionPage from "./QuestionPage";
import PollResult from "./PollResult";
import { formatQuestion } from "../utils/helpers";

class View extends Component {
  render() {
    const { question, id } = this.props;

    const { hasAnswered } = question;
    return (
      <Fragment>
        {hasAnswered === true ? (
          <PollResult id={id} />
        ) : (
          <QuestionPage id={id} />
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ loggedUser, questions, users }, props) {
  const { id } = props.match.params;

  const question = questions[id];

  if (question === undefined || question === null) {
    return {
      question: false,
    };
  }

  return {
    id,
    loggedUser,
    question: question
      ? formatQuestion(question, users[question.author], loggedUser)
      : null,
  };
}

export default connect(mapStateToProps)(View);
