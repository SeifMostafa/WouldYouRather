import React, {Component} from 'react';
import {setAuthedUser} from '../actions/authedUser'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class Logout extends Component {

    handleLogout = (event) => {
        event.preventDefault()
        const {dispatch} = this.props
        dispatch(setAuthedUser(null));
        this.props.history.push(`/login`)
    };

    render() {
        const {authedUser, user} = this.props

        return authedUser === null ? (
            <span className='message'>You are not logged in</span>
        ) : (
            <div className='d-flex'>
                <div className='mr-3'>
                    <p className='mb-0'
                       style={{padding: `5px 0`}}>{Object.values(user.filter((u) => u.id === authedUser)[0].name)}</p>
                    {/*<img src={user.avatar} alt='user'/>*/}
                </div>

                <button className="btn btn-outline-success"
                        onClick={this.handleLogout}
                >
                    Sign out
                </button>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}) {

    const user = Object.values(users)

    return {
        authedUser,
        user,
    };
}

export default withRouter(connect(mapStateToProps)(Logout));
