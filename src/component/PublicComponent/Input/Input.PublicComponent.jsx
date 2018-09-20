import React, { Component } from 'react';
import { Input, Form } from 'antd'

const FormItem = Form.Item
class InputPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { placeholder, disabled, label, id, required, message, layout } = this.props.PublicData
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Input
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                )}
            </FormItem>
        )
    }
}

export default InputPublicComponent = Form.create({
    mapPropsToFields(props) {
        console.log(props);
        if(props.Read === 'R'){
            let Field = {}
            Field[props.PublicData.id] = Form.createFormField({value:props.PublicData.defaultValue})
            return Field
        }
      },
})(InputPublicComponent);




