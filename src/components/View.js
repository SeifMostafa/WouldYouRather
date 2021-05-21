import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import QuestionPage from "./QuestionPage";
import PollResult from "./PollResult";
import {formatQuestion} from "../utils/helpers";
import NoMatch from "./NoMatch";

class View extends Component {
    render() {
        const {question, id} = this.props;

        const { hasAnswered} = question;

        if(question === false) {
            return <NoMatch />
        }

        return (
            <Fragment>

                {hasAnswered === true ? (
                    <PollResult id={id} />
                ) : (
                    <QuestionPage id={id} />
                )}
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser, questions, users}, props) {

    const {id} = props.match.params;

    const question = questions[id];

    if(question === undefined || question === null) {
        return {
            question: false,
        }
    }

    return {
        id,
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
    };
}

export default connect(mapStateToProps)(View)
