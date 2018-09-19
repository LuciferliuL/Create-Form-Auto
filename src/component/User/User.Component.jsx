import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dragact } from 'dragact'
import { Card, Button, Form, Modal, List, Row, Col } from 'antd'
import PublicComponent from '../PublicComponent/Public.Component'
import { fugai } from '../stylist/action/Stylist.action'
import { tdAddDown, tdReduceUp, trAddDown, trReduceUp, shows, updataValues } from '../PublicComponent/lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'

function mapStateToProps(State) {
    return {
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr
    };
}

class ReadForm extends Component {
    state = {
        data: [],
        visible: false,
        list: [],
        domWidth: 0
    }
    myRef = React.createRef()
    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyDown)
        this.times = setTimeout(() => {
            this.changeWidth()
        }, 10)
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyDown)
        clearTimeout(this.times)
    }
    handleKeyDown = (e) => {
        console.log(e);
        
        // console.log(this.state.tr);
        // console.log(this.state.td);
        const { dataSource, columns } = this.props.currentAttr
        switch (e.keyCode) {
            case 37://左
                if (this.props.currentAttr.td > 0) {
                    console.log('左');
                    this.props.tdReduceUp(this.props.currentAttr.td)
                }
                break;
            case 40://下
                if (this.props.currentAttr.tr < dataSource.length - 1) {
                    console.log('下');
                    this.props.trAddDown(this.props.currentAttr.tr)
                }
                break;
            case 39://右
                if (this.props.currentAttr.td < columns.length - 1) {
                    console.log('right');
                    this.props.tdAddDown(this.props.currentAttr.td)
                }
                break;
            case 38://上
                if (this.props.currentAttr.tr > 0) {
                    console.log('up');
                    this.props.trReduceUp(this.props.currentAttr.tr)
                }
                break;
            case 13:
                this.CLick()
                this.props.shows(this.props.currentAttr.shows)
                break
        }
    }
    CLick = () => {
        const { dataSource } = this.props.currentAttr
        let arr = []
        dataSource.forEach(e => {
            let l = []
            Object.keys(e).forEach(t => {
                l.push(e[t])
            })
            arr.push(l)
        })
        // console.log(this.state.tr);
        // console.log(this.state.td);
        let id = this.props.currentAttr.id
        console.log(this.props.currentAttr.tr);
        console.log(this.props.currentAttr.td);
        console.log(id);
        console.log(arr);
        this.props.updataValues(JSON.parse(JSON.stringify(arr[this.props.currentAttr.tr][this.props.currentAttr.td])))
        this.props.upForm(this.props.currentAttr)
    }
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 64
        this.setState({
            domWidth: dom
        })
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
                    <Form
                        style={{ width: '100%', minHeight: '400px', padding: '5px' }}>
                        <Dragact
                            ref={(n) => { this.dragact = n }}
                            layout={this.state.data} //必填项
                            col={24} //必填项
                            width={this.state.domWidth} //必填项
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
                                        <PublicComponent PublicData={item} Read={'R'} />
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

const mapDispatchProps = (dispatch) => {
    return {
        upData: (k) => {
            dispatch(fugai(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        },
        tdAddDown: (k) => {
            dispatch(tdAddDown(k))
        },
        tdReduceUp: (k) => {
            dispatch(tdReduceUp(k))
        },
        trAddDown: (k) => {
            dispatch(trAddDown(k))
        },
        trReduceUp: (k) => {
            dispatch(trReduceUp(k))
        },
        shows: (k) => {
            dispatch(shows(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
    }
}

export default connect(
    mapStateToProps, mapDispatchProps
)(ReadForm);