import React, { Component } from 'react';
import { Radio,DatePicker } from 'antd'
import moment from 'moment';
import { connect } from 'react-redux'
import { copyDataSource } from './information.action'


const RadioGroup = Radio.Group
class InformationDate extends Component {
    state = {
        value: 0,
        dateValue: moment('2018-11-06 00:00', 'YYYY-MM-DD HH:mm'),
        dateString: ''
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
    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
        if (e.target.value === 0) {
            this.props.copyDataSource({
                DueDatetype: '立即',
                DueDateCorn: '立即'
            })
        }else{
            this.props.copyDataSource({
                DueDatetype: '时间',
                DueDateCorn: moment(new Date(), 'YYYY-MM-DD HH:mm')
            })
        }
    }
    
    Onchange = (date, dateString) => {
        this.setState({
            dateValue: date,
            dateString: dateString
        })
        this.props.copyDataSource({
            DueDateCorn: dateString
        })
    }
    render() {
        const { DueDateCorn, DueDatetype } = this.props.information

        return (
            <div>
                <RadioGroup onChange={this.onChange} value={DueDatetype === '立即' ? 0 : 1} disabled={this.props.news}>
                    <Radio value={0}>立即发送</Radio>
                    <Radio value={1}>指定时间</Radio>
                </RadioGroup>

                {DueDatetype === '时间' ?
                    <div>
                        <p>请选择详细时间</p>
                        <DatePicker
                            onOk={this.onOk}
                            onChange={this.Onchange}
                            value={DueDateCorn=== '立即' 
                            ? moment('2018-11-06 00:00', 'YYYY-MM-DD HH:mm') 
                            : moment(DueDateCorn, 'YYYY-MM-DD HH:mm')}
                            format="YYYY-MM-DD HH:mm"
                            showTime={{ format: 'HH:mm' }}
                        /> </div> : null}
            </div>
        );
    }
}
function mapStateToProps(state) {
    // console.log(state.information);

    return {
        information: state.information
    }
}

function mapDispatchProps(dispatch) {
    return {
        copyDataSource: (k) => {
            dispatch(copyDataSource(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(InformationDate);