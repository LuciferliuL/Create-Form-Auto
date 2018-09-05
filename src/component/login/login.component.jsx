import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, Cascader } from 'antd';
import './login.component.css'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            //登入判断
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.history.push('/desgin')
            }
        });
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
        return (
            <Card className="width-40 margin-auto center">
                <Form onSubmit={this.handleSubmit} className="center">
                    <FormItem
                        {...formItemLayout}
                        label="公司">
                        {getFieldDecorator('company', {
                            rules: [{ required: true, message: '公司必须选择！' }]
                        })(
                            <Cascader
                                options={options}
                                onChange={onChange}
                                changeOnSelect
                                expandTrigger="hover"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='用户'>
                        {getFieldDecorator('userName', {
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
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

const LoginComponent = Form.create()(NormalLoginForm);
export default LoginComponent


const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

function onChange(value) {
    console.log(value);
}

