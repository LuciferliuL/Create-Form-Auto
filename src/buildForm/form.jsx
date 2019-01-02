import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Layout, Menu, Icon,
} from 'antd';
import { Route } from 'react-router-dom';
import  formArch  from './formArch'
import  formDesign  from './formDesign'
import formInfo from './formInfo'
import formFunc from './formFunc'


const {
    Header, Content, Sider,
} = Layout;


function mapStateToProps(state) {
    return {

    };
}

class form extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({ collapsed });
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.props.history.push(e.key)
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu
                        onClick={this.handleClick}
                        theme="dark"
                        defaultSelectedKeys={['/form/formInfo']}
                        mode="inline"
                    >
                        <Menu.Item key="/form/formInfo">
                            <Icon type="pie-chart" />
                            <span>表单总览</span>
                        </Menu.Item>
                        <Menu.Item key="/form/formDesign">
                            <Icon type="desktop" />
                            <span>表单设计</span>
                        </Menu.Item>
                        <Menu.Item key="/form/formFunc">
                            <Icon type="file" />
                            <span>表单方法</span>
                        </Menu.Item>
                        <Menu.Item key="/form/formArch">
                            <Icon type="file" />
                            <span>权限管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: 10 }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Route path='/form/formDesign' component={formDesign}></Route>
                            <Route path='/form/formArch' component={formArch}></Route>
                            <Route path="/form/formInfo" component={formInfo}></Route>
                            <Route path='/form/formFunc' component={formFunc}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    mapStateToProps,
)(form);