import React, { Component } from 'react';
import { Row, Col, Card, Button, Icon, Input, Popconfirm, Form } from 'antd'
import { DraggableAreasGroup } from 'react-draggable-tags';
import { connect } from 'react-redux'
import { stylistDataSourceGet } from './action/Stylist.action'
import './Stylist.css'
import Tagcomponent from './Tag/Tag.component'
import PublicComponent from '../PublicComponent/Public.Component'

const group = new DraggableAreasGroup()
const DraggableArea = group.addArea()
class Stylistcomponent extends Component {
    state = {
        initialTags: [
            { id: 1, name: 'apple' }, { id: 2, name: 'watermelon' }, { id: 3, name: 'banana' },
            { id: 4, name: 'lemon' }, { id: 5, name: 'orange' }, { id: 6, name: 'grape' },
            { id: 8, type: 'INPUT', required: true, message: "123", attr: "11", label: "输入框", defaultValue: "", disabled: false, content: <PublicComponent /> }, { id: 9, name: 'peach' }]
    }
    handleAdd = () => {
        this.addTag({ id: 111, name: '22231awea' })
    }
    confirm = (tag) => {
        console.log(tag);

        // const initialTags = this.state.initialTags.filter(t => tag.id !== t.id);
        // this.setState({ initialTags: initialTags })
    }
    render() {
        // console.log(this.state.dataSource);

        return (
            <div>
                <Row gutter={1}>
                    <Col span={6}>
                        <Card>
                            <Button onClick={this.handleAdd}>添加</Button>
                        </Card>
                    </Col>
                    <Col span={14}>
                        <Card bodystyle={{ padding: '5px', minwidth: '500px' }}>
                            <Form>
                                <div className="Simple">
                                    <DraggableArea

                                        initialTags={this.state.initialTags}
                                        render={({ tag, deleteThis }) => (
                                            <div className="tag" onClick={this.confirm.bind(this, tag)} style={{ width: '100%' }}>
                                                <Popconfirm title="你要干什么？"
                                                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                                    onConfirm={this.confirm.bind(this, tag)} onCancel={deleteThis} okText="编辑" cancelText="删除">
                                                    <Icon
                                                        className="Delete"
                                                        type="minus-square"
                                                        theme="filled" />
                                                </Popconfirm>
                                                {
                                                    tag.content ? <PublicComponent PublicData={tag} TYPE='DEV'/> : tag.name
                                                }
                                            </div>
                                        )}
                                        getAddTagFunc={addTag => this.addTag = addTag}
                                        onChange={(tags) => console.log(tags)}
                                    />
                                </div>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            123
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (State) => {
    console.log(State);

    return {
        StylistData: State.StylistData
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