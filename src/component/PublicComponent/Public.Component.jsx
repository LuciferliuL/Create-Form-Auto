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
import './PublicComponent.css'
import {API} from '../../lib/API/check.API'
import {POST$} from '../../lib/MATH/math'
class PublicComponent extends Component {
    ClickHandleKey = (key,page,pagesize,show) => {
        let obj = this.props.UpdataFormData.find(e => e.key === key)
        this.props.UpDataCurrent(obj)
        if(show){
            this.props.shows(obj)
        }
        let body = {
            "Sql": obj.SQL,
            "Param": JSON.stringify(this.state.Abbr),
            "PageIndex": page,
            "PageSize": pagesize,
            isPage: true
        }
        POST$(API('SQL').http, body, (res) => {
            console.log(res);
            this.props.upDataCurrentDataSource(res.Results,res.RecordCount)
            this.props.upForm(this.props.current)
        })
    }
    render() {
        const { PublicData } = this.props
        const { type } = PublicData
        switch (type) {
            case 'INPUT':
                return (
                    <InputPublicComponent PublicData={PublicData} Read={this.props.Read}></InputPublicComponent>
                )
            case 'RadioGroup':
                return (
                    <RadioPublicComponent PublicData={PublicData} Read={this.props.Read}></RadioPublicComponent>
                )
            case 'CheckBox':
                return (
                    <CheckboxPublicComponent PublicData={PublicData} Read={this.props.Read}></CheckboxPublicComponent>
                )
            case 'Select':
                return (
                    <SelectPublicComponent PublicData={PublicData} Read={this.props.Read}></SelectPublicComponent>
                )
            case 'Date':
                return (
                    <DatePublicComponent PublicData={PublicData} Read={this.props.Read}></DatePublicComponent>
                )
            case 'Range':
                return (
                    <RangePickerPublicComponent PublicData={PublicData} Read={this.props.Read}></RangePickerPublicComponent>
                )
            case 'Table':
                return (
                    <TablePublicComponent 
                    PublicData={PublicData} 
                    Read={this.props.Read}
                    // ClickHandleKey={this.ClickHandleKey.bind(this)}
                    >
                    </TablePublicComponent>
                )
            case 'LookUp':
                return (
                    <LookUpPublicComponent PublicData={PublicData} Read={this.props.Read} page={this.props.page}></LookUpPublicComponent>
                )
            case 'Group':
                return (
                    <GroupPublicComponent PublicData={PublicData} Read={this.props.Read}></GroupPublicComponent>
                )
            case 'Switch':
                return (
                    <SwitchPublicComponent PublicData={PublicData} Read={this.props.Read}></SwitchPublicComponent>
                )
            default:
                return (
                    <div>错误</div>
                )
        }
    }
}

export default PublicComponent;