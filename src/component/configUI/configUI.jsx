import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Menu, Button, Layout,Tag, Dropdown } from 'antd'
import { API } from '../../lib/API/configui'
import { POST$ } from '../../lib/MATH/math'
import { menu } from './configui'

const SubMenu = Menu.SubMenu;
const { Header, Footer, Sider, Content, } = Layout
function mapStateToProps(state) {
    return {

    };
}

class configUI extends Component {
    state = {
        menuNode: [],
        UIhref: "http://10.3.4.233:8090",
        user: JSON.parse(sessionStorage.getItem('values')),
        userdata: JSON.parse(sessionStorage.getItem('udata')),
    }
    componentDidMount() {
        POST$(API('GetConfigMenu').http, { "level": "14" }, (res) => {
            // console.log(menu(res));
            this.setState({
                menuNode: menu(res)
            })
        })
    }
    menuClick = (record, e) => {
        // console.log(record);
        this.setState({
            UIhref: "http://10.3.4.233:8090" + record.Param2
        })
    }
    menu = (data, list = []) => {
        data.forEach(data => {
            if (data.child && data.child.length > 0) {
                list.push(
                    <SubMenu key={data.GuidString} title={<span>{data.Caption}</span>}>
                        {this.menu(data.child)}
                    </SubMenu>
                )
            } else {
                list.push(<Menu.Item key={data.GuidString} onClick={this.menuClick.bind(this, data)}>{data.Caption}</Menu.Item>)
            }

        })
        return list
    }
    enter = () => {
        this.props.history.push('/loginLeader')
    }
    render() {
        let h = document.documentElement.clientHeight
        const { menuNode, UIhref,  userdata } = this.state
        let m = []
        if (menuNode.length > 0) {
            menuNode.forEach(e => {
                m.push(
                    <SubMenu key={e.GuidString} title={<span>{e.Caption}</span>}>
                        {this.menu(e.child)}
                    </SubMenu>
                )
            })
        }
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.enter.bind(this)}>退出登录</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Sider>  <Menu
                    // defaultOpenKeys={['0submenu']}
                    style={{ height: h }}
                    mode="inline"
                    theme="dark">
                    {m}
                </Menu></Sider>
                <Layout>
                    <Header>
                        <div style={{ float: 'right' }}>
                            <Tag color='blue' style={{ float: 'left', marginTop: '25px', background: 'none', border: 'none', fontSize: '14px', color: '#fff' }}>
                                {userdata.Organization.OrganizationName}
                            </Tag>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Tag style={{ float: 'left', marginTop: '25px', background: 'none', border: 'none', fontSize: '14px', color: '#fff' }}>{userdata.UserName}</Tag>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content>
                        <iframe src={UIhref} frameBorder="0" style={{ width: '100%', height: h - 10 }}></iframe>
                    </Content>
                </Layout>
            </Layout>



        );
    }
}

export default connect(
    mapStateToProps,
)(configUI);