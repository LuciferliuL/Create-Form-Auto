import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Tree, Spin } from 'antd'
import { API } from '../../lib/API/check.API.js'
import { GET$ } from '../../lib/MATH/math.js'

function mapStateToProps(state) {
    return {

    };
}

class ReadForm extends Component {
    state = {
        loading: true,
        data: [],
        columns: [
            {
                title: 'RoleId',
                dataIndex: 'RoleId',
                width: '30%',
            }, {
                title: 'RoleName',
                dataIndex: 'RoleName',
                width: '70%',
            }
        ]
    }
    componentDidMount() {
        GET$(API('CheckId').http, (res) => {
            console.log(res);
            this.setState({
                data: res,
                loading: false
            })
        })
    }
    rowSelectionChange = (rowKeys,rows) => {
        console.log(rowKeys, rows);
        
    }
    render() {
        const { loading, data, columns } = this.state
        const rowSelection = {
            onChange:this.rowSelectionChange,
            getCheckboxProps:record => ({
                disabled:record.name,
                name:record.name
            })
        }
        return (
            <Spin spinning={loading}>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card title="选择表单" bordered={true}>
                            <Tree></Tree>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <Card title="选择权限" bordered={true}>
                            <Table
                                dataSource={data}
                                columns={columns}
                                rowSelection={rowSelection}
                                rowKey='RoleId'
                            ></Table>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        );
    }
}

export default connect(
    mapStateToProps,
)(ReadForm);