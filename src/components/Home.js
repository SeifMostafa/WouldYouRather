import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Tabs from "./Tabs";
import Question from "./Question";

class Home extends Component {
  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;

    return (
      <Fragment>
        <Tabs>
          <div label="Unanswered Questions">
            <ul className="Home-list">
              {unansweredQuestions.map((question) => (
                <li key={question.id}>
                  <Question id={question.id} />
                </li>
              ))}
            </ul>
          </div>
          <div label="Answered Questions">
            <ul className="Home-list">
              {answeredQuestions.map((question) => (
                <li key={question.id}>
                  <Question id={question.id} />
                </li>
              ))}
            </ul>
          </div>
        </Tabs>
      </Fragment>
    );
  }
}

function mapStateToProps({ loggedUser, users, questions }) {
  const answeredIds = Object.keys(users[loggedUser].answers);
  const answeredQuestions = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
