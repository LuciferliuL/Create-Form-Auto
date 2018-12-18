import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectkeysToHeader } from './action/Header.action'
import { stylistDataSourceAsync, fugai, tableReset } from '../stylist/action/Stylist.action'
const SubMenu = Menu.SubMenu;

class SliderMenucomponent extends Component {
    onSelect = (item) => {
        sessionStorage.setItem('C', 'N')
        this.props.fugai([])
        this.props.update({})
        this.props.tableReset()
        this.props.onTodoClick(item.selectedKeys);
    }

    componentDidMount() {
        console.log(this.props.history);
    }

    render() {

        const { history } = this.props;
        let _path = history.location.pathname;

        const menudata = []
        sliderData.forEach(e => {
            if (e.children.length > 0) {
                let datas = []
                e.children.forEach(value => {
                    if (_path === value.link) {
                        this.props.onTodoClick(value.key);
                    }

                    datas.push(
                        <Menu.Item key={value.key}>
                            <Link to={value.link}>
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
                if (_path === e.link) {
                    this.props.onTodoClick(e.key);
                }

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
                // selectedKeys={this.props.selectedKeys}
                theme="dark"
                // defaultSelectedKeys={this.props.selectedKeys}
                mode="inline"
                onSelect={this.onSelect}>
                {menudata}
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedKeys: state.Slider.selectedKeys
    }
}

function mapDispatchProps(dispatch) {
    return {
        onTodoClick: (k) => {
            dispatch(selectkeysToHeader(k))
        },
        update: (k) => {
            dispatch(stylistDataSourceAsync(k))
        },
        fugai: (k) => {
            dispatch(fugai(k))
        },
        tableReset: () => {
            dispatch(tableReset())
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(withRouter(SliderMenucomponent));
const sliderData = [
    {
        key: '网页方案',
        type: 'windows',
        children: [
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
                key: '表单权限',
                type: 'lock',
                children: [],
                link: '/Design/Arch'
            }, {
                key: '检索方案',
                type: 'question-circle',
                children: [],
                link: '/Design/LookUpSelf'
            }
        ],
        link: '/Design/er'
    }, {
        key: '移动方案',
        type: 'apple',
        children: [{
            key: '移动总览',
            type: 'book',
            children: [],
            link: '/Design/Iphoneer'
        }, {
            key: '移动设计',
            type: 'question-circle',
            children: [],
            link: '/Design/Iphone'
        }, {
            key: '移动权限',
            type: 'lock',
            children: [],
            link: '/Design/IphoneArch'
        }],
        link: '/Design/Iphone'
    }
]