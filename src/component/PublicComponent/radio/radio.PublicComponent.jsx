import React, { Component } from 'react';
import { Radio, Form } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item
class RadioPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const {  disabled, label, id, required, message, GroupValue, groupname, layout } = this.props.PublicData
        const radiolist = []
        GroupValue.forEach((e, i) => {
            radiolist.push(<Radio value={e.value} key={i + e.value}>{e.name}</Radio>)
        });
        return (
            <FormItem
                label={label}
                {...layout}
                labelCol={{span:4}}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <RadioGroup name={groupname} disabled={disabled}>
                        {radiolist}
                    </RadioGroup>
                )}
            </FormItem>
        )


    }
}

export default RadioPublicComponent = Form.create()(RadioPublicComponent);




