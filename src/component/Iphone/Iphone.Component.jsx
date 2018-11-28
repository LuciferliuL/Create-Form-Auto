import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Radio, Card, Tag, Divider, DatePicker, Select } from 'antd'
import moment from 'moment';


const RadioGroup = Radio.Group
const dateFormat = 'YYYY-MM-DD';
const { Option } = Select

function mapStateToProps(state) {
    return {

    };
}

class IphoneComponent extends Component {

    Click = (index) => {
        // console.log(index);
        this.props.ClickNode(index)
    }
    render() {
        const { IphoneData } = this.props
        console.log(IphoneData);
        let data = []
        IphoneData.forEach((el, index) => {
            // console.log(el);

            switch (el.type) {
                case 'input':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Input addonBefore={el.data.name} ></Input>
                        </div>
                    )
                    break;
                case 'radio':
                    let radios = []
                    if (el.data.length > 0) {
                        el.data.forEach((e, i) => (
                            radios.push(<Radio value={e.value} key={i + 'radios'}>{e.name}</Radio>)
                        ))
                    }
                    data.push(
                        <div
                            key={el.Key}
                            onClick={this.Click.bind(this, index)}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%', textAlign: 'center' }}>
                            <Tag>{el.Label}</Tag>
                            {el.data.length > 0 ?
                                <RadioGroup value={el.data[0]['value']}>
                                    {radios}
                                </RadioGroup> :
                                <span>没有数据</span>}

                        </div>
                    )
                    break;
                case 'lookup':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Input addonBefore={el.data.name} ></Input>
                        </div>
                    )
                    break;
                case 'title':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Divider orientation="left">{el.title}</Divider>
                        </div>
                    )
                    break;
                case 'date':
                        let dates = null
                        let nowDate = new Date()
                        let fullyear = nowDate.getFullYear()
                        let month = nowDate.getMonth() + 1
                        if( el.data.value === 0){
                            dates = nowDate
                        }else if( el.data.value === 1){
                            dates = `${fullyear}-${month}-01`
                        }else{
                            let n = new Date()
                            nowDate.setDate(1)
                            nowDate.setMonth(n.getMonth()+1)
                            nowDate.setDate(n.getDate()-1)
                            dates = `${fullyear}-${month}-${nowDate.getDate()}`
                        }
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '50%' }}>
                            <span>{el.data.name}:</span>
                            <DatePicker value={moment(dates, dateFormat)} disabled style={{width:'70%',marginLeft:10}}></DatePicker>
                        </div>
                    )
                    break;
                case 'select':
                    // let select = []
                    // el.data.forEach(e => (
                    //     select.push(<Option value={e.value} key={el.Key + e.value}>{e.name}</Option>)
                    // ))
                    console.log(el);
                    
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '20%' }}>
                            {/* <span>{el.data.name}</span> */}
                            {/* <Select value={el.data[0].value} style={{ width: '100%' }}>
                                {select}
                            </Select> */}

                            <Tag value={el.data.value}>{el.data.name}</Tag>


                        </div>
                    )
                    break;
                default:
                    break;
            }
        });
        return (
            <div>
                <Card>
                    {data}
                </Card>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(IphoneComponent);

