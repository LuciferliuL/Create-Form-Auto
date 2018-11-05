import React, { Component } from 'react';
import { Card, Row, Col, Select, Button } from 'antd'
import InformationRadio from './InformationRadio'
import InformationDate from './InformationDate'
import InformationPanel from './InformationPanel'


const Option = Select.Option
const ButtonGroup = Button.Group
class Information extends Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    render() {
        return (
            <Row>
                <Col span={4}>
                    <Card
                        style={{ height: this.props.height * 0.2 }}
                        bodyStyle={{ textAlign: 'center' }}
                        title='选择公司'
                    >
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
                        style={{ height: this.props.height }}
                        extra={<div>
                            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                            <ButtonGroup>
                                <Button>新增</Button>
                                <Button>查看</Button>
                                <Button>删除</Button>
                            </ButtonGroup>
                        </div>}>
                        <InformationPanel></InformationPanel>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default Information;