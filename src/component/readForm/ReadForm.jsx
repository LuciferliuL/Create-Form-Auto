import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dragact } from 'dragact'
import { Card, Button, Form, Modal, List } from 'antd'
import PublicComponent from '../PublicComponent/Public.Component'

function mapStateToProps(state) {
    return {

    };
}

class ReadForm extends Component {
    state = {
        data: [],
        visible: false,
        list: []
    }
    show = () => {
        let keys = []
        for (var k in localStorage) {
            keys.push(k)
        }
        this.setState({
            visible: true,
            list: keys
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    check = (e) => {
        this.setState({
            visible: false,
            data: JSON.parse(localStorage.getItem(e))
        })
    }
    render() {

        return (
            <div>
                <Modal
                    title="现有表单列表"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <List
                        header={<div>选择需要查看的表单</div>}
                        bordered
                        dataSource={this.state.list}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<Button onClick={this.check.bind(this, item)}>查看</Button>}
                                    description="Ant Design"
                                />
                                <span>{item}</span>
                            </List.Item>
                        )}
                    />
                </Modal>
                <Card title="表单预览"
                    extra={<Button onClick={this.show.bind(this)}>表单选择</Button>}>
                    <Form
                        style={{ width: '100%', minHeight: '400px', padding: '5px' }}>
                        <Dragact
                            ref={(n) => { this.dragact = n }}
                            layout={this.state.data} //必填项
                            col={24} //必填项
                            width={1440} //必填项
                            rowHeight={40} //必填项
                            margin={[5, 5]} //必填项
                            className="plant-layout" //必填项
                            style={{ minHeight: '300px' }} //非必填项
                            placeholder={true}
                        >
                            {(item, provided) => {
                                // console.log(item);
                                return (
                                    <div
                                        style={{
                                            ...provided.props.style,
                                            padding: '5px',
                                        }}
                                    >
                                        <PublicComponent PublicData={item} />
                                    </div>
                                )
                            }}
                        </Dragact>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ReadForm);