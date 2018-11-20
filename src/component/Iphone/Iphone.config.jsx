import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Checkbox } from 'antd'

const plainOptions = ['BranchId', 'StaffId', 'IsAllCust'];
const CheckboxGroup = Checkbox.Group;
function mapStateToProps(state) {
    return {

    };
}

class Iphoneconfig extends Component {
    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    render() {
        return (
            <Card
                title='全局配置'>
                <CheckboxGroup options={plainOptions}  onChange={this.onChange} />
            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(Iphoneconfig);