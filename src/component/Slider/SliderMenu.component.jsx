import React, { Component } from 'react';
import { Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;

class SliderMenucomponent extends Component {
    //选中得回调
    onSelect = (item,keys,selectedKeys) => {
        console.log(item)
    }
    render() {
        const menudata = []
        sliderData.forEach(e => {
            if (e.children.length > 0) {
                let datas = []
                e.children.forEach(value => {
                    datas.push(
                        <Menu.Item key={value.key}>
                            <Icon type={value.type}></Icon>
                            <span>{value.key}</span>
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
                        <Icon type={e.type}></Icon>
                        <span>{e.key}</span>
                    </Menu.Item>
                )
            }
        })
        
        return (
            <Menu theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline"
            onSelect={this.onSelect}>
               {menudata}
            </Menu>
        );
    }
}

export default SliderMenucomponent;

const sliderData = [
    {
        key: 'user',
        type: 'pie-chart',
        children: []
    }, {
        key: 'desktop',
        type: 'desktop',
        children: [
            {
                key: 'desktop1',
                type: 'desktop'
            },
            {
                key: 'desktop2',
                type: 'desktop'
            }
        ]
    }, {
        key: 'team',
        type: 'team',
        children: [
            {
                key: 'desktop3',
                type: 'desktop'
            },
            {
                key: 'desktop4',
                type: 'desktop'
            }
        ]
    }, {
        key: 'file',
        type: 'file',
        children: []
    }
]