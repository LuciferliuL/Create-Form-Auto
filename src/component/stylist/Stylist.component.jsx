import React, { Component } from 'react';
import { Row, Col, Card, Icon, Popconfirm, Form } from 'antd'
import { connect } from 'react-redux'
import { stylistDataSourceGet, formSourceData, currentAttr, formSourceDataUpdata, formSourceDataDelete } from './action/Stylist.action'
import './Stylist.css'
import PublicComponent from '../PublicComponent/Public.Component'
import SliderCard from '../SliderCard/SliderCard'
import SliderRightcomponent from '../SliderRIght/SliderRight.component'
import { Dragact } from 'dragact'

const getblockStyle = isDragging => {

    return {
        background: isDragging ? '#1890ff' : 'white'
    }
}

class Stylistcomponent extends Component {
    allowDrop = (ev) => {
        ev.preventDefault()
    }
    drop = (ev) => {
        ev.preventDefault();
        // console.log(ev);

        var data = ev.dataTransfer.getData("ID");
        console.log(this.props.currentTagsUpdata);
        if (data === this.props.currentTagsUpdata.id) {

            this.props.FormData(this.props.currentTagsUpdata)

        }
    }
    confirm = (e) => {
        // console.log(this.dragact.getLayout());
        this.props.FormDataUpata(this.dragact.getLayout())
        this.props.rightUpdata(e)

    }
    cancel = (e) => {
        console.log(e);
        this.props.FormDataDelete(e)
    }
    //固定位置
    time = () => {
        this.props.FormDataUpata(this.dragact.getLayout())
    }
    render() {
        // console.log(this.state.dataSource);
        return (
            <div>
                <Row gutter={1}>
                    <Col span={5}>
                        <SliderCard></SliderCard>
                    </Col>
                    <Col span={14}>
                        <Card>
                            <Form
                                onDragOver={this.allowDrop.bind(this)}
                                onDrop={this.drop.bind(this)}
                                style={{ width: '100%', minHeight: '400px', padding: '5px' }}>
                                <Dragact
                                    ref={(n) => { this.dragact = n }}
                                    layout={this.props.UpdataFormData} //必填项
                                    col={24} //必填项
                                    width={800} //必填项
                                    rowHeight={40} //必填项
                                    margin={[5, 5]} //必填项
                                    className="plant-layout" //必填项
                                    style={{ border: '1px dashed black',minHeight:'300px' }} //非必填项
                                    placeholder={true}
                                    onDragEnd={this.time.bind(this)}
                                >
                                    {(item, provided) => {
                                        // console.log(item);
                                        return (
                                            <div
                                                {...provided.props}
                                                {...provided.dragHandle}
                                                style={{
                                                    ...provided.props.style,
                                                    ...getblockStyle(provided.isDragging),
                                                    padding: '5px',
                                                    border: '1px dashed black'
                                                }}
                                            >
                                                <Popconfirm title="你要干什么？"
                                                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                                    okText="编辑" cancelText="删除"
                                                    onConfirm={this.confirm.bind(this, item)}
                                                    onCancel={this.cancel.bind(this, item)}>
                                                    <Icon
                                                        className="Delete"
                                                        type="minus-square"
                                                        theme="filled" />
                                                </Popconfirm>
                                                <PublicComponent PublicData={item} />
                                            </div>
                                        )
                                    }}
                                </Dragact>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <SliderRightcomponent currentAttr={this.props.currentAttr}></SliderRightcomponent>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (State) => {
    console.log(State);

    return {
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        updateData: (k) => {
            dispatch(stylistDataSourceGet(k))
        },
        FormData: (k) => {
            dispatch(formSourceData(k))
        },
        FormDataUpata: (k) => {
            dispatch(formSourceDataUpdata(k))
        },
        rightUpdata: (k) => {
            dispatch(currentAttr(k))
        },
        FormDataDelete: (k) => {
            dispatch(formSourceDataDelete(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Stylistcomponent);