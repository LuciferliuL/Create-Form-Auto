import React, { Component } from 'react';
import { Divider } from 'antd'

class GroupPublicComponent extends Component {
    render() {
        const {  label, orientation} = this.props.PublicData 
        return (
            <Divider orientation={orientation}>{label}</Divider>
        )
    }
}

export default GroupPublicComponent ;




