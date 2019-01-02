import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class formInfo extends Component {
    render() {
        return (
            <div>
                表单总览
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(formInfo);