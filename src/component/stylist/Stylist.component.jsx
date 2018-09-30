import React, { Component } from 'react';
import { Row, Col, Card, Icon, Popconfirm, Form, Button, Modal, Input, message, Spin } from 'antd'
import { connect } from 'react-redux'
import { stylistDataSourceGet, formSourceData, currentAttr, formSourceDataUpdata, formSourceDataDelete } from './action/Stylist.action'
import './Stylist.css'
import PublicComponent from '../PublicComponent/Public.Component'
import SliderCard from '../SliderCard/SliderCard'
import SliderRightcomponent from '../SliderRIght/SliderRight.component'
import { Dragact } from 'dragact'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { trAddDown, trReduceUp, shows, updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { POST$ } from '../../lib/MATH/math'
import { API } from '../../lib/API/check.API'

const getblockStyle = isDragging => {

    return {
        background: isDragging ? '#1890ff' : 'white'
    }
}
const FormItem = Form.Item
class Stylistcomponent extends Component {
    state = {
        visible: false,
        domWidth: 0,
        read: true,
        loading: false
    }
    myRef = React.createRef()
    componentDidMount() {
        this.times = setTimeout(() => {
            this.changeWidth()
        }, 10)
    }
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 64
        this.setState({
            domWidth: dom
        })
    }
    componentWillUnmount() {
        clearTimeout(this.times)
    }
    handleKeyDown = (e) => {
        // console.log(this.state.tr);
        // console.log(this.state.td);
        const { dataSource, columns } = this.props.currentAttr
        switch (e.keyCode) {
            case 40://下
                if (this.props.currentAttr.tr < dataSource.length - 1) {
                    this.props.trAddDown(this.props.currentAttr.tr)
                }
                break;
            case 38://上
                if (this.props.currentAttr.tr > 0) {
                    this.props.trReduceUp(this.props.currentAttr.tr)
                }
                break;
            case 13:
                this.props.shows(this.props.currentAttr)
                this.CLick()
                break
        }
    }
    CLick = () => {
        window.removeEventListener('keyup', this.handleKeyDown)
        const { dataSource } = this.props.currentAttr
        if (dataSource.length > 0) {
            console.log(this.props.currentAttr.tr);
            this.props.updataValues(JSON.parse(JSON.stringify(dataSource[this.props.currentAttr.tr])))
            this.props.upForm(this.props.currentAttr)
        }
    }

    allowDrop = (ev) => {
        ev.preventDefault()
    }
    drop = (ev) => {
        ev.preventDefault();
        // console.log(ev);

        var data = ev.dataTransfer.getData("ID");
        // console.log(this.props.currentTagsUpdata);
        if (data === this.props.currentTagsUpdata.id) {
            this.props.FormData(this.props.currentTagsUpdata)
        }
    }
    confirm = (e) => {
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
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    read = () => {

        this.setState({
            read: !this.state.read
        }, () => { this.changeWidth() })
    }
    handleCancel = (e) => {
        console.log(e);
        this.props.form.resetFields(['formname'])
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                loading: true
            })
            if (!err) {

                let save = {}
                if (this.props.InitStylistData.PK) {
                    //编辑
                    save = Object.assign({}, this.props.InitStylistData, values, { 'Bytes': JSON.stringify(this.props.UpdataFormData) })
                    // console.log(newData);

                } else {
                    //新建
                    let user = localStorage.getItem('values')
                    save = {
                        BranchId: user.BranchId,
                        Bytes: JSON.stringify(this.props.UpdataFormData),
                        Category: values.Category,
                        FK: -1,
                        Name: values.Name,
                        PK: -1,
                        Role: "",
                        TelantId: "",
                        PageSize: 15
                    }
                }
                POST$(API('SaveForm').http, save, (res) => {
                    console.log(res);
                    res.PK === -1 ? message.error('保存失败') : message.success('保存成功')
                })
                this.setState({
                    visible: false,
                    loading: false
                });
            }
        });
    }
    PositionHTML = (key) => {
        if (key === 'LookUp') {
            window.addEventListener('keyup', this.handleKeyDown)
        }
    }
    render() {
        // console.log(this.state.dataSource);
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.loading}>
                <Modal
                    title="保存表单"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('Name', {
                                rules: [{ required: true, message: 'Please input your formname!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单名称" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('Category', {
                                rules: [{ required: true, message: 'Please input your formname!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单类" />
                            )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">确定</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </Form>
                </Modal>
                <Row gutter={1}>
                    <Col span={this.state.read ? 5 : 0} >
                        <SliderCard></SliderCard>
                    </Col>
                    <Col span={this.state.read ? 14 : 24}>
                        <Card title="表单预览"
                            extra={
                                <div>
                                    <Button onClick={this.read.bind(this)}>预览</Button>
                                    <Button onClick={this.showModal.bind(this)}>保存</Button>
                                </div>

                            }
                            ref={this.myRef}>
                            <Form
                                onDragOver={this.allowDrop.bind(this)}
                                onDrop={this.drop.bind(this)}
                                hideRequiredMark={true}
                                style={{ width: '100%', minHeight: '400px', padding: '5px' }}>
                                <Dragact
                                    ref={(n) => { this.dragact = n }}
                                    layout={this.props.UpdataFormData} //必填项
                                    col={24} //必填项
                                    width={this.state.domWidth} //必填项
                                    rowHeight={40} //必填项
                                    margin={[5, 5]} //必填项
                                    className="plant-layout" //必填项
                                    style={{ border: '1px dashed black', minHeight: '300px' }} //非必填项
                                    placeholder={true}
                                    onDragEnd={this.time.bind(this)}
                                >
                                    {(item, provided) => {
                                        // console.log(item);
                                        return (
                                            <div
                                                {...provided.props}
                                                {...provided.dragHandle}
                                                style={this.state.read ? {
                                                    ...provided.props.style,
                                                    ...getblockStyle(provided.isDragging),
                                                    border: '1px dashed black'
                                                } : {
                                                        ...provided.props.style,
                                                        ...getblockStyle(provided.isDragging)
                                                    }}
                                                onClick={this.PositionHTML.bind(this, item.type)}
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
                                                <PublicComponent PublicData={item} currentAttr={this.props.currentAttr} />
                                            </div>
                                        )
                                    }}
                                </Dragact>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={this.state.read ? 5 : 0}>
                        <SliderRightcomponent currentAttr={this.props.currentAttr}></SliderRightcomponent>
                    </Col>
                </Row>
            </Spin>
        );
    }
}

const mapStateToProps = (State) => {
    // console.log(State);

    return {
        InitStylistData: State.InitStylistData,
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
        },
        trAddDown: (k) => {
            dispatch(trAddDown(k))
        },
        trReduceUp: (k) => {
            dispatch(trReduceUp(k))
        },
        shows: (k) => {
            dispatch(shows(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props){
        let Field = {}
        console.log(props);
        if(Object.keys(props.InitStylistData).length > 0){
            Field['Name'] =  Form.createFormField({value:props.InitStylistData.Name})
            Field['Category'] = Form.createFormField({value:props.InitStylistData.Category})
        }
        return Field
    }
})(Stylistcomponent));