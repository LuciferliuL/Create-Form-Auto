import React, { Component } from 'react';
import { Radio, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'

const RadioGroup = Radio.Group
const FormItem = Form.Item
class RadioPublicComponent extends Component {
    componentDidMount() {
        this.props.inputChange(this.props.PublicData.key, this.props.PublicData.GroupValue[0].value)
        this.props.ChangeOn(this.props.PublicData.GroupValue[0].value, this.props.PublicData.key)
    }
    radioChange = (e) => {
        const { PublicData } = this.props

        this.props.inputChange(PublicData.key, e.target.value)
        PublicData.defaultValue = e.target.value
        this.props.ChangeOn(PublicData, PublicData.key)
    }
    render() {
        const { disabled, label, GroupValue, groupname, layout } = this.props.PublicData
        const radiolist = []
        GroupValue.forEach((e, i) => {
            radiolist.push(<Radio value={e.value} key={i + e.value}>{e.name}</Radio>)
        });
        return (
            <FormItem
                label={label}
                {...layout}
            >
                <RadioGroup
                    defaultValue={this.props.PublicData.GroupValue[0].value}
                    name={groupname}
                    disabled={disabled}
                    onChange={this.radioChange.bind(this)}>
                    {radiolist}
                </RadioGroup>
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
export default RadioPublicComponent = connect(mapStateToProps, mapDispatchProps)(RadioPublicComponent);




