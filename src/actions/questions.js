import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { addAnswerToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";


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
		console.log("--", optionOne, optionTwo, loggedUser);

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: loggedUser,
		}).then((question) => dispatch(addQuestion(question)))
		 .then(() => dispatch(hideLoading()));
	};
}

function addAnswerToQuestion(loggedUser, qid, answer) {
	return {
		type: ADD_ANSWER_TO_QUESTION,
		loggedUser,
		qid,
		answer,
	};
}

export function handleAddAnswerToQuestion(loggedUser, qid, answer) {
	return (dispatch) => {
		console.log("type of", typeof answer, typeof qid, typeof loggedUser);

		console.log("did", loggedUser, qid);
		return saveQuestionAnswer({
			loggedUser,
			qid,
			answer,
		})
			.then(() => dispatch(addAnswerToUser(loggedUser, qid, answer)))
			.then(() => dispatch(addAnswerToQuestion(loggedUser, qid, answer)));
	};
}

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}
