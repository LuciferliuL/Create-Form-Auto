import React, { Component } from 'react';
import { Card, Form, Pagination, Button, Icon } from 'antd'
import { connect } from 'react-redux';
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import PublicComponent from '../PublicComponent/Public.Component'
import TABLECOMPONENT from '../PublicComponent/table/Tables'
import { API } from '../../lib/API/check.API'
import { POST$, httprequest, getrequestparam, getDat, formatDate, getstartHours, getendHours } from '../../lib/MATH/math'
import { _clear, _tableUpdataFromResults, tableTr0, fugai } from '../stylist/action/Stylist.action'
import { tAddDown, tReduceUp } from '../PublicComponent/lookup/action/lookup.action';

const ButtonGroup = Button.Group;
function mapStateToProps(State) {
    console.log(State);
    
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
        branchtype: "branch",
        domWidth: 0,
        totalpage: 0,
        flag: true,
        current: 1
    }

    myRef = React.createRef();
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 64
        this.setState({
            domWidth: dom
        });
    }

    componentWillReceiveProps(pre) {
        console.log(pre);

        document.onkeydown = function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            var altKey = e.altKey;
            // console.log(e.keyCode);

            if (altKey && keyCode === 81) {
                var oInput = document.getElementById("input");
                oInput.focus();
                window.addEventListener('keyup', this.handleKeyDown)
                pre.Loading()
                let valueList = {}
                let SQL = pre.tableSource.SQL
                pre.data.map(e => {
                    if (e.type !== 'Table' && e.type !== 'Group') {
                        if (e.type === 'LookUp') {
                            valueList[e.id] = e.values[e.upKey] === undefined ? '' : e.values[e.upKey];
                            console.log(valueList);

                        } else if (e.type === 'Input' && e.typePoint === 0) {
                            valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                        } else if (e.type === 'Input' && e.typePoint !== 0) {
                            valueList[e.typePoint] = e.defaultValue === undefined ? '' : e.defaultValue;
                        } else if (e.type === "Range") {
                            let days = ['', ''];
                            let oneweekdate = new Date();
                            let ds = new Date();

                            if (e.defaultValue === -1) {
                                //当天
                                oneweekdate = new Date()
                                days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                            } else if (e.defaultValue === 1) {
                                //前一天
                                ds = new Date();
                                oneweekdate = new Date(ds - 24 * 3600 * 1000);
                                days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()];
                            } else if (e.defaultValue === 7) {
                                ds = new Date();
                                oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                                days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()];
                            } else if (e.defaultValue === 30) {
                                ds = new Date();
                                ds.setMonth(ds.getMonth() - 1);
                                days = [formatDate(ds, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()];
                            }
                            else if (e.defaultValue.length > 0 && e.defaultValue[0] !== '') {
                                days = [formatDate(new Date(e.defaultValue[0]), 'yyyy-MM-dd') + getstartHours(), formatDate(new Date(e.defaultValue[1]), 'yyyy-MM-dd') + getendHours()]
                            }
                            valueList[e.id] = days;
                        } else if (e.type === 'RadioGroup') {
                            valueList[e.id] = e.defaultValue === '-1' ? ' ' : e.defaultValue;
                        } else if (e.type === 'Date') {
                            let days = '';
                            var oneweekdate;
                            var ds;

                            if (e.defaultValue === -1) {
                                //当天
                                oneweekdate = new Date()
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            } else if (e.defaultValue === 1) {
                                //前一天
                                ds = new Date()
                                oneweekdate = new Date(ds - 24 * 3600 * 1000);
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            } else if (e.defaultValue === 7) {
                                ds = new Date()
                                oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            } else if (e.defaultValue === 30) {
                                ds = new Date()
                                ds.setMonth(ds.getMonth() - 1);
                                days = formatDate(ds, 'yyyy-MM-dd') + getstartHours()
                            }
                            else if (e.defaultValue !== '') {
                                oneweekdate = new Date(e.defaultValue)
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            }
                            valueList[e.id] = days
                        } else if (e.type === 'CheckBox') {
                            if (e.checked) {
                                valueList[e.id] = e.defaultValue
                            } else {
                                valueList[e.id] = ''
                            }
                        }
                        else {
                            valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                        }
                    }
                    return true
                })

                // let post = new Promise((resolve, reject) => {

                let body = {
                    "Sql": SQL,
                    "Param": JSON.stringify(valueList),
                    "PageIndex": 1,
                    "PageSize": 200,
                    isPage: true
                }
                // console.log(body);
                POST$(API('SQL', 'branch').http, body, (res) => {
                    // console.log(res);

                    if (res.Results) {
                        pre.pane.TableData.dataSource = res.Results
                        pre.pane.TableData.tr = 0
                        pre.pane.TableData.pageSize = res.RecordCount
                        pre.tableTr0(0)
                        // resolve(true)
                        pre.hidLoading()
                    } else {
                        // reject(false)
                        pre.hidLoading()
                    }
                })
                // })
                // let time = new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         reject(false)
                //     }, 10000);
                // })

                // Promise.race([post, time])
                //     .then((result) => {
                //         pre.hidLoading()
                //     })
                //     .catch((err) => {
                //         //debugger
                //         //message.error('获取数据超时')
                //         pre.hidLoading()
                //     })
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
                            let days = ['', ''];
                            let oneweekdate = new Date();
                            let ds = new Date();

                            if (e.defaultValue === -1) {
                                //当天
                                oneweekdate = new Date()
                                days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                            } else if (e.defaultValue === 1) {
                                //前一天
                                ds = new Date()
                                oneweekdate = new Date(ds - 24 * 3600 * 1000);
                                days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                            } else if (e.defaultValue === 7) {
                                ds = new Date()
                                oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                                days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                            } else if (e.defaultValue === 30) {
                                ds = new Date()
                                ds.setMonth(ds.getMonth() - 1);
                                days = [formatDate(ds, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                            }
                            else if (e.defaultValue.length > 0 && e.defaultValue[0] !== '') {
                                days = [formatDate(new Date(e.defaultValue[0]), 'yyyy-MM-dd') + getstartHours(), formatDate(new Date(e.defaultValue[1]), 'yyyy-MM-dd') + getendHours()]
                            }
                            valueList[e.id] = days
                        } else if (e.type === 'RadioGroup') {
                            valueList[e.id] = e.defaultValue === '-1' ? ' ' : e.defaultValue;
                        }
                        else if (e.type === 'Date') {
                            let days = '';
                            var ds;
                            var oneweekdate;

                            if (e.defaultValue === -1) {
                                //当天
                                oneweekdate = new Date()
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            } else if (e.defaultValue === 1) {
                                //前一天
                                ds = new Date()
                                oneweekdate = new Date(ds - 24 * 3600 * 1000);
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            } else if (e.defaultValue === 7) {
                                ds = new Date()
                                oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            } else if (e.defaultValue === 30) {
                                ds = new Date()
                                ds.setMonth(ds.getMonth() - 1);
                                days = formatDate(ds, 'yyyy-MM-dd') + getstartHours()
                            }
                            else if (e.defaultValue !== '') {
                                oneweekdate = new Date(e.defaultValue)
                                days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                            }
                            valueList[e.id] = days;
                        }
                        else {
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
                    PageIndex: 1,
                    PageSize: 350,
                    Sql: SQL
                };

                var params = getrequestparam('exportsqldata', JSON.stringify(param), this.state.branchtype);
                httprequest(params, this.state.branchtype, (result) => {
                    var url = window.URL.createObjectURL(result)
                    var a = document.createElement('a')
                    a.href = url
                    a.download = "数据.xls"
                    a.click()
                });
            } else if (keyCode === 40) {
                console.log(40);

            } else if (keyCode === 38) {
                console.log(38);

            } else {
                e.preventDefault();
                return true;
            }
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
                    let days = ['', ''];
                    let oneweekdate = new Date();
                    let ds = new Date();

                    if (e.defaultValue === -1) {
                        //当天
                        oneweekdate = new Date()
                        days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    } else if (e.defaultValue === 1) {
                        //前一天
                        ds = new Date()
                        oneweekdate = new Date(ds - 24 * 3600 * 1000);
                        days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    } else if (e.defaultValue === 7) {
                        ds = new Date()
                        oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                        days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    } else if (e.defaultValue === 30) {
                        ds = new Date()
                        ds.setMonth(ds.getMonth() - 1);
                        days = [formatDate(ds, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    }
                    else if (e.defaultValue.length > 0 && e.defaultValue[0] !== '') {
                        days = [formatDate(new Date(e.defaultValue[0]), 'yyyy-MM-dd') + getstartHours(), formatDate(new Date(e.defaultValue[1]), 'yyyy-MM-dd') + getendHours()]
                    }
                    valueList[e.id] = days
                } else if (e.type === 'RadioGroup') {
                    valueList[e.id] = e.defaultValue === '-1' ? ' ' : e.defaultValue;
                } else if (e.type === 'Date') {
                    let days = '';
                    let oneweekdate = new Date();
                    let ds = new Date();

                    if (e.defaultValue === -1) {
                        //当天
                        oneweekdate = new Date()
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    } else if (e.defaultValue === 1) {
                        //前一天
                        ds = new Date()
                        oneweekdate = new Date(ds - 24 * 3600 * 1000);
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    } else if (e.defaultValue === 7) {
                        ds = new Date()
                        oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    } else if (e.defaultValue === 30) {
                        ds = new Date()
                        ds.setMonth(ds.getMonth() - 1);
                        days = formatDate(ds, 'yyyy-MM-dd') + getstartHours()
                    }
                    else if (e.defaultValue !== '') {
                        oneweekdate = new Date(e.defaultValue)
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    }
                    valueList[e.id] = days;
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
            PageIndex: 1,
            PageSize: 350,
            Sql: SQL
        };

        var params = getrequestparam('exportsqldata', JSON.stringify(param), this.state.branchtype);
        httprequest(params, (result) => {
            var url = window.URL.createObjectURL(result)
            var a = document.createElement('a')
            a.href = url
            a.download = "数据.xls"
            a.click()
        });
    }
    SQLChecked = (page) => {
        const { pane } = this.props;
        //input获取焦点
        var oInput = document.getElementById("input");
        oInput.focus();
        window.addEventListener('keyup', this.handleKeyDown)

        //var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
        let hflag = 0
        let height_ = 40

        this.props.Loading()
        let valueList = {}
        let SQL = pane.TableData.SQL;

        pane.FormData.map(e => {
            if (e.type !== 'Table' && e.type !== 'Group') {
                if (e.type === 'LookUp') {
                    valueList[e.id] = e.values[e.upKey] === undefined ? '' : e.values[e.upKey];
                } else if (e.type === 'Input' && e.typePoint === 0) {
                    valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                } else if (e.type === 'Input' && e.typePoint !== 0) {
                    valueList[e.typePoint] = e.defaultValue === undefined ? '' : e.defaultValue;
                } else if (e.type === "Range") {

                    let days = ['', ''];
                    let oneweekdate = new Date();
                    let ds = new Date();

                    if (e.defaultValue === -1) {
                        //当天
                        oneweekdate = new Date()
                        days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    } else if (e.defaultValue === 1) {
                        //前一天
                        ds = new Date()
                        oneweekdate = new Date(ds - 24 * 3600 * 1000);
                        days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    } else if (e.defaultValue === 7) {
                        ds = new Date()
                        oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                        days = [formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    } else if (e.defaultValue === 30) {
                        ds = new Date()
                        ds.setMonth(ds.getMonth() - 1);
                        days = [formatDate(ds, 'yyyy-MM-dd') + getstartHours(), getDat() + getendHours()]
                    }
                    else if (e.defaultValue.length > 0 && e.defaultValue[0] !== '') {
                        days = [formatDate(new Date(e.defaultValue[0]), 'yyyy-MM-dd') + getstartHours(), formatDate(new Date(e.defaultValue[1]), 'yyyy-MM-dd') + getendHours()]
                    }
                    valueList[e.id] = days
                } else if (e.type === 'RadioGroup') {
                    valueList[e.id] = e.defaultValue === '-1' ? ' ' : e.defaultValue;
                } else if (e.type === 'Date') {
                    let days = '';
                    let oneweekdate = new Date();
                    let ds = new Date();

                    if (e.defaultValue === -1) {
                        //当天
                        oneweekdate = new Date()
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    } else if (e.defaultValue === 1) {
                        //前一天
                        ds = new Date()
                        oneweekdate = new Date(ds - 24 * 3600 * 1000);
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    } else if (e.defaultValue === 7) {
                        ds = new Date()
                        oneweekdate = new Date(ds - 7 * 24 * 3600 * 1000);
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    } else if (e.defaultValue === 30) {
                        ds = new Date()
                        ds.setMonth(ds.getMonth() - 1);
                        days = formatDate(ds, 'yyyy-MM-dd') + getstartHours()
                    }
                    else if (e.defaultValue !== '') {
                        oneweekdate = new Date(e.defaultValue)
                        days = formatDate(oneweekdate, 'yyyy-MM-dd') + getstartHours()
                    }
                    valueList[e.id] = days
                } else if (e.type === 'CheckBox') {
                    if (e.checked) {
                        valueList[e.id] = e.defaultValue;
                    } else {
                        valueList[e.id] = '';
                    }
                }
                else {
                    valueList[e.id] = e.defaultValue === undefined ? '' : e.defaultValue;
                }
            }
            let PositionTop = e.GridY * height_;
            if (PositionTop > hflag) {
                hflag = PositionTop;
            }
            return true
        })

        //table行数
        let post = new Promise((resolve, reject) => {
            let body = {
                "Sql": SQL,
                "Param": JSON.stringify(valueList),
                "PageIndex": page,
                "PageSize": 200,
                isPage: true
            }
            POST$(API('SQL', this.state.branchtype).http, body, (res) => {
                console.log(res);

                if (res.Results) {
                    pane.TableData.dataSource = res.Results;
                    pane.TableData.tr = 0;
                    pane.TableData.pageSize = res.RecordCount;
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        })
        let time = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(false)
            }, 5000);
        })

        Promise.race([post, time])
            .then((result) => {
                this.props.hidLoading()
            })
            .catch((err) => {
                //debugger
                //message.error('获取数据超时')
                this.props.hidLoading()
            })
    }
    guanbi = () => {
        this.props.clear()
    }
    handleKeyDown = (e) => {
        const { dataSource} = this.props.tableSource
        // console.log(e.keyCode);
        console.log(this.props.pane);

        switch (e.keyCode) {
            case 40://下
                if (this.props.tableSource.tr < dataSource.length - 1) {
                    this.props.tAddDown(this.props.tableSource.tr, 1)
                }
                break;
            case 38://上
                if (this.props.tableSource.tr > 0) {
                    this.props.tReduceUp(this.props.tableSource.tr, 1)
                }
                break;
            case 37:
                break
            case 39:
                break
            default:
                break;
        }
    }
    ONBlur = () => {
        window.removeEventListener('keyup', this.handleKeyDown)
    }
    onChange = (page) => {
        this.setState({
            current: page
        })
        this.SQLChecked(page)
    }
    onChangeDs = (e) => {
        this.setState({
            branchtype: e.target.value
        })
    }

    render() {

        // console.log(this.props.pane);

        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85;
        const { pane } = this.props;

        let Dr = []
        let width_ = this.state.domWidth / 24
        let height_ = 40
        let hflag = 0
        pane.FormData.forEach((e, index) => {
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
                    <PublicComponent
                        PublicData={e}
                        Read={'R'}
                        page={this.state.totalpage}
                        ChangeOn={this.props.ChangeOn}
                    />
                </div>
            )
        })
        // if (pane.FormData.length > 0) {
            return (
                <Card
                    ref={this.myRef}
                    style={{ minHeight: h + 'px', borderTop: '1px solid #eae7e7' }}
                    bodyStyle={{ padding: 5 }}  >

                    <div style={{ float: 'left', width: '100%' }}>
                        <ButtonGroup>
                            <Button onClick={this.SQLChecked.bind(this, 1)}>
                                <Icon type="security-scan" theme="outlined" />
                                查询 ALT+Q
                                    </Button>
                            <Button onClick={this.guanbi.bind(this)} style={{ display: 'none' }}>
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
                        style={{ padding: '5px', marginTop: '40px', position: 'relative' }}>
                        {Dr}
                    </Form>
                    <div style={{ position: 'relative', top: (hflag + 40) + 'px', height: (h - hflag) * 0.8 + 'px' }}>
                        <input
                            type="text"
                            id='input'
                            onBlur={this.ONBlur}
                        //  style={{ display: 'none' }} 
                        />
                        <TABLECOMPONENT PublicData={pane.TableData} style={{ marginTop: '40px' }} heights={(h - hflag) * 0.8} widths={this.state.domWidth}>
                        </TABLECOMPONENT>
                        <Pagination
                            defaultCurrent={1}
                            total={pane.TableData.pageSize}
                            pageSize={200}
                            current={this.state.current}
                            onChange={this.onChange}></Pagination>
                    </div>
                </Card >
            )
        // } else {
        //     return (
        //         <Card
        //             ref={this.myRef}
        //             style={{ minHeight: h + 'px', borderTop: '1px solid #eae7e7' }}>
        //             欢迎使用通用表单查询管理系统
        //         </Card>
        //     )
        // }
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        clear: () => {
            dispatch(_clear())
        },
        _tableUpdataFromResults: (k) => {
            dispatch(_tableUpdataFromResults(k))
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
        tAddDown: (k, i) => {
            dispatch(tAddDown(k, i))
        },
        tReduceUp: (k, i) => {
            dispatch(tReduceUp(k, i))
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