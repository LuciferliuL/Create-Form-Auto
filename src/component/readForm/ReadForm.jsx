import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Tree, Spin, message, Button } from 'antd'
import { API } from '../../lib/API/check.API.js'
import { GET$, POST$ } from '../../lib/MATH/math.js'


const TreeNode = Tree.TreeNode
function mapStateToProps(state) {
    return {

    };
}


class ReadForm extends Component {
    state = {
        selectedRowKeys: [],
        loading: true,
        data: [],
        rows: [],
        treeData: [],
        keys: '',
        columns: [
            {
                title: 'ROLEID',
                dataIndex: 'ROLEID',
                width: '30%',
                render:(text)=>{
                    return(
                        <div style={{padding:'15px',display:'inline-block'}}>{text}</div>
                    )
                }
            }, {
                title: 'ROLENAME',
                dataIndex: 'ROLENAME',
                width: '70%',
                render:(text)=>{
                    return(
                        <div style={{padding:'15px'}}>{text}</div>
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
        POST$(API('CheckCurrentId').http, body, (res) => {
            // console.log(res);
            if (res.Results) {
                this.setState({
                    data: res.Results,
                    loading: false
                })
            } else {
                message.error('数据错误')
            }
        })
        GET$(API('CheckFormList').http, (res) => {
            console.log(res);
            this.setState({
                treeData: res,
                loading: false
            })
        })
    }
    rowSelectionChange = (rowKeys, rows) => {
        console.log(rowKeys, rows);
        this.setState({
            selectedRowKeys: rowKeys,
            rows: rows
        })
    }


    onSelect = (keys, info) => {
        this.setState({
            loading: true,
            keys: keys[0]
        })
        // console.log(keys , info);
        let get = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('500 error')
            }, 10000);
        })
        let GET = new Promise((resolve, reject) => {
            GET$(API('CheckId').http + ' ' + keys[0], (res) => {
                // console.log(res);
                let list = []
                res.map(e => list.push(e.RoleId))
                resolve(list)
            })
        })
        Promise.race([get, GET])
            .then((Result) => {
                this.setState({
                    loading: false,
                    selectedRowKeys: Result
                })
            })
            .catch((err) => {
                message.error(err)
                this.setState({
                    loading: false
                })
                console.log(err);

            })

    }
    Add = () => {
        this.state.rows.forEach(e => e.SOURCEID = this.state.keys)
        // console.log(this.state.rows);

        POST$(API('Role').http, this.state.rows, (res) => {
            // console.log(res);
            if (res.length > 0) {
                this.setState({
                    loading: false
                })
                message.success('添加成功')
            } else {
                message.error('数据错误')
            }
        })
    }
    render() {
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
                        <Card title="选择表单" bordered={true}>
                            {this.state.treeData.length
                                ? <Tree
                                    onSelect={this.onSelect}
                                >{this.state.treeData.map(data => <TreeNode title={data.Name} key={data.PK} />)}</Tree>
                                : 'loading tree'}
                        </Card>
                    </Col>
                    <Col span={20}>
                        <Card title="选择权限"
                            bordered={true}
                            extra={<Button onClick={this.Add.bind(this)}>添加权限</Button>}>
                            <Table
                                bordered
                                dataSource={data}
                                columns={columns}
                                rowSelection={rowSelection}
                                rowKey='ROLEID'

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

