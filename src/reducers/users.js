import { RECEIVE_USERS, ADD_ANSWER_TO_USER } from "../actions/users";
import { ADD_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case ADD_QUESTION:
			const { question } = action;

			return {
				...state,
				[question.author]: {
					...state[question.author],
					questions: state[question.author].questions.concat([
						question.id,
					]),
				},
			};
		case ADD_ANSWER_TO_USER:
			const { authedUser, qid, answer } = action;
			// let options = {};
			// options = {

			// };
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer,
					},
				},
			};
		default:
			return state;
	}
}
