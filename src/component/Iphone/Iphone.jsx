import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Iphone extends Component {
    render() {
        return (
            <div>
                123
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Iphone);