import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Tree, Spin, message, Button } from 'antd'
import { POST$, treeData } from '../../lib/MATH/math.js'
import { API } from '../../lib/API/Iphone.API'
import { selectkeysToHeader } from '../Slider/action/Header.action'

class IphoneArch extends Component {
    state = {
        selectedRowKeys: [],
        loading: true,
        data: [],
        rows: [],
        treeData: [],
        keys: '',
        columns: [
            {
                title: '角色ID',
                dataIndex: 'STAFFID',
                width: '30%',
                render: (text) => {
                    return (
                        <div style={{ padding: '15px', display: 'inline-block' }}>{text}</div>
                    )
                }
            }, {
                title: '角色名称',
                dataIndex: 'STAFFNAME',
                width: '70%',
                render: (text) => {
                    return (
                        <div style={{ padding: '15px' }}>{text}</div>
                    )
                }
            }
        ]
    }
    componentDidMount() {

        let p1 = new Promise(
            (resolve, reject) => {
                POST$(API('getusers').http, {}, (res) => {
                    if (res.Results) {
                        resolve(res.Results)
                    } else {
                        reject(500)
                    }
                })
            }
        )
        let p2 = new Promise(
            (resolve, reject) => {
                POST$(API('GetDataFormNodes_mobile').http, {}, (res) => {
                    if (res.length > 0) {
                        res.forEach((e) => {
                            treeData(e)
                        })
                        resolve(res)
                    } else {
                        reject(500)
                    }
                })
            }
        )
        Promise.all([p1, p2])
            .then((Results) => {
                this.setState({
                    data: Results[0],
                    treeData: Results[1],
                    loading: false
                })
            })
            .catch((reject) => {
                //message.error(reject)
                this.setState({
                    loading: false
                })
            })
    }
    rowSelectionChange = (rowKeys, rows) => {
        this.setState({
            selectedRowKeys: rowKeys,
            rows: rows
        });
    }

    handleChange = (keys, info) => {
        // console.log(keys);

        this.setState({
            loading: true,
            keys: keys[0]
        });
        let get = new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject('500 error')
            }, 10000);
        });
        let GET = new Promise((resolve, reject) => {
            let ss = {
                targetid: keys[0],
                targettype: "formmobile",
                category: "STAFFFORMMOBILE"
            };
            let param = {
                Param: JSON.stringify(ss),
            };
            POST$(API('getdataformrolelistbytargettype').http, param, (res) => {
                let list = []
                res.map(e => list.push(e.ResourceID))
                resolve(list)
            })
        });
        Promise.race([get, GET])
            .then((Result) => {
                this.setState({
                    loading: false,
                    selectedRowKeys: Result
                })
            })
            .catch((err) => {
                //message.error(err)
                this.setState({
                    loading: false
                })
            })
    }
    Add = () => {
        const { keys } = this.state
        let rowsParams = []
        this.state.rows.forEach(e => {
            rowsParams.push(Object.assign({},
                {
                    ResourceID: e.STAFFID,
                    ResourceType: "STAFF",
                    Category: "STAFFFORMMOBILE",
                    TargetID: keys,
                    TargetType: "formmobile"
                }))
        })
        // console.log(rowsParams);
        POST$(API('savedataformrole').http, rowsParams, (res) => {
            if (res) {
                this.setState({
                    loading: false,
                    selectedRowKeys: [],
                    loading: true,
                    data: [],
                    rows: [],
                    treeData: [],
                    keys: '',
                })
                message.success('添加成功')
                this.props.onTodoClick(['移动总览'])
                this.props.history.push('/Design/Iphoneer')
            } else {
                message.error('数据错误')
            }
        })
    }
    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.8
        const { loading, data, columns, selectedRowKeys } = this.state
        const rowSelection = {
            onChange: this.rowSelectionChange,
            getCheckboxProps: record => ({
                disabled: record.name,
                name: record.name
            }),
            selectedRowKeys: selectedRowKeys
        }
        return (
            <Spin spinning={loading}>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card title="选择表单" bordered={true} style={{ height: h + 'px', overflow: 'auto' }}>
                            {this.state.treeData.length
                                ? <Tree
                                    style={{ width: 300 }}
                                    treeData={this.state.treeData}
                                    placeholder="Please select"
                                    onSelect={this.handleChange.bind(this)}
                                />
                                : ''}
                        </Card>
                    </Col>
                    <Col span={20}>
                        <Card title="选择权限"
                            bordered={true}
                            bodyStyle={{ padding: '5px' }}
                            extra={<Button onClick={this.Add.bind(this)}>添加权限</Button>}>
                            <Table
                                bordered
                                dataSource={data}
                                columns={columns}
                                rowSelection={rowSelection}
                                rowKey='STAFFID'
                                pagination={{ defaultPageSize: 15 }}
                                scroll={{ y: h * 0.8 }}
                            ></Table>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchProps = (dispatch) => {
    return {
        onTodoClick: (k) => {
            dispatch(selectkeysToHeader(k))
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(IphoneArch);