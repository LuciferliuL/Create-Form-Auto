import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Button, Input, Form, Col, Tag } from 'antd'
import { hidenDrawer, currentAttrUpdata, formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { tagPushDataInColumns, inputValueChange, sqlValueChange, GroupValueChange, tagPushDataInGroup, TagCancelDataInGroup, InputCancelData } from './action/Drawer.action'
import { upDataCurrentDataSource } from '../PublicComponent/lookup/action/lookup.action'
import {tableFugai} from '../stylist/action/Stylist.action'


const InputGroup = Input.Group
const { TextArea } = Input
class Drawercomponent extends Component {
    onClose = () => {
        this.props.hidefun(false)
    };
    onSure = (e) => {
        //修改的结果在这里
        if(this.props.currentAttr.key === 'tablesKey'){
            this.props.tableFugai(this.props.currentAttr)
        }else{
            this.props.upForm(this.props.currentAttr)
        }
        this.props.hidefun(false)
    }
    //列数据方法
    TagAdd = (i) => {
        console.log(i);
        
        this.props.tagPushDataInColumns(i, {
            title: '',
            dataIndex: '',
            width: '',
        })
    }
    GroupAdd = (i) => {
        this.props.tagPushDataInGroup(i, {
            name: '',
            value: ''
        })
    }
    TagCancel = (i) => {
        this.props.InputCancelData(i)
    }
    GroupCancel = (i) => {
        this.props.TagCancelDataInGroup(i)
    }
    InputChange = (i, title, e) => {
        this.props.inputValueChange(i, title, e.target.value)
    }
    GroupChange = (i, title, e) => {
        this.props.GroupValueChange(i, title, e.target.value)
    }
    SQLChange = (e) => {
        console.log(e.target.value);
        this.props.sqlValueChange(e.target.value)
    }
    render() {
        let content = []
        if (this.props.flag === 'SQL') {
            content.push(
                <div key={'SQL12138'}>
                    <Tag>SQL:</Tag>
                    <TextArea autosize={{ minRows: 25 }} value={this.props.currentAttr.SQL} onChange={this.SQLChange.bind(this)}></TextArea>
                </div>
            )
        } else if (this.props.flag === 'columns') {
            content.push(
                <div key={1314165182}>
                    <Col span={6}>
                        <Tag>显示名称</Tag>
                    </Col>
                    <Col span={6}>
                        <Tag>实际名称</Tag>
                    </Col>
                    <Col span={6}>
                        <Tag>占位宽度</Tag>
                    </Col>
                    <Col>
                        <Tag onClick={this.TagAdd.bind(this, this.props.currentAttr.columns.length - 1)}>添加</Tag>
                    </Col>
                </div>
            )
            this.props.currentAttr.columns.forEach((e, i) => {

                content.push(
                    <div key={i}>
                        <InputGroup style={{ padding: '5px' }} >
                            <Col span={6}>
                                <Input value={e.title} onChange={this.InputChange.bind(this, i, 'title')} />
                            </Col>
                            <Col span={6}>
                                <Input value={e.dataIndex} onChange={this.InputChange.bind(this, i, 'dataIndex')} />
                            </Col>
                            <Col span={6}>
                                <Input value={e.width} onChange={this.InputChange.bind(this, i, 'width')} />
                            </Col>
                            <Col span={6}>
                                <Tag onClick={this.TagAdd.bind(this, i)}>添加</Tag>
                                <Tag onClick={this.TagCancel.bind(this, i)}>删除</Tag>
                            </Col>
                        </InputGroup>
                    </div>
                )
            });
        } else if (this.props.flag === 'GroupValue') {
            content.push(
                <div key={132313182}>
                    <Col span={6}>
                        <Tag>显示名</Tag>
                    </Col>
                    <Col span={6}>
                        <Tag>实际值</Tag>
                    </Col>
                </div>
            )
            this.props.currentAttr.GroupValue.forEach((e, i) => {
                content.push(
                    <div key={i}>
                        <InputGroup style={{ padding: '5px' }} >
                            <Col span={8}>
                                <Input value={e.name} onChange={this.GroupChange.bind(this, i, 'name')} />
                            </Col>
                            <Col span={8}>
                                <Input value={e.value} onChange={this.GroupChange.bind(this, i, 'value')} />
                            </Col>
                            <Col span={8}>
                                <Tag onClick={this.GroupAdd.bind(this, i)}>添加</Tag>
                                <Tag onClick={this.GroupCancel.bind(this, i)}>删除</Tag>
                            </Col>
                        </InputGroup>
                    </div>
                )
            });
        }
        return (

            <Drawer title="详细数据"
                placement="right"
                closable={false}
                visible={this.props.hide}
                width='500'
                onClose={this.onClose.bind(this)}
            >
                <Form>
                    {content}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose.bind(this)}
                        >
                            取消
                        </Button>
                        <Button onClick={this.onSure.bind(this)} type="primary">确定</Button>
                    </div>
                </Form>
            </Drawer>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        hide: state.hide,
        currentAttr: state.currentAttr,
        flag: state.flag
    };
}
const mapDispatchProps = (dispatch) => {
    return {
        hidefun: (k) => {
            dispatch(hidenDrawer(k))
        },
        updata: (k) => {
            dispatch(currentAttrUpdata(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
        tagPushDataInColumns: (k, init) => {
            dispatch(tagPushDataInColumns(k, init))
        },
        tagPushDataInGroup: (k, init) => {
            dispatch(tagPushDataInGroup(k, init))
        },
        inputValueChange: (k, title, data) => {
            dispatch(inputValueChange(k, title, data))
        },
        GroupValueChange: (k, title, data) => {
            dispatch(GroupValueChange(k, title, data))
        },

        sqlValueChange: (k) => {
            dispatch(sqlValueChange(k))
        },
        upDataCurrentDataSource: (k) => {
            dispatch(upDataCurrentDataSource(k))
        },
        TagCancelDataInGroup: (k) => {
            dispatch(TagCancelDataInGroup(k))
        },
        InputCancelData: (k) => {
            dispatch(InputCancelData(k))
        },
        tableFugai:(k)=>{
            dispatch(tableFugai(k))
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(Form.create()(Drawercomponent));