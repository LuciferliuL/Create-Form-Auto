import React, { Component } from 'react';
import { Card, Form, Layout, Menu, Dropdown, Button, Tag, Icon, message } from 'antd'
import { connect } from 'react-redux';
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import PublicComponent from '../PublicComponent/Public.Component'
import { fugai } from '../stylist/action/Stylist.action'
import TABLECOMPONENT from '../PublicComponent/table/Table'
import { API } from '../../lib/API/check.API'
import { POST$, httprequest, getrequestparam } from '../../lib/MATH/math'
import { _clear, _tableUpdataFromResults, tableTr0 } from '../stylist/action/Stylist.action'

const ButtonGroup = Button.Group;
const { Header } = Layout

function mapStateToProps(State) {
    // console.log(State);

    return {
        data: State.UpdataFormData,
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr,
        tableSource: State.tableSource
    };
}
class ContentUser extends Component {
    state = {
        data: [],
        domWidth: 0,
        totalpage: 0,
        flag: true
    }
    myRef = React.createRef();
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 64
        this.setState({
            domWidth: dom
        });
    }
    componentWillReceiveProps(pre) {
        document.onkeydown = function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            var altKey = e.altKey;
            if (altKey && keyCode === 81) {
                pre.Loading()
                let valueList = {}
                let SQL = pre.tableSource.SQL
                pre.data.map(e => {
                    if (e.type !== 'Table' && e.type !== 'Group') {
                        if (e.type === 'LookUp') {
                            valueList[e.id] = e.values[e.upKey] === undefined ? '' : e.values[e.upKey];
                        } else if (e.type === 'Input' && e.typePoint === 0) {
                            valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                        } else if (e.type === 'Input' && e.typePoint !== 0) {
                            valueList[e.typePoint] = e.defaultValue === undefined ? '' : e.defaultValue;
                        } else if (e.type === "Range") {
                            valueList[e.id] = e.defaultValue === '' ? ['', ''] : e.defaultValue;
                        } else {
                            valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                        }
                    }
                    return true
                })
                let post = new Promise((resolve, reject) => {
                    let body = {
                        "Sql": SQL,
                        "Param": JSON.stringify(valueList),
                        "PageIndex": 1,
                        "PageSize": 200,
                        isPage: true
                    }
                    POST$(API('SQL').http, body, (res) => {
                        // console.log(res);
                        if (res.Results) {
                            pre._tableUpdataFromResults(res.Results, res.RecordCount)
                            pre.tableTr0(0)
                            resolve(true)
                        } else {
                            reject(false)
                        }

                    })
                })
                let time = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(false)
                    }, 10000);
                })

                Promise.race([post, time])
                    .then((result) => {
                        pre.Loading()
                    })
                    .catch((err) => {
                        message.error('获取数据超时')
                        pre.Loading()
                    })
            } else if (altKey && keyCode === 82) {

            } else if (altKey && keyCode === 67) {
                pre.clear()
            } else if (altKey && keyCode === 69) {

                let valueList = {};
                let SQL = pre.tableSource.SQL;
                pre.data.map(e => {
                    if (e.type !== 'Table' && e.type !== 'Group') {
                        if (e.type === 'LookUp') {
                            valueList[e.id] = e.values[e.upKey] === undefined ? '' : e.values[e.upKey];
                        } else if (e.type === 'Input' && e.typePoint === 0) {
                            valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                        } else if (e.type === 'Input' && e.typePoint !== 0) {
                            valueList[e.typePoint] = e.defaultValue === undefined ? '' : e.defaultValue;
                        } else if (e.type === "Range") {
                            valueList[e.id] = e.defaultValue === '' ? ['', ''] : e.defaultValue;
                        } else {
                            valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                        }
                    }
                    return true
                });
                let cols = {};
                pre.tableSource.columns.forEach(e => {
                    cols[e.dataIndex] = e.title
                });
                let param = {
                    Param: JSON.stringify(valueList),
                    Columns: JSON.stringify(cols),
                    IsPage: true,
                    PageSize: 350,
                    Sql: SQL
                };

                var params = getrequestparam('exportsqldata', JSON.stringify(param));
                httprequest(params, (result) => {
                    var url = window.URL.createObjectURL(result)
                    var a = document.createElement('a')
                    a.href = url
                    a.download = "数据.xls"
                    a.click()
                });
            } else {
                return true;
            }
            e.preventDefault();
            return false;
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.changeWidth()
        }, 50);
    }
    DAOCHU = () => {
        let valueList = {}
        let SQL = this.props.tableSource.SQL
        this.props.data.map(e => {
            if (e.type !== 'Table' && e.type !== 'Group') {
                if (e.type === 'LookUp') {
                    valueList[e.id] = e.values[e.upKey] === undefined ? '' : e.values[e.upKey];
                } else if (e.type === 'Input' && e.typePoint === 0) {
                    valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                } else if (e.type === 'Input' && e.typePoint !== 0) {
                    valueList[e.typePoint] = e.defaultValue === undefined ? '' : e.defaultValue;
                }
                else if (e.type === "Range") {
                    valueList[e.id] = e.defaultValue === '' ? ['', ''] : e.defaultValue;
                } else {
                    valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                }
            }
            return true
        })
        let cols = {}
        this.props.tableSource.columns.forEach(e => {
            cols[e.dataIndex] = e.title
        })
        let param = {
            Param: JSON.stringify(valueList),
            Columns: JSON.stringify(cols),
            IsPage: true,
            PageSize: 350,
            Sql: SQL
        };

        var params = getrequestparam('exportsqldata', JSON.stringify(param));
        httprequest(params, (result) => {
            var url = window.URL.createObjectURL(result)
            var a = document.createElement('a')
            a.href = url
            a.download = "数据.xls"
            a.click()
        });
    }
    SQLChecked = () => {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
        let hflag = 0
        let height_ = 40

        this.props.Loading()
        let valueList = {}
        let SQL = this.props.tableSource.SQL;

        this.props.data.map(e => {
            if (e.type !== 'Table' && e.type !== 'Group') {
                if (e.type === 'LookUp') {
                    valueList[e.id] = e.values[e.upKey] === undefined ? '' : e.values[e.upKey];
                } else if (e.type === 'Input' && e.typePoint === 0) {
                    valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                } else if (e.type === 'Input' && e.typePoint !== 0) {
                    valueList[e.typePoint] = e.defaultValue === undefined ? '' : e.defaultValue;
                } else if (e.type === "Range") {
                    valueList[e.id] = e.defaultValue === '' ? ['', ''] : e.defaultValue;
                } else {
                    valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                }
            }
            let PositionTop = e.GridY * height_
            if (PositionTop > hflag) {
                hflag = PositionTop
            }
            return true
        })

        //table行数
        let cols = (h - hflag) * 0.8
        let post = new Promise((resolve, reject) => {
            let body = {
                "Sql": SQL,
                "Param": JSON.stringify(valueList),
                "PageIndex": 1,
                "PageSize": 350,
                isPage: true
            }
            POST$(API('SQL').http, body, (res) => {
                if (res.Results) {
                    this.props._tableUpdataFromResults(res.Results, res.RecordCount)
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        })
        let time = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(false)
            }, 10000);
        })

        Promise.race([post, time])
            .then((result) => {
                this.props.Loading()
            })
            .catch((err) => {
                message.error('获取数据超时')
                this.props.Loading()
            })
    }
    guanbi = () => {
        this.props.clear()
    }

    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.9
        let Dr = []
        let width_ = this.state.domWidth / 24
        let height_ = 40
        let hflag = 0
        this.props.UpdataFormData.forEach(e => {
            let width = e.w * width_
                , height = e.h * height_
                , PositionTop = e.GridY * height_
                , PositionLeft = e.GridX * width_
            if (PositionTop > hflag) {
                hflag = PositionTop
            }

            Dr.push(
                <div key={e.key}
                    style={{ position: "absolute", top: PositionTop, left: PositionLeft, width: width, height: height }}>
                    <PublicComponent PublicData={e} Read={'R'} page={this.state.totalpage} />
                </div>
            )
        })

        if (this.props.UpdataFormData.length > 0) {
            return (
                <Card
                    ref={this.myRef}
                    style={{ minHeight: h + 'px', borderTop: 'none' }}
                    bodyStyle={{ padding: 10 }}  >

                    <div style={{ float: 'left', width: '100%', borderTop: '2px solid #1a1a1d14' }}>
                        <ButtonGroup>
                            <Button onClick={this.SQLChecked.bind(this)}>
                                <Icon type="security-scan" theme="outlined" />
                                查询 ALT+Q
                                    </Button>
                            <Button onClick={this.guanbi.bind(this)}>
                                <Icon type="export" theme="outlined" />
                                关闭 ALT+C
                                    </Button>
                            <Button onClick={this.DAOCHU.bind(this)}>
                                <Icon type="usb" theme="outlined" />
                                导出 ALT+E
                                    </Button>
                        </ButtonGroup>
                    </div>
                    <Form
                        style={{ padding: '5px', marginTop: '40px', position: 'relative' }}>{Dr}</Form>
                    <div style={{ position: 'relative', top: (hflag + 40) + 'px', height: (h - hflag) * 0.8 + 'px' }}>
                        <TABLECOMPONENT PublicData={this.props.tableSource} style={{ marginTop: '40px' }} heights={(h - hflag) * 0.8}>
                        </TABLECOMPONENT>
                    </div>
                </Card>
            )
        } else {
            return (
                <Card
                    ref={this.myRef}
                    style={{ minHeight: h + 'px', borderTop: 'none' }}>
                    欢迎使用通用表单查询管理系统
                </Card>
            )
        }
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        clear: () => {
            dispatch(_clear())
        },
        _tableUpdataFromResults: (k, totalPage) => {
            dispatch(_tableUpdataFromResults(k, totalPage))
        },
        tableTr0: (k) => {
            dispatch(tableTr0(k))
        },
        upData: (k) => {
            dispatch(fugai(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(Form.create({
    mapPropsToFields(props) {
        // console.log(props);
    }
})(ContentUser));