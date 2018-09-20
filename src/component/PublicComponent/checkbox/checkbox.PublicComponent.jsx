import React, { Component } from 'react';
import { Checkbox, Form } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item
class CheckboxPublicComponent extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { checked, disabled, label, id, required, message, layout } = this.props.PublicData

        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Checkbox disabled={disabled} defaultChecked={checked} />

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




