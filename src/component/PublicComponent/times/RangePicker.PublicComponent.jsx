import React, { Component } from 'react';
import { DatePicker , Form } from 'antd'

const { RangePicker } = DatePicker;
const FormItem = Form.Item
const dateFormat = 'YYYY/MM/DD';
class RangePickerPublicComponent extends Component {
    TimesChange = (date , dateString) => {
        console.log(date , dateString);
        
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const {  disabled, label, id, required, message,  layout } = this.props.PublicData
        return (
            <FormItem
                label={label}
                {...layout}
                style={{paddingTop:'15px'}}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <RangePicker  onChange={this.TimesChange.bind(this)} disabled={disabled} format={dateFormat}/>
                )}
            </FormItem>
        )
    }
}

export default RangePickerPublicComponent = Form.create()(RangePickerPublicComponent);




