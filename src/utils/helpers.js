export function formatDate(timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString("en-US");
	return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function percentage(num, total, per) {
	return (num / total) * per;
}

export function formatQuestion(question, author, authedUser, parentQuestion) {
	const { id, timestamp, optionOne, optionTwo } = question;
	const { name, avatarURL, answers, questions } = author;

	return {
		id,
		name,
		answers,
		per: 100,
		questions,
		timestamp,
		avatar: avatarURL,
		optionOne,
		optionTwo,
		UsersWhoVotedOne: optionOne.votes.length,
		UsersWhoVotedTwo: optionTwo.votes.length,
		hasAnsweredOne: optionOne.votes.includes(authedUser),
		hasAnsweredTwo: optionTwo.votes.includes(authedUser),
		hasAnswered:
			optionOne.votes.includes(authedUser) ||
			optionTwo.votes.includes(authedUser),
		totalVotes: optionOne.votes.length + optionTwo.votes.length,
	};
}
