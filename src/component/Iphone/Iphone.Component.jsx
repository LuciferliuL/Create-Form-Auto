import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Radio, Card, Tag } from 'antd'

const RadioGroup = Radio.Group

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
            switch (el.Type) {
                case 'Input':
                    data.push(
                        <div
                            onClick={this.Click.bind(this, index)}
                            key={el.Key}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%' }}>
                            <Input addonBefore={el.Label} ></Input>
                        </div>
                    )
                    break;
                case 'Radio':
                    data.push(
                        <div
                            key={el.Key}
                            onClick={this.Click.bind(this, index)}
                            style={{ padding: 10, border: '1px dashed black', float: "left", width: '100%', textAlign: 'center' }}>
                            <Tag>{el.Label}</Tag>
                            {el.Group.length > 0 ?
                                <RadioGroup>
                                    {el.Group.foreach((e, i) => (
                                        <Radio value={e.value} key={i + e.Name}>e.Name</Radio>
                                    ))}
                                </RadioGroup> :
                                <span>没有数据</span>}

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

