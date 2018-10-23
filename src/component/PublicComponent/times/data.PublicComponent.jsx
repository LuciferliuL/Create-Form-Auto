import React, { Component } from 'react';
import { DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'
import { getDat } from '../../../lib/MATH/math'
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item
class DatePublicComponent extends Component {
    TimesChange = (date, dateString) => {
        // console.log(date, dateString);
        this.props.inputChange(this.props.PublicData.key, dateString)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { disabled, label, key, required, message, layout, placeholder, defaultValue } = this.props.PublicData
        let days = ''
        //有数据
        if (defaultValue === -1) {
            //当天
            days = moment(new Date(), dateFormat)
        } else if (defaultValue === 1) {
            //前一天
            var ds = new Date()
            var oneweekdate = new Date(ds - 24 * 3600 * 1000);
            var y = oneweekdate.getFullYear();
            var m = oneweekdate.getMonth() + 1;
            var d = oneweekdate.getDate();
            var formatwdate = y + '-' + m + '-' + d;
            days = moment(formatwdate, dateFormat)
        } else if (defaultValue === 7) {
            var ds = new Date()
            var oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
            var y = oneweekdate.getFullYear();
            var m = oneweekdate.getMonth() + 1;
            var d = oneweekdate.getDate();
            var formatwdate = y + '-' + m + '-' + d;
            days = moment(formatwdate, dateFormat)
        } else if (defaultValue === 30) {
            var ds = new Date()
            ds.setMonth(ds.getMonth() - 1);
            var y = ds.getFullYear();
            var m = ds.getMonth() + 1;
            var d = ds.getDate();
            var formatwdate = y + '-' + m + '-' + d;
            days = moment(formatwdate, dateFormat)
        }
        console.log(defaultValue);
        
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {/* {getFieldDecorator(key, {
                    rules: [{ required: { required }, message: "必填项" }],
                })( */}
                <DatePicker
                    onChange={this.TimesChange.bind(this)}
                    disabled={disabled}
                    placeholder={placeholder}
                    format={dateFormat}
                    defaultValue={days}
                />
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
export default DatePublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create()(DatePublicComponent));




