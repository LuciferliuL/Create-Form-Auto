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
        user: ''
    };
    componentWillMount() {
       
        if (sessionStorage.getItem('token')) {

        } else {
            this.props.history.push('/')
        }
        var values = sessionStorage.getItem('values')
        console.log(values);
        setTimeout(() => {
            this.setState((pre)=>({
                loading:!pre.loading,
                user: JSON.parse(values) 
            }))
        }, 1000);
    }
    Loading = () => {
        this.setState((pre)=>({
            loading:!pre.loading
        }))
    }
    render() {
        const { user , loading} = this.state
        return (
            <Spin spinning={loading} size='large'>
                <Layout>
                    <Sider style={{ overflow: 'auto', height: '100vh', left: 0, backgroundColor:'#1f381257' }}>
                        <TreeUser></TreeUser>
                    </Sider>
                    <Layout >
                        <Headercomponent user={user} R={'R'} Loading={this.Loading.bind(this)}></Headercomponent>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }} >
                            <ContentUser></ContentUser>
                        </Content>
                    </Layout>
                </Layout>
            </Spin>);
    }
}



export default withRouter(USER);