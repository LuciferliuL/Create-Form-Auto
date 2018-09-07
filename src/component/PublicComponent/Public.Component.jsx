import React, { Component } from 'react';
import { Form } from 'antd'
import InputPublicComponent from './Input/Input.PublicComponent'

class PublicComponent extends Component {
    render() {
        const {PublicData, TYPE} = this.props
        const {type} = PublicData
        switch (type) {
            case 'INPUT':
                return (
                    <InputPublicComponent PublicData={PublicData} TYPE={TYPE}></InputPublicComponent>
                )
            default:
                return (
                    <div>错误</div>
                )
        }
    }
}

export default PublicComponent;