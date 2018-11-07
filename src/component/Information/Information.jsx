import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
import InformationRadio from './InformationRadio'
import InformationDate from './InformationDate'
import InformationPanel from './InformationPanel'


class Information extends Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    render() {
        const {selectedData} = this.props
        return (
            <Row>
                <Col span={4}>
                    <Card
                        bodyStyle={{ textAlign: 'center' }}
                        title='选择公司'
                    >
                        <InformationRadio 
                        selectedData={selectedData} 
                        EditSelectedRow={this.props.EditSelectedRow}></InformationRadio>
                    </Card>
                    <Card
                        title="选择时间"
                        bodyStyle={{ textAlign: 'center' }}>
                        <InformationDate selectedData={selectedData}
                        EditSelectedRow={this.props.EditSelectedRow}></InformationDate>
                    </Card>
                </Col>
                <Col span={20}>
                    <Card
                        title="SQL">
                        <InformationPanel selectedData={selectedData}
                        EditSelectedRow={this.props.EditSelectedRow}></InformationPanel>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Information;