import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import QuestionPage from "./QuestionPage";
import PollResult from "./PollResult";
import { formatQuestion } from "../utils/api";

class View extends Component {
  render() {
    const { question, id } = this.props;
    const { hasAnswered } = question;

    return (
      <Fragment>
        {hasAnswered ? <PollResult id={id} /> : <QuestionPage id={id} />}
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

export default connect(mapStateToProps)(View);
