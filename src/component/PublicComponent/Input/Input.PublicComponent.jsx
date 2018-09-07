import React, { Component } from 'react';
import { Input , Form} from 'antd'

const FormItem = Form.Item
class InputPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { defaultValue, disabled, label, attr, required, message } = this.props.PublicData
        if (this.props.TYPE === 'DEV') {
            return (
                <div>
                    <label style={{ width: '30%', display: 'inline-block' }}>{label}</label>
                    <div style={{ width: '70%', display: 'inline-block' }}>
                        <Input
                            value={defaultValue}
                            disabled={disabled}
                        />
                    </div>
                </div>
            )
        } else {
            <FormItem
                label={label}
            >
                {getFieldDecorator({ attr }, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Input
                        defaultValue={defaultValue}
                        disabled={disabled}
                    />
                )}
            </FormItem>
        }
    }
}

export default InputPublicComponent = Form.create()(InputPublicComponent);




