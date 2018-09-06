import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Button, Tag} from "antd";

const { Header } = Layout

class Headercomponent extends Component {


    render() {
        const { user } = this.props
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank">个人设置</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank">个人中心</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank">退出登入</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Header style={{ background: '#fff', padding: '15px 35px' }}>
                {/* <div style={{ float: 'right' }}>
                    <Child user={user}></Child>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button style={{ float: 'left' }}>{user.userName}</Button>
                    </Dropdown>
                </div> */}
            </Header>
        );
    }
}

export default Headercomponent;

const Child = (props) => {
    return (
        <Tag color='blue' style={{ float: 'left', marginTop: '5px' }}>
            {props.user.company[(props.user.company.length - 1)]}
        </Tag>
    )
}