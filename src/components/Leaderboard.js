import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { leaderboardUsers } = this.props;

    return (
      <Fragment>
        <ul class="list-unstyled center ml-5">
          {leaderboardUsers.map((user) => (
            <li key={user.id} className="media w-50 mb-5 mt-5">
              <img
                class="avatar align-self-start mr-3"
                src={user.imgURL}
                alt="Card image cap"
              />
              <div className="media-body">
                <h3 className="strong">{user.name}</h3>
                <h5>Score: {user.score}</h5>
                Answered Question(s) = {user.numOfAnsweredQuestions} , Created
                Question(s) = {user.numOfCreatedQuestions}
              </div>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const userValues = Object.values(users);
  let leaderboardUsers = [];
  var i;
  for (i = 0; i < userValues.length; i++) {
    const numOfCreatedQuestions = userValues[i].questions.length;
    const numOfAnsweredQuestions = Object.values(userValues[i].answers).length;

    leaderboardUsers.push({
      name: userValues[i].name,
      id: userValues[i].id,
      imgURL: userValues[i].avatarURL,
      score: numOfCreatedQuestions + numOfAnsweredQuestions,
      numOfCreatedQuestions,
      numOfAnsweredQuestions,
    });
  }
  leaderboardUsers.sort((a, b) => b.score - a.score);
  return {
    leaderboardUsers,
  };
}
export default connect(mapStateToProps)(Leaderboard);
