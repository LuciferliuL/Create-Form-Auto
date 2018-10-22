import React, { Component } from 'react';
import { Card, Form } from 'antd'
import { connect } from 'react-redux';
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import PublicComponent from '../PublicComponent/Public.Component'
import { fugai } from '../stylist/action/Stylist.action'
import TABLECOMPONENT from '../PublicComponent/table/Table'

function mapStateToProps(State) {
    // console.log(State);
    
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
        console.log(this.myRef);
        
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
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.9
        let Dr = []
        let width_ = this.state.domWidth / 24
        let height_ = 40
        let hflag = 0
        this.props.UpdataFormData.forEach(e => {
            let width = e.w * width_
                , height = e.h * height_
                , PositionTop = e.GridY * height_
                , PositionLeft = e.GridX * width_
            if (PositionTop > hflag) {
                hflag = PositionTop
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
                style={{ minHeight: h + 'px',borderTop:'none'}}
                bodyStyle={{padding:10}}
                
                >
                <Form
                    style={{ padding: '5px', position: 'relative' }}>{Dr}</Form>
                <div style={{ position: 'relative', top:  (hflag + 40)+'px', height: (h - hflag) * 0.8 + 'px' }}>
                    <TABLECOMPONENT PublicData={this.props.tableSource}  heights={(h - hflag) * 0.8}>
                    </TABLECOMPONENT>
                </div>
            </Card>
        )}else{
            return (
                <Card
                ref={this.myRef}
                style={{ minHeight: h + 'px' ,borderTop:'none'}}>
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