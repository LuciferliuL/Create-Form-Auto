import React, { Component } from 'react';
import { Table, Button, Popconfirm, Spin, message, Modal, Input, Form, Icon } from 'antd'
import { connect } from 'react-redux'
import { API } from '../../lib/API/Iphone.API'
import { POST$, downloadFile, DesignDataTree } from '../../lib/MATH/math.js'
import { selectkeysToHeader } from '../Slider/action/Header.action'


const FormItem = Form.Item


class Iphoneer extends Component {
    state = {
        data: [],
        loading: true,
        visible: false,
        selectData: 0,
        CreateMenu: true,
        addroot: false,
        rootmenu: true,
        PKMenu: true,
        columns: [{
            title: '表格名称',
            dataIndex: 'Name',
            key: 'Name',
            render(text, record) {
                return (
                    <div style={{ padding: '10px', display: 'inline-block' }}>
                        {text}
                    </div>
                );
            }
        }, {
            title: '所属分公司',
            dataIndex: 'BranchId',
            width: '12%',
            key: 'BranchId',
            render(text, record) {
                return (
                    <div style={{ padding: '10px' }}>
                        {text}
                    </div>
                );
            }
        }, {
            title: '排序',
            dataIndex: 'Sort',
            width: '12%',
            key: 'Sort',
            render(text, record) {
                return (
                    <div style={{ padding: '10px' }}>
                        {text}
                    </div>
                );
            }
        }, {
            title: '最后修改时间',
            dataIndex: 'LastModifyTime',
            width: '15%',
            key: 'LastModifyTime',
            render: (text, record) => {
                return (
                    <div style={{ padding: '10px' }}>{text.replace('T', ' ')}</div>
                )
            }
        }, {
            key: 'PK',
            title: '操作',
            width: '20%',
            dataIndex: 'PK',
            render: (text, record) => {
                //增加判断
                return (
                    !record.IsCategory
                        ? (
                            <Button.Group style={{ padding: '5px' }}>
                                <Button type='primary' onClick={this.daochu.bind(this, record)}>导出配置</Button>
                            </Button.Group>
                        ) : null
                )
            }
        }]
    }
    componentDidMount() {
        POST$(API('GetDataFormNodes_mobile').http, {}, (res) => {
            res.forEach(e => {
                DesignDataTree(e)
            })
            this.setState({
                data: res,
                loading: false
            })
        })
    }
    componentWillReceiveProps() {
        POST$(API('GetDataFormNodes_mobile').http, {}, (res) => {
            res.forEach(e => {
                DesignDataTree(e)
            })
            this.setState({
                data: res,
                loading: false
            })
        })
    }
    //delete
    handleDelete = () => {

        if (!this.state.selectData.PK) {
            message.warning('请选中数据项！');
            return;
        }

        POST$(API('Delete').http + this.state.selectData.PK + '/Delete', {}, (e) => {
            if (e.result) {
                POST$(API('GetDataFormNodes_mobile').http, {}, (res) => {
                    res.forEach(e => {
                        DesignDataTree(e)
                    })
                    if (res) {
                        this.setState({
                            data: res,
                        })
                    }
                })
            }
        })
    }
    TableHeader = () => (
        <Button.Group>
            <Button onClick={this.CreateTable.bind(this, 'new')}>新建表单</Button>
            <Button onClick={this.CreateMenu.bind(this, 'level1')}>新建根菜单</Button>
            <Button onClick={this.CreateMenu.bind(this, 'level2')}>添加下级菜单</Button>
            <Button onClick={this.CreateTable.bind(this, 'Edit')}>编辑</Button>
            <Popconfirm title="确定删除？" onConfirm={this.handleDelete.bind(this)}>
                <Button type='danger'>删除</Button>
            </Popconfirm>
        </Button.Group>
    )
    daochu = (record) => {
        downloadFile(record.Name, record.Bytes)
    }
    CreateMenu = (e) => {
        if (e === 'level2') {
            let selectData = this.state.selectData;
            if (selectData === 0) {
                message.warning('请选中一个菜单');
                return;
            } else if (!selectData.IsCategory) {
                message.warning('请选中一个菜单');
                return;
            }

            this.setState({
                addroot: false
            })
        }
        else {
            this.setState({
                addroot: true
            })
        }

        this.props.form.resetFields();
        this.setState({
            visible: true,
            CreateMenu: true,
            rootmenu: e === 'level1' ? true : false,
            PKMenu: true
        })
    }
    //新曾
    handleSubmit = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let seldata = this.state.selectData;

                let save = {}
                save = {
                    BranchId: '',
                    Bytes: '',
                    Category: '',
                    FK: -1,
                    Name: values.userName,
                    Sort: values.Sort,
                    PK: this.state.PKMenu ? -1 : this.state.selectData.PK,
                    Role: "",
                    TelantId: "",
                }

                //若创建根节点或编辑菜单，则ParentFormID=选择节点的ParentFormID
                save.ParentFormID = this.state.rootmenu ? 0 : this.state.selectData.ParentFormID;
                //若创建二级菜单时，ParentFormID=选择节点的PK
                if (this.state.CreateMenu)
                    save.ParentFormID = this.state.selectData.PK;
                if (this.state.addroot)
                    save.ParentFormID = 0;

                if (seldata !== 0) {
                    seldata.Name = save.Name;
                    seldata.Sort = save.Sort;
                }

                //新建菜单
                POST$(API('DataFormSave_mobile').http, save, (res) => {
                    if (res.PK) {

                        POST$(API('GetDataFormNodes_mobile').http, {}, (res) => {
                            //console.log(res);
                            res.forEach(e => {
                                DesignDataTree(e)
                            })
                            this.setState({
                                data: res,
                                selectData: seldata,
                                loading: false,
                                visible: false,
                            })
                        })
                    }
                })
            }
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    CreateTable = (dataSource) => {
        // console.log(dataSource);

        //mock的数据 新建表单或者获取表单要覆盖原来的
        if (dataSource === 'new') {
            let save = {
                BranchId: '',
                Bytes: JSON.stringify({
                    globleConfig: [],
                    componentData: [],
                    TableData: {}
                }),
                Category: '',
                ParentFormID: '',
                FK: -1,
                Sort: '',
                Name: '',
                PK: -1,
                Role: "",
                TelantId: "",
                PageSize: 15
            }
            let path = {
                pathname: '/Design/Iphone',
                state: save
            }
            this.props.onTodoClick(['移动设计'])
            this.props.history.push(path)
        } else if (dataSource === 'Edit') {
            let selectData = this.state.selectData;
            if (selectData === 0) {
                message.warning('请选中一个菜单或表单')
            } else {
                if (selectData.IsCategory) {
                    //文件夹
                    if (this.state.selectData.ParentFormID === 0) {
                        this.setState({
                            visible: true,
                            CreateMenu: false,
                            addroot: false,
                            rootmenu: true,
                            PKMenu: false
                        })
                    } else {
                        this.setState({
                            visible: true,
                            CreateMenu: false,
                            addroot: false,
                            rootmenu: false,
                            PKMenu: false
                        })
                    }

                    this.props.form.setFieldsValue({ 'userName': this.state.selectData.Name });
                    this.props.form.setFieldsValue({ 'Sort': this.state.selectData.Sort });
                } else {
                    //表单
                    // let body = JSON.parse(this.state.selectData.Bytes)
                    // this.props.fugai(body.FormData) //添加表单的
                    // this.props.tableFugai(body.TableData)//添加表格的
                    // this.props.update(this.state.selectData)//用来确定是否新建
                    let path = {
                        pathname: '/Design/Iphone',
                        state: this.state.selectData
                    }
                    this.props.onTodoClick(['移动设计'])
                    this.props.history.push(path)
                }
            }
        }

    }
    rowSelection = {
        onSelect: (record) => {
            this.setState({
                selectData: record
            })
        },
        type: 'radio'
    };
    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.loading}>
                <Modal
                    title="保存菜单"
                    footer={false}
                    visible={this.state.visible} onCancel={this.handleCancel.bind(this)}>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入菜单名称!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="菜单名称" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('Sort', {
                                rules: [{ required: true, message: '请输入菜单排序!' }],
                            })(
                                <Input placeholder="排序" />
                            )}
                        </FormItem>
                        <FormItem style={{ textAlign: 'center' }}>
                            <Button htmlType='submit'>确定</Button>
                            <Button type='danger' onClick={this.handleCancel}>取消</Button>
                        </FormItem>
                    </Form>
                </Modal>
                <Table
                    style={{ height: h }}
                    title={this.TableHeader}
                    bordered={true}
                    columns={this.state.columns}
                    rowSelection={this.rowSelection}
                    dataSource={this.state.data}
                    rowKey='PK' />
            </Spin>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchProps = (dispatch) => {
    return {
        onTodoClick: (k) => {
            dispatch(selectkeysToHeader(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Form.create()(Iphoneer));