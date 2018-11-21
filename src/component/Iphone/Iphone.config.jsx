import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Checkbox } from 'antd'

const plainOptions = ['BranchId', 'StaffId', 'IsAllCust'];
const CheckboxGroup = Checkbox.Group;
function mapStateToProps(state) {
    return {

    };
}

class Iphoneconfig extends Component {
    onChange = (checkedValues) => {
        // console.log('checked = ', checkedValues);
        this.props.ConfigChange(checkedValues)
    }
    render() {
        return (
            <Card
                title='全局配置'>
                <CheckboxGroup options={plainOptions}  onChange={this.onChange} value={this.props.ConfigData}/>
            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(Iphoneconfig);