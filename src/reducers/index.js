import { combineReducers } from "redux";
import loggedUser from "./loggedUser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
	loggedUser,
	users,
	questions,
	loadingBar: loadingBarReducer,
});
