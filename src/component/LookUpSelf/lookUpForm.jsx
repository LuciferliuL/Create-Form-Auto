import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col, Modal, Table, Tag, Checkbox, Radio } from 'antd';
import { LookUpApi } from '../../lib/API/lookUpList'
import { POST$ } from '../../lib/MATH/math'

const FormItem = Form.Item;
const baseData = [
    { label: 'ID', id: 'id', message: 'ID必填' },
    { label: '检索名称', id: 'label', message: '检索名称必填' },
    { label: '显示字符', id: 'uniqueKey', message: '显示字符字段必填' },
    { label: '回传KEY', id: 'upKey', message: '回传KEY字段必填' },
    { label: '自定义地址', id: 'CustomDirectiveURL', message: '自定义地址字段必填' },
    { label: '自定义方法', id: 'CustomDirectiveMethod', message: '自定义方法字段必填' },
    { label: '是否自定义接口', id: 'isCustomDirective', message: '是否自定义接口字段必填' },
]


const { TextArea } = Input;

function mapStateToProps(state) {
    return {

    };
}

class LookUpForm extends React.Component {
    state = {
        visible: false,
        SQL: '',
        name: '',
        i: -1,
        columnsIndex: -1,
        Tabledata: [

        ],
        isDirective: false,
        columns: [
            {
                title: '列名',
                dataIndex: 'title',
                render: (text, record, i) => {
                    return (
                        i === this.state.columnsIndex ?
                            <Input
                                type="text"
                                value={text}
                                style={{ width: '80%' }}
                                onChange={this.inputChange.bind(this, 'title')} /> :
                            <div style={{ padding: 6 }}>{text}</div>
                    )
                }
            }, {
                title: '字段',
                dataIndex: 'dataIndex',
                render: (text, record, i) => {
                    return (
                        i === this.state.columnsIndex ?
                            <Input
                                type="text"
                                value={text}
                                style={{ width: '80%' }}
                                onChange={this.inputChange.bind(this, 'dataIndex')} /> :
                            text
                    )
                }
            }, {
                title: '宽度',
                dataIndex: 'width',
                render: (text, record, i) => {
                    return (
                        i === this.state.columnsIndex ?
                            <Input
                                type="text"
                                value={text}
                                style={{ width: '80%' }}
                                onChange={this.inputChange.bind(this, 'width')} /> :
                            text
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'key',
                render: (text, record, i) => {
                    // console.log(i);
                    if (i === this.state.i) {
                        return (
                            <span>
                                <Tag color="#f50" onClick={this.TagChange.bind(this, 'save', i)}>保存</Tag>
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                <Tag color="#87d068" onClick={this.TagChange.bind(this, 'add', i)}>添加</Tag>
                                <Tag color="#2db7f5" onClick={this.TagChange.bind(this, 'edit', i)}>修改</Tag>
                                <Tag color="#f50" onClick={this.TagChange.bind(this, 'del', i)}>删除</Tag>
                            </span>
                        )
                    }
                }

            }
        ]
    }
    componentDidMount() {
        console.log(this.props.tabledata);
        if (this.props.tabledata.length > 0) {
            let isD = JSON.parse(this.props.tabledata[0].Bytes)
            // console.log(isD);
            this.setState({
                isDirective: isD.isCustomDirective
            })
        }

    }
    componentWillReceiveProps(pre) {
        // pre.form.resetFields()
        if (pre.tabledata.length > 0) {
            let isD = JSON.parse(pre.tabledata[0].Bytes)
            console.log(isD);
            this.setState({
                visible: false,
                SQL: '',
                name: '',
                columnsIndex: -1,
                Tabledata: [],
                isDirective: isD.isCustomDirective
            })
        }
    }
    inputChange = (name, e) => {
        const { Tabledata, columnsIndex } = this.state
        Tabledata[columnsIndex][name] = e.target.value
        this.setState((pre) => (
            {
                Tabledata: Tabledata
            }
        ))
    }
    TagChange = (name, index) => {
        const { Tabledata } = this.state
        // console.log(Tabledata);
        switch (name) {
            case 'add':
                let num = Math.random().toFixed(4)
                let list = []
                Tabledata !== undefined && Tabledata.length > 0 ?
                    Tabledata.forEach((e, i) => {
                        list.push(e)
                        if (i === index) {
                            list.push({
                                key: num,
                                title: num,
                                dataIndex: num,
                                width: '',
                            })
                        }

                    }) : list.push({
                        key: num,
                        title: num,
                        dataIndex: num,
                        width: '',
                    })
                this.setState({
                    Tabledata: list,
                })
                break;
            case 'edit':
                this.setState({
                    columnsIndex: index,
                    i: index
                })

                break
            case 'del':
                let list_ = []
                Tabledata.forEach((e, i) => {
                    if (i !== index) {
                        list_.push(e)
                    }
                })
                this.setState({
                    Tabledata: list_
                })
                break
            case 'save':
                this.setState({
                    columnsIndex: -1,
                    i: -1
                })
                break
            default:
                break;
        }

    }
    pointerClick = (e) => {
        this.setState({
            visible: true,
            name: e,
            SQL: this.props.form.getFieldValue('SQL'),
            Tabledata: this.props.form.getFieldValue('columns')
        })
    }
    handleOk = () => {
        this.setState({
            visible: false
        })
        this.props.form.setFieldsValue({ SQL: this.state.SQL, columns: this.state.Tabledata })
        // console.log(this.state.Tabledata);
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleSubmit = (e) => {
        let d_d = this.props.tabledata
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && d_d.length === 0) {//新增
                // console.log('Received values of form: ', values);
                let data = {
                    GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
                    icons: 'gift', id: 8, type: 'LookUp', required: false,
                    message: "", label: "商品检索", disabled: false,
                    layout: {
                        labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
                        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
                    }, tr: 0, values: '',
                    scroll: 1200,
                    show: false, columns: [], SQL: '', dataSource: []
                }
                Object.assign(data, values)
                // console.log(data);
                let param = {
                    Name: values.label,
                    PK: -1,
                    Bytes: JSON.stringify(data),
                    Remark: ''
                }
                POST$(LookUpApi('LookUpSave').http, param, (res) => {
                    console.log(res);
                    this.props.collapseChange('1')
                    this.props.form.resetFields()
                    this.setState({
                        visible: false,
                        SQL: '',
                        name: '',
                        columnsIndex: -1,
                        Tabledata: [],
                    })
                })

            } else if (!err && d_d.length > 0) {//修改
                // console.log(d_d);

                let data_ = JSON.parse(d_d[0].Bytes)
                Object.assign(data_, values)
                d_d[0].Bytes = JSON.stringify(data_)
                POST$(LookUpApi('LookUpSave').http, d_d[0], (res) => {
                    // console.log(res);
                    this.props.collapseChange('1')
                    this.props.form.resetFields()
                    this.setState({
                        visible: false,
                        SQL: '',
                        name: '',
                        columnsIndex: -1,
                        Tabledata: [],
                    })
                })
            }
        });
    }
    TextAreaChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            SQL: e.target.value
        })
    }
    render() {
        const { Tabledata, columns, isDirective } = this.state
        const { getFieldDecorator } = this.props.form;
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.8

        const layout = {
            labelCol: { xs: { span: 24 }, sm: { span: 6 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 18 } }
        }
        let formData = []
        // console.log(baseData);

        baseData.forEach(e => {
            if (e.id === 'isCustomDirective') {
                formData.push(
                    <FormItem {...layout} label={e.label} key={e.id}>
                        {getFieldDecorator(e.id, {
                            valuePropName: 'checked',
                        })(
                            <Checkbox onChange={() => { this.setState({ isDirective: !isDirective }) }}></Checkbox>
                        )}
                    </FormItem>
                )
            } else if (e.id === 'CustomDirectiveMethod' && isDirective) {
                formData.push(
                    <FormItem {...layout} label={e.label} key={e.id}>
                        {getFieldDecorator(e.id)(
                            <Radio.Group>
                                <Radio value={0}>POST</Radio>
                                <Radio value={1}>GET</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                )
            } else if (e.id === 'CustomDirectiveURL' && isDirective) {
                formData.push(
                    <FormItem {...layout} label={e.label} key={e.id}>
                        {getFieldDecorator(e.id)(
                            <Input />
                        )}
                    </FormItem>
                )
            } else if (e.id !== 'CustomDirectiveURL' && e.id !== 'CustomDirectiveMethod') {
                formData.push(
                    <FormItem {...layout} label={e.label} key={e.id}>
                        {getFieldDecorator(e.id, {
                            rules: [{ required: true, message: e.message }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                )
            }
        })

        return (
            <Row>
                <Modal
                    title="SQL"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    centered={true}
                    onCancel={this.handleCancel}
                    bodyStyle={{ overflow: 'auto', height: h }}
                    maskClosable={false}
                    width={800}
                    destroyOnClose={true}
                >
                    {
                        this.state.name === 'SQL' ?
                            <TextArea
                                value={this.state.SQL}
                                onChange={this.TextAreaChange.bind(this)}
                                rows={30}
                                autosize={{ minRows: 30 }}
                            >
                            </TextArea> :
                            <div>
                                <Button onClick={this.TagChange.bind(this, 'add', 0)}>添加</Button>
                                <Table
                                    columns={columns}
                                    dataSource={Tabledata}
                                    bordered={true}
                                    pagination={false}
                                    rowKey='key'
                                    bodyStyle={{ padding: 5 }}

                                ></Table>
                            </div>

                    }
                </Modal>

                <Form
                    onSubmit={this.handleSubmit} >
                    <Col span={12}>
                        {formData}
                    </Col>

                    <Col span={12}>
                        <FormItem label='SQL'
                            labelCol={{ xs: { span: 24 }, sm: { span: 3 } }}
                            wrapperCol={{ xs: { span: 24 }, sm: { span: 21 } }}>
                            {getFieldDecorator('SQL', {
                                rules: [{ required: true, message: 'SQL必填' }],
                            })(
                                <Input addonAfter={<span style={{ cursor: 'pointer' }} onClick={this.pointerClick.bind(this, 'SQL')}><Icon type="setting" />设置SQL</span>} />
                            )}
                        </FormItem>
                        <FormItem label='列表数据'
                            labelCol={{ xs: { span: 24 }, sm: { span: 3 } }}
                            wrapperCol={{ xs: { span: 24 }, sm: { span: 21 } }}>
                            {getFieldDecorator('columns', {
                                rules: [{ required: true, message: 'columns必填' }],
                            })(
                                <Input addonAfter={<span style={{ cursor: 'pointer' }} onClick={this.pointerClick.bind(this, 'column')}><Icon type="setting" />设置列数据</span>} />
                            )}
                        </FormItem>

                    </Col>
                    <Col span={24}>
                        <FormItem style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
        );
    }
}

export default connect(
    mapStateToProps,
)(Form.create({
    mapPropsToFields(props) {
        // console.log(props);
        let field = {}
        if (props.tabledata.length > 0) {
            let source = JSON.parse(props.tabledata[0].Bytes)
            let keys = Object.keys(source)
            keys.forEach(e => {
                field[e] = Form.createFormField({ value: source[e] })
            })
        }
        console.log(field);

        return field
    }
})(LookUpForm));