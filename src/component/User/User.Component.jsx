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
        user: '',
        collapsed: false
    };

    componentWillMount() {
        if (sessionStorage.getItem('token')) {

        } else {
            this.props.history.push('/')
        }
        var values = sessionStorage.getItem('values')
        setTimeout(() => {
            this.setState((pre) => ({
                loading: !pre.loading,
                user: JSON.parse(values)
            }))
        }, 1000);
    }
    Loading = () => {
        this.setState((pre) => ({
            loading: !pre.loading
        }))
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const { user, loading } = this.state
        return (
            <Spin spinning={loading} size='large'>
                <Layout>
                    <Sider
                        style={{ overflow: 'auto', height: '100vh', left: 0, backgroundColor: '#fafafa' }}  >
                        <TreeUser></TreeUser>
                    </Sider>
                    <Layout >
                        <Headercomponent user={user} R={'R'} ></Headercomponent>
                        <Content style={{ overflow: 'initial' }} >
                            <ContentUser Loading={this.Loading.bind(this)}></ContentUser>
                        </Content>
                    </Layout>
                </Layout>
            </Spin>);
    }
}



export default withRouter(USER);