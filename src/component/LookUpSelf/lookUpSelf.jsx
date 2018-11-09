import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Spin, message } from "antd";
import { LookUptable } from './lookUptable'
import LookUpForm from './lookUpForm'
import { LookUpApi } from '../../lib/API/lookUpList'
import { GET$, POST$ } from '../../lib/MATH/math'


const Panel = Collapse.Panel;
const ButtonGroup = Button.Group


function mapStateToProps(state) {
    return {

    };
}

class lookUpSelf extends Component {
    state = {
        collapseActive: ['1'],
        tableChangeBool: true,
        tabledata: {},
        btnaction: "add",
        tableDataSource: [],
        loading: false
    }
    componentDidMount() {
        GET$(LookUpApi('LookUpList').http, (res) => {
            // console.log(res);
            this.setState({
                tableDataSource: res,
            })
        })
    }
    //监控table选择
    tableChange = (bool, data) => {
        // console.log(data);
        this.setState({
            tableChangeBool: bool,
            tabledata: data,
            btnaction: "edit",
        })
    }
    //监听collapse改变
    collapseChange = (key) => {
        this.setState({
            loading: true
        })
        // console.log(key);
        GET$(LookUpApi('LookUpList').http, (res) => {
            // console.log(res);
            this.setState({
                tableDataSource: res,
                collapseActive: [key],
                loading: false,
                btnaction: "add",
            })
        })
    }
    //增加
    add = () => {
        this.setState({
            collapseActive: ['2'],
            btnaction: "add",
            tabledata: [],
        })
    }//修改
    edit = () => {
        let { tabledata } = this.state;
        if (tabledata.length === 0) {
            message.warning('请选择数据项！')
            return;
        }

        this.setState({
            collapseActive: ['2'],
            btnaction: "edit",
        })
    }
    //删除
    del = () => {
        let { tabledata } = this.state;
        if (tabledata.length === 0) {
            message.warning('请选择数据项！')
            return;
        }

        this.setState({
            loading: true
        });

        POST$(LookUpApi('LookUpDel', tabledata[0].PK).http, {}, (res) => {
            // console.log(res);
            if (res.result) {
                message.success('删除成功')
                GET$(LookUpApi('LookUpList').http, (res) => {
                    // console.log(res);

                    this.setState({
                        btnaction: "del",
                        tableDataSource: res,
                        loading: false
                    })
                })
            } else {
                message.warning('删除失败')
            }

        })
    }
    render() {
        const { collapseActive, tableChangeBool, tableDataSource, loading, tabledata, btnaction } = this.state
        return (
            <Spin spinning={loading}>
                <ButtonGroup>
                    <Button onClick={this.add.bind(this)}>新增</Button>
                    <Button onClick={this.edit.bind(this)} disabled={tableChangeBool}>修改</Button>
                    {/* <Button>查询</Button> */}
                    <Button onClick={this.del.bind(this)} disabled={tableChangeBool}>删除</Button>
                </ButtonGroup>
                <Collapse
                    bordered={true}
                    activeKey={collapseActive}
                    onChange={this.collapseChange}
                    accordion>
                    <Panel header="检索方案预览表格" key="1" >
                        <LookUptable tableChange={this.tableChange} btnaction={btnaction} tableDataSource={tableDataSource}></LookUptable>
                    </Panel>
                    <Panel header="检索方案详情" key="2" >
                        <LookUpForm tabledata={tabledata} collapseChange={this.collapseChange}></LookUpForm>
                    </Panel>
                    <Panel header="待定" key="3" style={{ display: 'none' }} >
                        <p>text</p>
                    </Panel>
                </Collapse>
            </Spin>
        );
    }
}

export default connect(
    mapStateToProps,
)(lookUpSelf);