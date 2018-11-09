import React from 'react'
import { Message, Table, Button, Icon, Popconfirm, Layout, Row, Breadcrumb, Input, Divider } from 'antd'
import './baseData.css'
import { API } from '../../lib/API/baseData.API'
import { GET$, setUrlParam, POSTFETCHNOBODY, POST$, httprequest, getUrlParam } from '../../lib/MATH/math'
const Content = Layout.Content
const Search = Input.Search
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pageindex: 1,
            pagesize: 10,
            dataSource: [],
            loading: false,
            selectedRowKeys: []
        }
    }
    componentDidMount() {
        this.getUserList()
    }
    // 获取用户列表信息
    getUserList = () => {
        let param = {
            name: this.state.name,
            pageindex: this.state.pageindex,
            pagesize: this.state.pagesize
        },
            url = API('userList').http + '?' + setUrlParam(param)
        GET$(url, (res) => {
            if (res) {
                this.setState({
                    dataSource: res.Result,
                    total: res.RecordCount
                })
            }
        })
    }

    // 新增用户人员
    handleAddUser = () => {
        this.props.history.push('/BaseData/UserInfo')
    }
    // 点击编辑
    handleEdit = (record) => {
        let param = {
            pathname: '/BaseData/UserInfo',
            search: `?id=${record.PK}&Account=${record.Account}`,
            state: record
        }
        this.props.history.push(param)
    }
    // 点击授权
    handleAuthorization = (record) => {
        let param = {
            pathname: '/BaseData/UserAuthorization',
            search: `?Account=${record.Account}&userName=${record.Name}`
        }
        this.props.history.push(param)
    }
    // 查询
    searchBtn = (value) => {
        console.log(value)
        this.setState({
            name: value
        }, function () {
            this.getUserList()
        })
    }
    render() {
        const columns = [{
            align: 'center',
            title: '行号',
            dataIndex: 'Index',
            key: 'Index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '账号',
            dataIndex: 'Account',
            key: 'Account'
        }, {
            title: '密码',
            dataIndex: 'PassWord',
            key: 'PassWord'
        }, {
            title: '是否启用',
            dataIndex: 'Enabled',
            key: 'Enabled',
            render: (text) => {
                return <span>{text === 1 ? '是' : '否'}</span>
            }
        },
        {
            title: '姓名',
            dataIndex: 'Name',
            key: 'Name'
        },
        {
            title: '备注',
            dataIndex: 'Note',
            key: 'Note'
        }, {
            title: '操作',
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button icon="edit" type="primary" title="编辑" onClick={this.handleEdit.bind(this, record)}></Button>
                        <Button icon="swap" title="授权" onClick={this.handleAuthorization.bind(this, record)}></Button>
                        {/* <Popconfirm title="确定要删除吗？" onConfirm={this.handleDel.bind(this, record)}>
                            <Button icon="delete" type="dashed" ></Button>
                        </Popconfirm> */}
                    </Button.Group>
                );
            }
        }
        ];
        const pagination = {
            total: this.state.total,
            defaultCurrent: this.state.pageindex,
            pageSize: this.state.pagesize,
            onChange: (current, pageSize) => {
                //this._getSqlList({ current: current, pagesize: pageSize })
                this.setState({
                    pageindex: current,
                    pagesize: pageSize
                }, function () {
                    this.getUserList()
                })
            },
        }
        return (
            <Content style={{ padding: '0 10px 10px' }}>
                <Breadcrumb style={{ margin: '16px 0', fontWeight: 'bold' }}>
                    <Breadcrumb.Item style={{ color: '#cf1322' }}>数据库列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className="test-nav">
                    <div style={{ float: "right", display: "inline" }}>
                        <Button type="primary" icon="plus" onClick={this.handleAddUser}>新增用户人员</Button>
                    </div>
                    <div style={{ float: "right", display: "inline", marginRight: '10px' }}>
                        <Search
                            placeholder="请输入用户名称"
                            enterButton="查询"
                            // value={this.state.searchText}
                            // onChange={this.handleSearchChange.bind(this)}
                            onSearch={this.searchBtn}
                        />
                    </div>
                </div>
                {/* <div>
                    <Divider style={{ margin: 0 }}></Divider>
                </div> */}
                <div style={{ padding: '14px 5px', background: '#fff' }}>
                    <Row>
                        <Table columns={columns} dataSource={this.state.dataSource} loading={this.state.loading}
                            pagination={pagination} rowKey={row => row.PK} />
                    </Row>
                </div>
            </Content>
        )
    }
}

export default UserList