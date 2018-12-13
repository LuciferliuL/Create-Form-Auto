import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Row, Col, Table, Button } from 'antd';
import { API } from '../../lib/API/I9'
import "../../lib/API/url.API"
import { POST$ } from '../../lib/MATH/math'
import { copyDataSource } from './information.action'

const Search = Input.Search;


class Person extends Component {
    state = {
        selectedRows: [],
        selectedRowKeys: [],
        index: 0,
        columns: [{
            title: '姓名',
            dataIndex: 'name',
            width: 100
        }, {
            title: '职位',
            dataIndex: 'jobTitle',
            width: 100
        }, {
            title: 'openId',
            dataIndex: 'openId',
        }],
        data: [],
        columns2: [{
            title: '姓名',
            dataIndex: 'name',
            width: "65%"
        }, {
            title: '操作',
            dataIndex: 'openId',
            render: (text, record) => {
                return this.props.news ? null : (
                    <div>
                        <a href="javascript:;" onClick={this.delRow.bind(this, text)}>删除</a>
                    </div>
                )
            }
        }],
        data2: [],
    }
    componentDidMount() {
        // console.log(this.props.selectedData);
        // const { selectedData } = this.props
        let Receivers = JSON.parse(this.props.information.Receivers)
        if (Receivers.length > 0) {
            let l = []
            Receivers.forEach(e => {
                let o = {}
                o['openId'] = e.RecOpenid
                o['name'] = e.RecName
                l.push(o)
            })
            this.setState({
                data2: l
            })
        } else {
            this.setState({
                data2: [],
                data: [],
                selectedRowKeys: [],
            })
        }

    }
    componentWillReceiveProps(pre) {
        // console.log(pre);
        let Receivers = JSON.parse(pre.information.Receivers)
        // console.log(Receivers);

        if (Receivers.length > 0) {
            let l = []
            console.log(1);

            Receivers.forEach(e => {
                let o = {}
                o['openId'] = e.RecOpenid
                o['name'] = e.RecName
                l.push(o)
            })
            this.setState({
                data2: l
            })
        } else {
            this.setState({
                data2: [],
                // data: [],
                selectedRowKeys: [],
            })
        }
    }
    componentWillUnmount() {
        this.setState({
            data2: [],
            data: [],
            selectedRowKeys: [],
        })
    }
    //搜索
    onsearch = (e) => {
        let ss = {
            eId: global.msgcfg.eId,
            secret: global.msgcfg.esecret,
            pagesize: 1000,
            keywords: e
        }
        let param = {
            Param: JSON.stringify(ss),
        };
        POST$(API('geti9allpersons').http, param, (res) => {
            // console.log(res);
            this.setState({
                data: res
            })
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    }
    //添加到右边
    AddRightTable = () => {
        const { data2, selectedRows } = this.state
        let D = [...data2, ...selectedRows]

        this.setState({
            data2: this.un(D)
        }, () => {
            let list = []
            this.state.data2.forEach(e => {
                let o = {}
                o['RecOpenid'] = e.openId
                o['RecName'] = e.name
                list.push(o)
            })
            // this.props.EditSelectedRow({ Receivers: JSON.stringify(list) })
            // sessionStorage.setItem('Person',JSON.stringify({ Receivers: JSON.stringify(list) }))
            this.props.copyDataSource({ Receivers: JSON.stringify(list) })
        })

    }
    un = (arr) => {
        const res = new Map();
        return arr.filter((a) => !res.has(a.openId) && res.set(a.openId, 1))
    }
    delRow = (e) => {
        // console.log(e);
        // const {data2} = this.state
        // data2.filter(item => item.openId !== e)
        this.setState((pre) => ({
            data2: pre.data2.filter(item => item.openId !== e)
        }), () => {
            let list = []
            this.state.data2.forEach(e => {
                let o = {}
                o['RecOpenid'] = e.openId
                o['RecName'] = e.name
                list.push(o)
            })
            // this.props.EditSelectedRow()
            this.props.copyDataSource({ Receivers: JSON.stringify(list) })
        })
    }
    render() {
        const { data, columns, selectedRowKeys, columns2, data2 } = this.state
        const { news } = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <Card>
                <Row gutter={12}>
                    <Col span={10}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            rowSelection={rowSelection}
                            pagination={false}
                            scroll={{ y: 600 }}
                            rowKey='openId'
                            title={() =>
                                <div>
                                    <Search
                                        disabled={news}
                                        placeholder="input search text"
                                        onSearch={this.onsearch.bind(this)}
                                        style={{ width: '80%' }}
                                    />
                                    <Button onClick={this.AddRightTable.bind(this)} disabled={news}>添加</Button>
                                </div>
                            }
                        />
                    </Col>
                    <Col span={14}>
                        <Table
                            columns={columns2}
                            dataSource={data2}
                            bordered
                            pagination={false}
                            scroll={{ y: 600 }}
                            rowKey='openId'
                        />
                    </Col>
                </Row>

            </Card>
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
)(Person);