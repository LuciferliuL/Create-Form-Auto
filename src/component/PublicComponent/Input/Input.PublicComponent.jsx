import React, { Component } from 'react';
import { Input, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'

const FormItem = Form.Item
class InputPublicComponent extends Component {
    inputChange = (e) => {
        //console.log(e.target.value);

        this.props.inputChange(this.props.PublicData.key, e.target.value)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { placeholder, disabled, label, key, required, message, layout } = this.props.PublicData
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(key, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Input
                        disabled={disabled}
                        placeholder={placeholder}
                        onChange={this.inputChange.bind(this)}
                    />
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
        inputChange: (key, value) => {
            dispatch(inputChange(key, value))
        }
    }
}
export default InputPublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props) {
        // console.log(props);
        if (props.Read === 'R') {
            let Field = {}
            Field[props.PublicData.key] = Form.createFormField({ value: props.PublicData.defaultValue })
            return Field
        }
    },
})(InputPublicComponent));




