import React, { Component, Fragment } from "react";
import {connect} from "react-redux";
import Tabs from "./Tabs";
import Question from "./Question";


class Dashboard extends Component {

    render() {
        const {unanswered, answered} = this.props;

        return (
            <Fragment>

                <Tabs>
                    <div label="Unanswered Questions">
                        <ul className="dashboard-list">
                            {unanswered.map((question) => (
                                <li key={question.id}>
                                    <Question id={question.id}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div label="Answered Questions">
                        <ul className="dashboard-list">
                            {answered.map((question) => (
                                <li key={question.id}>
                                    <Question id={question.id}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tabs>
            </Fragment>
        );
    }
}

function mapStateToProps({loggedUser, users, questions}) {
    const answeredIds = Object.keys(users[loggedUser].answers);
    const answered = Object.values(questions)
        .filter((question) => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
        .filter((question) => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        answered,
        unanswered,
    };
}

export default connect(mapStateToProps)(Dashboard);
