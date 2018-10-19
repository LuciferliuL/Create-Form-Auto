import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Tree, Spin, message, Button} from 'antd'
import { API } from '../../lib/API/check.API.js'
import { GET$, POST$, treeData } from '../../lib/MATH/math.js'

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
                    console.log(res);
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
                    // console.log(res);
                    if(res.length > 0){
                        res.forEach((e) => {
                            treeData(e)
                        })
                        resolve(res)
                    }else{
                        reject(500)
                    }
                })
            }
        )
        Promise.all([p1, p2])
        .then((Results) => {
            this.setState({
                data:Results[0],
                treeData:Results[1],
                loading:false
            })
        })
        .catch((reject)=>{
            message.error(reject)
        })
    }
    rowSelectionChange = (rowKeys, rows) => {
        // console.log(rowKeys, rows);
        this.setState({
            selectedRowKeys: rowKeys,
            rows: rows
        })
    }


    handleChange = (keys, info) => {
        this.setState({
            loading: true,
            keys: keys[0]
        })
        console.log(keys, info);
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
                // console.log(err);

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
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.9
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
                                    // value={this.state.value}
                                    treeData={this.state.treeData}
                                    placeholder="Please select"
                                    // treeDefaultExpandAll
                                    onSelect={this.handleChange.bind(this)}
                                />
                                : 'loading tree'}
                        </Card>
                    </Col>
                    <Col span={20}>
                        <Card title="选择权限"
                            bordered={true}
                            bodyStyle={{padding:'5px'}}                            
                            extra={<Button onClick={this.Add.bind(this)}>添加权限</Button>}>
                            <Table
                                bordered
                                dataSource={data}
                                columns={columns}
                                rowSelection={rowSelection}
                                rowKey='ROLEID'
                                pagination={{defaultPageSize:15}}
                                scroll={{y:h*0.8}}
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

