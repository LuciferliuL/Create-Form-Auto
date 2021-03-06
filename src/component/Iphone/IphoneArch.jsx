import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Tree, Spin, message, Button, Input } from 'antd'
import { POST$, treeData } from '../../lib/MATH/math.js'
import { API } from '../../lib/API/Iphone.API'
import { selectkeysToHeader } from '../Slider/action/Header.action'


const Search = Input.Search;
class IphoneArch extends Component {
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
                title: '员工ID',
                dataIndex: 'STAFFID',
                width: '30%',
                render: (text) => {
                    return (
                        <div style={{ padding: '15px', display: 'inline-block' }}>{text}</div>
                    )
                }
            }, {
                title: '员工名称',
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

                let ss = {
                    branchid: sessionStorage.getItem('currentBranchId')
                };
                let param = {
                    Param: JSON.stringify(ss),
                };
                POST$(API('getusers').http, param, (res) => {
                    if (res.error) {
                        reject(res)
                    }
                    else {
                        resolve(res.Result)
                    }
                })
            }
        )
        let p2 = new Promise(
            (resolve, reject) => {

                let ss = {
                    branchid: sessionStorage.getItem('currentBranchId')
                };
                let param = {
                    Param: JSON.stringify(ss),
                };
                POST$(API('GetDataFormNodes_mobile').http, param, (res) => {

                    if (res.error) {
                        reject(res)
                    }
                    else {
                        if (res.length > 0) {
                            res.forEach((e) => {
                                treeData(e)
                            })
                            resolve(res)
                        }
                        else {
                            resolve([]);
                        }
                    }

                })
            }
        )
        Promise.all([p1, p2])
            .then((Results) => {
                this.setState({
                    data: Results[0],
                    searchdata: Results[0],
                    treeData: Results[1],
                    loading: false
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

        //let get = new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //reject('500 error')
        //    }, 10000);
        //});

        let GET = new Promise((resolve, reject) => {
            let ss = {
                targetid: keys[0],
                branchid: sessionStorage.getItem('currentBranchId'),
                targettype: "formmobile",
                category: "STAFFFORMMOBILE"
            };
            let param = {
                Param: JSON.stringify(ss),
            };
            POST$(API('getdataformrolelistbytargettype').http, param, (res) => {
                if (res.error) {
                    reject(res);
                }
                else {
                    let list = []
                    res.map(e => list.push(e.ResourceID))
                    resolve(list)
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

        if (rowsParams.length === 0) {
            message.error('请选择项信息！');
            return;
        }

        // console.log(rowsParams);
        POST$(API('savedataformrole').http, rowsParams, (res) => {
            if (res) {
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
                this.props.onTodoClick(['移动总览'])
                this.props.history.push('/Design/Iphoneer')
            } else {
                message.error('数据错误')
            }
        })
    }
    search = (el) => {

        const { data } = this.state
        // console.log(data);
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
        // console.log(arr);

    }
    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.8
        const { loading, columns, selectedRowKeys, searchdata } = this.state
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