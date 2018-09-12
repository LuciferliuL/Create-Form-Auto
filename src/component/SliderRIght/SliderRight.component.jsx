import React, { Component } from 'react';
import { Card, Tabs, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { currentAttrUpdata, formUpdataFromCurrent } from './action/Right.action.js'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const HTMLTitle = [
    { label: 'id', name: 'ID' },
    { label: 'message', name: '错误提示' },
    { label: 'label', name: '标题' },
    { label: 'required', name: '必填项' },
    { label: 'disabled', name: '是否禁止' },
]
class SliderRightcomponent extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { currentAttr } = this.props.currentAttr
        // console.log(currentAttr);

        let inputList = []
        HTMLTitle.forEach((e, i) => {
            inputList.push(
                <FormItem
                    label={e.name}
                    {...formItemLayout}
                    key={i}
                >
                    {getFieldDecorator(e.label)(
                        <Input
                        />
                    )}
                </FormItem>
            )
        })




        return (
            <Card>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="基础属性" key="1">
                            {inputList}
                        </TabPane>
                        <TabPane tab="位置属性" key="2">

                        </TabPane>
                    </Tabs>
                </Form>
            </Card>
        );
    }
}

const mapPropsToState = (state) => {
    return {

    }
}
const mapDispatchProps = (dispatch) => {
    return {
        updata: (k) => {
            dispatch(currentAttrUpdata(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        }
    }
}
export default connect(mapPropsToState, mapDispatchProps)(Form.create({
    onFieldsChange(props, changedFields) {
        console.log(props);
        console.log(changedFields);
        let value = changedFields[Object.keys(changedFields)[0]]['value']
        let label = changedFields[Object.keys(changedFields)[0]]['name']
        let obj = {}
        obj[label] = value
        props.updata(props.currentAttr)
        props.upForm(props.currentAttr)
    },
    mapPropsToFields(props) {
        // console.log(props.currentAttr);
        const { currentAttr } = props
        let Field = {}
        if (Object.keys(currentAttr).length > 0) {
            HTMLTitle.forEach(e => {
                Field[e.label] = Form.createFormField({ value: currentAttr[e.label] })
            })
        }

        // Object.keys(initialTags).forEach(e => {
        //     Field[e] = Form.createFormField({ value: initialTags[e] })
        // })
        return Field;
    },
    onValuesChange(_, values) {
        // console.log(values);
    },
})(SliderRightcomponent));