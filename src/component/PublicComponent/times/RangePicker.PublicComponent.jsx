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
        console.log(date, dateString);
        this.props.inputChange(this.props.PublicData.key, dateString)
    }
    render() {
        // const { getFieldDecorator } = this.props.form
        const { disabled, label, layout, defaultValue } = this.props.PublicData
        console.log(defaultValue);

        let ds = new Date();
        let formatwdate = '';
        var y;
        var m;
        var d;
        let oneweekdate = new Date();

        let days = []
        //有数据
        if (defaultValue === -1) {
            //当天
            days = [moment(new Date(), dateFormat), moment(new Date(), dateFormat)]
        } else if (defaultValue === 1) {
            //前一天
            ds = new Date()
            oneweekdate = new Date(ds - 24 * 3600 * 1000);
            y = oneweekdate.getFullYear();
            m = oneweekdate.getMonth() + 1;
            d = oneweekdate.getDate();
            formatwdate = y + '-' + m + '-' + d;
            days = [moment(formatwdate, dateFormat), moment(getDat(), dateFormat)]
        } else if (defaultValue === 7) {
            ds = new Date()
            oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
            y = oneweekdate.getFullYear();
            m = oneweekdate.getMonth() + 1;
            d = oneweekdate.getDate();
            formatwdate = y + '-' + m + '-' + d;
            days = [moment(formatwdate, dateFormat), moment(getDat(), dateFormat)]
        } else if (defaultValue === 30) {
            ds = new Date()
            ds.setMonth(ds.getMonth() - 1);
            y = ds.getFullYear();
            m = ds.getMonth() + 1;
            d = ds.getDate();
            formatwdate = y + '-' + m + '-' + d;
            days = [moment(formatwdate, dateFormat), moment(getDat(), dateFormat)]
        }

        return (
            <FormItem
                label={label}
                {...layout}
            >
                <RangePicker
                    onChange={this.TimesChange.bind(this)}
                    disabled={disabled}
                    format={dateFormat}
                    defaultValue={days} />
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




