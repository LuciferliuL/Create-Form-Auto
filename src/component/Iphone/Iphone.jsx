import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Input, Icon } from 'antd'
import { InputData, RadioData } from './Iphone.Data'
import IphoneComponent from './Iphone.Component'
import IphoneC from './Iphone.C'


const ButtonGroup = Button.Group
function mapStateToProps(state) {
    return {

    };
}

class Iphone extends Component {
    state = {
        Source: [
            new InputData(),
            new RadioData()
        ],
        IphoneData: [],
        CurrentData: {}
    }
    componentDidMount() {
        // console.log(this.state);
    }

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
            default:
                break;
        }
    }
    ClickNode = (index) => {
        // console.log(index);
        this.setState({
            CurrentData: this.state.IphoneData[index]
        })
    }
    AttributeChange = (attr,value) => {
        // console.log(attr + '-----' + value);
        let file = {}
        file[attr] = value
        console.log(file);
        
        this.setState({
            CurrentData:Object.assign({},this.state.CurrentData,file)
        })
    }
    OnOk = () => {
        const {IphoneData,CurrentData} = this.state
        IphoneData.map(e =>{
            if(e.Key === CurrentData.Key){
                e = CurrentData
            }
        })
        this.setState({
            IphoneData:IphoneData
        },()=>{
            console.log(IphoneData);
            
        })
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
                </Col>
                <Col span={6}>
                    <Card extra={
                        <ButtonGroup style={{ float: "right" }}>
                            <Button onClick={this.OnOk.bind(this)}>确定</Button>
                            <Button>编辑</Button>
                            <Button>删除</Button>
                            <Button><Icon type="arrow-up" /></Button>
                            <Button><Icon type="arrow-down" /></Button>
                        </ButtonGroup>
                    }>
                        <IphoneC CurrentData={CurrentData} AttributeChange={this.AttributeChange}></IphoneC>
                    </Card>
                </Col>
            </Row>


        );
    }
}

export default connect(
    mapStateToProps,
)(Iphone);