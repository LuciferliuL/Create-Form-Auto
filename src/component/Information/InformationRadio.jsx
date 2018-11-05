import React, { Component } from 'react';
import { Radio } from 'antd'


const RadioGroup = Radio.Group
class InformationRadio extends Component {
    state = {
        value: 0
    }
    onChange = (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={0}>集中</Radio>
                    <Radio value={1}>分公司</Radio>
                </RadioGroup>
            </div>
        );
    }
}

export default InformationRadio;