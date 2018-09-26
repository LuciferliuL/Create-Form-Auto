import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Button, Tag, Icon } from "antd";
import { withRouter } from 'react-router-dom'

const ButtonGroup = Button.Group;
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
                {this.props.R === 'R' ? <div style={{ float: 'left' }}>
                    <ButtonGroup>
                        <Button ><Icon type="security-scan" theme="outlined" />查询</Button>
                        <Button ><Icon type="copyright" theme="outlined" />清空</Button>
                        <Button ><Icon type="export" theme="outlined" />关闭</Button>
                        <Button ><Icon type="usb" theme="outlined" />导出</Button>
                    </ButtonGroup>
                </div> : <div style={{ float: 'left' }}>你好！设计师</div>
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