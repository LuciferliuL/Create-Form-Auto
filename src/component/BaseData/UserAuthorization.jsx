import React from 'react'
import { Message, Table, Button, Icon, Checkbox, Layout, Row, Breadcrumb, Input, Divider } from 'antd'
import { GETFetch, TreeMath, POSTFETCHNOBODY, POST$, httprequest, getUrlParam, GET$ } from '../../lib/MATH/math'
import './baseData.css'
import { API } from '../../lib/API/baseData.API'
const Content = Layout.Content
const Search = Input.Search
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            i: [{ pk: '', dbpk: '', account: 'xx', allow: ['delete'] }, { pk: '', dbpk: '', account: 'xx', allow: ['delete'] }],
            loading: false,
            selectedRowKeys: []
        }
        this.init()
    }
    componentDidMount() {
        // todo 接口请求
        this.getUserAuthorList()
    }

    init = () => {
        this.userName = getUrlParam(this.props.location.search, 'userName') && decodeURIComponent(getUrlParam(this.props.location.search, 'userName')) || ''
        this.account = getUrlParam(this.props.location.search, 'Account')
    }
    // 获取授权信息
    getUserAuthorList = () => {
        let url = API('getAuthorList').http + '?account=' + this.account
        GET$(url, function (res) {
            this.setState({
                dataSource: res
            })
        }.bind(this))
    }

    getAuthorActionList = () => {
        let url = API('getActionList').http, arr, dataSource = this.state.dataSource
        GET$(url, function (res) {
            if (res.Result) {
                let Result = res.Result
                Result.map((item) => {
                    arr.push({ "Operation": item, Enabled: false })
                })
                dataSource.map((item) => {
                    item.SettingList = arr
                })
                this.setState({
                    dataSource: dataSource
                })
            }
        })
    }

    // 授权勾选
    handleOnchange = (e, index, i) => {
        let dataSource = this.state.dataSource
        dataSource[index].SettingList[i].Enabled = e.target.checked
        this.setState({
            dataSource: dataSource
        })
    }
    // 保存
    handleSave = () => {
        // todo 发送接口请求
        console.log(this.state.dataSource)

        let param = []
        this.state.dataSource.map((item) => {
            let arr = []
            console.log('fafafa')
            for (var i = 0; i < item.SettingList.length; i++) {
                (function (a) {
                    console.log(item.SettingList[a].Enabled)
                    if (item.SettingList[a].Enabled) {
                        arr.push(item.SettingList[a].Operation)
                    }
                })(i)
            }
            if (arr.length > 0) {
                param.push({
                    PK: item.PK,
                    Account: item.Account,
                    DBINFO_PK: item.DBINFO_PK,
                    Settings: JSON.stringify({ allow: arr })
                })
            }
        })
        console.log(param)
        POST$(API('saveAuthorInfo').http, param, (res) => {
            //debugger;
            if (res.Result) {
                Message.success('保存成功', 2, function () {
                    this.props.history.goBack()
                }.bind(this))
            }
        })

    }
    // 返回
    handleBack = () => {
        this.props.history.goBack()
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
            title: '数据库',
            dataIndex: 'Db',
            key: 'Db'
        }, {
            align: 'center',
            title: '数据库分组',
            dataIndex: 'Db_Group',
            key: 'Db_Group'
        }, {
            align: 'center',
            title: '数据库名称',
            dataIndex: 'Name',
            key: 'Name'
        }, {
            align: 'center',
            title: '数据库用户',
            dataIndex: 'Db_User',
            key: 'Db_User'
        }, {
            align: 'center',
            title: '操作',
            dataIndex: 'SettingList',
            key: 'SettingList',
            render: (text, record, index) => {
                return (
                    text.map((item, i) => {
                        return <Checkbox key={i} checked={item.Enabled} onChange={(e) => { this.handleOnchange(e, index, i) }}>{item.Operation}</Checkbox>
                    })
                )
            }
        }
        ];
        return (
            <Content style={{ padding: '0 10px 10px' }}>
                <Breadcrumb style={{ margin: '16px 0', fontWeight: 'bold' }}>
                    <Breadcrumb.Item style={{ color: '#cf1322' }}>{`您正在给${this.userName}授权`}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="test-nav">
                    <div style={{ float: "right", display: "inline" }}>
                        <Button type="primary" onClick={this.handleSave}>保存</Button>
                    </div>
                    <div style={{ float: "right", display: "inline", marginRight: '10px' }}>
                        <Button type="primary" onClick={this.handleBack}>返回</Button>
                    </div>
                </div>
                {/* <div>
                    <Divider style={{ margin: 0 }}></Divider>
                </div> */}
                <div style={{ padding: '14px 5px', background: '#fff' }}>
                    <Row className="authorization-tab">
                        <Table
                            columns={columns}
                            dataSource={this.state.dataSource}
                            loading={this.state.loading}
                            pagination={false}
                            rowKey={row => row.DBINFO_PK}
                            bordered
                        />
                    </Row>
                </div>
            </Content>
        )
    }
}

export default UserList