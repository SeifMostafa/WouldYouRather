import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { addAnswerToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}
export function handleAddQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { loggedUser } = getState();
		 dispatch(showLoading());
		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: loggedUser,
		}).then((question) => dispatch(addQuestion(question)))
		 .then(() => dispatch(hideLoading()));
	};
}

function addQuestionAnswer(loggedUser, qid, answer) {
	return {
		type: ADD_QUESTION_ANSWER,
		loggedUser,
		qid,
		answer,
	};
}

export function handleAddQuestionAnswer(loggedUser, qid, answer) {
	return (dispatch) => {
		console.log("type of", typeof answer, typeof qid, typeof loggedUser);

		console.log("did", loggedUser, qid);
		return saveQuestionAnswer({
			author: loggedUser,
			qid,
			answer,
		})
			.then(() => dispatch(addAnswerToUser(loggedUser, qid, answer)))
			.then(() => dispatch(addQuestionAnswer(loggedUser, qid, answer)));
	};
}