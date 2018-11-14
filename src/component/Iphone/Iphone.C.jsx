import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form} from 'antd'

const FormItem = Form.Item

function mapStateToProps(state) {
    return {

    };
}

class IphoneC extends Component {
    ValueChange = (attribute,e) => {
        this.props.AttributeChange(attribute,e.target.value)
    }
    render() {
        const { CurrentData } = this.props
        console.log(CurrentData);
        let CurrentInput = []
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        Object.keys(CurrentData).forEach((e, i) => (
            CurrentInput.push(
                <FormItem {...formItemLayout} label={e} key={e + i}>
                    <Input 
                    value={CurrentData[e]}  
                    // readOnly={true}
                    onChange={this.ValueChange.bind(this,e)}></Input>
                </FormItem>
            )
        ))

        return (
           <div>
               {CurrentInput}
           </div>
                
        )


    }
}

export default connect(
    mapStateToProps,
)(IphoneC);

