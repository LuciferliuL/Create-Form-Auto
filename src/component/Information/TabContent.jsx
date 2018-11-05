import React, { Component } from 'react';
import { Input, Modal, Button, Table, Icon, Tag } from 'antd'


const TextArea = Input.TextArea
class TabContent extends Component {
    state = {
        visible: false,
        SQL: '',
        name: '',
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
                dataIndex: '',
                render: (text, record, i) => {
                    // console.log(i);

                    return (
                        this.state.columnsIndex === -1 ?
                            <span>
                                <Tag color="#87d068" onClick={this.TagChange.bind(this, 'add', i)}>添加</Tag>
                                <Tag color="#2db7f5" onClick={this.TagChange.bind(this, 'edit', i)}>修改</Tag>
                                <Tag color="#f50" onClick={this.TagChange.bind(this, 'del', i)}>删除</Tag>
                            </span> :
                            <span>
                                <Tag color="#f50" onClick={this.TagChange.bind(this, 'save', i)}>保存</Tag>
                            </span>
                    )
                }

            }
        ]
    }

    componentWillReceiveProps(pre) {
        this.setState({
            visible: false,
            SQL: '',
            name: '',
            columnsIndex: -1,
            Tabledata: [],
        })
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
                                title: num,
                                dataIndex: num,
                                width: '',
                            })
                        }
                        list.push(e)
                    }) : list.push({
                        title: num,
                        dataIndex: num,
                        width: '',
                    })
                this.setState({
                    Tabledata: list
                })
                break;
            case 'edit':
                this.setState({
                    columnsIndex: index
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
                    columnsIndex: -1
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
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    inputChangeReset = (e) => {
        this.setState({
            Tabledata:e.target.value
        })
    }
    textAreaChange = (e) => {
        this.setState({
            SQL:e.target.value
        })
    }
    render() {
        const { Tabledata, columns , SQL} = this.state
        return (
            <div>
                <Modal
                    title="SQL"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    bodyStyle={{ overflow: 'auto', height: 700 }}
                    maskClosable={false}
                    width={800}
                    destroyOnClose={true}
                >
                    <Button onClick={this.TagChange.bind(this, 'add', 0)}>添加</Button>
                    <Table
                        columns={columns}
                        dataSource={Tabledata}
                        bordered={true}
                        pagination={false}
                        rowKey='title'
                        bodyStyle={{ padding: 5 }}

                    ></Table>
                </Modal>
                <span style={{padding:5,fontSize:20}}>SQL:</span>
                <TextArea 
                rows={10}
                value={SQL}
                onChange={this.textAreaChange.bind(this)}></TextArea>
                <span style={{padding:5,fontSize:20}}>列选择项：</span>
                <Input
                    value={Tabledata}
                    onChange={this.inputChangeReset.bind(this)}
                    addonAfter={<span style={{ cursor: 'pointer' }}
                        onClick={this.pointerClick.bind(this, 'column')}>
                        <Icon type="setting" />设置列数据</span>} />
            </div>
        );
    }
}

export default TabContent;