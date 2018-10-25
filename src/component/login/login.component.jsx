import React from 'react';
import { Form, Icon, Input, Button, Card, Cascader, Radio, message, Spin } from 'antd';
import './login.component.css'
import { API } from '../../lib/API/login.API'
import '../../lib/API/url.API'
import { GETFetch, TreeMath, POSTFETCHNOBODY, POST$, httprequest, getrequestparam } from '../../lib/MATH/math'
import ReactCanvasNest from 'react-canvas-nest'
const FormItem = Form.Item;

export const handleCallApi = (callback) => {

}

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
            if (localStorage.getItem('company')) {
                this.props.form.setFieldsValue({ 'scope': JSON.parse(localStorage.getItem('company')) })
            }
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            //登入判断
            if (!err) {
                console.log('Received values of form: ', values);
                values.scope = values.scope[values.scope.length - 1];
                //当前；
                global.cfg.currentBranchId = values.scope;
                sessionStorage.setItem('currentBranchId', values.scope);

                let scope = global.cfg.currentBranchId;
                let sysparam = `branchId=${scope}&module=Sys&isIntnet=false`;
                httprequest(getrequestparam('gethost', sysparam), (sys) => {
                    global.cfg.branchSysAPI = sys;
                    sessionStorage.setItem('branchSysAPI', sys);

                    let queryparam = `branchId=${scope}&module=Query&isIntnet=false`;
                    httprequest(getrequestparam('gethost', queryparam), (query) => {
                        global.cfg.branchQueryAPI = query;
                        sessionStorage.setItem('branchQueryAPI', query);

                        let queryparam = `branchId=ZDA&module=Query&isIntnet=false`;
                        httprequest(getrequestparam('gethost', queryparam), (query) => {
                            global.cfg.centerQueryAPI = query;
                            sessionStorage.setItem('centerQueryAPI', query);

                            let http = `grant_type=password&username=${values.username}&password=${values.password}&client_id=JZT&scope=${values.scope}`
                            POSTFETCHNOBODY(API('checkLoginID').http, http, (token) => {
                                if (token.error_description) {
                                    message.error(token.error_description);
                                } else {
                                    //得到用户信息；
                                    let uparam = {
                                        UseId: values.username,
                                        OrganId: values.scope
                                    };
                                    sessionStorage.setItem('token', token.access_token); //保存token
                                    sessionStorage.setItem('values', JSON.stringify(values));//保存登入信息

                                    POST$(API('getuserdata').http, uparam, (u) => {

                                        sessionStorage.setItem('udata', JSON.stringify(u));
                                        this.props.history.push('/loginLeader');
                                        sessionStorage.setItem('model', 'design');
                                        //this.props.history.push('/USER');
                                        //sessionStorage.setItem('model', 'runtime');
                                    })
                                }
                            });

                        });
                    });
                });

            }
        });
    }



    onChange = (value) => {
        // 长期保存公司
        let company = value;
        localStorage.setItem('company', JSON.stringify(company));
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
            count: 88,
        }

        return (
            <Spin size='large' spinning={this.state.loading}>
                <ReactCanvasNest config={config}></ReactCanvasNest>
                <Card className="width-40 margin-auto center" style={{ background: 'transparent' }}>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="center">
                        {/* <FormItem
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
                        </FormItem> */}
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
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='密码'>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
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



