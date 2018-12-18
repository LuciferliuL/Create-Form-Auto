import React, { Component } from 'react';
import { Card, Tabs, Form, Input, Switch, InputNumber, Radio, Icon, Select, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { currentAttrUpdata, formUpdataFromCurrent, hidenDrawer, flagChange } from './action/Right.action.js'
import Drawercomponent from '../Drawer/Drawer.component'
import { inputChange } from '../PublicComponent/Public.action'
const Option = Select.Option
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const HTMLTitle = [
    { label: 'id', name: 'ID', content: <Input></Input> },
    // { label: 'message', name: '错误提示', content: <Input></Input> },
    { label: 'label', name: '标题', content: <Input></Input> }
]
class SliderRightcomponent extends Component {
    state = {
        uniqueList: [],
        flag: '',
        value: 1,
        checkboxvalue: ''
    }

    componentWillReceiveProps(pre) {
        console.log(pre);

        const { getFieldDecorator } = pre.form;
        let dateChange = 0

        if (pre.currentAttr.type === 'Range' || pre.currentAttr.type === 'Date') {
            if (pre.currentAttr.defaultValue) {
                if (pre.currentAttr.defaultValue === 3) {
                    dateChange = 3 //无
                } else if (pre.currentAttr.defaultValue === -1) {
                    dateChange = 1 //最新时间
                } else {
                    dateChange = 2 //自定义
                }
            }
        }
        if (pre.currentAttr.type === 'CheckBox') {
            this.setState({
                checkboxvalue: pre.currentAttr.defaultValue
            })
        }

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
                                        <Select style={{ width: '100%' }} onChange={this.handleChange}>
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
                            <Drawercomponent tableedit={this.props.tableedit}></Drawercomponent>
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
                case 'float':
                    uniqueList.push(
                        <FormItem
                            label='左侧固定列'
                            {...formItemLayout}
                            key={pre.currentAttr.key + 'float'}
                        >
                            {getFieldDecorator('float')(
                                <InputNumber min={0} max={4} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    )
                    break;
                case 'columns':
                    uniqueList.push(
                        <div key={pre.currentAttr.key + 'columns'}>
                            <Drawercomponent tableedit={this.props.tableedit}></Drawercomponent>
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
                            <Drawercomponent tableedit={this.props.tableedit}></Drawercomponent>
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
                            <Drawercomponent tableedit={this.props.tableedit}></Drawercomponent>
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
                    let selectOptions = [];
                    if (pre.currentAttr.dataSource.length > 0) {
                        Object.keys(pre.currentAttr.dataSource[0]).forEach(e => { selectOptions.push(<Option value={e} key={e}>{e}</Option>) })
                        uniqueList.push(
                            <div key={pre.currentAttr.key + 'uniqueKey'}>
                                <FormItem
                                    label='显示字符'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uniqueKey')(
                                        <Select style={{ width: '100%' }} onChange={this.handleChange}>
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
        if (pre.currentAttr.type === 'Table' || pre.currentAttr.type === 'Lookup') {
            uniqueList.push(
                <div key={pre.currentAttr.key + pre.currentAttr.SQL}>
                    <FormItem
                        label='是否自定义接口'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isCustomDirective',{
                             valuePropName: 'checked',
                            //  initialValue: true,
                        })(
                            <Checkbox></Checkbox>
                        )}
                    </FormItem>
                    {
                        pre.currentAttr.isCustomDirective ?
                            <div>
                                <FormItem
                                    label='自定义地址'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CustomDirectiveURL')(
                                        <Input></Input>
                                    )}
                                </FormItem>
                                <FormItem
                                    label='自定义方法'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CustomDirectiveMethod')(
                                        <Radio.Group>
                                            <Radio value={0}>POST</Radio>
                                            <Radio value={1}>GET</Radio>
                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </div>
                            : null
                    }
                </div>

            )
        }
        this.setState({
            uniqueList: uniqueList,
            value: dateChange,
        })
    }
    handleChange = (e) => {
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
    radioChange = (key, e) => {
        // console.log(e.target.value);

        this.setState({
            value: e.target.value
        })
        if (e.target.value === 1) {
            let times = -1
            this.props.inputChange(this.props.currentAttr.key, times)
        } else if (e.target.value === 3) {
            let times = 3
            this.props.inputChange(this.props.currentAttr.key, times)
        } else {
            this.props.inputChange(this.props.currentAttr.key, 1)
        }
    }
    handleChange = (key, value) => {
        if (value === 1) {
            this.props.inputChange(this.props.currentAttr.key, 1)
        } else if (value === 7) {
            this.props.inputChange(this.props.currentAttr.key, 7)
        } else if (value === 30) {
            this.props.inputChange(this.props.currentAttr.key, 30)
        }
    }
    checkBoxValueChange = (e) => {
        this.setState({
            checkboxvalue: e.target.value
        })
        this.props.inputChange(this.props.currentAttr.key, e.target.value)
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
        const { currentAttr } = this.props;

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
        // console.log(this.state.value);


        return (
            <Card bodyStyle={{ padding: 5 }}>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="基础属性" key="1">
                            {inputList}
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
                            {currentAttr.type === 'Range' ?
                                <div>
                                    <RadioGroup onChange={this.radioChange.bind(this, 'Range')} value={this.state.value}>
                                        <Radio value={1}>最新时间</Radio>
                                        <Radio value={2}>自己设定</Radio>
                                        <Radio value={3}>无限定时间</Radio>
                                    </RadioGroup>
                                    {this.state.value === 2 ?
                                        // <RangePicker onChange={this.RangePicker} disabledDate={disabledDate} />
                                        <div>
                                            <span>默认时间</span>
                                            <Select defaultValue={1} onChange={this.handleChange.bind(this, 'Range')}>
                                                <Option value={1}>前1天</Option>
                                                <Option value={7}>前7天</Option>
                                                <Option value={30}>前一个月</Option>
                                            </Select>
                                        </div>
                                        : null}
                                </div>
                                : null}
                            {currentAttr.type === 'Date' ?
                                <div>
                                    <RadioGroup onChange={this.radioChange.bind(this, 'Date')} value={this.state.value}>
                                        <Radio value={1}>最新时间</Radio>
                                        <Radio value={2}>自己设定</Radio>
                                        <Radio value={3}>无限定时间</Radio>
                                    </RadioGroup>
                                    {this.state.value === 2 ?
                                        // <RangePicker onChange={this.RangePicker} disabledDate={disabledDate} />
                                        <div>
                                            <span>默认时间</span>
                                            <Select defaultValue={1} onChange={this.handleChange.bind(this, 'Date')}>
                                                <Option value={1}>前1天</Option>
                                                <Option value={7}>前7天</Option>
                                                <Option value={30}>前一个月</Option>
                                            </Select>
                                        </div>
                                        : null}
                                </div>
                                : null}
                            {currentAttr.type === 'CheckBox' ?
                                <div>默认值：
                                    <Input type="text"
                                        value={this.state.checkboxvalue}
                                        onChange={this.checkBoxValueChange}
                                    />
                                </div>
                                : null
                            }
                        </TabPane>
                    </Tabs>
                    {/* <Button type='submit'>确认修改</Button> */}
                </Form>
            </Card>
        );
    }
}

const mapPropsToState = (state) => {
    // console.log(state);

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
        },
        inputChange: (key, value) => {
            dispatch(inputChange(key, value))
        },
        // editTable:(key) => {
        //     dispatch(editTable(key))
        // }
    }
}
export default connect(mapPropsToState, mapDispatchProps)(Form.create({
    onFieldsChange(props, changedFields) {
        // console.log(1);

        let value = changedFields[Object.keys(changedFields)[0]]['value']
        let label = changedFields[Object.keys(changedFields)[0]]['name']
        let obj = {}
        obj[label] = value;
        // console.log(obj);
        
        Object.assign(props.currentAttr, obj);
        props.updata(props.currentAttr);//修改current

        // props.editTable(props.currentAttr)
        if (props.currentAttr.type === 'Table') {
            props.tableedit(props.currentAttr)
        } else {
            props.upForm(props.currentAttr);//修改表单
        }


    },
    mapPropsToFields(props) {
        const { currentAttr } = props
        let Field = {}
        if (Object.keys(currentAttr).length > 0) {
            Object.keys(currentAttr).forEach(e => {
                Field[e] = Form.createFormField({ value: currentAttr[e] })
            })
        }
        console.log(Field);
        
        return Field;
    },
    onValuesChange(_, values) {
    },
})(SliderRightcomponent));



