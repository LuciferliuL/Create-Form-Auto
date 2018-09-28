import React, { Component } from 'react';
import { DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'
import { getHours } from '../../../lib/MATH/math'

const { RangePicker } = DatePicker;
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD';
class RangePickerPublicComponent extends Component {
    TimesChange = (date, dateString) => {
        // console.log(date, dateString);
        let times = [dateString[0] + getHours(), dateString[1] + getHours()]
        this.props.inputChange(this.props.PublicData.key, times)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { disabled, label, id, required, message, layout } = this.props.PublicData
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <RangePicker onChange={this.TimesChange.bind(this)} disabled={disabled} format={dateFormat} />
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
export default RangePickerPublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create()(RangePickerPublicComponent));




