import React, { Component } from 'react';
import InputPublicComponent from './Input/Input.PublicComponent'
import RadioPublicComponent from './radio/radio.PublicComponent'
import CheckboxPublicComponent from './checkbox/checkbox.PublicComponent'
import SelectPublicComponent from './select/select.PublicComponent'
import DatePublicComponent from './times/data.PublicComponent'
import RangePickerPublicComponent from './times/RangePicker.PublicComponent'
import TablePublicComponent from './table/Table.PublicComponent'
import LookUpPublicComponent from './lookup/LookUp.PublicComponent'
import GroupPublicComponent from './group/Group.PublicComponent'
import SwitchPublicComponent from './Switch/Switch.PublicComponent'
class PublicComponent extends Component {
    render() {
        const { PublicData } = this.props
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
            case 'Select':
                return (
                    <SelectPublicComponent PublicData={PublicData}></SelectPublicComponent>
                )
            case 'Date':
                return (
                    <DatePublicComponent PublicData={PublicData}></DatePublicComponent>
                )
            case 'Range':
                return (
                    <RangePickerPublicComponent PublicData={PublicData}></RangePickerPublicComponent>
                )
            case 'Table':
                return (
                    <TablePublicComponent PublicData={PublicData}></TablePublicComponent>
                )
            case 'LookUp':
                return (
                    <LookUpPublicComponent PublicData={PublicData}></LookUpPublicComponent>
                )
            case 'Group':
                return (
                    <GroupPublicComponent PublicData={PublicData}></GroupPublicComponent>
                )
            case 'Switch':
                return (
                    <SwitchPublicComponent PublicData={PublicData}></SwitchPublicComponent>
                )
            default:
                return (
                    <div>错误</div>
                )
        }
    }
}

export default PublicComponent;