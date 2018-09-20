import React, { Component } from 'react';
import { Tree, Menu } from 'antd';
import { connect } from 'react-redux';
import { fugai } from '../stylist/action/Stylist.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'


const { SubMenu } = Menu
class TreeUser extends Component {
    state = {
        treeList: []
    }
    componentDidMount() {
        let keys = []
        for (var k in localStorage) {
            keys.push(k)
        }
        this.setState({
            treeList: keys
        })
    }

    onSelect = (Item) => {

        let data = JSON.parse(localStorage.getItem(Item.key))
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
                <Menu.Item key={e}>
                    <span>{e}</span>
                </Menu.Item>
            )
        })

        return (
            treeList.length ?
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