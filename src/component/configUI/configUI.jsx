import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd'

function mapStateToProps(state) {
    return {

    };
}

class configUI extends Component {
    render() {
        return (
            <Row>
                <Col span={2}>123</Col>
                <Col span={22}>
                    <iframe src="http://10.3.4.233:8090" frameborder="0" style={{width:'100%',height:'100%'}}></iframe>
                </Col>
            </Row>
        );
    }
}

export default connect(
    mapStateToProps,
)(configUI);