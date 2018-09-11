import React, { Component } from 'react';
import { Radio, Form } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item
class RadioPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const {  disabled, label, id, required, message, RadioValue, groupname, layout } = this.props.PublicData
        const radiolist = []
        RadioValue.forEach((e, i) => {
            radiolist.push(<Radio value={e.value} key={i + e.value}>{e.name}</Radio>)
        });
        return (
            <FormItem
                label={label}
                {...layout}
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




