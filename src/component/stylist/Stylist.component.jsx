import React, { Component } from 'react';

class Stylistcomponent extends Component {
    state = {
        dataSource:this.props.location.state
    }

    render() {
        return (
            <div>
                {this.state.dataSource}
            </div>
        );
    }
}

export default Stylistcomponent;