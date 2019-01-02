import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class formArch extends Component {
    render() {
        return (
            <div>
                权限管理
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(formArch);