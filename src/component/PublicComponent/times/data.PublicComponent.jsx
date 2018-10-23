import React, { Component } from 'react';
import { DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'
import { getHours } from '../../../lib/MATH/math'

const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item
class DatePublicComponent extends Component {
    TimesChange = (date, dateString) => {
        this.props.inputChange(this.props.PublicData.key, dateString + getHours())
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { disabled, label, key, required, message, layout, placeholder } = this.props.PublicData;

        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(key, {
                    rules: [{ required: { required }, message: "必填项" }],
                })(
                    <DatePicker onChange={this.TimesChange.bind(this)} disabled={disabled} placeholder={placeholder} format={dateFormat} />
                )}
            </FormItem>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchProps = (dispatch) => {
    return {
        inputChange: (key, value) => {
            dispatch(inputChange(key, value))
        }
    }
}
export default DatePublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create()(DatePublicComponent));




