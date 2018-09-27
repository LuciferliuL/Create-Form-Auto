import React, { Component } from 'react';
import { Card, Button,  Modal, List } from 'antd'
import ContentUser from '../User/Content.User'

class ReadForm extends Component {
    state = {
        data: [],
        visible: false,
        list: [],
        domWidth: 0
    }
    show = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });

    }
    check = (e) => {
        this.props.upData(JSON.parse(localStorage.getItem(e)))
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
                    extra={<Button onClick={this.show.bind(this)}>表单选择</Button>}
                    ref={this.myRef}>
                    <ContentUser></ContentUser>
                </Card>
            </div>
        );
    }
}


export default ReadForm;