import React, { Component } from 'react';
import { DatePicker , Form } from 'antd'


const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item
class DatePublicComponent extends Component {
    TimesChange = (date , dateString) => {
        console.log(date , dateString);
        
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const {  disabled, label, id, required, message,  layout ,placeholder} = this.props.PublicData
        return (
            <FormItem
                label={label}
                {...layout}
                labelCol={{span:4}}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <DatePicker onChange={this.TimesChange.bind(this)} disabled={disabled} placeholder={placeholder} format={dateFormat}/>
                )}
            </FormItem>
        )
    }
}

export default DatePublicComponent = Form.create()(DatePublicComponent);




