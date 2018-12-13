import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Icon, Table, message, Form, Modal, Input, TreeSelect } from 'antd'
import { InputData, RadioData, LookUp, Title, DateS, SelectS, CheckboxS } from './Iphone.Data'
import IphoneComponent from './Iphone.Component'
import IphoneC from './Iphone.C'
import { RightMoveArr, LeftMoveArr } from './Func'
import Iphoneconfig from './Iphone.config'
import { POST$ } from '../../lib/MATH/math'
import { API } from '../../lib/API/Iphone.API'
import { selectkeysToHeader } from '../Slider/action/Header.action'
import { Object } from 'es6-shim';

const FormItem = Form.Item
const ButtonGroup = Button.Group



class Iphone extends Component {
    state = {
        Source: [
            new InputData(),
            new RadioData(),
            new LookUp(),
            new Title(),
            new DateS(),
            new SelectS(),
            new CheckboxS()
        ],
        IphoneData: [],
        CurrentData: {},
        CurrentIndex: -1,
        IphoneTableData: {
            data: [],
            columns: [{ title: '列名', dataIndex: '0', type: 'String', enum: [] }],
            title: '表格',
            type: 'table',
            SQL: ''
        },
        ConfigData: [],
        visible: false,
        treeData: [],
        OriData: {},
        lastData: {}
    }
    componentDidMount() {
        // console.log('did');
        var data = this.props.location.state;
        console.log(data);
        if (data) {
            let Bytes = JSON.parse(data.Bytes)
            console.log(Bytes);
            let qq = []
            let tablebase = {}
            Bytes.componentData.forEach(e => {
                let objTitle = JSON.parse(JSON.stringify(e))
                objTitle.control = []
                qq.push(objTitle)
                e.control.forEach(x => {
                    qq.push(x)
                })
            })
            // console.log(qq);

            if (Object.keys(Bytes.TableData).length > 0) {
                tablebase = Bytes.TableData
                console.log(tablebase);

            } else {
                tablebase = {
                    data: [],
                    columns: [{ title: '列名', dataIndex: '0', type: 'String', enum: [] }],
                    title: '表格',
                    type: 'table',
                    SQL: ''
                }
            }
            this.setState({
                ConfigData: Bytes.globleConfig,
                IphoneTableData: tablebase,
                IphoneData: qq,
                OriData: data
            })
        }
    }
    componentWillReceiveProps(pre) {
        // console.log('will');

    }
    //添加组件
    addCard = (type) => {
        console.log(new CheckboxS());
        switch (type) {
            case 'input':
                let input = new InputData('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, input]
                }))
                break;
            case 'radio':
                let radio = new RadioData('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, radio]
                }))
                break;
            case 'lookup':
                let lookup = new LookUp('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, lookup]
                }))
                break;
            case 'title':
                let title = new Title('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, title]
                }))
                break;
            case 'date':
                let dateS = new DateS('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, dateS]
                }))
                break;
            case 'select':
                let selectS = new SelectS('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, selectS]
                }))
                break;
            case 'check':
                let Check = new CheckboxS()
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, Check]
                }))
                break;
            default:
                break;
        }
    }
    //点击组件
    ClickNode = (index) => {
        // console.log(index);
        this.setState({
            CurrentData: this.state.IphoneData[index],
            CurrentIndex: index
        })
    }
    //子组件修改数据
    AttributeChange = (attr, value) => {
        // console.log(attr + '-----' + value);
        const { CurrentData, IphoneData } = this.state
        let file = {}
        file[attr] = value
        console.log(file);
        if (CurrentData.type === 'table') {
            //说明是表格
            this.setState({
                CurrentData: Object.assign({}, this.state.CurrentData, file),
                IphoneTableData: Object.assign({}, this.state.IphoneTableData, file)
            })
        } else {
            //修改得是组件
            let Currentdata = Object.assign({}, this.state.CurrentData, file)
            let Iphonedata = []
            IphoneData.forEach(e => {
                if (e.Key === Currentdata.Key) {
                    Iphonedata.push(Currentdata)
                } else {
                    Iphonedata.push(e)
                }
            })

            this.setState({
                CurrentData: Currentdata,
                IphoneData: Iphonedata
            })
        }

    }
    //删除
    OnDel = () => {
        const { IphoneData, CurrentData } = this.state
        let i = []
        IphoneData.forEach(e => {
            if (e.Key !== CurrentData.Key) {
                i.push(e)

            }
        })

        this.setState({
            IphoneData: i
        })
    }
    //排序
    UPDOWN = (key) => {
        const { CurrentIndex, IphoneData } = this.state;
        if (IphoneData.length < 2)
            return;

        if (key === 'up') {
            let i = CurrentIndex - 1 > 0 ? CurrentIndex - 1 : 0
            let currentQ = LeftMoveArr(IphoneData, CurrentIndex, IphoneData.length)
            this.setState({
                CurrentIndex: i,
                IphoneData: currentQ
            })
        } else {
            let i = CurrentIndex + 1 < IphoneData.length - 1 ? CurrentIndex + 1 : IphoneData.length - 1
            let currentQ = RightMoveArr(IphoneData, CurrentIndex, IphoneData.length)
            this.setState({
                CurrentIndex: i,
                IphoneData: currentQ
            })
        }
    }
    ClickTable = () => {
        this.setState({
            CurrentData: this.state.IphoneTableData,
            CurrentIndex: -1
        })
    }
    ConfigChange = (e) => {
        this.setState({
            ConfigData: e
        })
    }
    submitForm = () => {
        const { IphoneData, IphoneTableData, ConfigData } = this.state
        //组件数据
        let count = -1 //用来记录title的个数
        let lastData_ = {
            globleConfig: ConfigData,
            componentData: [],
            TableData: IphoneTableData
        }//最终的数据
        if (IphoneData.length > 0 && IphoneData[0].type === 'title') {
            IphoneData.forEach(e => {
                if (e.type === 'title') {
                    lastData_.componentData.push(e)
                    count++
                } else {
                    //添加obj{}
                    if (e.type === 'lookup') {
                        e.data['obj'] = {}
                    } else if (e.type === 'radio' || e.type === 'check') {
                        e.data.forEach(x => {
                            x['obj'] = {}
                        })
                    }
                    lastData_.componentData[count].control.push(e)
                }
            })
            // console.log(IphoneData);
            // console.log(IphoneTableData);
            // console.log(ConfigData);
            console.log(lastData_);

            this.setState({
                visible: true,
                lastData: lastData_
            })
        } else {
            message.warning('必须以‘表题’为组件开始')
        }



    }
    handleSubmit = (e) => {
        const { OriData, lastData } = this.state
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            // this.setState({
            //     loading: true
            // });
            let save = {};

            if (OriData.PK !== -1) {
                //编辑
                save = Object.assign({},
                    OriData,
                    { 'Name': values.Name },
                    { 'Sort': values.Sort },
                    { 'ParentFormID': values.ParentFormID },
                    { 'Bytes': JSON.stringify(lastData) })
            } else {
                //新建
                let user = sessionStorage.getItem('values')
                save = {
                    BranchId: user.BranchId,
                    Bytes: JSON.stringify(lastData),
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

            POST$(API('DataFormSave_mobile').http, save, (res) => {
                res.PK === -1 ? message.error('保存失败') : message.success('保存成功')
                this.props.onTodoClick(['移动权限'])
                this.props.history.push('/Design/IphoneArch')
            })
            this.setState({
                visible: false,
                IphoneData: [],
                CurrentData: {},
                CurrentIndex: -1,
                IphoneTableData: {
                    data: [],
                    columns: [{ title: '列名', dataIndex: '0', type: 'String', enum: [] }],
                    title: '表格',
                    type: 'table',
                    SQL: ''
                },
                ConfigData: [],
            });
        });
    }
    //取消
    handleCancel = (e) => {
        this.props.form.resetFields(['formname'])
        this.setState({
            visible: false,
        });
    }
    handleChange = (value) => {

    }
    render() {
        const { Source, IphoneData, CurrentData, IphoneTableData, ConfigData } = this.state
        const { getFieldDecorator } = this.props.form;
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.68
        let CardList = []
        Source.forEach(e => {
            CardList.push(
                <Card key={e.Key}>
                    {e.Label}
                    <Button style={{ float: "right" }} onClick={this.addCard.bind(this, e.type)}>+</Button>
                </Card>)
        })

        return (
            <Row>
                <Modal
                    title="保存表单"
                    visible={this.state.visible}
                    footer={null}
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
                <Col span={6}>
                    <Card>
                        {CardList}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bodyStyle={{ overflowY: 'scroll', maxHeight: h }}>
                        <IphoneComponent IphoneData={IphoneData} ClickNode={this.ClickNode.bind(this)}></IphoneComponent>
                    </Card>
                    <Card>
                        <div onClick={this.ClickTable.bind(this)}>
                            <Table
                                bordered={true}
                                rowKey='name'
                                title={() => IphoneTableData.title}
                                dataSource={IphoneTableData.data}
                                columns={IphoneTableData.columns}>
                            </Table>
                        </div>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Button onClick={this.submitForm}>提交表单</Button>
                    </Card>
                    <Card
                        title='组件配置'
                        extra={
                            <ButtonGroup style={{ float: "right" }}>
                                <Button onClick={this.OnDel.bind(this)} disabled={CurrentData.Type === 'Table' ? true : false}>删除</Button>
                                <Button onClick={this.UPDOWN.bind(this, 'up')} disabled={CurrentData.Type === 'Table' ? true : false}><Icon type="arrow-up" /></Button>
                                <Button onClick={this.UPDOWN.bind(this, 'down')} disabled={CurrentData.Type === 'Table' ? true : false}><Icon type="arrow-down" /></Button>
                            </ButtonGroup>
                        }>
                        <IphoneC
                            CurrentData={CurrentData}
                            AttributeChange={this.AttributeChange}>
                        </IphoneC>
                    </Card>
                    <Iphoneconfig ConfigChange={this.ConfigChange} ConfigData={ConfigData}></Iphoneconfig>
                </Col>
            </Row>
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
export default connect(
    mapStateToProps, mapDispatchProps
)(Form.create(
    {
        mapPropsToFields(props) {
            let Field = {}
            console.log(props);
            let PropsData = props.history.location.state
            //length是否大于0  显示为 是否新建或编辑
            if (PropsData && Object.keys(PropsData).length > 0) {
                Field['Name'] = Form.createFormField({ value: PropsData.Name });
                Field['Sort'] = Form.createFormField({ value: PropsData.Sort });
                Field['ParentFormID'] = Form.createFormField({ value: PropsData.ParentFormID });
            }
            return Field
        }
    }
)(Iphone));