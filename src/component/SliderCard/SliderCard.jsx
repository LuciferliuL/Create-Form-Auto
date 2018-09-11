import React, { Component } from 'react';
import { Card, Icon } from 'antd'
import { connect } from 'react-redux'
import { currentTagsUpdata } from './action/SliderCard.action.js'

const CardGrid = Card.Grid
const gridStyle = {
    width: '50%',
    textAlign: 'center',
};
const pointer = {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none'
}
class SliderCard extends Component {
    drag = (obj, ev) => {
        let ADD_TAG = JSON.parse(JSON.stringify(obj))
        ADD_TAG.id = (Math.random() * 1000).toFixed(2)
        ADD_TAG.key = (Math.random() * 1000).toFixed(2)
        if (ADD_TAG.groupname) {
            ADD_TAG.groupname = (Math.random() * 1000).toFixed(2)
        }
        // console.log(this.props.UpdataFormData);
        let y = 0
        this.props.UpdataFormData.map(e => e.GridY > y || e.GridY === y ? y = e.GridY : y)
        ADD_TAG.GridY = y
        // console.log(y);
        ev.dataTransfer.setData("ID", ADD_TAG.id)
        //需要移动的目标数据
        // console.log(ADD_TAG);
        
        this.props.Updata(ADD_TAG)

    }
    render() {
        const c = []
        this.props.SliderCardData.forEach(e => {
            c.push(
                <CardGrid style={gridStyle} key={e.icons} draggable="true" onDragStart={this.drag.bind(this, e)}>
                    <Icon type={e.icons} theme="outlined" />
                    <span style={pointer}>{e.label}</span>
                </CardGrid>)
        })
        return (
            <Card title="Card Title">
                {c}
            </Card>
        )
    }
}

const mapStateToProps = (State) => {
    return {
        SliderCardData: State.SliderCardData, 
        UpdataFormData:State.UpdataFormData
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        Updata: (k) => {
            dispatch(currentTagsUpdata(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(SliderCard);