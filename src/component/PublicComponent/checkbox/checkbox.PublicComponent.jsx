import React, { Component } from 'react';
import { Checkbox, Form } from 'antd'

const FormItem = Form.Item
class CheckboxPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { checked, disabled, label, id, required, message, layout } = this.props.PublicData

        return (
            <FormItem
                label={label}
                {...layout}
                style={{paddingTop:'15px'}}
            >
                {getFieldDecorator( id , {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Checkbox checked={checked} disabled={disabled} />

                )}
        </FormItem>
        )
    }
}

export default CheckboxPublicComponent = Form.create()(CheckboxPublicComponent);




