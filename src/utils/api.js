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
	const { id, optionOne, optionTwo } = question;
	const { name, avatarURL } = author;
	const numOfOption1Votes  = optionOne.votes.length;
	const numOfOption2Votes =  optionTwo.votes.length;
	return {
		id,
		askedBy:name,
		avatarURL,
		optionOne,
		optionTwo,
		numOfOption1Votes,
		numOfOption2Votes,
		hasAnsweredOne: optionOne.votes.includes(authedUser),
		hasAnsweredTwo: optionTwo.votes.includes(authedUser),
		hasAnswered:
			optionOne.votes.includes(authedUser) ||
			optionTwo.votes.includes(authedUser),
		totalVotes: numOfOption2Votes + numOfOption1Votes,
	};
}