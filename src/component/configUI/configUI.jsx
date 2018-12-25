import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu } from 'antd'
import { API } from '../../lib/API/configui'
import { POST$ } from '../../lib/MATH/math'
import { menu } from './configui'

const SubMenu = Menu.SubMenu;
function mapStateToProps(state) {
    return {

    };
}

class configUI extends Component {
    state = {
        menuNode: [],
        UIhref : "http://10.3.4.233:8090"
    }
    componentDidMount() {
        POST$(API('GetConfigMenu').http, { "level": "14" }, (res) => {
            console.log(menu(res));
            this.setState({
                menuNode: menu(res)
            })
        })
    }
    menuClick = (record, e) => {
        console.log(record);
        this.setState({
            UIhref:"http://10.3.4.233:8090" + record.Param2
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
    render() {
        let h = document.documentElement.clientHeight
        const { menuNode,UIhref } = this.state
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

        return (
            <Row>
                <Col span={3}>
                    <Menu
                        // defaultOpenKeys={['0submenu']}
                        style={{height: h }}
                        mode="inline"
                        theme="dark">
                        {m}
                    </Menu>
                </Col>
                <Col span={21}>
                    <iframe src={UIhref} frameBorder="0" style={{ width: '100%', height: h - 10 }}></iframe>
                </Col>
            </Row>
        );
    }
}

export default connect(
    mapStateToProps,
)(configUI);