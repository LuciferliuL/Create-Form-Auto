import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout } from 'antd';
import UserList from './UserList'
import UserInfo from './UserInfo'
import UserAuthorization from './UserAuthorization'
import DBList from './DBList'
import DBInfo from './DBInfo'

const { Header, Footer, Sider, Content } = Layout;


function mapStateToProps(state) {
    return {

    };
}

class UserHome extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Sider>

                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>
                            <Route path="/BaseData/UserList" component={UserList}></Route>
                            <Route path="/BaseData/UserInfo" component={UserInfo}></Route>
                            <Route path="/BaseData/UserAuthorization" component={UserAuthorization}></Route>
                            <Route path="/BaseData/DBList" component={DBList}></Route>
                            <Route path="/BaseData/DBInfo" component={DBInfo}></Route>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(UserHome);