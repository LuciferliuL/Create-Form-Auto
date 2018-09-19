import React, { Component } from 'react';
import { Switch, Form } from 'antd'

const FormItem = Form.Item
class SwitchPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { id, required, message, label, disabled, layout, checked, unCheckedChildren, checkedChildren } = this.props.PublicData

        return (
            <FormItem
                label={label}
                {...layout}
                labelCol={{span:3}}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Switch
                        defaultChecked={checked}
                        disabled={disabled}
                        checkedChildren={checkedChildren}
                        unCheckedChildren={unCheckedChildren} />

                )}
            </FormItem>
        )
    }
}

export default SwitchPublicComponent = Form.create()(SwitchPublicComponent);




