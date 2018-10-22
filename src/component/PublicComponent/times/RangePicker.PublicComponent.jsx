import React, { Component } from 'react';
import { DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'
import { getDat } from '../../../lib/MATH/math'
import moment from 'moment';

const { RangePicker } = DatePicker;
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD';
class RangePickerPublicComponent extends Component {
    TimesChange = (date, dateString) => {
        // console.log(date, dateString);
        this.props.inputChange(this.props.PublicData.key, dateString)
    }
    render() {
        // const { getFieldDecorator } = this.props.form
        const { disabled, label, layout, defaultValue } = this.props.PublicData
        let days = []
        if (defaultValue.length > 0) {
            //有数据
            if (defaultValue[0] === -1) {
                //当天
                days = [moment(new Date(), dateFormat), moment(new Date(), dateFormat)]
            } else {
                //时间段
                days = [moment(defaultValue[0], dateFormat), moment(defaultValue[1] === -1 ? getDat() : defaultValue[1], dateFormat)]
            }
        }
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {/* {getFieldDecorator(key, {
                    rules: [{ required: { required }, message: { message } }],
                })( */}
                <RangePicker
                    onChange={this.TimesChange.bind(this)}
                    disabled={disabled}
                    format={dateFormat}
                    defaultValue={days} />
                {/* )} */}
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
export default RangePickerPublicComponent = connect(mapStateToProps, mapDispatchProps)(RangePickerPublicComponent)
// (Form.create()(RangePickerPublicComponent));




