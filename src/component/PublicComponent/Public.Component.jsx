import React, { Component } from 'react';
import InputPublicComponent from './Input/Input.PublicComponent'
import RadioPublicComponent from './radio/radio.PublicComponent'
import CheckboxPublicComponent from './checkbox/checkbox.PublicComponent'

class PublicComponent extends Component {
    render() {
        const { PublicData} = this.props
        const { type } = PublicData
        switch (type) {
            case 'INPUT':
                return (
                    <InputPublicComponent PublicData={PublicData} ></InputPublicComponent>
                )
            case 'RadioGroup':
                return (
                    <RadioPublicComponent PublicData={PublicData} ></RadioPublicComponent>
                )
            case 'CheckBox':
                return (
                    <CheckboxPublicComponent PublicData={PublicData} ></CheckboxPublicComponent>
                )
            default:
                return (
                    <div>错误</div>
                )
        }
    }
}

export default PublicComponent;