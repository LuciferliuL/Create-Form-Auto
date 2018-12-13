import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Icon, Modal, List, Button, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;

function mapStateToProps(state) {
    return {

    };
}

class IphoneC extends Component {
    state = {
        visible: false,
        data: [],
        listColumns: [],
        Type: '',
        POPvisible: false,
        ButtonColor: 'success',
        POPIndex: -1,
        SQLvisible: false,
        text: ''
    }
    componentWillReceiveProps(pre) {
        console.log(pre);
        const { CurrentData } = pre
        if (CurrentData.type === 'radio' || CurrentData.type === 'check') {
            const { data } = CurrentData
            this.setState({
                data: data,
                listColumns: ['name', 'value'],
                Type: CurrentData.type,
                text: CurrentData.type === 'radio' ? CurrentData.sqlname : ''
            })
        } else if (CurrentData.type === 'lookup' || CurrentData.type === 'input' || CurrentData.type === 'date' || CurrentData.type === 'select') {
            const { data } = CurrentData
            this.setState({
                data: [data],
                listColumns: Object.keys(data),
                Type: CurrentData.type
            })
        } else if (CurrentData.type === 'table') {
            const { columns } = CurrentData
            // console.log(columns);

            this.setState({
                data: columns,
                listColumns: Object.keys(columns[0]),
                Type: CurrentData.type,
                text: CurrentData.SQL
            })
        } else {
            this.setState({
                Type: CurrentData.type
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
        // console.log(data);
        // console.log(Type);


        if (Type === 'lookup' || Type === 'input' || Type === 'date' || Type === 'select') {
            this.props.AttributeChange('data', data[0])
        } else if (Type === 'table') {
            this.props.AttributeChange('columns', data)
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
        console.log(attribute);
        if (e === 'true') {
            this.props.AttributeChange(attribute, e)
        } else {
            this.props.AttributeChange(attribute, e)
        }

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
                            Object.keys(e).forEach(el => {
                                if (el === 'enum') {
                                    filed[el] = []
                                } else if (e === 'type') {
                                    filed[e] = 'String'
                                } else {
                                    filed[e] = ''
                                }

                            })
                            filed['enum'] = []
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
                        if (e === 'enum') {
                            filed[e] = []
                        } else if (e === 'type') {
                            filed[e] = 'String'
                        } else {
                            filed[e] = ''
                        }

                    })
                    data.push(filed)
                    this.setState({
                        data: data
                    })
                }
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
    TagsChange = (name, index, ev) => {
        // console.log(name);
        // console.log(index);
        // console.log(ev);

        const { data } = this.state
        let obj = []
        data.forEach((e, i) => {
            if (i === index) {
                let d = {}
                d[name] = typeof ev === 'string' ? Trim(ev) : Trim(ev.target.value)
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
    dateSChange = (index, el) => {

        const { data } = this.state
        let obj = []
        data.forEach((e, i) => {
            if (i === index) {
                let d = {}
                d['value'] = el
                let filed = Object.assign({}, e, d)
                console.log(filed);
                obj.push(filed)
            } else {
                obj.push(e)
            }
        })
        this.setState({
            data: obj
        })
    }
    //小弹层
    hide = () => {
        this.setState({
            POPvisible: false,
        });
    }

    handleVisibleChange = (index, POPvisible) => {
        // console.log(POPvisible);

        this.setState({
            POPvisible: true,
            POPIndex: index
        });
    }
    handlePOP = () => {
        this.setState({
            POPvisible: false,
            ButtonColor: 'primary'
        });
    }
    TagsChange_ = (name, index, ev) => {
        // console.log(name);
        // console.log(index);
        // console.log(ev);
        //POPIndex 用来定位
        const { data, POPIndex } = this.state
        data[POPIndex].enum.forEach((e, i) => {
            if (i === index) {
                let d = {}
                d[name] = Trim(ev.target.value)
                let filed = Object.assign({}, e, d)
                // // console.log(filed);
                // obj.push(filed)
                data[POPIndex].enum[index] = filed
            }
        })
        // console.log(data);

        this.setState({
            data: data
        })
    }
    itemClick_ = (i, key) => {
        // console.log(i, key);
        const { data, POPIndex } = this.state
        let list = []
        switch (key) {
            case 'add':
                // if (i !== -1) {
                //添加到队列里面
                data[POPIndex].enum.push({ key: '', value: "" })
                // console.log(data);

                this.setState({
                    data: data
                })

                // } 
                break;
            case 'del':
                data[POPIndex].enum.forEach((e, k) => {
                    if (k !== i) {
                        list.push(e)
                    }
                })
                data[POPIndex].enum = list
                this.setState({
                    indexChoose: -1,
                    data: data
                })
                break;
            default:
                break;
        }

    }
    handleSQL = () => {
        // console.log(this.props);
        const { CurrentData } = this.props
        let v = this.state.text.replace(/\n/g, ' ')
        this.props.AttributeChange(CurrentData.type === 'table' ? 'SQL' : 'sqlname', v)
        this.setState({
            SQLvisible: false
        })
    }
    textChange = (e) => {
        // console.log(e.target.value);

        this.setState({
            text: e.target.value
        })
    }
    render() {
        const { CurrentData } = this.props
        const { data, listColumns, Type, POPIndex } = this.state
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.80;

        // console.log(data[POPIndex]);
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
            if (e === 'data') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={e === 'columns' ? '列数据' : '组件数据'} key={e + i}>
                        <Input
                            value={JSON.stringify(CurrentData[e])}
                            readOnly={true}
                            addonAfter={<Icon type="setting" onClick={this.showModal} />}
                        ></Input>
                    </FormItem>
                )
            } else if (e === 'columns') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={e === 'columns' ? '列数据' : '组件数据'} key={e + i}>
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
            } else if (e === 'mode' && CurrentData.type === 'input') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label='组件类型' key={e + i}>
                        <Select
                            value={CurrentData[e]}
                            onChange={this.SelectChange.bind(this, e)}
                            style={{ width: '100%' }}>
                            <Option value='default'>默认</Option>
                            <Option value='money'>金钱</Option>
                            <Option value='number'>数字</Option>
                        </Select>
                    </FormItem>
                )
            } else if (e === 'mode' && CurrentData.type === 'lookup') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label='组件类型' key={e + i}>
                        <Select
                            value={CurrentData[e]}
                            onChange={this.SelectChange.bind(this, e)}
                            style={{ width: '100%' }}>
                            <Option value='cust'>默认</Option>
                        </Select>
                    </FormItem>
                )
            } else if (e === 'paramtype') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label='数据类型' key={e + i}>
                        <Select
                            value={CurrentData[e]}
                            onChange={this.SelectChange.bind(this, e)}
                            style={{ width: '100%' }}>
                            <Option value='String'>string</Option>
                            <Option value='Int32类型'>Int32类型</Option>
                            <Option value='DateTime'>DateTime</Option>
                        </Select>
                    </FormItem>
                )
            } else if (e === 'isObj') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label='传值是否对象' key={e + i}>
                        <Select
                            value={JSON.stringify(CurrentData[e])}
                            onChange={this.SelectChange.bind(this, e)}
                            style={{ width: '100%' }}>
                            <Option value='true'>true</Option>
                            <Option value='false'>false</Option>
                        </Select>
                    </FormItem>
                )
            } else if (e === 'SQL' || e === 'sqlname') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={'SQL语句'} key={e + i}>
                        <Input
                            value={JSON.stringify(CurrentData[e])}
                            readOnly={true}
                            addonAfter={<Icon type="setting" onClick={() => { this.setState({ SQLvisible: true }) }} />}
                        ></Input>
                    </FormItem>
                )
            } else if (e !== 'Label'
                && e !== 'Key'
                && e !== 'value'
                && e !== 'defaultValue'
                && e !== 'type'
                && e !== 'show'
                && e !== 'control') {
                CurrentInput.push(
                    <FormItem {...formItemLayout}
                        label={e === 'id' ? '组件字段'
                            : e === 'selectname' ? '选择名'
                                : e === 'selectvalue' ? '选择值' : '默认标记'}
                        key={e + i}>
                        <Input
                            value={CurrentData[e]}
                            // readOnly={true}
                            onChange={this.ValueChange.bind(this, e)}></Input>
                    </FormItem>
                )
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
                    width={900}
                >
                    {
                        data.length > 0 ?
                            <List
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
                                bordered
                                dataSource={data}
                                renderItem={(item, index) => {
                                    // console.log(item);

                                    let Tags = []
                                    if (Type === 'date') {
                                        Tags.push(
                                            <div key={item.Key + index}>
                                                <Input
                                                    style={{ width: '50%', marginRight: 10 }}
                                                    // key={listColumns[0]}
                                                    value={item[listColumns[0]]}
                                                    onChange={this.TagsChange.bind(this, 'name', index)}>
                                                </Input>
                                                <Select defaultValue={0} onChange={this.dateSChange.bind(this, index)}>
                                                    <Option value={0}>当天</Option>
                                                    <Option value={1}>月初</Option>
                                                    <Option value={2}>月末</Option>
                                                </Select>
                                            </div>
                                        )
                                    } else if (Type === 'table') {
                                        listColumns.forEach(element => {
                                            if (element !== 'type' && element !== 'enum') {
                                                Tags.push(
                                                    <Input
                                                        addonBefore={element === 'title' ? '显示名称' : element === 'dataIndex' ? "实际值" : element}
                                                        style={{ marginRight: 10 }}
                                                        key={element}
                                                        value={item[element]}
                                                        onChange={this.TagsChange.bind(this, element, index)}>
                                                    </Input>
                                                )
                                            }
                                        })
                                        Tags.push(
                                            <div key={index + 'select'} style={{ width: '100%' }}>
                                                <Select
                                                    defaultValue="String"
                                                    style={{ width: '50%' }}
                                                    onChange={this.TagsChange.bind(this, 'type', index)}>
                                                    <Option value='String'>字符串类型</Option>
                                                    <Option value='Date'>时间类型</Option>
                                                    <Option value='Enum'>枚举类型</Option>
                                                </Select>
                                                <Button type={this.state.ButtonColor} onClick={this.handleVisibleChange.bind(this, index)}>添加枚举</Button>
                                            </div>
                                        )
                                    } else {
                                        listColumns.forEach(element => (
                                            Tags.push(
                                                <Input
                                                    addonBefore={element === 'name' ? '名称' : element === 'value' ? "数值" : element}
                                                    style={{ marginRight: 10 }}
                                                    key={element}
                                                    value={item[element]}
                                                    onChange={this.TagsChange.bind(this, element, index)}>
                                                </Input>
                                            )
                                        ))
                                    }


                                    return <List.Item actions={
                                        [<span
                                            onClick={this.itemClick.bind(this, index, 'add')}
                                            style={Type === 'lookup' || Type === 'input' || Type === 'date' || Type === 'select' ? { display: 'none' } : {}}>添加</span>,
                                        <span onClick={this.itemClick.bind(this, index, 'del')}
                                            style={Type === 'lookup' || Type === 'input' || Type === 'date' || Type === 'select' ? { display: 'none' } : {}}>删除</span>]}>
                                        {Tags}
                                    </List.Item>
                                }}
                            /> :
                            <Button onClick={this.itemClick.bind(this, -1, 'add')}>添加</Button>
                    }
                </Modal>
                <Modal
                    title="枚举设置"
                    visible={this.state.POPvisible}
                    onOk={this.handlePOP}
                    onCancel={this.hide}
                    width={900}>
                    <List
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={data[POPIndex] ? data[POPIndex].enum : data[POPIndex]}
                        renderItem={
                            // if (Type === ' table') {
                            (element, j) => {
                                console.log(element);
                                return <div key={j + 'enum'} style={{ width: '100%' }}>
                                    <List.Item actions={
                                        [<span
                                            onClick={this.itemClick_.bind(this, j, 'add')}
                                        >添加</span>,
                                        <span onClick={this.itemClick_.bind(this, j, 'del')}
                                        >删除</span>]}>
                                        <Input
                                            addonBefore={'名称'}
                                            style={{ marginRight: 10 }}
                                            value={element['key']}
                                            onChange={this.TagsChange_.bind(this, 'key', j)}>
                                        </Input>
                                        <Input
                                            addonBefore={"值"}
                                            style={{ marginRight: 10 }}
                                            value={element['value']}
                                            onChange={this.TagsChange_.bind(this, 'value', j)}>
                                        </Input>
                                    </List.Item>
                                </div>

                            }
                        }>
                    </List>
                    <Button onClick={this.itemClick_.bind(this, 0, 'add')}>添加</Button>

                </Modal>
                <Modal
                    title="SQL设置"
                    visible={this.state.SQLvisible}
                    onOk={this.handleSQL}
                    bodyStyle={{ overflowY: 'scroll', minHeight: h + 'px', height: h + 'px' }}
                    maskClosable={false}
                    centered={true}
                    width={800}
                    destroyOnClose={true}
                    onCancel={() => { this.setState({ SQLvisible: false }) }} >
                    <TextArea
                        rows={25}
                        onChange={this.textChange.bind(this)}
                        value={this.state.text}></TextArea>
                </Modal>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(IphoneC);

//去除空格
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

