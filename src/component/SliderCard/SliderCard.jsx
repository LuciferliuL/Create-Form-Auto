import React, { Component } from 'react';
import { Card, Icon, Tabs } from 'antd'
import { connect } from 'react-redux'
import { currentTagsUpdata } from './action/SliderCard.action.js'
import { LookUpApi } from '../../lib/API/lookUpList'
import { GET$, POST$ } from '../../lib/MATH/math'


const TabPane = Tabs.TabPane
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
    state = {
        tableDataSource: []
    }
    componentDidMount() {
        GET$(LookUpApi('LookUpList').http, (res) => {
            console.log(res);
            this.setState({
                tableDataSource: res,
            })
        })
    }
    drag = (obj, ev) => {
        let ADD_TAG = JSON.parse(JSON.stringify(obj))
        ADD_TAG.id = (Math.random() * 1000).toFixed(2)
        ADD_TAG.key = (Math.random() * 1000).toFixed(2)
        if (ADD_TAG.groupname) {
            ADD_TAG.groupname = (Math.random() * 1000).toFixed(2)
        }
        // console.log(this.props.UpdataFormData);
        let y = 0
        // let X = 0
        this.props.UpdataFormData.map(e => e.GridY > y || e.GridY === y ? y = e.GridY + 2 : y)
        // this.props.UpdataFormData.map(e => e.GridX > X || e.GridX === X ? X = e.GridX + 2: X)
        ADD_TAG.GridY = y
        // ADD_TAG.GridX = X
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
        const s = []
        this.props.SQLDATA.forEach(e => {
            s.push(
                <CardGrid style={gridStyle} key={e.icons} draggable="true" onDragStart={this.drag.bind(this, e)}>
                    <Icon type={e.icons} theme="outlined" />
                    <span style={pointer}>{e.label}</span>
                </CardGrid>
            )
        })
        const z = []
        if (this.state.tableDataSource.length > 0) {
            this.state.tableDataSource.forEach(e => {
                let cardDatas = JSON.parse(e.Bytes)
                // console.log(cardDatas);
                
                z.push(
                    <CardGrid style={gridStyle} key={cardDatas.icons} draggable="true" onDragStart={this.drag.bind(this, cardDatas)}>
                        <Icon type={cardDatas.icons} theme="outlined" />
                        <span style={pointer}>{cardDatas.label}</span>
                    </CardGrid>
                )
            })
        }

        return (
            <Card>
                <Tabs defaultActiveKey='1'>
                    <TabPane tab='基础组件' key='1'>
                        <Card>
                            {c}
                        </Card>
                    </TabPane>
                    <TabPane tab='SQL组件' key='2'>
                        <Card>
                            {s}
                        </Card>
                    </TabPane>
                    <TabPane tab="自定义检索" key='3'>
                        <Card>
                            {z}
                        </Card>
                    </TabPane>
                </Tabs>
            </Card>

        )
    }
}

const mapStateToProps = (State) => {
    return {
        SliderCardData: State.SliderCardData,
        UpdataFormData: State.UpdataFormData,
        SQLDATA: State.SQL_Data
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