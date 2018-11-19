import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Icon, Modal, List, Tag, Button, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

function mapStateToProps(state) {
    return {

    };
}

class IphoneC extends Component {
    state = {
        visible: false,
        data: [],
        listColumns: [],
        indexChoose: -1,
        Type: ''
    }
    componentWillReceiveProps(pre) {
        console.log(pre);
        const { CurrentData } = pre
        if (CurrentData.Type === 'Radio' || CurrentData.Type === 'SelectS') {
            const { data } = CurrentData
            this.setState({
                data: data,
                listColumns: Object.keys(data[0]),
                indexChoose: -1,
                Type: CurrentData.Type
            })
        } else if (CurrentData.Type === 'LookUp' || CurrentData.Type === 'Input' || CurrentData.Type === 'DateS') {
            const { data } = CurrentData
            this.setState({
                data: [data],
                listColumns: Object.keys(data),
                indexChoose: -1,
                Type: CurrentData.Type
            })
        } else {
            this.setState({
                Type: CurrentData.Type
            })
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        // console.log(e);
        const { data, Type } = this.state
        // console.log(data[0]);

        if (Type === 'LookUp' || Type === 'Input' || Type === 'DateS') {
            this.props.AttributeChange('data', data[0])
        } else {
            this.props.AttributeChange('data', data)
        }

        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    ValueChange = (attribute, e) => {
        this.props.AttributeChange(attribute, e.target.value)
    }
    SelectChange = (attribute, e) => {
        // console.log(e);

        this.props.AttributeChange(attribute, e)
    }
    itemClick = (i, key) => {
        console.log(i, key);
        const { data, listColumns } = this.state
        let list = []
        switch (key) {
            case 'add':
                if (i !== -1) {
                    //添加到队列里面
                    data.forEach((e, index) => {
                        list.push(e)
                        if (i === index) {
                            let filed = {}
                            Object.keys(e).forEach(e => {
                                filed[e] = '-'
                            })
                            list.push(filed)
                        }
                    })
                    // console.log(data);

                    this.setState({
                        data: list
                    })

                } else {
                    //添加到队列最后
                    let filed = {}
                    listColumns.forEach(e => {
                        filed[e] = '-'
                    })
                    data.push(filed)
                    this.setState({
                        data: data
                    })
                }
                break;
            case 'edit':
                this.setState({
                    indexChoose: i
                })
                break;
            case 'del':
                data.forEach((e, k) => {
                    if (k !== i) {
                        list.push(e)
                    }
                })
                this.setState({
                    indexChoose: -1,
                    data: list
                })
                break;
            default:
                break;
        }

    }
    TagsChange = (name, ev) => {
        // console.log(name);
        const { data, indexChoose } = this.state
        let obj = []
        data.forEach((e, i) => {
            if (i === indexChoose) {
                let d = {}
                d[name] = ev.target.value
                let filed = Object.assign({}, e, d)
                // console.log(filed);
                obj.push(filed)
            } else {
                obj.push(e)
            }
        })
        this.setState({
            data: obj
        })
    }
    //时间控件选择
    dateSChange = (el) => {
        const { data, indexChoose } = this.state
        let obj = []
        data.forEach((e, i) => {
            if (i === indexChoose) {
                let d = {}
                d['value'] = el
                let filed = Object.assign({}, e, d)
                // console.log(filed);
                obj.push(filed)
            } else {
                obj.push(e)
            }
        })
        this.setState({
            data: obj
        })
    }
    render() {
        const { CurrentData } = this.props
        const { data, listColumns, indexChoose, Type } = this.state
        // console.log(CurrentData);
        let CurrentInput = []
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        Object.keys(CurrentData).forEach((e, i) => {
            if (e !== 'Label'
                && e !== 'Key'
                && e !== 'value'
                && e !== 'defaultValue'
                && e !== 'Type'
                && e !== 'data'
                && e !== 'show'
                && e !== 'control') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={e} key={e + i}>
                        <Input
                            value={CurrentData[e]}
                            // readOnly={true}
                            onChange={this.ValueChange.bind(this, e)}></Input>
                    </FormItem>
                )
            } else if (e === 'data') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={e} key={e + i}>
                        <Input
                            value={JSON.stringify(CurrentData[e])}
                            readOnly={true}
                            addonAfter={<Icon type="setting" onClick={this.showModal} />}
                        ></Input>
                    </FormItem>
                )
            } else if (e === 'show') {
                return false //暂时不显示
                // CurrentInput.push(
                //     <FormItem {...formItemLayout} label={e} key={e + i}>
                //         <Select value={JSON.stringify(CurrentData[e])} onChange={this.SelectChange.bind(this, e)}>
                //             <Option value='true'>显示</Option>
                //             <Option value='false'>隐藏</Option>
                //         </Select>
                //     </FormItem>
                // )
            }
        })

        return (
            <div>
                {CurrentInput}
                <Modal
                    title="数据设置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {
                        data.length > 0 ?
                            <List
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
                                bordered
                                dataSource={data}
                                renderItem={(item, index) => {
                                    let Tags = []
                                    if (indexChoose !== index) {
                                        listColumns.forEach(element => (
                                            Tags.push(<Tag key={element}>{item[element]}</Tag>)
                                        ))
                                    } else {
                                        if (Type === 'DateS') {
                                            Tags.push(
                                                <div key={item.Key + index}>
                                                    <Input
                                                        key={listColumns[0]}
                                                        value={item[listColumns[0]]}
                                                        onChange={this.TagsChange.bind(this, listColumns[0])}>
                                                    </Input>
                                                    <Select defaultValue={0} onChange={this.dateSChange.bind(this, index)}>
                                                        <Option value={0}>当天</Option>
                                                        <Option value={1}>月初</Option>
                                                        <Option value={2}>月末</Option>
                                                    </Select>
                                                </div>

                                            )
                                        } else {
                                            listColumns.forEach((element) => {
                                                // console.log(element);

                                                Tags.push(
                                                    <Input
                                                        key={element}
                                                        value={item[element]}
                                                        onChange={this.TagsChange.bind(this, element)}>
                                                    </Input>)
                                            })
                                        }
                                    }

                                    return <List.Item actions={
                                        [<span
                                            onClick={this.itemClick.bind(this, index, 'add')}
                                            style={Type === 'LookUp' || Type === 'Input' || Type === 'DateS' ? { display: 'none' } : {}}>添加</span>,
                                        <span onClick={this.itemClick.bind(this, index, 'edit')}>编辑</span>,
                                        <span onClick={this.itemClick.bind(this, index, 'del')}
                                            style={Type === 'LookUp' || Type === 'Input' || Type === 'DateS' ? { display: 'none' } : {}}>删除</span>]}>
                                        {Tags}
                                    </List.Item>
                                }}
                            /> :
                            <Button onClick={this.itemClick.bind(this, -1, 'add')}>添加</Button>
                    }

                </Modal>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(IphoneC);

