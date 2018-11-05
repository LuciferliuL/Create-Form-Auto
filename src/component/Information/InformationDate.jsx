import React, { Component } from 'react';
import { Radio } from 'antd'
import moment from 'moment';
import { DatePicker } from 'antd';


const { MonthPicker, RangePicker } = DatePicker;
const RadioGroup = Radio.Group
class InformationDate extends Component {
    state = {
        value: 0
    }
    onChange = (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        })
    }
    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    disabledDateTime = () => {
        return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }
    render() {
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={0}>立即发送</Radio>
                    <Radio value={1}>指定时间</Radio>
                </RadioGroup>

                {this.state.value === 1 ?
                    <div>
                        <p>请选择详细时间</p>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={this.disabledDate}
                            disabledTime={this.disabledDateTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        /> </div> : null}
            </div>
        );
    }
}

export default InformationDate;