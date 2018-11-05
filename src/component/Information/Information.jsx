import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
import InformationRadio from './InformationRadio'
import InformationDate from './InformationDate'
import InformationPanel from './InformationPanel'

class Information extends Component {
    render() {
        return (
            <Row>
                <Col span={4}>
                    <Card
                        style={{ height: this.props.height * 0.2 }}
                        bodyStyle={{ textAlign: 'center' }}
                        title='选择公司'>
                        <InformationRadio></InformationRadio>
                    </Card>
                    <Card
                        style={{ height: this.props.height * 0.8 }}
                        title="选择时间"
                        bodyStyle={{ textAlign: 'center' }}>
                        <InformationDate></InformationDate>
                    </Card>
                </Col>
                <Col span={20}>
                    <Card
                        title="SQL"
                        style={{ height: this.props.height }}>
                        <InformationPanel></InformationPanel>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default Information;