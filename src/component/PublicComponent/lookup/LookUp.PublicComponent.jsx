import React, { Component } from 'react';
import { Form, Icon, Input, AutoComplete } from 'antd'

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const FormItem = Form.Item
class LookUpPublicComponent extends Component {

    render() {
        const { getFieldDecorator } = this.props.form
        const { optionLable, dataSource, placeholder, disabled, label, id, required, message, layout, columns } = this.props.PublicData
        const options = dataSource.map(group => (
            <OptGroup
                key={group.title}
            >
                {group.children.map(opt => (
                    <Option key={opt[columns[0]]} value={opt[columns[0]]}>
                        {columns.map((e,i) => (
                            <span className="certain-search-item-count" key={e + i}>{opt[columns[i]]}</span>
                        ))}
                    </Option>
                ))}
            </OptGroup>
        ));
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <FormItem
                    label={label}
                    {...layout}
                    style={{ paddingTop: '15px' }}
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
                            optionLabelProp='value'
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




