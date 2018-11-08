import React, { Component } from 'react';
import { Input, Modal, Button, Table, Icon, Tag } from 'antd'
import { connect } from 'react-redux'
import { copyDataSource } from './information.action'
const TextArea = Input.TextArea
class TabContent extends Component {
    state = {
        visible: false,
        SQL: '',
        name: '',
        value: '',
        i: -1,
        columnsIndex: -1,
        Tabledata: [],
        columns: [
            {
                title: '列名',
                dataIndex: 'title',
                render: (text, record, i) => {
                    return (
                        i === this.state.columnsIndex ?
                            <Input
                                type="text"
                                value={text}
                                style={{ width: '80%' }}
                                onChange={this.inputChange.bind(this, 'title')} /> :
                            <div style={{ padding: 6 }}>{text}</div>
                    )
                }
            }, {
                title: '字段',
                dataIndex: 'dataIndex',
                render: (text, record, i) => {
                    return (
                        i === this.state.columnsIndex ?
                            <Input
                                type="text"
                                value={text}
                                style={{ width: '80%' }}
                                onChange={this.inputChange.bind(this, 'dataIndex')} /> :
                            text
                    )
                }
            }, {
                title: '宽度',
                dataIndex: 'width',
                render: (text, record, i) => {
                    return (
                        i === this.state.columnsIndex ?
                            <Input
                                type="text"
                                value={text}
                                style={{ width: '80%' }}
                                onChange={this.inputChange.bind(this, 'width')} /> :
                            text
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'key',
                render: (text, record, i) => {
                    // console.log(i);
                    if (i === this.state.i) {
                        return (
                            <span>
                                <Tag color="#f50" onClick={this.TagChange.bind(this, 'save', i)}>保存</Tag>
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                <Tag color="#87d068" onClick={this.TagChange.bind(this, 'add', i)}>添加</Tag>
                                <Tag color="#2db7f5" onClick={this.TagChange.bind(this, 'edit', i)}>修改</Tag>
                                <Tag color="#f50" onClick={this.TagChange.bind(this, 'del', i)}>删除</Tag>
                            </span>
                        )
                    }
                }

            }
        ]
    }
    componentDidMount() {
        const { SQLdata } = this.props
        // console.log(SQLdata);
        if (Object.keys(SQLdata).length > 0) {
            let obj = JSON.parse(SQLdata.cols)
            // console.log(obj);
            let dataSource = []
            Object.keys(obj).forEach(e => {
                let o = {}
                o['title'] = obj[e]
                o['dataIndex'] = e
                dataSource.push(o)
            })
            this.setState({
                SQL: SQLdata.sql,
                Tabledata: dataSource,
                value: SQLdata.name
            })
        }

    }
    componentWillReceiveProps(pre) {
        console.log(pre);
        const { SQLdata } = pre
        if (Object.keys(SQLdata).length > 0) {
            let obj = JSON.parse(SQLdata.cols)
            // console.log(obj);
            let dataSource = []
            Object.keys(obj).forEach(e => {
                let o = {}
                o['title'] = obj[e]
                o['dataIndex'] = e
                dataSource.push(o)
            })
            this.setState({
                SQL: SQLdata.sql,
                Tabledata: dataSource,
                columnsIndex: -1,
                visible: false,
                name: '',
                value: SQLdata.name
            })
        }

    }
    //用来修改表格得值
    inputChange = (name, e) => {
        const { Tabledata, columnsIndex } = this.state
        Tabledata[columnsIndex][name] = e.target.value
        this.setState((pre) => (
            {
                Tabledata: Tabledata
            }
        ))
    }
    //表格增删该查
    TagChange = (name, index) => {
        const { Tabledata } = this.state
        // console.log(Tabledata);
        switch (name) {
            case 'add':
                let num = Math.random().toFixed(4)
                let list = []
                Tabledata !== undefined && Tabledata.length > 0 ?
                    Tabledata.forEach((e, i) => {
                        if (i === index) {
                            list.push({
                                key: num,
                                title: num,
                                dataIndex: num,
                                width: '',
                            })
                        }
                        list.push(e)
                    }) : list.push({
                        key: num,
                        title: num,
                        dataIndex: num,
                        width: '',
                    })
                this.setState({
                    Tabledata: list,
                })
                break;
            case 'edit':
                this.setState({
                    columnsIndex: index,
                    i: index
                })

                break
            case 'del':
                let list_ = []
                Tabledata.forEach((e, i) => {
                    if (i !== index) {
                        list_.push(e)
                    }
                })
                this.setState({
                    Tabledata: list_
                })
                break
            case 'save':
                this.setState({
                    columnsIndex: -1,
                    i: -1
                })
                break
            default:
                break;
        }

    }
    //input得点击弹框
    pointerClick = (e) => {
        this.setState({
            visible: true,
            name: e,
        })
    }
    handleOk = () => {
        this.setState({
            visible: false,
        })
        // console.log(this.state.Tabledata);
        // this.props.EditSelectedRow({
        //     name:this.state.value,

        // })
        const { Tabledata, SQL, value } = this.state
        this.ChangeSQL(Tabledata, SQL, value)
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    inputChangeReset = (e) => {
        this.setState({
            Tabledata: e.target.value
        })
    }
    textAreaChange = (e) => {
        this.setState({
            SQL: e.target.value
        })
        const { Tabledata, SQL, value } = this.state
        this.ChangeSQL(Tabledata, e.target.value, value)
    }
    InputChange = (e) => {
        this.setState({
            value: e.target.value
        })
        const { Tabledata, SQL } = this.state
        this.ChangeSQL(Tabledata, SQL, e.target.value)
    }
    ChangeSQL = (Tabledata, SQL, value) => {
        let Obj = {}
        Tabledata.forEach(e => {
            Obj[e.dataIndex] = e.title
        })
        // this.props.PaneSaveData({
        //     name: value,
        //     cols: JSON.stringify(Obj),
        //     sql: SQL
        // }, this.props.i)

        let Sqls_ = JSON.parse(this.props.information.Sqls)
        Sqls_[this.props.i] = {
            name: value,
            cols: JSON.stringify(Obj),
            sql: SQL
        }
        console.log(this.props.i)
        this.props.copyDataSource({ 'Sqls': JSON.stringify(Sqls_) })
    }
    render() {
        const { Tabledata, columns, SQL, value } = this.state
        return (
            <div>
                <Modal
                    title="列数据"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    bodyStyle={{ overflow: 'auto', height: 700 }}
                    maskClosable={false}
                    width={800}
                    destroyOnClose={true}
                >
                    <Button onClick={this.TagChange.bind(this, 'add', 0)} disabled={this.props.news}>添加</Button>
                    <Table
                        columns={columns}
                        dataSource={Tabledata}
                        bordered={true}
                        pagination={false}
                        rowKey='key'
                        bodyStyle={{ padding: 5 }}

                    ></Table>
                </Modal>
                <span style={{ padding: 5, fontSize: 20 }}>SQL名称:</span>
                <Input value={value} onChange={this.InputChange} disabled={this.props.news}></Input>
                <span style={{ padding: 5, fontSize: 20 }} disabled={this.props.news}>SQL:</span>
                <TextArea
                    disabled={this.props.news}
                    rows={10}
                    value={SQL}
                    onChange={this.textAreaChange.bind(this)}></TextArea>
                <span style={{ padding: 5, fontSize: 20 }}>列选择项：</span>
                <Input
                    disabled={this.props.news}
                    value={Tabledata}
                    onChange={this.inputChangeReset.bind(this)}
                    addonAfter={<span style={{ cursor: 'pointer' }}
                        onClick={this.pointerClick.bind(this, 'column')}>
                        <Icon type="setting" />设置列数据</span>} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state);

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
export default connect(mapStateToProps, mapDispatchProps)(TabContent);


