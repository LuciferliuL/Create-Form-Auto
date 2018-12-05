import React, { Component } from 'react';
import { Tree, message, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { fugai, tableFugai } from '../stylist/action/Stylist.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
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

    onSelect = (keys, record) => {
        // console.log(record);

        if (!record.node.props.IsCategory) {
            let data = JSON.parse(record.node.props.Bytes)
            data.FormData.forEach(e => {
                e.isUserMove = false
            })
            let name = record.node.props.Name
            const { TabsData } = this.props
            // console.log(data.TableData);
            
            let F = TabsData.find(e => e.Name === name)
            // console.log(F);
            if (F === undefined) {
                this.props.addTabs({ Source: data, Name: name })
                this.props.upData(data.FormData)
                // this.props.addTable(data.TableData)
                this.props.tableFugai(data.TableData)
                this.props.dataChange({ Source: data, Name: name })
            } else {
                //message.warn('已经选择了一个同样的表格')
                //this.props.dataChange({ Source: data, Name: name });
            }
        }
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
            console.log(data.TableData);
            
            if (F === undefined) {
                this.props.addTabs({ Source: data, Name: name })
                this.props.upData(data.FormData)
                // this.props.addTable(data.TableData)
                console.log();
                data.TableData.length ? this.props.tableFugai(data.TableData) : this.props.tableFugai([data.TableData])

                
                this.props.dataChange({ Source: data, Name: name })
            } else {
                //message.warn('已经选择了一个同样的表格')
                this.props.dataChange({ Source: data, Name: name });
            }
        }
    }
    //递归插入menu
    menu = (data, list = []) => {
        // console.log(data.children);
        data.forEach(data => {
            if (data.children && data.children.length > 0) {
                list.push(
                    <SubMenu key={Math.random()} title={<span>{data.Name}</span>}>
                        {this.menu(data.children)}
                    </SubMenu>
                )
            } else {
                // console.log(data);
                list.push(<Menu.Item key={Math.random()} onClick={this.menuClick.bind(this, data)}>{data.Name}</Menu.Item>)
            }

        })
        return list
    }
    render() {
        const { treeData } = this.state
        // console.log(treeData);
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
                // <Tree
                //     style={{ width: 300, color: 'white' }}
                //     treeData={treeData}
                //     onSelect={this.onSelect}
                // />
                <Menu
                    mode="inline"
                    theme="dark">
                    {M}
                </Menu>



                : null
        );
    }
}
function mapStateToProps(State) {
    console.log(State);

    return {
        TabsData: State.TabsData,
        tableSource:State.tableSource
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
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(withRouter(TreeUser));