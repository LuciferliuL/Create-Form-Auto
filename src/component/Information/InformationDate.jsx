import React, { Component } from 'react';
import { Radio } from 'antd'
import moment from 'moment';
import { DatePicker } from 'antd';

const RadioGroup = Radio.Group
class InformationDate extends Component {
    state = {
        value: 0,
        dateValue: moment('2018-11-06 00:00', 'YYYY-MM-DD HH:mm'),
        dateString:''
    }
    componentDidMount() {
        const { selectedData } = this.props
        if (selectedData[0].PK !== -1) {
            let type = selectedData[0].DueDatetype
            let date = selectedData[0].DueDateCorn
            // console.log(date);

            this.setState({
                value: type === '立即' ? 0 : 1,
                dateValue: type === '立即' ? moment('2018-11-06 00:00', 'YYYY-MM-DD HH:mm') : moment(date , 'YYYY-MM-DD HH:mm'),
            })
        }
    }
    componentWillReceiveProps(pre) {
        const { selectedData } = pre
        if (selectedData[0].PK !== -1) {
            let type = selectedData[0].DueDatetype
            let date = selectedData[0].DueDateCorn
            // console.log(date);

            this.setState({
                value: type === '立即' ? 0 : 1,
                dateValue: type === '立即' ? moment('2018-11-06 00:00', 'YYYY-MM-DD HH:mm') : moment(date, 'YYYY-MM-DD HH:mm'),
            })
        }
    }
    onChange = (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        })
        if(e.target.value === 0){
            this.props.EditSelectedRow({
                DueDatetype: '立即',
                DueDateCorn: '立即'
            })
        }
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

    // disabledDateTime = () => {
    //     return {
    //         disabledHours: () => this.range(0, 24).splice(4, 20),
    //         disabledMinutes: () => this.range(30, 60),
    //         disabledSeconds: () => [55, 56],
    //     };
    // }
    Onchange = (date, dateString) => {
        console.log(dateString);
        this.setState({
            dateValue: date,
            dateString:dateString
        })
    }
    onOk = () => {
        let DueDatetype = this.state.value === 0 ? '立即' : '时间'
        let DueDateCorn = this.state.value === 0 ? '立即' :this.state.dateString
        this.props.EditSelectedRow({
            DueDatetype: DueDatetype,
            DueDateCorn: DueDateCorn
        })
    }
    render() {
        const { defaultValue, dateValue } = this.state
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
                            onOk={this.onOk}
                            onChange={this.Onchange}
                            value={dateValue}
                            format="YYYY-MM-DD HH:mm"
                            // disabledDate={this.disabledDate}
                            // disabledTime={this.disabledDateTime}
                            showTime={{ format: 'HH:mm' }}
                        /> </div> : null}
            </div>
        );
    }
}

export default InformationDate;