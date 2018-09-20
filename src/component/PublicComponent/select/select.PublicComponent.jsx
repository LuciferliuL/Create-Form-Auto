import React, { Component } from 'react';
import { Select, Form } from 'antd'

const Option = Select.Option
const FormItem = Form.Item
class SelectPublicComponent extends Component {
    handleChange = (e) => {
        console.log(e);

    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { disabled, label, id, required, message, GroupValue, layout } = this.props.PublicData
        const SelectGroup = []
        GroupValue.forEach((e, i) => {
            SelectGroup.push(<Option value={e.value} key={i + e.value}>{e.name}</Option>)
        });
        return (
            <FormItem
                label={label}
                {...layout}
            >
                {getFieldDecorator(id, {
                    rules: [{ required: { required }, message: { message } }],
                })(
                    <Select onChange={(e) => this.handleChange.bind(this, e)}
                        disabled={disabled}>
                        {SelectGroup}
                    </Select>
                )}
            </FormItem>
        )


    }
}

export default SelectPublicComponent = Form.create()(SelectPublicComponent);




