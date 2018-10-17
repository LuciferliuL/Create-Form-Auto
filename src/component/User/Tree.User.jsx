import React, { Component } from 'react';
import { Tree } from 'antd';
import { connect } from 'react-redux';
import { fugai, tableFugai } from '../stylist/action/Stylist.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { API } from '../../lib/API/check.API'
import { POST$, treeData } from '../../lib/MATH/math'


class TreeUser extends Component {
    state = {
        treeData: [],
        expandedKeys: []
    }
    componentDidMount() {
        POST$(API('POSTDATA').http, {}, (res) => {
            // console.log(res);
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
        // console.log(record.node.props.children.length);
        if (record.node.props.children.length === 0) {
            let data = JSON.parse(record.node.props.Bytes)

            data.FormData.forEach(e => {
                e.isUserMove = false
            })
            // console.log(data);
            this.props.upData(data.FormData)
            this.props.tableFugai(data.TableData)
        }

    }
    render() {
        const { treeData} = this.state

        return (
            treeData.length > 0 ?
                <Tree
                    style={{ width: 300, color: 'white' }}
                    // value={this.state.value}
                    treeData={treeData}
                    placeholder="Please select"
                    // expandedKeys={expandedKeys}
                    // treeDefaultExpandAll
                    onSelect={this.onSelect}
                />
                : 'loading tree'
        );
    }
}
function mapStateToProps(State) {
    return {
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr
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
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(TreeUser);