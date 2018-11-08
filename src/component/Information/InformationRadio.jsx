import React, { Component } from 'react';
import { Radio } from 'antd'
import { connect } from 'react-redux'
import { copyDataSource } from './information.action'

const RadioGroup = Radio.Group
class InformationRadio extends Component {
    onChange = (e) => {
        let c = e.target.value === 0 ? '集中' : '分公司'
        this.props.copyDataSource({ DataSource: c })
    }
    render() {
        const { DataSource } = this.props.information
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={DataSource === '集中' ? 0 : 1} disabled={this.props.news}>
                    <Radio value={0}>集中</Radio>
                    <Radio value={1}>分公司</Radio>
                </RadioGroup>
            </div>
        );
    }
}
function mapStateToProps(state) {
    // console.log(state.information);

    return {
        information: state.information
    }
}

function mapDispatchProps(dispatch) {
    return {
        copyDataSource: (k) => {
            dispatch(copyDataSource(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(InformationRadio);