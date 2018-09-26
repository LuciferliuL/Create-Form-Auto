import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Button, Tag } from "antd";
import { withRouter } from 'react-router-dom'

const { Header } = Layout 
class Headercomponent extends Component {
    state = {
        user: ''
    }
    componentWillMount() {

        if (this.props.user) {
            this.setState({
                user: this.props.user
            })
        } else {
            // this.props.history.push('/')
            console.log(this.props.history);

        }
    }
    enter = () => {
        this.props.history.push('/')
    }
    render() {
        const { user } = this.state
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank">个人设置</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank">个人中心</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.enter.bind(this)}>退出登入</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header style={{ background: '#fff', padding: '15px 35px' }}>
                {this.props.R === 'R'?<div>123</div>:<div>321</div>
                }
                <div style={{ float: 'right' }}>
                    <Child user={user}></Child>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button style={{ float: 'left' }}>{user.username}</Button>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}

export default withRouter(Headercomponent);

const Child = (props) => {
    return (
        <Tag color='blue' style={{ float: 'left', marginTop: '5px' }}>
            {props.user.scope}
        </Tag>
    )
}