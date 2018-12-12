import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Tabs, message, Spin, Card } from 'antd';
import { API } from '../../lib/API/I9'
import '../../lib/API/url.API'
import { GET$, POST$ } from '../../lib/MATH/math'
import Information from './Information'
import Person from './Person'
import { copyDataSource } from './information.action'



const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane;

class Info extends Component {
    state = {
        news: false,
        tabBarShow: false,
        showdatalog: false,
        databottom: [],
        columnsbottom: [{
            title: '状态',
            dataIndex: 'Status'
        }, {
            title: '发送时间',
            dataIndex: 'SendDate',
            render: (text, record) => {
                return text.substr(0, 16).replace('T', ' ');
            }
        }],
        disabled: true,
        loading: false,
        activeKey: '1',
        selectedRowKeys: [],
        selectedData: [{
            Title: '',
            PK: -1,
            Name: "测试",
            DataSource: "集中",//集中，分公司；
            DueDatetype: "立即",
            DueDateCorn: "立即",//
            MsgTemplateId: global.msgcfg.autotemplateid,
            Receivers: '[]',
            Sender: null,
            Sqls: '[]',
            Bytes: "",
            DeptID: global.msgcfg.filepath,
            DeptName: global.msgcfg.fileurl
        }],//应该修改的数据
        data: [],
        columns: [{
            title: '标题',
            dataIndex: 'Title',
        }, {
            title: '数据源',
            dataIndex: 'DataSource',
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            render: (text, record) => {
                return text.substr(0, 10);
            }
        }, {
            title: '状态',
            dataIndex: 'Status',
        }],
    }
    componentDidMount() {
        GET$(API('geti9msgall').http, (res) => {
            // console.log(res);
            this.setState({
                data: res
            })
        })
    }
    checkedLog = () => {
        console.log(this.state.selectedData);
        let ss = {
            cfgguid: this.state.selectedData[0].CfgGuid
        }
        let obj = {
            PageIndex: 1,
            PageSize: 200,
            Param: JSON.stringify(ss),
        };
        POST$(API('geti9msgsendlist').http, obj, (res) => {
            console.log(res);
            if (res.error) {
                message.warning('数据错误，请重新选')
            } else {
                this.setState({
                    databottom: res,
                    showdatalog: true
                })
            }
        })
    }
    OnChange = (rowKey, rows) => {
        console.log(rows);
        this.setState({
            selectedRowKeys: rowKey,
            selectedData: rows
        })
    }
    title = () => (
        <div>
            {/* <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            /> */}
            <ButtonGroup
                style={{ marginLeft: 20 }}>
                <Button onClick={this.edit.bind(this, 'add')}>新增</Button>
                <Button onClick={this.edit.bind(this, 'edit')}>编辑</Button>
                <Button onClick={this.edit.bind(this, 'look')}>查看</Button>
                <Button onClick={this.edit.bind(this, 'del')}>删除</Button>
                <Button onClick={this.checkedLog.bind(this)}>查看日志</Button>
            </ButtonGroup>
        </div>
    )
    edit = (name) => {
        switch (name) {
            case 'add':
                this.setState({
                    activeKey: '2',
                    selectedRowKeys: [],
                    disabled: false,
                    selectedData: [{
                        PK: -1,
                        Name: "测试",
                        DataSource: "集中",//集中，分公司；
                        DueDatetype: "立即",
                        DueDateCorn: "",//
                        MsgTemplateId: global.msgcfg.autotemplateid,
                        Receivers: '[]',
                        Sender: null,
                        Sqls: '[]',
                        Bytes: "",
                        DeptID: global.msgcfg.filepath,
                        DeptName: global.msgcfg.fileurl,
                        Title: ''
                    }],
                    tabBarShow: true,
                    news: false
                })
                this.props.copyDataSource({
                    Title: '',
                    PK: -1,
                    Name: "测试",
                    DataSource: "集中",//集中，分公司；
                    DueDatetype: "立即",
                    DueDateCorn: "",//
                    MsgTemplateId: global.msgcfg.autotemplateid,
                    Receivers: '[]',
                    Sender: null,
                    Sqls: '[]',
                    Bytes: "",
                    DeptID: global.msgcfg.filepath,
                    DeptName: global.msgcfg.fileurl
                })//选择的数据
                break;
            case 'edit':
                console.log(this.state);
                this.props.copyDataSource(this.state.selectedData[0])//选择的数据
                this.state.selectedData[0].PK !== -1 ?
                    this.setState({
                        activeKey: '2',
                        tabBarShow: true,
                        disabled: false,
                        news: false
                    }) : message.warning('请选择数据')
                break;
            case 'look':
                this.props.copyDataSource(this.state.selectedData[0])//选择的数据
                this.state.selectedData[0].PK !== -1 ?
                    this.setState({
                        activeKey: '2',
                        tabBarShow: true,
                        disabled: false,
                        news: true
                    }) : message.warning('请选择数据')
                break;
            case 'del':
                POST$(API('i9Del', this.state.selectedRowKeys[0]).http, {}, (res) => {
                    // console.log(res);
                    if (res.result) {
                        message.success('删除成功')
                        GET$(API('geti9msgall').http, (res) => {
                            console.log(res);
                            this.setState({
                                data: res,
                                selectedData: [{ PK: -1 }],
                                selectedRowKeys: []
                            })
                        })
                    } else {
                        message.error('删除失败')
                    }
                })
                break;
            default:
                break;
        }
    }
    callback = (key) => {
        this.setState({
            activeKey: key,
            tabBarShow: key === '1' ? false : true,
            disabled: key === '1' ? true : false,
        })
    }
    OnOk = () => {
        this.setState({
            loading: true
        })
        let s = this.props.information;
        // console.log(s);

        if (s.DueDatetype == '立即') {
            s.MsgTemplateId = global.msgcfg.autotemplateid;
        }
        else {
            s.MsgTemplateId = global.msgcfg.corntemplateid;
        }

        s.DeptID = global.msgcfg.filepath;
        s.DeptName = global.msgcfg.fileurl;
        s.Sender = JSON.stringify({
            eId: global.msgcfg.eId,
            AppId: global.msgcfg.AppId,
            Secret: global.msgcfg.appSecret,
            Pub: global.msgcfg.pub,
            Pubsercet: global.msgcfg.pubsercet
        })

        let title = s.Title
        let sql = s.Sqls
        let Rec = s.Receivers

        //console.log(s);
        //return;

        if (title.length > 0 && sql.length > 2 && Rec.length > 2) {
            this.setState((pre) => (
                {
                    selectedData: [s]
                }
            ), () => {

                POST$(API('I9msg').http, s, (res) => {
                    // console.log(res);

                    GET$(API('geti9msgall').http, (res) => {
                        // console.log(res);
                        this.setState({
                            data: res,
                            activeKey: '1',
                            selectedData: [{ PK: -1 }],
                            selectedRowKeys: [],
                            disabled: true,
                            news: false,
                            loading: false
                        }, () => { message.success('添加成功') })
                    })
                })
            })
        } else {
            this.setState({
                loading: false
            })
            message.warning(title.length === 0 ? '标题必填' : sql.length === 2 ? 'SQL必填' : '人员必选')
        }

    }
    goBack = () => {
        this.props.history.push('/loginLeader');
    }
    render() {
        const { columns, data, activeKey, showdatalog, selectedRowKeys, selectedData, disabled, loading, news, columnsbottom, databottom } = this.state
        const rowSelection = {
            onChange: this.OnChange,
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        }
        return (
            <Spin spinning={loading}>
                <Tabs
                    onChange={this.callback}
                    activeKey={activeKey}
                    tabBarExtraContent={
                        this.state.tabBarShow ?
                            <div>
                                <Button onClick={this.OnOk} disabled={news}>确认提交</Button>
                            </div> :
                            <div onClick={this.goBack}>
                                <Button>返回首页</Button>
                            </div>
                    }>
                    <TabPane tab="列表选择" key='1'>
                        <Table
                            title={this.title}
                            rowSelection={rowSelection}
                            bordered={true}
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 10 }}
                            rowKey='PK'>
                        </Table>
                        <Card
                            title='发送记录'

                            style={{ position: 'fixed', display: showdatalog ? '' : "none", bottom: 0, width: '100%' }} >
                            <Table
                                // rowSelection={rowSelection}
                                bordered={true}
                                columns={columnsbottom}
                                dataSource={databottom}
                                pagination={{ pageSize: 6 }}
                                rowKey='PK'>
                            </Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="数据编辑" key='2' disabled={disabled}>
                        <Information selectedData={selectedData} news={news}></Information>
                    </TabPane>
                    <TabPane tab="人员选择" key='3' disabled={disabled}>
                        <Person selectedData={selectedData} news={news}></Person>
                    </TabPane>
                </Tabs>
            </Spin>
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


export default connect(
    mapStateToProps, mapDispatchProps
)(Info);