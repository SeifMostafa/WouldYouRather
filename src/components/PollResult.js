import React, {Component} from "react";
import {connect} from "react-redux";
import {formatQuestion, percentage} from "../utils/helpers";

class PollResult extends Component {
    render() {
        const {question} = this.props;
        const {
            name,
            avatar,
            per,
            optionOne,
            optionTwo,
            UsersWhoVotedOne, // No of users who picked option one
            UsersWhoVotedTwo, // No of users who picked option two
            hasAnsweredOne,
            hasAnsweredTwo,
            totalVotes,
        } = question;

        const perPeopleWhoVotedOne = percentage(UsersWhoVotedOne, totalVotes, per);
        // Percentage of people who voted for option one

        const perPeopleWhoVotedTwo = percentage(UsersWhoVotedTwo, totalVotes, per);
        // Percentage of people who voted for option two

        return (
            <div className="polls">
                <h5 className="questioner"> Asked by {name}</h5>
                <div className="poll">
                    <img src={avatar} alt="" className="avatar"/>
                    <div className="poll-info ">
                        <div className="mb-2 result">Results:</div>
                        {hasAnsweredOne ? (
                            <div className='custom--card bad'>
                                {/*https://blog.usejournal.com/ribbon-style-badge-for-cards-with-css-5c9da53d908e*/}
                                <div className="option-one card__container" style={{background: `#83c283`}}>
                                    <p>Would you rather {optionOne.text}</p>
                                    <div className="progress" style={{height: `25px`}}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${perPeopleWhoVotedOne}%`
                                            }}
                                            aria-valuenow={perPeopleWhoVotedOne}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {perPeopleWhoVotedOne.toFixed(1)}%
                                        </div>
                                    </div>
                                    <p className="text-center">
                                        {UsersWhoVotedOne} of {totalVotes}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='bad'>
                                <div className="option-one card__container">
                                    <p>Would you rather {optionOne.text}</p>
                                    <div className="progress" style={{height: `25px`}}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${perPeopleWhoVotedOne}%`
                                            }}
                                            aria-valuenow={perPeopleWhoVotedOne}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {perPeopleWhoVotedOne.toFixed(1)}%
                                        </div>
                                    </div>
                                    <p className="text-center">
                                        {UsersWhoVotedOne} of {totalVotes}
                                    </p>
                                </div>
                            </div>
                        )}
                        {hasAnsweredTwo ? (
                            <div className='custom--card bad'>
                                <div className="option-two card__container" style={{background: `#83c283`}}>

                                    <p>Would you rather {optionTwo.text}</p>
                                    <div className="progress" style={{height: `25px`}}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${perPeopleWhoVotedTwo}%`
                                            }}
                                            aria-valuenow={perPeopleWhoVotedTwo}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {perPeopleWhoVotedTwo.toFixed(1)}%
                                        </div>
                                    </div>
                                    <p className="text-center">
                                        {UsersWhoVotedTwo} of {totalVotes}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='bad'>
                                <div className="option-two card__container">
                                    <p>Would you rather {optionTwo.text}</p>
                                    <div className="progress" style={{height: `25px`}}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${perPeopleWhoVotedTwo}%`
                                            }}
                                            aria-valuenow={perPeopleWhoVotedTwo}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {perPeopleWhoVotedTwo.toFixed(1)}%
                                        </div>
                                    </div>
                                    <p className="text-center">
                                        {UsersWhoVotedTwo} of {totalVotes}
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions, users}, {id}) {

    const question = questions[id];

    return {
        id,
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
    };
}

export default connect(mapStateToProps)(PollResult);
