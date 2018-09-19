import React, { Component } from 'react';
import { Input, Form } from 'antd'

const FormItem = Form.Item
class InputPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { placeholder, disabled, label, id, required, message,layout } = this.props.PublicData 
        return (
            <FormItem
                label={label}
                {...layout}
                labelCol={{span:3}}
            >
                {getFieldDecorator( id , {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Input
                        // defaultValue={defaultValue}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                )}
            </FormItem>
        )
    }
}

export default InputPublicComponent = Form.create()(InputPublicComponent);




