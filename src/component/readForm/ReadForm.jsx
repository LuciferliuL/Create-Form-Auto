import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Tree, Spin, message, Button,Input } from 'antd'
import { API } from '../../lib/API/check.API.js'
import { GET$, POST$, treeData } from '../../lib/MATH/math.js'
import { selectkeysToHeader } from '../Slider/action/Header.action'


const Search = Input.Search;
class ReadForm extends Component {
    state = {
        selectedRowKeys: [],
        loading: true,
        data: [],
        searchdata: [],
        rows: [],
        treeData: [],
        keys: '',
        columns: [
            {
                title: '角色ID',
                dataIndex: 'ROLEID',
                width: '30%',
                render: (text) => {
                    return (
                        <div style={{ padding: '15px', display: 'inline-block' }}>{text}</div>
                    )
                }
            }, {
                title: '角色名称',
                dataIndex: 'ROLENAME',
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
        let body = {
            "Sql": "select RoleName ,RoleId  from tb_sys_role where BRANCHID=:currentBranchId",
            "Param": "{}",
            "PageIndex": 1,
            "PageSize": 20,
            "isPage": false
        }
        let p1 = new Promise(
            (resolve, reject) => {
                POST$(API('CheckCurrentId').http, body, (res) => {
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
                POST$(API('POSTDATA').http, {}, (res) => {
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
                    searchdata: Results[0],
                    loading: false
                })
            })
            .catch((reject) => {

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
        this.setState({
            loading: true,
            keys: keys[0]
        });

        let GET = new Promise((resolve, reject) => {
            GET$(API('CheckId').http + ' ' + keys[0], (res) => {
                if (res.error) {
                    reject(res);
                }
                else {
                    let list = []
                    res.map(e => list.push(e.RoleId))
                    resolve(list);
                }
            })
        });

        Promise.race([GET])
            .then((Result) => {
                this.setState({
                    loading: false,
                    selectedRowKeys: Result
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })

                if (err != null && err.status !== 500 && err.errormsg)
                    message.error(err.errormsg.substring(0, 200));
            })
    }
    Add = () => {
        this.state.rows.forEach(e => e.SOURCEID = this.state.keys)
        POST$(API('Role').http, this.state.rows, (res) => {
            if (res.length > 0) {
                this.setState({
                    loading: false,
                    selectedRowKeys: [],
                    // loading: true,
                    data: [],
                    rows: [],
                    treeData: [],
                    keys: '',
                    searchdata: []
                })
                message.success('添加成功')
                this.props.onTodoClick(['表单总览'])
                this.props.history.push('/Design/er')
            } else {
                message.error('数据错误')
            }
        })
    }
    search = (el) => {

        const { data } = this.state
        console.log(el);
        var len = data.length;//总数据
        var arr = [];
        for (var i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            if (JSON.stringify(data[i]).indexOf(el) >= 0) {
                arr.push(data[i]);
            }
        }
        this.setState({
            searchdata: arr
        })
        console.log(arr);

    }
    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.9
        const { loading, data, columns, selectedRowKeys ,searchdata} = this.state
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
                            extra={<div>
                                <Search
                                    placeholder="input search text"
                                    onSearch={this.search.bind(this)}
                                    style={{ width: 200 }}
                                /><Button onClick={this.Add.bind(this)}>添加权限</Button>
                            </div>}>
                            <Table
                                bordered
                                dataSource={searchdata}
                                columns={columns}
                                rowSelection={rowSelection}
                                rowKey='ROLEID'
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
)(ReadForm);

