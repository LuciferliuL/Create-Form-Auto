import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Icon } from 'antd'
import { InputData, RadioData, LookUp, Title,DateS ,SelectS} from './Iphone.Data'
import IphoneComponent from './Iphone.Component'
import IphoneC from './Iphone.C'
import {  RightMoveArr, LeftMoveArr } from './Func'

const ButtonGroup = Button.Group
function mapStateToProps(state) {
    return {

    };
}

class Iphone extends Component {
    state = {
        Source: [
            new InputData(),
            new RadioData(),
            new LookUp(),
            new Title(),
            new DateS(),
            new SelectS()
        ],
        IphoneData: [],
        CurrentData: {},
        CurrentIndex: 0,
    }
    componentDidMount() {
        // console.log(this.state);
    }
    //添加组件
    addCard = (type) => {
        // console.log(type);
        switch (type) {
            case 'Input':
                let input = new InputData('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, input]
                }))
                break;
            case 'Radio':
                let radio = new RadioData('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, radio]
                }))
                break;
            case 'LookUp':
                let lookup = new LookUp('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, lookup]
                }))
                break;
            case 'Title':
                let title = new Title('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, title]
                }))
                break;
            case 'DateS':
                let dateS = new DateS('ID','','')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, dateS]
                }))
                break;
            case 'SelectS':
            let selectS = new SelectS('ID','','')
            this.setState((pre) => ({
                IphoneData: [...pre.IphoneData, selectS]
            }))
            break;
            default:
                break;
        }
    }
    //点击组件
    ClickNode = (index) => {
        // console.log(index);
        this.setState({
            CurrentData: this.state.IphoneData[index],
            CurrentIndex: index
        })
    }
    //子组件修改数据
    AttributeChange = (attr, value) => {
        // console.log(attr + '-----' + value);
        let file = {}
        file[attr] = value
        console.log(file);
        this.setState({
            CurrentData: Object.assign({}, this.state.CurrentData, file)
        })
    }
    //确定
    OnOk = () => {
        const { IphoneData, CurrentData } = this.state
        let i = []
        IphoneData.forEach(e => {
            if (e.Key === CurrentData.Key) {
                i.push(CurrentData)

            } else {
                i.push(e)
            }
        })

        this.setState({
            IphoneData: i
        })
    }
    //删除
    OnDel = () => {
        const { IphoneData, CurrentData } = this.state
        let i = []
        IphoneData.forEach(e => {
            if (e.Key !== CurrentData.Key) {
                i.push(e)

            }
        })

        this.setState({
            IphoneData: i
        })
    }
    //排序
    UPDOWN = (key) => {
        const { CurrentIndex, IphoneData } = this.state
        if (key === 'up') {
            let i = CurrentIndex - 1 > 0 ? CurrentIndex - 1 : 0
            let currentQ = LeftMoveArr(IphoneData, CurrentIndex, IphoneData.length)
            this.setState({
                CurrentIndex: i,
                IphoneData: currentQ
            })
        } else {
            let i = CurrentIndex + 1 < IphoneData.length - 1 ? CurrentIndex + 1 : IphoneData.length - 1
            let currentQ = RightMoveArr(IphoneData, CurrentIndex, IphoneData.length)
            this.setState({
                CurrentIndex: i,
                IphoneData: currentQ
            })
        }
    }
    render() {
        const { Source, IphoneData, CurrentData } = this.state

        let CardList = []
        Source.forEach(e => {
            CardList.push(
                <Card key={e.Key}>
                    {e.Label}
                    <Button style={{ float: "right" }} onClick={this.addCard.bind(this, e.Type)}>+</Button>
                </Card>)
        })
        return (
            <Row>
                <Col span={6}>
                    <Card>
                        {CardList}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <IphoneComponent IphoneData={IphoneData} ClickNode={this.ClickNode.bind(this)}></IphoneComponent>
                    </Card>
                    <Card>
                        
                    </Card>
                </Col>
                <Col span={6}>
                    <Card extra={
                        <ButtonGroup style={{ float: "right" }}>
                            <Button onClick={this.OnOk.bind(this)}>确定</Button>
                            <Button>编辑</Button>
                            <Button onClick={this.OnDel.bind(this)}>删除</Button>
                            <Button onClick={this.UPDOWN.bind(this, 'up')}><Icon type="arrow-up" /></Button>
                            <Button onClick={this.UPDOWN.bind(this, 'down')}><Icon type="arrow-down" /></Button>
                        </ButtonGroup>
                    }>
                        <IphoneC
                            CurrentData={CurrentData}
                            AttributeChange={this.AttributeChange}>
                        </IphoneC>
                    </Card>
                </Col>
            </Row>


        );
    }
}

export default connect(
    mapStateToProps,
)(Iphone);