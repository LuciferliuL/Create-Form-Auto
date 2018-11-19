import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Icon, Modal, List, Tag } from 'antd'

const FormItem = Form.Item

function mapStateToProps(state) {
    return {

    };
}

class IphoneC extends Component {
    state = {
        visible: false,
        data: []
    }
    componentWillReceiveProps(pre) {
        console.log(pre);
        const { CurrentData } = pre
        if (CurrentData.Type === 'Radio') {
            const { data } = CurrentData
            this.setState({
                data:data
            })
        } else {
            const { data } = CurrentData
            this.setState({
                data:[data]
            })
        }
        // this.setState({
        //     data: JSON.stringify(pre.CurrentData.data)
        // })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    ValueChange = (attribute, e) => {
        this.props.AttributeChange(attribute, e.target.value)
    }
    render() {
        const { CurrentData } = this.props
        const { data } = this.state
        // console.log(CurrentData);
        let CurrentInput = []
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        Object.keys(CurrentData).forEach((e, i) => {
            if (e !== 'Label'
                && e !== 'Key'
                && e !== 'value'
                && e !== 'defaultValue'
                && e !== 'Type'
                && e !== 'data'
                && e !== 'control') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={e} key={e + i}>
                        <Input
                            value={CurrentData[e]}
                            // readOnly={true}
                            onChange={this.ValueChange.bind(this, e)}></Input>
                    </FormItem>
                )
            } else if (e === 'data') {
                CurrentInput.push(
                    <FormItem {...formItemLayout} label={e} key={e + i}>
                        <Input
                            value={JSON.stringify(CurrentData[e])}
                            readOnly={true}
                            addonAfter={<Icon type="setting" onClick={this.showModal} />}
                        ></Input>
                    </FormItem>
                )
            }
        })

        return (
            <div>
                {CurrentInput}
                <Modal
                    title="数据设置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <List
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Modal>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(IphoneC);

