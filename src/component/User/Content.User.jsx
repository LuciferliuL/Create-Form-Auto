import React, { Component } from 'react';
import { Card, Form, Button } from 'antd'
import { connect } from 'react-redux';
import { trAddDown, trReduceUp, shows, updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import PublicComponent from '../PublicComponent/Public.Component'
import { fugai } from '../stylist/action/Stylist.action'


function mapStateToProps(State) {
    return {
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr
    };
}
class ContentUser extends Component {
    state = {
        data: [],
        domWidth: 0,
        page: 1,
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
    handleKeyDown = (e) => {
        const { dataSource, columns } = this.props.currentAttr
        switch (e.keyCode) {
            case 40://下
                if (this.props.currentAttr.tr < dataSource.length - 1) {
                    this.props.trAddDown(this.props.currentAttr.tr, 1)
                }
                break;
            case 38://上
                if (this.props.currentAttr.tr > 0) {
                    this.props.trReduceUp(this.props.currentAttr.tr, 1)
                }
                break;
            case 37:
                if (this.state.page > 1) {
                    this.props.trReduceUp(this.props.currentAttr.tr, 10)
                    this.setState((pre) => (
                        {
                            page: pre.page - 1
                        }
                    ))
                }
                break
            case 39:
                this.props.trAddDown(this.props.currentAttr.tr, 10)
                this.setState((pre) => (
                    {
                        page: pre.page + 1
                    }
                ))
                break
            case 13:
                this.props.shows(this.props.currentAttr)
                this.CLick()
                break
        }
    }
    CLick = () => {
        const { dataSource } = this.props.currentAttr
        if (dataSource !== []) {
            console.log(this.props.currentAttr.tr);
            let dataSource_ = JSON.parse(JSON.stringify(dataSource[this.props.currentAttr.tr]))
            //更新lookup对应得input
            this.props.updataValues(dataSource_)

            window.removeEventListener('keyup', this.handleKeyDown)


            let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.currentAttr.id)
            agg.forEach(e => {
                e.defaultValue = dataSource_.type
            })
            console.log(agg);
            //更新整个form
            this.props.upForm(this.props.currentAttr)

        }
    }
    PositionHTML = (key) => {
        // console.log(key);
        if (key === 'LookUp') {
            window.addEventListener('keyup', this.handleKeyDown)
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        let Dr = []
        let width_ = this.state.domWidth / 24
        let height_ = 40
        this.props.UpdataFormData.forEach(e => {
            let width = e.w * width_
                , height = e.h * height_
                , PositionTop = e.GridY * height_
                , PositionLeft = e.GridX * width_
            Dr.push(
                <div key={e.key}
                    style={{ position: "absolute", top: PositionTop, left: PositionLeft, width: width, height: height }}
                    onClick={this.PositionHTML.bind(this, e.type)}>
                    <PublicComponent PublicData={e} Read={'R'} page={this.state.page} />
                </div>
            )
        })
        return (
            <Card
                ref={this.myRef}
                style={{ minHeight: '720px' }}>
                <Form
                    onSubmit={this.handleSubmit}
                    style={{ minHeight: '400px', padding: '5px', position: 'relative' }}>
                    {this.props.UpdataFormData.length < 1 ? 'loading'
                        : Dr}
                    <Button htmlType="submit">123</Button>
                </Form>
            </Card>
        );
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        upData: (k) => {
            dispatch(fugai(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        },
        trAddDown: (k, i) => {
            dispatch(trAddDown(k, i))
        },
        trReduceUp: (k, i) => {
            dispatch(trReduceUp(k, i))
        },
        shows: (k) => {
            dispatch(shows(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(Form.create({
    mapPropsToFields(props){
        console.log(props);
        
    }
})(ContentUser));