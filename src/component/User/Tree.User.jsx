import React, { Component } from 'react';
import { Tree, message } from 'antd';
import { connect } from 'react-redux';
import { fugai, tableFugai } from '../stylist/action/Stylist.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { API } from '../../lib/API/check.API'
import { POST$, treeData } from '../../lib/MATH/math'
import { withRouter } from 'react-router-dom'
import { addTabs, delTabs, addTable, delTable } from './User.action'

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
            
            let F = TabsData.find(e => e.Name === name)
            // console.log(F);
            if(F === undefined){
                this.props.addTabs({ Source: data, Name: name })
                this.props.upData(data.FormData)
                // this.props.addTable(data.TableData)
                this.props.tableFugai(data.TableData)
                this.props.dataChange({ Source: data, Name: name })
            }else{
                message.warn('已经选择了一个同样的表格')
            }
        }
    }
    render() {
        const { treeData } = this.state

        return (
            treeData.length > 0 ?
                <Tree
                    style={{ width: 300, color: 'white' }}
                    treeData={treeData}
                    onSelect={this.onSelect}
                />
                : null
        );
    }
}
function mapStateToProps(State) {
    // console.log(State);

    return {
        TabsData: State.TabsData
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