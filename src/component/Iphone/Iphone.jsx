import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Icon, Table, message } from 'antd'
import { InputData, RadioData, LookUp, Title, DateS, SelectS } from './Iphone.Data'
import IphoneComponent from './Iphone.Component'
import IphoneC from './Iphone.C'
import { RightMoveArr, LeftMoveArr } from './Func'
import Iphoneconfig from './Iphone.config'

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
        CurrentIndex: -1,
        IphoneTableData: {
            data: [],
            columns: [{ title: '列名', dataIndex: '0' }],
            title: '表格',
            Type: 'Table',
            SQL: ''
        },
        ConfigData: []
    }
    componentDidMount() {
        // console.log('did');
        var data = this.props.location.state;
        console.log(data);
        if (data) {
            this.setState({
                ConfigData: data.globleConfig,
                IphoneTableData: data.TableData,
                IphoneData: data.componentData
            })
        }

    }
    componentWillReceiveProps(pre) {
        // console.log('will');

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
                let dateS = new DateS('ID', '', '')
                this.setState((pre) => ({
                    IphoneData: [...pre.IphoneData, dateS]
                }))
                break;
            case 'SelectS':
                let selectS = new SelectS('ID', '', '')
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
        const { CurrentData, IphoneData } = this.state
        let file = {}
        file[attr] = value
        // console.log(file);
        if (CurrentData.Type === 'Table') {
            //说明是表格
            this.setState({
                CurrentData: Object.assign({}, this.state.CurrentData, file),
                IphoneTableData: Object.assign({}, this.state.IphoneTableData, file)
            })
        } else {
            //修改得是组件
            let Currentdata = Object.assign({}, this.state.CurrentData, file)
            let Iphonedata = []
            IphoneData.forEach(e => {
                if (e.Key === Currentdata.Key) {
                    Iphonedata.push(Currentdata)
                } else {
                    Iphonedata.push(e)
                }
            })

            this.setState({
                CurrentData: Currentdata,
                IphoneData: Iphonedata
            })
        }

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
    ClickTable = () => {
        this.setState({
            CurrentData: this.state.IphoneTableData,
            CurrentIndex: -1
        })
    }
    ConfigChange = (e) => {
        this.setState({
            ConfigData: e
        })
    }
    submitForm = () => {
        const { IphoneData, IphoneTableData, ConfigData } = this.state
        //组件数据
        let count = -1 //用来记录title的个数
        let lastData = {
            globleConfig: ConfigData,
            componentData: [],
            TableData: IphoneTableData
        }//最终的数据
        if (IphoneData.length > 0 && IphoneData[0].Type === 'Title') {
            IphoneData.forEach(e => {
                if (e.Type === 'Title') {
                    lastData.componentData.push(e)
                    count++
                } else {
                    lastData.componentData[count].control.push(e)
                }
            })
            // console.log(IphoneData);
            // console.log(IphoneTableData);
            // console.log(ConfigData);
            console.log(lastData);

            this.setState({
                IphoneData: [],
                CurrentData: {},
                CurrentIndex: -1,
                IphoneTableData: {
                    data: [],
                    columns: [{ title: '列名', dataIndex: '0' }],
                    title: '表格',
                    Type: 'Table',
                    SQL: ''
                },
                ConfigData: []
            })
        } else {
            message.warning('必须以‘表题’为组件开始')
        }



    }
    render() {
        const { Source, IphoneData, CurrentData, IphoneTableData, ConfigData } = this.state
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.70
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
                    <Card bodyStyle={{ overflowY: 'scroll', maxHeight: h }}>
                        <IphoneComponent IphoneData={IphoneData} ClickNode={this.ClickNode.bind(this)}></IphoneComponent>
                    </Card>
                    <Card>
                        <div onClick={this.ClickTable.bind(this)}>
                            <Table
                                bordered={true}
                                rowKey='name'
                                title={() => IphoneTableData.title}
                                dataSource={IphoneTableData.data}
                                columns={IphoneTableData.columns}>
                            </Table>
                        </div>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Button onClick={this.submitForm}>提交表单</Button>
                    </Card>
                    <Card
                        title='组件配置'
                        extra={
                            <ButtonGroup style={{ float: "right" }}>
                                <Button onClick={this.OnDel.bind(this)} disabled={CurrentData.Type === 'Table' ? true : false}>删除</Button>
                                <Button onClick={this.UPDOWN.bind(this, 'up')} disabled={CurrentData.Type === 'Table' ? true : false}><Icon type="arrow-up" /></Button>
                                <Button onClick={this.UPDOWN.bind(this, 'down')} disabled={CurrentData.Type === 'Table' ? true : false}><Icon type="arrow-down" /></Button>
                            </ButtonGroup>
                        }>
                        <IphoneC
                            CurrentData={CurrentData}
                            AttributeChange={this.AttributeChange}>
                        </IphoneC>
                    </Card>
                    <Iphoneconfig ConfigChange={this.ConfigChange} ConfigData={ConfigData}></Iphoneconfig>
                </Col>
            </Row>


        );
    }
}

export default connect(
    mapStateToProps,
)(Iphone);