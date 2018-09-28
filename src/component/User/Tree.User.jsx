import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { fugai } from '../stylist/action/Stylist.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { API } from '../../lib/API/check.API'
import { GET$ } from '../../lib/MATH/math'

const { SubMenu } = Menu
class TreeUser extends Component {
    state = {
        treeList: []
    }
    componentDidMount() {
        GET$(API('CheckFormList').http, (res) => {
            console.log(res);
            this.setState({
                treeList: res
            })
        })

    }

    onSelect = (Item) => {
        console.log(Item);

        let data = JSON.parse(this.state.treeList.find(e => e.PK === Number(Item.key)).Bytes)
        data.forEach(e => {
            e.isUserMove = false
        })
        console.log(data);
        this.props.upData(data)

    }
    render() {
        const { treeList } = this.state
        let TreeNodes = []
        treeList.forEach((e, i) => {
            TreeNodes.push(
                <Menu.Item key={e.PK}>
                    <span>{e.Name}</span>
                </Menu.Item>
            )
        })

        return (
            treeList.length > 0 ?
                <Menu theme="dark" mode="inline" onSelect={this.onSelect}>
                    <SubMenu title='菜单'>
                        {TreeNodes}
                    </SubMenu>
                </Menu>
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
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(TreeUser);