import React, { useState, Fragment } from "react";
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import {Redirect, withRouter} from "react-router-dom";

function Correct(props) {
    const [selectedOption, setSelectedOption] = useState('select')
    const [redirectToRefer, setRedirectToRefer] = useState(false)

    const handleChange= (event) => {
        setSelectedOption(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const {dispatch} = props;


        if (selectedOption !== "" && 'select') {
            dispatch(setAuthedUser(selectedOption));
            setSelectedOption('select')
            setRedirectToRefer(true)
        }
    }

    const {authUser} = props;
    const {from} = props.location.state || {from: {pathname: '/'}}

    if (redirectToRefer === true) {
        return <Redirect to={from}/>;
    }

    return(
        <Fragment>
            <div className="new-polls">
                <div className="center questioner">
                    <h4 className='mb-0'>Welcome to The Would You Rather App</h4>
                    <p className='mb-0'>Please sign in to continue</p>
                </div>
                <div className="new-polls-input">
                    <form onSubmit={handleSubmit}>
                        <select
                            className="form-select form-select-lg mb-3 select "
                            aria-label=".form-select-lg example"
                            value={selectedOption}
                            onChange={handleChange}
                        >
                            <option value='select' key={'select'}>Open this select menu</option>

                            {authUser.map((user) => (
                                <option key={user.id} className='' value={user.id}>
                                    {/* <img src={user.avatarURL}
                                             alt={`Avatar of ${user.name}`}/>*/}
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <button className="custom-btn custom-btn-two btn-success custom-btn-three"
                                disabled={selectedOption === "select"}
                                type="submit">
                            Sign In
                        </button>
                    </form>
                </div>

            </div>
        </Fragment>
    )

}

function mapStateToProps({users}) {
    const authUser = Object.values(users)

    return {
        authUser,
    };
}

export default withRouter(connect(mapStateToProps)(Correct));


