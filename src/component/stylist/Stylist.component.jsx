import React, { Component } from 'react';
import { Row, Col, Card, Icon, Popconfirm, Form, Button, Modal, Input, message, Spin, TreeSelect, Tabs, Table } from 'antd'
import { connect } from 'react-redux'
import { stylistDataSourceGet, formSourceData, currentAttr, formSourceDataUpdata, formSourceDataDelete, fugai } from './action/Stylist.action'
import './Stylist.css'
import PublicComponent from '../PublicComponent/Public.Component'
import SliderCard from '../SliderCard/SliderCard'
import SliderRightcomponent from '../SliderRIght/SliderRight.component'
import { Dragact } from 'dragact'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import { updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { POST$, treeData } from '../../lib/MATH/math'
import { API } from '../../lib/API/check.API'
import { selectkeysToHeader } from '../Slider/action/Header.action'
import TABLECOMPONENT from '../PublicComponent/table/Table'
import { RightMoveArr, LeftMoveArr } from '../Iphone/Func'

const getblockStyle = isDragging => {
    return {
        background: isDragging ? '#1890ff' : 'white'
    }
}

let TabTableIndex = 0
const TabPane = Tabs.TabPane;
const FormItem = Form.Item
class Stylistcomponent extends Component {
    state = {
        visible: false,
        domWidth: 0,
        read: true,
        edit: false,
        loading: false,
        treeData: [],
        indexTable: '0',
        tableSourceData: [{
            GridX: 0, GridY: 0, w: 24, h: 8, key: 'tablesKey' + TabTableIndex, pageSize: 200, scroll: 1200,
            icons: 'table', label: '简单表格', type: 'Table', id: 'tables', float: 0,
            SQL: 'select * where', groupname: '', tr: 0, pageNum: 1,isCustomDirective:false,CustomDirectiveURL:'',CustomDirectiveMethod:0,
            columns: [
                {
                    title: '',
                    dataIndex: ''
                }, {
                    title: '',
                    dataIndex: ''
                }, {
                    title: '',
                    dataIndex: ''
                }],
            dataSource: []
        }],
        baseTable: {
            GridX: 0, GridY: 0, w: 24, h: 8, key: 'tablesKey' + TabTableIndex, pageSize: 200, scroll: 1200,
            icons: 'table', label: '简单表格', type: 'Table', id: 'tables', float: 0,
            SQL: 'select * where', groupname: '', tr: 0, pageNum: 1,isCustomDirective:false,CustomDirectiveURL:'',CustomDirectiveMethod:0,
            columns: [
                {
                    title: '',
                    dataIndex: ''
                }, {
                    title: '',
                    dataIndex: ''
                }, {
                    title: '',
                    dataIndex: ''
                }],
            dataSource: []
        }

    }
    myRef = React.createRef()
    componentDidMount() {
        let bodyTable = this.props.location.state
        // console.log(bodyTable);
        if (bodyTable && bodyTable.length > 0) {
            this.setState({
                tableSourceData: bodyTable
            })
        }
        this.times = setTimeout(() => {
            this.changeWidth()
        }, 10)
    }
    componentWillReceiveProps(pre) {


    }
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 20
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
        var data = ev.dataTransfer.getData("ID");
        if (data === this.props.currentTagsUpdata.id) {
            this.props.FormData(this.props.currentTagsUpdata)
        }
    }
    confirm = (e) => {
        // console.log(e);

        //记录组件位置
        this.props.FormDataUpata(this.dragact.getLayout())
        //更新右边栏
        if (e.length > 0 && e[0].key.slice(0, 9) === 'tablesKey') {
            // let sourceData = e.find(e => e.key === this.state.indexTable)
            // console.log(this.state.indexTable);
            let d = JSON.parse(JSON.stringify(e[this.state.indexTable]))
            this.props.rightUpdata(d)
        } else {
            this.props.rightUpdata(e)
        }
    }


    cancel = (e) => {
        if (e.length > 0 && e[0].key.slice(0, 9) === 'tablesKey') {
            let d = JSON.parse(JSON.stringify(e[this.state.indexTable]));
            const { tableSourceData } = this.state
            let list = []
            tableSourceData.forEach((e, i) => {
                if (d.key !== e.key)
                    list.push(e)
            });
            this.setState({
                tableSourceData: list
            })
        }
        else {
            this.props.FormDataDelete(e)
        }
    }


    //固定位置
    time = () => {
        this.props.FormDataUpata(this.dragact.getLayout())
    }
    showModal = (e) => {
        //if (this.props.InitStylistData.PK) {
        //    this.handleSubmit(e);
        //}
        //else {
        POST$(API('GetCategory').http, {}, (res) => {
            res.forEach((e) => {
                treeData(e)
            })
            this.setState({
                visible: true,
                treeData: res
            });
        })
        //}
    }

    read = () => {
        this.setState({
            read: !this.state.read
        }, () => { this.changeWidth() })
    }
    //取消
    handleCancel = (e) => {
        this.props.form.resetFields(['formname'])
        this.setState({
            visible: false,
        });
    }
    //保存
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            this.setState({
                loading: true
            });
            let save = {};
            let body = {};
            body.FormData = this.props.UpdataFormData;
            body.TableData = this.state.tableSourceData;
            console.log(body);

            if (this.props.InitStylistData.PK) {
                //编辑
                save = Object.assign({},
                    this.props.InitStylistData,
                    { 'Name': values.Name },
                    { 'Sort': values.Sort },
                    { 'ParentFormID': values.ParentFormID },
                    { 'Bytes': JSON.stringify(body) })
            } else {
                //新建
                let user = sessionStorage.getItem('values')
                save = {
                    BranchId: user.BranchId,
                    Bytes: JSON.stringify(body),
                    Category: '',
                    ParentFormID: values.ParentFormID,
                    FK: -1,
                    Sort: values.Sort,
                    Name: values.Name,
                    PK: -1,
                    Role: "",
                    TelantId: "",
                    PageSize: 15
                }
            }

            POST$(API('SaveForm').http, save, (res) => {
                res.PK === -1 ? message.error('保存失败') : message.success('保存成功')
                this.props.onTodoClick(['表单权限'])
                this.props.history.push('/Design/Arch')
                this.props.fugai([])
            })
            this.setState({
                visible: false,
                loading: false
            });

        });
    }
    handleChange = (value) => {

    }
    ChangeOn = () => {

    }
    callback = (key) => {
        console.log(key);
        this.setState({
            indexTable: key
        })
    }
    //添加table
    ClickAdd = (ev) => {
        let t = Object.assign({}, ev);

        //TabTableIndex++
        t.key = 'tablesKey' + '' + new Date().getTime();
        this.setState((pre) => ({
            tableSourceData: [...pre.tableSourceData, t],
        }))
        // this.props.addTable(ev)
        // console.log(this.state.tableSourceData);

    }
    //删除table
    ClickRemove = () => {
        // console.log(this.state.indexTable);
        // console.log(this.state.tableSourceData);
        const { indexTable, tableSourceData } = this.state
        let data = tableSourceData.filter((e, i) => { if (i !== Number(indexTable)) { return e } })
        // console.log(data);

        this.setState({
            indexTable: "0",
            tableSourceData: data
        })
        // this.props.currentAttr = {}
        this.props.rightUpdata({})
    }
    //table位置
    Clickmove = (e) => {
        const { indexTable, tableSourceData } = this.state
        let indexTableNumber = Number(indexTable)
        // console.log(e);
        if (e === 'left') {
            let i = indexTableNumber - 1 > 0 ? indexTableNumber - 1 : 0
            let data = LeftMoveArr(tableSourceData, indexTableNumber, tableSourceData.length)
            // console.log(String(i));
            this.callback(String(i))
            this.setState({
                // indexTable:i,
                tableSourceData: data
            })
        } else {
            let i = indexTableNumber + 1 < tableSourceData.length - 1 ? indexTableNumber + 1 : tableSourceData.length - 1
            let data = RightMoveArr(tableSourceData, indexTableNumber, tableSourceData.length)
            this.callback(String(i))
            this.setState({
                // indexTable:i,
                tableSourceData: data
            })
        }
    }
    tableedit = (ev) => {
        // console.log(ev);
        const { tableSourceData, indexTable } = this.state
        let list = []
        // console.log(tableSourceData);

        tableSourceData.forEach((e, i) => {
            if (i === Number(indexTable)) {
                list.push(ev)
            } else {
                list.push(e)
            }
        })

        this.setState({
            tableSourceData: list
        })
    }
    render() {
        // console.log(this.state.tableSourceData);

        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.70
        const { getFieldDecorator } = this.props.form;
        const { indexTable } = this.state
        let tabs_ = []
        this.state.tableSourceData.forEach((e, i) => {
            tabs_.push(
                <TabPane tab={`${e.label}`} key={`${i}`}>
                    <Table columns={e.columns}></Table>
                </TabPane>
            )
        })
        const operations = <Button.Group>
            <Button
                style={this.state.read ? { display: 'unset' } : { display: 'none' }}
                onClick={this.Clickmove.bind(this, 'left')}>
                <Icon type="swap-left" />
            </Button>
            <Button
                style={this.state.read ? { display: 'unset' } : { display: 'none' }}
                onClick={this.Clickmove.bind(this, 'right')}>
                <Icon type="swap-right" />
            </Button>
            <Button
                style={this.state.read ? { display: 'unset' } : { display: 'none' }}
                onClick={this.ClickRemove.bind(this, this.state.baseTable)}>
                删除Table
            </Button>
            <Button
                style={this.state.read ? { display: 'unset' } : { display: 'none' }}
                onClick={this.ClickAdd.bind(this, this.state.baseTable)}>
                添加Table
            </Button>
        </Button.Group>;
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
                                rules: [{ required: true, message: '请输入表单名称!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单名称" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('ParentFormID', {
                                rules: [{ required: true, message: '请选择存放菜单!' }],
                            })(
                                <TreeSelect
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={this.state.treeData}
                                    placeholder="请选择存放菜单"
                                    onChange={this.handleChange}
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('Sort', {
                                rules: [{ required: true, message: '请输入菜单排序!' }],
                            })(
                                <Input placeholder="排序" />
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
                        <Card
                            title="表单预览"
                            bodyStyle={{ padding: '0px' }}
                            extra={
                                <div>
                                    <Button onClick={this.read.bind(this)}>{this.state.read ? '预览' : '关闭'}</Button>
                                    <Button style={this.state.read ? { display: 'unset' } : { display: 'none' }} onClick={this.showModal.bind(this)}>保存</Button>
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
                                    style={{ border: '1px dashed black', minHeight: '50px' }} //非必填项
                                    placeholder={true}
                                    onDragEnd={this.time.bind(this)}
                                >
                                    {(item, provided) => {
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
                                                        style={this.state.read ? { display: 'unset' } : { display: 'none' }}
                                                        type="minus-square"
                                                        theme="filled" />
                                                </Popconfirm>
                                                <PublicComponent
                                                    PublicData={item}
                                                    currentAttr={this.props.currentAttr}
                                                    ChangeOn={this.ChangeOn.bind(this)} />
                                            </div>
                                        )
                                    }}
                                </Dragact>
                                <div style={{ position: 'relative' }}>
                                    <Popconfirm title="你要干什么？"
                                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                        okText="编辑"
                                        cancelText="取消"
                                        onConfirm={this.confirm.bind(this, this.state.tableSourceData)}
                                    // onCancel={this.cancel.bind(this, this.state.tableSourceData)}
                                    >
                                        <Icon
                                            className="Delete"
                                            style={this.state.read ? { display: 'unset' } : { display: 'none' }}
                                            type="minus-square"
                                            theme="filled" />
                                    </Popconfirm>
                                    <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={operations} activeKey={indexTable}>
                                        {tabs_}
                                    </Tabs>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={this.state.read ? 5 : 0}>
                        <SliderRightcomponent currentAttr={this.props.currentAttr} tableedit={this.tableedit.bind(this)}></SliderRightcomponent>
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
        currentAttr: State.currentAttr,
        tableSource: State.tableSource
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
        // console.log(props);
        //length是否大于0  显示为 是否新建或编辑
        if (Object.keys(props.InitStylistData).length > 0) {
            Field['Name'] = Form.createFormField({ value: props.InitStylistData.Name });
            Field['Sort'] = Form.createFormField({ value: props.InitStylistData.Sort });
            Field['ParentFormID'] = Form.createFormField({ value: props.InitStylistData.ParentFormID });
        }
        return Field
    }
})(Stylistcomponent));


