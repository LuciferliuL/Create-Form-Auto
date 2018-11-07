import React, { Component } from 'react';
import { Radio } from 'antd'


const RadioGroup = Radio.Group
class InformationRadio extends Component {
    state = {
        value: 0
    }
    componentDidMount(){
        const {selectedData} = this.props
        if(selectedData.length>0){
            this.setState({
                value:selectedData[0].DataSource === '集中'?0:1
            })
        }
        
    }
    componentWillReceiveProps(pre){
        // console.log(pre);
        const {selectedData} = pre
        if(selectedData.length>0){
            this.setState({
                value:selectedData[0].DataSource === '集中'?0:1
            })
        }
    }
    onChange = (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        })
        this.props.EditSelectedRow({'DataSource':e.target.value === 0?'集中':'分公司'})
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