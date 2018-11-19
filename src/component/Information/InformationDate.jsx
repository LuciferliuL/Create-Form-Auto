import React, { Component } from 'react';
import { Radio,  Select } from 'antd'
import moment from 'moment';
import { connect } from 'react-redux'
import { copyDataSource } from './information.action'

const Option = Select.Option
const RadioGroup = Radio.Group
class InformationDate extends Component {
    state = {
        value: 0,
        dateValue: moment('2018-11-06 00:00', 'YYYY-MM-DD HH:mm'),
        dateString: ''
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
        } else {
            this.props.copyDataSource({
                DueDatetype: '时间',
                DueDateCorn: '0 0 0 * * ?'
            })
        }
    }
    SeChange = (e) => {
        // console.log(e);
        this.props.copyDataSource({
            DueDateCorn: e
        })
    }
    render() {
        const { DueDateCorn, DueDatetype } = this.props.information
        const SelectOptions = []
        for (let i = 0; i < 24; i++) {
            let index = `0 0 ${i} * * ?`
            SelectOptions.push(<Option value={index} key={i}>{i}点</Option>)
        }
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={DueDatetype === '立即' ? 0 : 1} disabled={this.props.news}>
                    <Radio value={0} >立即发送</Radio>
                    <Radio value={1} >每天</Radio>
                </RadioGroup>

                {DueDatetype === '时间' ?
                    <div>
                        <h3>执行时间</h3>
                        <Select style={{ width: '50%' }} onChange={this.SeChange} value={DueDateCorn}>
                            {SelectOptions}
                        </Select>
                    </div> : null}
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