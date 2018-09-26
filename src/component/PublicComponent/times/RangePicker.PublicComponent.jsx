import React, { Component } from 'react';
import { DatePicker , Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'


const { RangePicker } = DatePicker;
const FormItem = Form.Item
const dateFormat = 'YYYY/MM/DD';
class RangePickerPublicComponent extends Component {
    TimesChange = (date , dateString) => {
        console.log(date , dateString);
        this.props.inputChange(this.props.PublicData.key,dateString)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const {  disabled, label, id, required, message,  layout } = this.props.PublicData
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <RangePicker  onChange={this.TimesChange.bind(this)} disabled={disabled} format={dateFormat}/>
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
        inputChange:(key,value)=>{
            dispatch(inputChange(key,value))
        }
    }
}
export default RangePickerPublicComponent = connect(mapStateToProps,mapDispatchProps)(Form.create()(RangePickerPublicComponent));




