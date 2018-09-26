import React, { Component } from 'react';
import TreeUser from './Tree.User.jsx'
import ContentUser from './Content.User'
import { Layout, Spin } from 'antd'
import Headercomponent from '../Header/Header.component'
import { withRouter } from 'react-router-dom'

const { Sider, Content } = Layout;
class USER extends Component {
    state = {
        loading: true,
        user: this.props.location.state
    };
    componentWillMount() {
        if (this.props.location.state) {

        } else {
            this.props.history.push('/')
        }
        setTimeout(() => {
            this.setState((pre)=>({
                loading:!pre.loading
            }))
        }, 1000);
    }
    render() {
        const { user , loading} = this.state
        return (
            <Spin spinning={loading}>
                <Layout>
                    <Sider style={{ overflow: 'auto', height: '100vh', left: 0 }}>
                        <TreeUser></TreeUser>
                    </Sider>
                    <Layout >
                        <Headercomponent user={user} R={'R'}></Headercomponent>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }} >
                            <ContentUser></ContentUser>
                        </Content>
                    </Layout>
                </Layout>
            </Spin>);
    }
}



export default withRouter(USER);