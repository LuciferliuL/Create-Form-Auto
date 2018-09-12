import React, { Component } from 'react';
import { Switch, Form } from 'antd'

const FormItem = Form.Item
class SwitchPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { id, required, message, label, disabled, layout , checked, unCheckedChildren, checkedChildren} = this.props.PublicData

        return (
            <FormItem
                label={label}
                {...layout}
                style={{ paddingTop: '10px' }}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Switch
                        defaultchecke={checked.toString()}
                        disabled={disabled}
                        checkedChildren={checkedChildren}
                        unCheckedChildren={unCheckedChildren} />

                )}
            </FormItem>
        )
    }
}

export default SwitchPublicComponent = Form.create()(SwitchPublicComponent);




