import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    showUnAnsweredQuestions: true, // default value true
  };

  handleClick = () => {
    const { showUnAnsweredQuestions } = this.state;

    showUnAnsweredQuestions
      ? this.setState(() => ({
          showUnAnsweredQuestions: false,
        }))
      : this.setState(() => ({
          showUnAnsweredQuestions: true,
        }));
  };
  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    const { showUnAnsweredQuestions } = this.state;
    return (
      <Fragment>
        <ul className="nav nav-pills nav-fill mt-2 mb-5">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              onClick={this.handleClick}
            >
              Unanswered Questions
            </a>
            {showUnAnsweredQuestions
              ? unansweredQuestions.map((question) => (
                  <li key={question.id}>
                    <Question id={question.id} />
                  </li>
                ))
              : null}
          </li>
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              onClick={this.handleClick}
            >
              Answered Questions
            </a>
            {!showUnAnsweredQuestions
              ? answeredQuestions.map((question) => (
                  <li key={question.id}>
                    <Question id={question.id} />
                  </li>
                ))
              : null}
          </li>
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({ loggedUser, questions }) {
  let answeredQuestions = [];
  let unansweredQuestions = [];
  var i;
  var questionValues = Object.values(questions);
  for (i = 0; i < Object.values(questions).length; i++) {
    if (
      questionValues[i].optionOne.votes.includes(loggedUser) ||
      questionValues[i].optionTwo.votes.includes(loggedUser)
    ) {
      answeredQuestions.push(questionValues[i]);
    } else {
      unansweredQuestions.push(questionValues[i]);
    }
  }
  unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  return {
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
