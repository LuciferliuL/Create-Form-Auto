import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd'

function mapStateToProps(state) {
    return {

    };
}

class formFunc extends Component {
    render() {
        return (
            <Card
                title="写方法的地方"
                extra={<Button>增删改查</Button>}>
                写方法的地方
            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(formFunc)