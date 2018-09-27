import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Button, Tag, Icon,message } from "antd";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { API } from '../../lib/API/check.API'
import { POST$ } from '../../lib/MATH/math'
import {_clear, _tableUpdataFromResults} from '../stylist/action/Stylist.action'

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
            }else if(e.type === 'Table'){
                SQL = e.SQL
            }
        })

        console.log(valueList);
        let body = {
            "Sql": SQL,
            "Param": JSON.stringify(valueList),
            "PageIndex": 1,
            "PageSize": 100,
            isPage: false
        }
        POST$(API('SQL').http, body, (res) => {
            console.log(res);
            this.props.Loading()
            if(res.Results){
                this.props._tableUpdataFromResults(res.Results)
            }else{
                message.error('没有数据返回')
            }
            
        })

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
                        <Button onClick={()=>{this.props.clear()}}><Icon type="export" theme="outlined" />关闭</Button>
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
    console.log(state);
    return {
        data: state.UpdataFormData
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        clear:()=>{
            dispatch(_clear())
        },
        _tableUpdataFromResults:(k)=>{
            dispatch(_tableUpdataFromResults(k))
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