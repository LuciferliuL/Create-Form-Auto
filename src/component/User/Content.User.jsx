import React, { Component } from 'react';
import { Card, Form } from 'antd'
import { connect } from 'react-redux';
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import PublicComponent from '../PublicComponent/Public.Component'
import { fugai } from '../stylist/action/Stylist.action'
import TABLECOMPONENT from '../PublicComponent/table/Table'

function mapStateToProps(State) {
    return {
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr,
        tableSource: State.tableSource
    };
}
class ContentUser extends Component {
    state = {
        data: [],
        domWidth: 0,
        totalpage: 0,
        flag: true
    }
    myRef = React.createRef()
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 64
        this.setState({
            domWidth: dom
        })
    }
    componentDidMount() {
        setTimeout(() => {
            this.changeWidth()
        }, 50);
    }

    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
        let Dr = []
        let width_ = this.state.domWidth / 24
        let height_ = 40
        let tableOffsetHeight = 40
        let hflag = 0
        this.props.UpdataFormData.forEach(e => {
            let width = e.w * width_
                , height = e.h * height_
                , PositionTop = e.GridY * height_
                , PositionLeft = e.GridX * width_
            if (e.GridY > hflag) {
                tableOffsetHeight += 40
                hflag = e.GridY
            }

            Dr.push(
                <div key={e.key}
                    style={{ position: "absolute", top: PositionTop, left: PositionLeft, width: width, height: height }}>
                    <PublicComponent PublicData={e} Read={'R'} page={this.state.totalpage} />
                </div>
            )
        })
        // console.log(tableOffsetHeight);
        if(this.props.UpdataFormData.length > 0){ 
        return (
            <Card
                ref={this.myRef}
                style={{ minHeight: h + 'px' }}>
                <Form
                    style={{ padding: '5px', position: 'relative' }}>{Dr}</Form>
                <div style={{ position: 'relative', top: tableOffsetHeight + 'px', height: (h - tableOffsetHeight) * 0.85 + 'px' }}>
                    <TABLECOMPONENT PublicData={this.props.tableSource}  heights={(h - tableOffsetHeight) * 0.85}>
                    </TABLECOMPONENT>
                </div>
            </Card>
        )}else{
            return (
                <Card
                ref={this.myRef}
                style={{ minHeight: h + 'px' }}>
                    {'loading'}
                </Card>
            )
        }
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        upData: (k) => {
            dispatch(fugai(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(Form.create({
    mapPropsToFields(props) {
        // console.log(props);
    }
})(ContentUser));