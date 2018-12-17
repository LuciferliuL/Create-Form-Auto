import React, { Component } from 'react';
import { Tree, message, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { fugai, tableFugai } from '../stylist/action/Stylist.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { changeActiveKey } from '../Information/information.action'
import { API } from '../../lib/API/check.API'
import { POST$, treeData } from '../../lib/MATH/math'
import { withRouter } from 'react-router-dom'
import { addTabs, delTabs, addTable, delTable } from './User.action'
import SubMenu from 'antd/lib/menu/SubMenu';

class TreeUser extends Component {
    state = {
        treeData: [],
        expandedKeys: []
    }
    componentDidMount() {
        POST$(API('POSTDATA').http, {}, (res) => {
            if (res.length > 0) {
                res.forEach((e) => {
                    treeData(e)
                })
                this.setState({
                    treeData: res
                })
            }
        })
    }

    menuClick = (record, e) => {
        console.log(record);
        if (!record.IsCategory) {
            let data = JSON.parse(record.Bytes)
            data.FormData.forEach(e => {
                e.isUserMove = false
            })
            let name = record.Name
            const { TabsData } = this.props

            let F = TabsData.find(e => e.Name === name)
            // console.log(F);
            //console.log(data.TableData);

            if (F === undefined) {
                this.props.addTabs({ Source: data, Name: name });
                this.props.upData(data.FormData);
                data.TableData.length ? this.props.tableFugai(data.TableData) : this.props.tableFugai([data.TableData]);
                this.props.dataChange({ Source: data, Name: name });

            } else {
                //console.log(2);

                this.props.upData(data.FormData);
                data.TableData.length ? this.props.tableFugai(data.TableData) : this.props.tableFugai([data.TableData]);
                //this.props.dataChange({ Source: data, Name: name });
            }

            this.props.changeActiveKey(name);
        }
    }

    //递归插入menu
    menu = (data, list = []) => {
        data.forEach(data => {
            if (data.children && data.children.length > 0) {
                list.push(
                    <SubMenu key={Math.random()} title={<span>{data.Name}</span>}>
                        {this.menu(data.children)}
                    </SubMenu>
                )
            } else {
                list.push(<Menu.Item key={Math.random()} onClick={this.menuClick.bind(this, data)}>{data.Name}</Menu.Item>)
            }

        })
        return list
    }
    render() {
        const { treeData } = this.state
        let M = []
        treeData.forEach((e, index) => {
            M.push(
                <SubMenu key={index + 'submenu'} title={<span>{e.Name}</span>}>
                    {this.menu(e.children)}
                </SubMenu>
            )
        })

        return (
            treeData.length > 0 ?

                <Menu
                    defaultOpenKeys={['0submenu']}
                    mode="inline"
                    theme="dark">
                    {M}
                </Menu>
                : null
        );
    }
}
function mapStateToProps(State) {
    // console.log(State);

    return {
        TabsData: State.TabsData,
        tableSource: State.tableSource,
        activeKey: State.activeKey
    };
}
const mapDispatchProps = (dispatch) => {
    return {
        upData: (k) => {
            dispatch(fugai(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
        tableFugai: (k) => {
            dispatch(tableFugai(k))
        },
        addTabs: (value) => {
            dispatch(addTabs(value))
        },
        delTabs: (key) => {
            dispatch(delTabs(key))
        },
        addTable: (value) => {
            dispatch(addTable(value))
        },
        delTable: (key) => {
            dispatch(delTable(key))
        },
        changeActiveKey: (k) => {
            dispatch(changeActiveKey(k))
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(withRouter(TreeUser));