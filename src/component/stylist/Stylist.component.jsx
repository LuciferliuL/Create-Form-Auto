import React, { Component } from 'react';
import { Row, Col, Card, Icon, Popconfirm, Form, Button, Modal, Input, message, Spin, Select } from 'antd'
import { connect } from 'react-redux'
import { stylistDataSourceGet, formSourceData, currentAttr, formSourceDataUpdata, formSourceDataDelete, fugai } from './action/Stylist.action'
import './Stylist.css'
import PublicComponent from '../PublicComponent/Public.Component'
import SliderCard from '../SliderCard/SliderCard'
import SliderRightcomponent from '../SliderRIght/SliderRight.component'
import { Dragact } from 'dragact'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import {  updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { POST$ } from '../../lib/MATH/math'
import { API } from '../../lib/API/check.API'
import { selectkeysToHeader } from '../Slider/action/Header.action'


const Option = Select.Option;
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
        loading: false,
        children: []
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
        // console.log(e);
        this.props.FormDataDelete(e)
    }
    //固定位置
    time = () => {
        this.props.FormDataUpata(this.dragact.getLayout())
    }
    showModal = () => {
        POST$(API('POSTDATA').http, {}, (res) => {
            console.log(res);
            const children = [];
            res.forEach(e => {
                children.push(<Option key={e.Category}>{e.Category}</Option>);
            })
            this.setState({
                visible: true,
                children: children
            });
        })
    }
    read = () => {

        this.setState({
            read: !this.state.read
        }, () => { this.changeWidth() })
    }
    handleCancel = (e) => {
        // console.log(e);
        this.props.form.resetFields(['formname'])
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            console.log(values);
            
            this.setState({
                loading: true
            })
            if (!err) {
                if(values.Category.length >= 1){
                    values.Category = values.Category[0]
                }


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
                    // console.log(res);
                    res.PK === -1 ? message.error('保存失败') : message.success('保存成功')
                    // this.props.fugai([])
                    // localStorage.setItem('C','N')
                    this.props.onTodoClick(['表单权限'])
                    this.props.history.push('/Design/Arch')
                    this.props.fugai([])
                })
                this.setState({
                    visible: false,
                    loading: false
                });
            }
        });
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.65
        // console.log(this.state.dataSource);
        const { getFieldDecorator } = this.props.form;
        const { children } = this.state
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
                                // <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单类" />
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="表单类"
                                    onChange={this.handleChange}
                                    maxTagCount={1}
                                >
                                    {children}
                                </Select>
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
                                style={{ width: '100%', minHeight: h + 'px', padding: '5px' }}>
                                <Dragact
                                    ref={(n) => { this.dragact = n }}
                                    layout={this.props.UpdataFormData} //必填项
                                    col={24} //必填项
                                    width={this.state.domWidth} //必填项
                                    rowHeight={40} //必填项
                                    margin={[5, 5]} //必填项
                                    className="plant-layout" //必填项
                                    style={{ border: '1px dashed black', minHeight: h + 'px' }} //非必填项
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
        onTodoClick: (k) => {
            dispatch(selectkeysToHeader(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
        fugai: (k) => {
            dispatch(fugai(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props) {
        let Field = {}
        console.log(props);
        if (Object.keys(props.InitStylistData).length > 0) {
            Field['Name'] = Form.createFormField({ value: props.InitStylistData.Name })
            Field['Category'] = Form.createFormField({ value: props.InitStylistData.Category })
        }
        return Field
    }
})(Stylistcomponent));