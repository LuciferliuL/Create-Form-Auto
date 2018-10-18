import React, { Component } from 'react';
import { Card, Tabs, Form, Input, Switch, InputNumber, Radio, Icon, Select } from 'antd'
import { connect } from 'react-redux'
import { currentAttrUpdata, formUpdataFromCurrent, hidenDrawer, flagChange } from './action/Right.action.js'
import Drawercomponent from '../Drawer/Drawer.component'
const Option = Select.Option
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const HTMLTitle = [
    { label: 'id', name: 'ID', content: <Input></Input> },
    { label: 'message', name: '错误提示', content: <Input></Input> },
    { label: 'label', name: '标题', content: <Input></Input> }
]
class SliderRightcomponent extends Component {
    state = {
        uniqueList: [],
        flag: ''
    }

    componentWillReceiveProps(pre) {
        const { getFieldDecorator } = pre.form;
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
        // const { flag } = this.state
        let uniqueList = []
        Object.keys(pre.currentAttr).forEach((e, i) => {
            switch (e) {
                case 'placeholder':
                    uniqueList.push(
                        <FormItem
                            label='占位符'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'placeholder'}
                        >
                            {getFieldDecorator('placeholder')(
                                <Input></Input>
                            )}
                        </FormItem>
                    )
                    break;
                case 'groupname':
                    uniqueList.push(
                        <FormItem
                            label='组名'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'groupname'}
                        >
                            {getFieldDecorator('groupname')(
                                <Input></Input>
                            )}
                        </FormItem>
                    )
                    break;
                case 'upKey':
                    let selectOptions_ = []
                    if (pre.currentAttr.dataSource.length > 0) {
                        Object.keys(pre.currentAttr.dataSource[0]).forEach(e => { selectOptions_.push(<Option value={e} key={e}>{e}</Option>) })
                        uniqueList.push(
                            <div key={pre.currentAttr.key + 'upKey'}>
                                <FormItem
                                    label='回传KEY'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('upKey')(
                                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                                            {selectOptions_}
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                        )
                    }

                    break
                case 'GroupValue':
                    uniqueList.push(
                        <div key={pre.currentAttr.key + 'GroupValue'}>
                            <Drawercomponent></Drawercomponent>
                            <FormItem
                                label='组数据'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('GroupValue')(
                                    <Input addonAfter={<Icon type="setting" onClick={this.click.bind(this, 'GroupValue')} />}></Input>
                                )}
                            </FormItem>
                        </div>
                    )
                    break;
                case 'checked':
                    uniqueList.push(
                        <FormItem
                            label='默认勾选'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'checked'}
                        >
                            {getFieldDecorator('checked')(
                                <Switch checked={pre.currentAttr.checked}></Switch>
                            )}
                        </FormItem>
                    )
                    break;
                case 'pageSize':
                    uniqueList.push(
                        <FormItem
                            label='每页显示数'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'pageSize'}
                        >
                            {getFieldDecorator('pageSize')(
                                <InputNumber min={10} max={100} />
                            )}
                        </FormItem>
                    )
                    break;
                    case 'float':
                    uniqueList.push(
                        <FormItem
                            label='左侧固定列'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'float'}
                        >
                            {getFieldDecorator('float')(
                                <InputNumber min={0} max={4} />
                            )}
                        </FormItem>
                    )
                    break;
                case 'scroll':
                    uniqueList.push(
                        <FormItem
                            label='表格高度'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'scroll'}
                        >
                            {getFieldDecorator('scroll')(
                                <InputNumber min={100} max={200} step={10} />
                            )}
                        </FormItem>
                    )
                    break;
                case 'columns':
                    uniqueList.push(
                        <div key={pre.currentAttr.key + 'columns'}>
                            <Drawercomponent></Drawercomponent>
                            <FormItem
                                label='列数据'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('columns')(
                                    <Input addonAfter={<Icon type="setting" onClick={this.click.bind(this, 'columns')} />}></Input>
                                )}
                            </FormItem>
                        </div>
                    )
                    break;
                case 'columnsTable':
                    uniqueList.push(
                        <div key={pre.currentAttr.key + 'columnsTable'}>
                            <Drawercomponent></Drawercomponent>
                            <FormItem
                                label='列数据'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('columnsTable')(
                                    <Input addonAfter={<Icon type="setting" onClick={this.click.bind(this, 'columnsTable')} />}></Input>
                                )}
                            </FormItem>
                        </div>
                    )
                    break;
                case 'orientation':
                    uniqueList.push(
                        <FormItem
                            label='标题位置'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'orientation'}
                        >
                            {getFieldDecorator('orientation')(
                                <RadioGroup >
                                    <RadioButton value="left">left</RadioButton>
                                    <RadioButton value="right">right</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                    )
                    break;
                case 'SQL':
                    uniqueList.push(
                        <div key={pre.currentAttr.key + 'SQL'}>
                            <Drawercomponent></Drawercomponent>
                            <FormItem
                                label='select语句'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('SQL')(
                                    <Input addonAfter={<Icon type="setting" onClick={this.click.bind(this, 'SQL')} />}></Input>
                                )}
                            </FormItem>
                        </div>
                    )
                    break;
                case 'uniqueKey':
                    let selectOptions = []
                    if (pre.currentAttr.dataSource.length > 0) {
                        Object.keys(pre.currentAttr.dataSource[0]).forEach(e => { selectOptions.push(<Option value={e} key={e}>{e}</Option>) })
                        uniqueList.push(
                            <div key={pre.currentAttr.key + 'uniqueKey'}>
                                <FormItem
                                    label='显示字符'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uniqueKey')(
                                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                                            {selectOptions}
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                        )
                    }

                    break;
                case 'isTrueInLookUp':
                    uniqueList.push(
                        <FormItem
                            label='关联lookup'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'isTrueInLookUp'}
                        >
                            {getFieldDecorator('isTrueInLookUp')(
                                <Input></Input>
                            )}
                        </FormItem>
                    )
                    break
                case 'typePoint':
                    uniqueList.push(
                        <FormItem
                            label='关联字段'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'typePoint'}
                        >
                            {getFieldDecorator('typePoint')(
                                <Input></Input>
                            )}
                        </FormItem>
                    )
                    break
                default:
                    break;
            }
        })

        this.setState({
            uniqueList: uniqueList
        })
    }
    handleChange = (e) => {
        console.log(e);

    }
    click = (e) => {
        this.props.flagChange(e)
        this.props.hide(true)

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
        const { currentAttr } = this.props
        // console.log(currentAttr);

        let inputList = []
        HTMLTitle.forEach((e, i) => {
            inputList.push(
                <FormItem
                    label={e.name}
                    {...formItemLayout}
                    key={i}
                >
                    {getFieldDecorator(e.label)(
                        e.content
                    )}
                </FormItem>
            )
        })


        return (
            <Card>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="基础属性" key="1">
                            {inputList}
                            <FormItem
                                label='必填'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('required')(
                                    <Switch checked={currentAttr.required}></Switch>
                                )}
                            </FormItem>
                            <FormItem
                                label='禁止'
                                {...formItemLayout}

                            >
                                {getFieldDecorator('disabled')(
                                    <Switch checked={currentAttr.disabled}></Switch>
                                )}
                            </FormItem>
                            <FormItem
                                label='宽度'
                                {...formItemLayout}

                            >
                                {getFieldDecorator('w')(
                                    <InputNumber min={2} max={24} />
                                )}
                            </FormItem>
                        </TabPane>
                        <TabPane tab="特有属性" key="2">
                            {this.state.uniqueList}
                        </TabPane>
                    </Tabs>
                </Form>
            </Card>
        );
    }
}

const mapPropsToState = (state) => {
    return {

    }
}
const mapDispatchProps = (dispatch) => {
    return {
        updata: (k) => {
            dispatch(currentAttrUpdata(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
        hide: (k) => {
            dispatch(hidenDrawer(k))
        },
        flagChange: (k) => {
            dispatch(flagChange(k))
        }
    }
}
export default connect(mapPropsToState, mapDispatchProps)(Form.create({
    onFieldsChange(props, changedFields) {
        // console.log(props);
        // console.log(changedFields);
        let value = changedFields[Object.keys(changedFields)[0]]['value']
        let label = changedFields[Object.keys(changedFields)[0]]['name']
        let obj = {}
        obj[label] = value
        // console.log(obj);
        Object.assign(props.currentAttr, obj)
        props.updata(props.currentAttr)
        props.upForm(props.currentAttr)
    },
    mapPropsToFields(props) {
        // console.log(props.currentAttr);
        const { currentAttr } = props
        let Field = {}
        if (Object.keys(currentAttr).length > 0) {
            // HTMLTitle.forEach(e => {
            //     Field[e.label] = Form.createFormField({ value: currentAttr[e.label] })
            // })
            Object.keys(currentAttr).forEach(e => {
                Field[e] = Form.createFormField({ value: currentAttr[e] })
            })
        }
        // console.log(Object.keys(currentAttr));

        // Object.keys(initialTags).forEach(e => {
        //     Field[e] = Form.createFormField({ value: initialTags[e] })
        // })
        // console.log(Field);

        return Field;
    },
    onValuesChange(_, values) {
        // console.log(values);
    },
})(SliderRightcomponent));