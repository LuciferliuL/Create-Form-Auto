import React, { Component } from 'react';
import { Form, Icon, Input, AutoComplete } from 'antd'

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const FormItem = Form.Item
class LookUpPublicComponent extends Component {

    render() {
        const { getFieldDecorator } = this.props.form
        const { optionLable, dataSource, placeholder, disabled, label, id, required, message, layout } = this.props.PublicData
        const options = dataSource.map(group => (
            <OptGroup
                key={group.title}
            // label={renderTitle(group.title)}
            >
                {group.children.map(opt => (
                    <Option key={opt.title} value={opt.title}>
                        {opt.title}
                        <span className="certain-search-item-count">{opt.count} 人 关注</span>
                    </Option>
                ))}
            </OptGroup>
        ));
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <FormItem
                    label={label}
                    {...layout}
                >
                    {getFieldDecorator(id, {
                        rules: [{ required: { required }, message: { message } }],
                    })(
                        <AutoComplete
                            disabled={disabled}
                            className="certain-category-search"
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={false}
                            dropdownStyle={{ width: 500 }}
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={options}
                            placeholder={placeholder}
                            optionLabelProp={optionLable}
                        >
                            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                        </AutoComplete>
                    )}
                </FormItem>
            </div>
        )
    }
}
// function renderTitle(title) {
//     return (
//         <span>
//             {title}
//             <a
//                 style={{ float: 'right' }}
//                 href="https://www.google.com/search?q=antd"
//                 target="_blank"
//                 rel="noopener noreferrer"
//             >更多
//         </a>
//         </span>
//     );
// }

export default LookUpPublicComponent = Form.create()(LookUpPublicComponent);




