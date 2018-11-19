import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd'


const ButtonGroup = Button.Group
function mapStateToProps(state) {
    return {

    };
}

class Iphoneconfig extends Component {
    render() {
        return (
            <Card
                title='全局配置'
                extra={
                    <ButtonGroup style={{ float: "right" }}>
                        <Button>确定</Button>
                        <Button>编辑</Button>
                    </ButtonGroup>
                }>
                
            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(Iphoneconfig);