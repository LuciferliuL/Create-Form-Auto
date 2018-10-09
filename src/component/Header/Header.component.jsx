import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Button, Tag, Icon, message } from "antd";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { API } from '../../lib/API/check.API'
import { POST$ } from '../../lib/MATH/math'
import { _clear, _tableUpdataFromResults } from '../stylist/action/Stylist.action'

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
    componentDidMount() {
        // console.log(this.props);
    }
    componentWillReceiveProps(pre) {
        // console.log(pre);
        // if (pre.R === 'R') {
        //     document.onkeydown = function (e) {
        //         // console.log(e.keyCode);

        //         var keyCode = e.keyCode || e.which || e.charCode;
        //         var altKey = e.altKey;
        //         if (altKey && keyCode == 81) {
        //             pre.Loading()
        //             let valueList = {}
        //             let SQL = ''
        //             pre.data.map(e => {
        //                 if (e.type !== 'Table' && e.type !== 'Group') {
        //                     if (e.type === 'LookUp') {
        //                         valueList[e.upKey] = e.values[e.upKey]
        //                     } else if (e.type === 'Input' && e.typePoint === 0) {
        //                         valueList[e.id] = e.defaultValue
        //                     } else if (e.type === 'Input' && e.typePoint !== 0) {
        //                         valueList[e.typePoint] = e.defaultValue
        //                     } else {
        //                         valueList[e.id] = e.defaultValue
        //                     }
        //                 } else if (e.type === 'Table') {
        //                     SQL = e.SQL
        //                 }
        //             })
        //             let post = new Promise((resolve, reject) => {
        //                 let body = {
        //                     "Sql": SQL,
        //                     "Param": JSON.stringify(valueList),
        //                     "PageIndex": 1,
        //                     "PageSize": 200,
        //                     isPage: true
        //                 }
        //                 POST$(API('SQL').http, body, (res) => {
        //                     console.log(res);
        //                     if (res.Results) {
        //                         this.props._tableUpdataFromResults(res.Results, res.RecordCount)
        //                         resolve(true)
        //                     } else {
        //                         reject(false)
        //                     }

        //                 })
        //             })
        //             let time = new Promise((resolve, reject) => {
        //                 setTimeout(() => {
        //                     reject(false)
        //                 }, 10000);
        //             })

        //             Promise.race([post, time])
        //                 .then((result) => {
        //                     pre.Loading()
        //                 })
        //                 .catch((err) => {
        //                     message.error('获取数据超时')
        //                     pre.Loading()
        //                 })
        //         } else if (altKey && keyCode == 82) {

        //         } else if (altKey && keyCode == 67) {
        //             pre.clear()
        //         } else if (altKey && keyCode == 65) {

        //         }
        //         e.preventDefault();
        //         return false;
        //     }
        // }

    }
    enter = () => {
        this.props.history.push('/')
    }

    SQLChecked = () => {
        this.props.Loading()
        let valueList = {}
        let SQL = ''
        this.props.data.map(e => {
            if (e.type !== 'Table' && e.type !== 'Group') {
                if (e.type === 'LookUp') {
                    valueList[e.upKey] = e.values[e.upKey]
                } else if (e.type === 'Input' && e.typePoint === 0) {
                    valueList[e.id] = e.defaultValue
                } else if (e.type === 'Input' && e.typePoint !== 0) {
                    valueList[e.typePoint] = e.defaultValue
                } else {
                    valueList[e.id] = e.defaultValue
                }
            } else if (e.type === 'Table') {
                SQL = e.SQL
            }
        })
        let post = new Promise((resolve, reject) => {
            let body = {
                "Sql": SQL,
                "Param": JSON.stringify(valueList),
                "PageIndex": 1,
                "PageSize": 200,
                isPage: true
            }
            POST$(API('SQL').http, body, (res) => {
                console.log(res);
                if (res.Results) {
                    this.props._tableUpdataFromResults(res.Results, res.RecordCount)
                    resolve(true)
                } else {
                    reject(false)
                }

            })
        })
        let time = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(false)
            }, 10000);
        })

        Promise.race([post, time])
            .then((result) => {
                this.props.Loading()
            })
            .catch((err) => {
                message.error('获取数据超时')
            })
    }
    guanbi = () => {
        this.props.clear()
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
                        <Button onClick={this.SQLChecked.bind(this)}><Icon type="security-scan" theme="outlined" />查询</Button>
                        <Button ><Icon type="copyright" theme="outlined" />清空</Button>
                        <Button onClick={this.guanbi.bind(this)}><Icon type="export" theme="outlined" />关闭</Button>
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
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        data: state.UpdataFormData
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        clear: () => {
            dispatch(_clear())
        },
        _tableUpdataFromResults: (k, totalPage) => {
            dispatch(_tableUpdataFromResults(k, totalPage))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(withRouter(Headercomponent));

const Child = (props) => {
    return (
        <Tag color='blue' style={{ float: 'left', marginTop: '5px' }}>
            {props.user.scope}
        </Tag>
    )
}