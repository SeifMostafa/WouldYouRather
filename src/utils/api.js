import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
	return Promise.all([_getUsers(), _getQuestions()]).then(
		([users, questions]) => ({
			users,
			questions,
		})
	);
}

export function saveQuestion(question) {
	return _saveQuestion(question);
}

export function saveQuestionAnswer(object) {
	return _saveQuestionAnswer(object);
}

export function formatQuestion(question, author, authedUser) {
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