import React, { Component } from 'react';
import { Radio, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'

const RadioGroup = Radio.Group
const FormItem = Form.Item
class RadioPublicComponent extends Component {
    radioChange = (e) => {
        console.log(e.target.value);
        this.props.inputChange(this.props.PublicData.key,e.target.value)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const {  disabled, label, id, required, message, GroupValue, groupname, layout } = this.props.PublicData
        const radiolist = []
        GroupValue.forEach((e, i) => {
            radiolist.push(<Radio value={e.value} key={i + e.value}>{e.name}</Radio>)
        });
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <RadioGroup name={groupname} disabled={disabled} onChange={this.radioChange.bind(this)}>
                        {radiolist}
                    </RadioGroup>
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
export default RadioPublicComponent = connect(mapStateToProps,mapDispatchProps)(Form.create()(RadioPublicComponent));




