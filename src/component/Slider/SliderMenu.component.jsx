import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectkeysToHeader } from './action/Header.action'
const SubMenu = Menu.SubMenu;

class SliderMenucomponent extends Component {
    //选中得回调
    onSelect = (item) => {
        // console.log(item)
        this.props.onTodoClick(item.selectedKeys)
    }
    render() {
        const menudata = []
        sliderData.forEach(e => {
            if (e.children.length > 0) {
                let datas = []
                e.children.forEach(value => {
                    datas.push(
                        <Menu.Item key={value.key}>
                            <Link to='/Design/er'>
                                <Icon type={value.type}></Icon>
                                <span>{value.key}</span>
                            </Link>
                        </Menu.Item>)
                })
                menudata.push(
                    <SubMenu
                        key={e.key}
                        title={<span><Icon type={e.type} /><span>{e.key}</span></span>}
                    >
                        {datas}
                    </SubMenu>
                )
            } else {
                menudata.push(
                    <Menu.Item key={e.key}>
                        <Link to={e.link}>
                            <Icon type={e.type}></Icon>
                            <span>{e.key}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })

        return (
            <Menu
                forceSubMenuRender={true}
                selectedKeys={this.props.selectedKeys}
                theme="dark"
                defaultSelectedKeys={this.props.selectedKeys}
                mode="inline"
                onSelect={this.onSelect}>
                {menudata}
            </Menu>
        );
    }
}

function mapStateToProps(state){
    // console.log(state);
    
    return{
        selectedKeys: state.Slider.selectedKeys
    }
}
function mapDispatchProps(dispatch){  
    return {
        onTodoClick: (k)=>{
            dispatch(selectkeysToHeader(k))
        }
    }
}
export default connect(mapStateToProps,mapDispatchProps)(SliderMenucomponent);

const sliderData = [
    {
        key: '表单总览',
        type: 'pie-chart',
        children: [],
        link: '/Design/er'
    }, {
        key: '表单设计',
        type: 'desktop',
        children: [],
        link: '/Design/Stylist'
    }, {
        key: '表单预览',
        type: 'code',
        children: [],
        link: '/Design/ReadForm'
    }, {
        key: 'file',
        type: 'file',
        children: [],
        link: '/Design/er'
    }
]