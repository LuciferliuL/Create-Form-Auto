import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card} from 'antd'

function mapStateToProps(state) {
    return {

    };
}

class formDesign extends Component {
    render() {
        return (
            <div>
                表单设计
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(formDesign)