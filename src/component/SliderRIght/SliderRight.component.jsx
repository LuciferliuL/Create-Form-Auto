import React, { Component } from 'react';
import { Card, Tabs, Form, Input } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const HTMLTitle = [
    { label: 'id', name: 'ID' },
    { label: 'message', name: '错误提示' },
    { label: 'label', name: '标题' },
    { label: 'defaultValue', name: '默认提示' }
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        let inputList = []
        HTMLTitle.forEach(e => {
            inputList.push(
                <FormItem
                    key={e.name}
                    label={e.name}
                    {...formItemLayout}>
                    {getFieldDecorator(e.label)(
                        <Input />
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

export default Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        // console.log(props);
        // const { initialTags } = props
        // let Field = {}
        // HTMLTitle.forEach(e => {
        //     Field[e.label] = Form.createFormField({ value: initialTags[e.label] })
        // })
        // Object.keys(initialTags).forEach(e => {
        //     Field[e] = Form.createFormField({ value: initialTags[e] })
        // })
        // return Field;
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})(SliderRightcomponent);