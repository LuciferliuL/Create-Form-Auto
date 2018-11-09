import React from 'react'
import { Message, Table, Button, Icon, Popconfirm, Layout, Row, Breadcrumb, Input, Divider } from 'antd'
import './baseData.css'
import { API } from '../../lib/API/baseData.API'
import { GET$, TreeMath, POSTFETCHNOBODY, POST$, httprequest, getUrlParam } from '../../lib/MATH/math'
const Content = Layout.Content
const Search = Input.Search
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                { PK: 1, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
                { PK: 2, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
                { PK: 3, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
                { PK: 4, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
                { PK: 5, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
                { PK: 6, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
                { PK: 7, Db_User: 'xxx', Db_Pwd: 'fakfjk', Db: 'llll', Name: 'fajkfjak', Db_Group: 'kkkk', Branchid: 'fafa', Enabled: 0, Note: 'fafa' },
            ],
            loading: false,
            selectedRowKeys: [],
            name: ''
        }
    }
    componentDidMount() {
        this.getDbList()
    }
    // 获取用户列表信息
    getDbList = () => {
        let url = API('dbList').http + '?name=' + this.state.name
        GET$(url, (res) => {
            if (res) {
                this.setState({
                    dataSource: res
                })
            }
        })
    }

    // 新增数据库
    handleAddUser = () => {
        this.props.history.push('/BaseData/DBInfo')
    }
    // 点击编辑
    handleEdit = (record) => {
        let param = {
            pathname: '/BaseData/DBInfo',
            search: `?db_user=${record.Db_User}`,
            state: record
        }
        this.props.history.push(param)
    }
    // 点击查询
    searchBtn = (value) => {
        this.setState({
            name: value
        }, function () {
            this.getDbList()
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
            align: 'center',
            title: '数据库账号',
            dataIndex: 'Db_User',
            key: 'Db_User'
        }, {
            align: 'center',
            title: '数据库密码',
            dataIndex: 'Db_Pwd',
            key: 'Db_Pwd'
        }, {
            align: 'center',
            title: '数据库',
            dataIndex: 'Db',
            key: 'Db'
        }, {
            align: 'center',
            title: '数据库名称',
            dataIndex: 'Name',
            key: 'Name'
        },
        {
            align: 'center',
            title: '数据库分组',
            dataIndex: 'Db_Group',
            key: 'Db_Group'
        },
        {
            align: 'center',
            title: '是否启用',
            dataIndex: 'Enabled',
            key: 'Enabled',
            render: (text) => {
                return <span>{text === 1 ? '是' : '否'}</span>
            }
        },
        {
            align: 'center',
            title: '备注',
            dataIndex: 'Note',
            key: 'Note'
        }, {
            title: '操作',
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button icon="edit" type="primary" title="编辑" onClick={this.handleEdit.bind(this, record)}></Button>
                    </Button.Group>
                );
            }
        }
        ];
        return (
            <Content style={{ padding: '0 10px 10px' }}>
                <Breadcrumb style={{ margin: '16px 0', fontWeight: 'bold' }}>
                    <Breadcrumb.Item style={{ color: '#cf1322' }}>用户人员列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className="test-nav">
                    <div style={{ float: "right", display: "inline" }}>
                        <Button type="primary" icon="plus" onClick={this.handleAddUser}>新增数据库</Button>
                    </div>
                    <div style={{ float: "right", display: "inline", marginRight: '10px' }}>
                        <Search
                            placeholder="请输入数据库名称"
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
                            pagination={false} rowKey={row => row.PK} />
                    </Row>
                </div>
            </Content>
        )
    }
}

export default UserList