import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
	render() {
		const { sortedUsersUponNumberOfQADetailed } = this.props;

		return (
			<Fragment>
				{sortedUsersUponNumberOfQADetailed.map((user) => (
					<div key={user.id} className="board">
						<img
							src={user.avatar}
							alt={`Avatar of ${user.name}`}
							className="avatar"
						/>
						<div className="user--detail">
							<h3 className="user--name">{user.name}</h3>
							<div className="user--stat">
								<p className="user--stat--label">
									Answered Question(s)
								</p>
								<p className="no--of--question-created">
									{user.userAnswers}
								</p>
							</div>
							<div className="user--stat">
								<p className="user--stat--label">
									Created Question(s)
								</p>
								<p className="no--of--question--answered">
									{user.userQuestions}
								</p>
							</div>
						</div>
						<div className=" user--score">
							<div className="user--score--details">
								<span className="border">Score</span>
								<span className="border">
									<span>{user.score}</span>
								</span>
							</div>
						</div>
					</div>
				))}
			</Fragment>
		);
	}
}

function mapStateToProps({ users }) {
	const sortedUsersUponNumberOfQADetailed = Object.values(users)
		.map((user) => ({
			score:
				Object.values(users[user.id].answers).length +
				users[user.id].questions.length,
			userQuestions: users[user.id].questions.length,
			userAnswers: Object.values(users[user.id].answers).length,
			id: user.id,
			name: user.name,
			avatar: user.avatarURL,
		}))
		.sort((a, b) => b.score - a.score);

	return {
		sortedUsersUponNumberOfQADetailed,
	};
}
export default connect(mapStateToProps)(Leaderboard);
