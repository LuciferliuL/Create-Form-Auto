import React, { Component } from 'react';
import { Card, Row, Col, Input, Radio } from 'antd'
import InformationRadio from './InformationRadio'
import InformationDate from './InformationDate'
import InformationPanel from './InformationPanel'
import { connect } from 'react-redux'
import { copyDataSource } from './information.action'

const RadioGroup = Radio.Group
class Information extends Component {

    titleChange = (value) => {
        // console.log(`selected ${value.target.value}`);
        this.props.copyDataSource({ Title: value.target.value })
    }

    sendtypechange = (val) => {
        this.props.copyDataSource({ OpName: val.target.value })
    }

    render() {
        const { selectedData } = this.props
        console.log(this.props);

        return (
            <Row>
                <Col span={4}>
                    <Card
                        bodyStyle={{ textAlign: 'center' }}
                        title='标题'>
                        <Input
                            value={this.props.information.Title}
                            onChange={this.titleChange.bind(this)}
                            disabled={this.props.news}></Input>
                    </Card>
                    <Card
                        bodyStyle={{ textAlign: 'center' }}
                        title='选择数据源'
                    >
                        <InformationRadio
                            selectedData={selectedData}
                            EditSelectedRow={this.props.EditSelectedRow}
                            news={this.props.news}></InformationRadio>
                    </Card>
                    <Card
                        title="选择内容格式"
                        bodyStyle={{ textAlign: 'left' }}>

                        <RadioGroup onChange={this.sendtypechange.bind(this)} value={(this.props.information.OpName === '' || this.props.information.OpName === null) ? '附件' : this.props.information.OpName} disabled={this.props.news}>
                            <Radio value='附件' >附件</Radio>
                            <Radio value='文本' >文本</Radio>
                        </RadioGroup>
                    </Card>
                    <Card
                        title="选择时间"
                        bodyStyle={{ textAlign: 'left' }}>
                        <InformationDate
                            selectedData={selectedData}
                            EditSelectedRow={this.props.EditSelectedRow}
                            news={this.props.news}></InformationDate>
                    </Card>

                </Col>
                <Col span={20}>
                    <Card
                        title="SQL">
                        <InformationPanel
                            selectedData={selectedData}
                            EditSelectedRow={this.props.EditSelectedRow}
                            news={this.props.news}></InformationPanel>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);

    return {
        information: state.information
    }
}

function mapDispatchProps(dispatch) {
    return {
        copyDataSource: (k) => {
            dispatch(copyDataSource(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Information);