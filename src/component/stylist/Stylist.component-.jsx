import React, { Component } from 'react';
import { Row, Col, Card, Icon, Popconfirm, Form } from 'antd'
import { DraggableAreasGroup } from 'react-draggable-tags';
import { connect } from 'react-redux'
import { stylistDataSourceGet } from './action/Stylist.action'
import './Stylist.css'
import PublicComponent from '../PublicComponent/Public.Component'
import SliderCard from '../SliderCard/SliderCard'
import SliderRightcomponent from '../SliderRIght/SliderRight.component'

const group = new DraggableAreasGroup()
const DraggableArea = group.addArea()
class Stylistcomponent extends Component {
    state = {
        initialTags: {}
    }
    componentDidMount() {
    }

    // handleAdd = (e) => {
    //     console.log(e);

    //     this.addTag(e)
    // }
    // confirm = (tag) => {
    //     console.log(tag);
    //     this.setState({
    //         initialTags: tag
    //     })
    //     // const initialTags = this.state.initialTags.filter(t => tag.id !== t.id);
    //     // this.setState({ initialTags: initialTags })
    // }
    allowDrop = (ev) => {
        ev.preventDefault()
    }
    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
    }
    render() {
        // console.log(this.state.dataSource);

        return (
            <div>
                <Row gutter={1}>
                    <Col span={6}>
                        <SliderCard handleAdd={this.handleAdd.bind(this)}></SliderCard>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Form 
                            onDragOver={this.allowDrop.bind(this)} 
                            onDrop={this.drop.bind(this)}>
                                {/* <div className="Simple">
                                    <DraggableArea
                                        initialTags={this.props.InitStylistData}
                                        render={({ tag, deleteThis }) => (

                                            <div className="tag"
                                                // onClick={this.confirm.bind(this, tag)}  需要点击标签获取数据即可放出来
                                                style={{ width: '100%' }}>
                                                <Popconfirm title="你要干什么？"
                                                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                                    onConfirm={this.confirm.bind(this, tag)} onCancel={deleteThis} okText="编辑" cancelText="删除">
                                                    <Icon
                                                        className="Delete"
                                                        type="minus-square"
                                                        theme="filled" />
                                                </Popconfirm>
                                                {
                                                    tag.content ? <PublicComponent PublicData={tag} TYPE='DEV' /> : tag.name
                                                }
                                            </div>

                                        )}
                                        getAddTagFunc={addTag => this.addTag = addTag}
                                        onChange={(tags) => { }}
                                    />
                                </div> */}
                            </Form>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <SliderRightcomponent initialTags={this.state.initialTags}></SliderRightcomponent>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (State) => {
    console.log(State);

    return {
        InitStylistData: State.InitStylistData.InitStylistData
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        updateData: (k) => {
            dispatch(stylistDataSourceGet(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Stylistcomponent);