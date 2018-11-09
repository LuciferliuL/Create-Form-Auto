import React, { Component } from 'react'
import { Message, Form, Input, Select, Button, Breadcrumb, Layout, Row, Col, Checkbox } from 'antd';
import { GETFetch, TreeMath, POSTFETCHNOBODY, POST$, httprequest, getUrlParam } from '../../lib/MATH/math'
import { Object } from 'es6-shim';
import { API } from '../../lib/API/baseData.API'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
// const AutoCompleteOption = AutoComplete.Option;
const { Content } = Layout;

class AddOrEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getUrlParam(this.props.location.search, 'id') || '',
            Account: getUrlParam(this.props.location.search, 'Account') || '',
            userInfo: {
                Account: '',
                PassWord: '',
                Name: '',
                Enabled: 0,
                Note: '',
                PK: ''
            }
        }
        this.init()

    }
    componentDidMount() {
        if (this.state.id) {
            // 请求用户信息进行编辑
            console.log(this.props.location.state)
            let userInfo = this.props.location.state || {
                Account: 'x',
                PassWord: '****',
                Name: 'fa',
                Enabled: 1,
                Note: 'fafafa',
                PK: ''
            }
            this.setState({
                userInfo: userInfo
            })
            this.props.form.setFieldsValue(userInfo)
        }
    }

    init = () => {
        this.disabled = false
        this.title = '添加用户'
        if (this.state.id) {
            this.title = '修改用户信息'
            this.disabled = true
        }
    }
    // 勾选框
    handleChange = (e) => {
        let userInfo = this.state.userInfo
        if (e.target.value) {
            userInfo.Enabled = 0
        } else {
            userInfo.Enabled = 1
        }
        this.setState({
            userInfo: userInfo
        })
    }
    // 保存
    handleSubmit = (e) => {
        e.preventDefault()
        // todo 接口请求
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            values.Enabled = values.Enabled ? 1 : 0
            let params = Object.assign(this.state.userInfo, values)
            console.log(params)
            POST$(API('saveUserInfo').http, params, (res) => {
                if (res.Result) {
                    Message.success('保存成功', 2, function () {
                        this.props.history.push({ pathname: '/BaseData/UserList' });
                    }.bind(this))
                }
            })
        })
    }
    // 返回
    handleBack = () => {
        this.props.history.goBack()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 20,
                    offset: 8,
                },
                sm: {
                    span: 20,
                    offset: 8,
                },
            },
        }
        return (
            <Content style={{ padding: '0 10px 10px' }}>
                <Breadcrumb style={{ margin: '16px 0', fontWeight: 'bold' }}>
                    <Breadcrumb.Item style={{ color: '#cf1322' }}>{this.title}</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff' }}>
                    <Row type="flex" justify="center">
                        <Col span={20}>
                            <Form onSubmit={this.handleSubmit} style={{ padding: 24 }}>
                                <FormItem {...formItemLayout} label="用户账号">
                                    {getFieldDecorator('Account', {
                                        rules: [{
                                            required: true, message: '请输入用户账号!',
                                        }],
                                    })(
                                        <Input disabled={this.disabled} type="text" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="用户密码">
                                    {getFieldDecorator('PassWord', {
                                        rules: [{
                                            required: true, message: '请输入用户密码!',
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} label="用户姓名">
                                    {getFieldDecorator('Name', {
                                        rules: [{
                                            required: true, message: '请输入用户姓名!',
                                        }],
                                    })(
                                        <Input type="text" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="是否启用">
                                    {getFieldDecorator('Enabled', {
                                        rules: [{
                                            required: false, message: '!',
                                        }],
                                    })(
                                        <Checkbox
                                            checked={this.state.userInfo.Enabled === 1 ? true : false}
                                            onChange={this.handleChange}
                                        >
                                        </Checkbox>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="备注">
                                    {getFieldDecorator('Note', {
                                        rules: [{
                                            required: false, message: '',
                                        }],
                                    })(
                                        <TextArea />
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: "16px" }}>保存</Button>
                                    <Button type="ghost" onClick={this.handleBack}>返回</Button>
                                </FormItem>
                            </Form>
                        </Col>


                    </Row>
                </div>

            </Content>
        )
    }
}
AddOrEditUser = Form.create()(AddOrEditUser);
export default AddOrEditUser