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
        // console.log(IphoneData);
        let data = []
        IphoneData.forEach((el, index) => {
            console.log(el);

            switch (el.Type) {
                case 'Input':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Input addonBefore={el.data.name} ></Input>
                        </div>
                    )
                    break;
                case 'Radio':
                    let radios = []
                    if (el.data.length > 0) {
                        el.data.forEach((e, i) => (
                            radios.push(<Radio value={e.value} key={i + Math.random()}>{e.name}</Radio>)
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
                case 'LookUp':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Input addonBefore={el.data.name} ></Input>
                        </div>
                    )
                    break;
                case 'Title':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Divider orientation="left">{el.title}</Divider>
                        </div>
                    )
                    break;
                case 'DateS':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '50%' }}>
                            <span>{el.data.name}</span>
                            <DatePicker value={moment(new Date(), dateFormat)} disabled ></DatePicker>
                        </div>
                    )
                    break;
                case 'SelectS':
                    let select = []
                    el.data.forEach(e => (
                        select.push(<Option value={e.value} key={el.Key + e.value}>{e.name}</Option>)
                    ))
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '50%' }}>
                            <span>{el.data.name}</span>
                            <Select value={el.data[0].value} style={{ width: '100%' }}>
                                {select}
                            </Select>
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

