import React, { Component } from 'react';
import { Checkbox, Form } from 'antd'
import { connect } from 'react-redux'
import { inputChange } from '../Public.action'

const FormItem = Form.Item
class CheckboxPublicComponent extends Component {
    CheckboxChange = (e) => {
        console.log(e.target.checked);
        
        this.props.inputChange(this.props.PublicData.key,e.target.checked)
        
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { checked, disabled, label, key, required, message, layout } = this.props.PublicData

        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(key, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Checkbox disabled={disabled} defaultChecked={checked} onChange={this.CheckboxChange.bind(this)}/>

                )}
            </FormItem>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        current: state.currentAttr
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        inputChange:(key,value)=>{
            dispatch(inputChange(key,value))
        }
    }
}
export default CheckboxPublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props) {
        // console.log(props);
        let Field = {}
        let values = props.current.checked
        let key = props.current.key
        Field[key] = Form.createFormField({ value: values })
        return Field
    },
})(CheckboxPublicComponent));




