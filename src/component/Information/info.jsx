import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Tabs, message } from 'antd';
import { API } from '../../lib/API/I9'
import { GET$ } from '../../lib/MATH/math'
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
        tabBarShow: false,
        activeKey: '1',
        selectedRowKeys: [],
        selectedData: [],//应该修改的数据
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
        console.log(rows);
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
                    selectedData: [],
                    tabBarShow: true
                })
                break;
            case 'edit':
                this.state.selectedData.length > 0 ?
                    this.setState({
                        activeKey: '2',
                        tabBarShow: true
                    }) : message.warning('请选择数据')
                break;
            case 'del':

                break;
            default:
                break;
        }
    }
    callback = (key) => {
        // console.log(key);
        this.setState({
            activeKey: key,
            tabBarShow: key === '1' ? false : true
        })
    }
    //修改数据的方法
    EditSelectedRow = (obj) => {
        let newSelectdData = Object.assign({},this.state.selectedData[0],obj)
        console.log(newSelectdData);  
    }
    render() {
        const { columns, data, activeKey, selectedRowKeys, selectedData } = this.state
        const rowSelection = {
            onChange: this.OnChange,
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        }
        return (
            <Tabs
                onChange={this.callback}
                activeKey={activeKey}
                tabBarExtraContent={
                    this.state.tabBarShow ?
                        <div>
                            <Button>确认提交</Button>
                        </div> : null
                }>
                <TabPane tab="列表选择" key='1'>
                    <Table
                        title={this.title}
                        rowSelection={rowSelection}
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        rowKey='CfgGuid'>
                    </Table>
                </TabPane>
                <TabPane tab="数据编辑" key='2'>
                    <Information selectedData={selectedData} EditSelectedRow={this.EditSelectedRow}></Information>
                </TabPane>
                <TabPane tab="人员选择" key='3'>
                    <Person selectedData={selectedData} EditSelectedRow={this.EditSelectedRow}></Person>
                </TabPane>
            </Tabs>
        );
    }
}

export default connect(
    mapStateToProps,
)(Info);