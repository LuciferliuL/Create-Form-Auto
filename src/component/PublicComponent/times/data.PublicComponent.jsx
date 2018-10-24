import React, { Component } from 'react';
import { DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item
class DatePublicComponent extends Component {
    TimesChange = (date, dateString) => {
        // console.log(date, dateString);
        this.props.inputChange(this.props.PublicData.key, dateString)
    }
    render() {
        const { disabled, label, layout, placeholder, defaultValue } = this.props.PublicData
        let days = '';
        var ds = new Date();
        var formatwdate = '';
        var y;
        var m;
        var d;

        //有数据
        if (defaultValue === -1) {
            //当天
            days = moment(new Date(), dateFormat)
        } else if (defaultValue === 1) {
            //前一天
            ds = new Date();
            var oneweekdate = new Date(ds - 24 * 3600 * 1000);
            y = oneweekdate.getFullYear();
            m = oneweekdate.getMonth() + 1;
            d = oneweekdate.getDate();
            formatwdate = y + '-' + m + '-' + d;
            days = moment(formatwdate, dateFormat)
        } else if (defaultValue === 7) {
            ds = new Date()
            var oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
            y = oneweekdate.getFullYear();
            m = oneweekdate.getMonth() + 1;
            d = oneweekdate.getDate();
            formatwdate = y + '-' + m + '-' + d;
            days = moment(formatwdate, dateFormat)
        } else if (defaultValue === 30) {
            ds = new Date()
            ds.setMonth(ds.getMonth() - 1);
            y = ds.getFullYear();
            m = ds.getMonth() + 1;
            d = ds.getDate();
            formatwdate = y + '-' + m + '-' + d;
            days = moment(formatwdate, dateFormat)
        }
        console.log(defaultValue);

        return (
            <FormItem
                label={label}
                {...layout}
            >
                <DatePicker
                    onChange={this.TimesChange.bind(this)}
                    disabled={disabled}
                    placeholder={placeholder}
                    format={dateFormat}
                    defaultValue={days}
                />
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




