import React, {Component} from 'react';
import {setLoggedUser} from '../actions/loggedUser'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class Logout extends Component {

    handleLogout = (event) => {
        event.preventDefault()
        const {dispatch} = this.props
        dispatch(setLoggedUser(null));
        this.props.history.push(`/login`)
    };

    render() {
        const {loggedUser, user} = this.props

        return loggedUser === null ? (
            <span className='message'>You are not logged in</span>
        ) : (
            <div className='d-flex'>
                <div className='mr-3'>
                    <p className='mb-0'
                       style={{padding: `5px 0`}}>{Object.values(user.filter((u) => u.id === loggedUser)[0].name)}</p>
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

function mapStateToProps({loggedUser, users}) {

    const user = Object.values(users)

    return {
        loggedUser,
        user,
    };
}

export default withRouter(connect(mapStateToProps)(Logout));
