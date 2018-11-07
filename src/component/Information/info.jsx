import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Tabs, message, Spin } from 'antd';
import { API } from '../../lib/API/I9'
import '../../lib/API/url.API'
import { GET$, POST$ } from '../../lib/MATH/math'
import Information from './Information'
import Person from './Person'

const Search = Input.Search;
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane;

function mapStateToProps(state) {
    return {

    };
}

class Info extends Component {
    state = {
        news: false,
        tabBarShow: false,
        disabled: true,
        loading: false,
        activeKey: '1',
        selectedRowKeys: [],
        selectedData: [{
            PK: -1,
            Name: "测试",
            DataSource: "集中",//集中，分公司；
            DueDatetype: "立即",
            DueDateCorn: "立即",//
            MsgTemplateId: global.msgcfg.autotemplateid,
            Receivers: null,
            Sender: null,
            Sqls: null,
            Bytes: "",
            DeptID: global.msgcfg.filepath,
            DeptName: global.msgcfg.fileurl
        }],//应该修改的数据
        data: [],
        columns: [{
            title: '库',
            dataIndex: 'DataSource',
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
        }, {
            title: 'Name',
            dataIndex: 'Name',
        }, {
            title: '备注',
            dataIndex: 'Remark',
        }, {
            title: '状态',
            dataIndex: 'Status',
        }],
    }
    componentDidMount() {
        GET$(API('geti9msgall').http, (res) => {
            console.log(res);
            this.setState({
                data: res
            })
        })
    }
    OnChange = (rowKey, rows) => {
        console.log(rowKey);
        this.setState({
            selectedRowKeys: rowKey,
            selectedData: rows
        })
    }
    title = () => (
        <div>
            <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
            <ButtonGroup
                style={{ marginLeft: 20 }}>
                <Button onClick={this.edit.bind(this, 'add')}>新增</Button>
                <Button onClick={this.edit.bind(this, 'edit')}>编辑</Button>
                <Button onClick={this.edit.bind(this, 'del')}>删除</Button>
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
                        DueDateCorn: "立即",//
                        MsgTemplateId: global.msgcfg.autotemplateid,
                        Receivers: [],
                        Sender: null,
                        Sqls: [],
                        Bytes: "",
                        DeptID: global.msgcfg.filepath,
                        DeptName: global.msgcfg.fileurl
                    }],
                    tabBarShow: true,
                    news:true
                })
                break;
            case 'edit':
                this.state.selectedData[0].PK !== -1 ?
                    this.setState({
                        activeKey: '2',
                        tabBarShow: true,
                        disabled: false,
                        news:false
                    }) : message.warning('请选择数据')
                break;
            case 'del':
                POST$(API('i9Del', this.state.selectedRowKeys[0]).http, {}, (res) => {
                    // console.log(res);
                    if (res.result) {
                        message.success('删除成功')
                        GET$(API('geti9msgall').http, (res) => {
                            // console.log(res);
                            this.setState({
                                data: res
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
        // console.log(key);
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
        // const {selectedData} = this.state
        let s = this.state.selectedData[0];

        s.DeptID = global.msgcfg.filepath;
        s.DeptName = global.msgcfg.fileurl;
        s.Sender = JSON.stringify({
            eId: global.msgcfg.eId,
            AppId: global.msgcfg.AppId,
            Secret: global.msgcfg.appSecret,
        })
        this.setState((pre) => (
            {
                selectedData: [s]
            }
        ), () => {

            POST$(API('I9msg').http, this.state.selectedData[0], (res) => {
                console.log(res);

                GET$(API('geti9msgall').http, (res) => {
                    console.log(res);
                    this.setState({
                        data: res,
                        activeKey: '1',
                        disabled: true,
                        loading: false
                    }, () => { message.success('添加成功') })
                })
            })
        })

    }
    //修改数据的方法
    EditSelectedRow = (obj) => {
        // console.log(obj);
        let selectd = this.state.selectedData[0]
        // console.log(selectd);

        let newSelectdData = Object.assign({}, selectd, obj)
        // console.log(newSelectdData);  
        this.setState({
            selectedData: [newSelectdData]
        })
    }
    render() {
        const { columns, data, activeKey, selectedRowKeys, selectedData, disabled, loading, news } = this.state
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
                                <Button onClick={this.OnOk}>确认提交</Button>
                            </div> : null
                    }>
                    <TabPane tab="列表选择" key='1'>
                        <Table
                            title={this.title}
                            rowSelection={rowSelection}
                            bordered={true}
                            columns={columns}
                            dataSource={data}
                            rowKey='PK'>
                        </Table>
                    </TabPane>
                    <TabPane tab="数据编辑" key='2' disabled={disabled}>
                        <Information selectedData={selectedData} EditSelectedRow={this.EditSelectedRow} news={news}></Information>
                    </TabPane>
                    <TabPane tab="人员选择" key='3' disabled={disabled}>
                        <Person selectedData={selectedData} EditSelectedRow={this.EditSelectedRow} news={news}></Person>
                    </TabPane>
                </Tabs>
            </Spin>
        );
    }
}

export default connect(
    mapStateToProps,
)(Info);