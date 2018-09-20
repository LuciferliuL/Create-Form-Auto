import React, { Component } from 'react';
import TreeUser from './Tree.User.jsx'
import ContentUser from './Content.User'
import { Layout } from 'antd'


const { Header, Footer, Sider, Content } = Layout;
class ReadForm extends Component {
    state = {
        data: [],
        domWidth: 0
    }
    
    ClickTree = (e) => {
        this.setState({
            data: e
        })
    }
    render() {
        return (
            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', left: 0 }}>
                    <TreeUser></TreeUser>
                </Sider>
                <Layout >
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial'}} >
                        <ContentUser domWidth={this.state.domWidth} ></ContentUser>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}



export default ReadForm;