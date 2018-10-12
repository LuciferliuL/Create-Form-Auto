import React from 'react';
import { Form, Icon, Input, Button, Card, Cascader, Radio, message, Spin } from 'antd';
import './login.component.css'
import { API } from '../../lib/API/login.API'
import { GETFetch, TreeMath, POSTFETCHNOBODY } from '../../lib/MATH/math'
import ReactCanvasNest from 'react-canvas-nest'

const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
    state = {
        listObj: [],
        loading: true
    }
    componentDidMount() {
        GETFetch(API('login').http, (res) => {
            let SystemConnectList = res.SystemConnectList
            this.setState({
                listObj: TreeMath(SystemConnectList),
                loading: false
            })
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            //登入判断
            if (!err) {
                // console.log('Received values of form: ', values);
                values.scope = values.scope[values.scope.length - 1]
                // console.log(values);
                let http = `grant_type=password&username=${values.username}&password=${values.password}&client_id=JZT&scope=${values.scope}`
                POSTFETCHNOBODY(API('checkLoginID').http, http, (token) => {
                    if (token.error_description) {
                        message.error(token.error_description)
                    } else {
                        localStorage.setItem('token', token.access_token) //保存token
                        localStorage.setItem('values', values)
                        let path = {}
                        if (values.use === 'a') {
                            path = {
                                pathname: '/Design/er',
                                state: values
                            }
                        } else {
                            path = {
                                pathname: '/USER',
                                state: values
                            }
                        }

                        this.props.history.push(path)
                    }
                })
            }
        });
    }
    onChange = (value) => {
        console.log(value)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 4 },
                sm: { span: 20 },
            },
        };
        const config = {
            // pointColor: ' 255, 255, 255 ' ,
            count:120,
            // pointOpacity:0.5,
            // lineColor:'red',
            // lineWidth:3
        }
        return (
            <Spin size='large' spinning={this.state.loading}>
                <ReactCanvasNest config={config}></ReactCanvasNest>
                <Card className="width-40 margin-auto center" style={{background:'transparent'}}>
                    <Form onSubmit={this.handleSubmit} className="center">
                        <FormItem
                            {...formItemLayout}
                            label="目的"
                        >
                            {getFieldDecorator('use', {
                                rules: [{ required: true, message: '目的' }]
                            })(
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="a">我是设计者</Radio.Button>
                                    <Radio.Button value="b">我是使用者</Radio.Button>
                                </Radio.Group>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="公司">
                            {getFieldDecorator('scope', {
                                rules: [{ required: true, message: '公司必须选择！' }]
                            })(
                                <Cascader
                                    options={this.state.listObj}
                                    onChange={this.onChange}
                                    changeOnSelect
                                    expandTrigger="hover"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='用户'>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='密码'>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登入
                        </Button>
                        </FormItem>
                    </Form>
                </Card>
            </Spin>
        );
    }
}

const LoginComponent = Form.create()(NormalLoginForm);
export default LoginComponent



