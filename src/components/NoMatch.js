import React, {Component} from 'react';

class NoMatch extends Component {
    render() {
        return (
            <div className='error'>
                404 <br />
                This page does not exist
            </div>
        );
    }
}

export default NoMatch;
