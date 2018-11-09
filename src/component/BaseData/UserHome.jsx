import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
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
    TitleClick = (e) => {
        // this.setState({ current: e.key, });
        this.props.history.push("/" + e.key);
    }
    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.92
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }} >
                    <Sider >
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            onClick={this.TitleClick}
                        >
                            <Menu.Item key="BaseData/UserList">
                                人员信息维护
                            </Menu.Item>
                            <Menu.Item key="BaseData/DBList">
                                数据库信息
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        {/* <Header style={{ background: "#fff" }}>Header</Header> */}
                        <Content style={{padding: 10, background: '#fff', minHeight: h }}>
                            <Route path="/BaseData/UserList" component={UserList}></Route>
                            <Route path="/BaseData/UserInfo" component={UserInfo}></Route>
                            <Route path="/BaseData/UserAuthorization" component={UserAuthorization}></Route>
                            <Route path="/BaseData/DBList" component={DBList}></Route>
                            <Route path="/BaseData/DBInfo" component={DBInfo}></Route>
                        </Content>
                        {/* <Footer>Footer</Footer> */}
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(UserHome);