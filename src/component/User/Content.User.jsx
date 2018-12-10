import React, { Component } from 'react';
import { Card, Form, Pagination, Button, Icon, Tabs, Spin, message } from 'antd'
import { connect } from 'react-redux';
import { formUpdataFromCurrent } from '../SliderRIght/action/Right.action'
import PublicComponent from '../PublicComponent/Public.Component'
import TABLECOMPONENT from '../PublicComponent/table/Tables'
import { API } from '../../lib/API/check.API'
import { POST$, httprequest, getrequestparam, getDat, formatDate, getstartHours, getendHours } from '../../lib/MATH/math'
import { _clear, _tableUpdataFromResults, tableTr0, fugai } from '../stylist/action/Stylist.action'
import { tAddDown, tReduceUp } from '../PublicComponent/lookup/action/lookup.action';



const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
// let  indexCurrentContst = 0
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
        current: 1,
        currentTabsIndex: 0,
        loading: false,
        activetr: 0
    }

    myRef = React.createRef();
    changeWidth = () => {
        const dom = (this.myRef.current.container.clientWidth) - 64
        this.setState({
            domWidth: dom
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.changeWidth()
        }, 50);
        this.props.onRef(this)
    }

    componentWillReceiveProps(pre) {
        //let Prop = this.props
        //let returnData = {}
        //const { currentTabsIndex } = this.state;
        this.setState({
            activetr: pre.tableSource[pre.CurrentIndex].tr
        });
        //console.log(pre.tableSource[pre.CurrentIndex]);
    }

    DAOCHU = () => {
        let valueList = {};
        const { tableSource, data, CurrentIndex } = this.props;

        let SQL = tableSource[CurrentIndex].SQL;
        data.map(e => {
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
                    else if (e.defaultValue !== 3) {
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
        tableSource[CurrentIndex].columns.forEach(e => {
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

        const { tableSource, data, CurrentIndex } = this.props;
        // this.setState({
        //     loading: true
        // })
        this.props.Loading();

        let hflag = 0
        let height_ = 40

        let valueList = {}
        let SQL = tableSource[CurrentIndex].SQL;

        data.map(e => {
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
                    else if (e.defaultValue !== 3) {
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
                if (res.Results) {
                    tableSource[CurrentIndex].dataSource = res.Results;
                    tableSource[CurrentIndex].tr = 0;
                    tableSource[CurrentIndex].pageSize = res.RecordCount;

                    resolve(true);
                } else {
                    reject(res);
                }
            })
        });

        Promise.race([post])
            .then((result) => {
                this.props.hidLoading();
            })
            .catch((err) => {
                this.props.hidLoading();

                console.log(err);

                if (err != null && err.status !== 500 && err.errormsg)
                    message.error(err.errormsg.substring(0, 200));
            })
    }

    guanbi = () => {
        this.props.clear()
    }

    handleKeyDown = (e) => {
        //debugger;
        const { tableSource, data, CurrentIndex } = this.props;
        const { activetr } = this.state;
        let _tabledata = tableSource[CurrentIndex];

        switch (e.keyCode) {
            case 40://下
                if (_tabledata.tr < _tabledata.dataSource.length - 1) {
                    this.props.tAddDown(_tabledata.tr, 1);
                    this.setState({
                        activetr: activetr + 1
                    });
                }

                break;
            case 38://上
                if (_tabledata.tr > 0) {
                    this.props.tReduceUp(_tabledata.tr, 1)
                }

                let _tr = activetr - 1;
                this.setState({
                    activetr: _tr < 0 ? 0 : _tr
                });

                break;
            case 37:
                break
            case 39:
                break
            default:
                break;
        }
        //console.log(this.state);
        return false;
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

    callback = (key) => {
        console.log(key);
        this.setState({
            currentTabsIndex: Number(key)
        })
        this.props.currentTableTab(Number(key))
    }

    render() {

        const { activetr } = this.state;
        console.log(activetr);

        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85;
        const { pane } = this.props;
        console.log(this.props);

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

        //多table
        let tableTabs = [];

        //数组，
        if (!Array.isArray(pane.TableData)) {
            var sss = pane.TableData;
            pane.TableData = [];
            pane.TableData.push(sss);
        }

        pane.TableData.forEach((e, i) => {
            tableTabs.push(
                <TabPane tab={e.label} key={i}>
                    <TABLECOMPONENT
                        PublicData={e}
                        activetr={activetr}
                        style={{ marginTop: '40px' }}
                        heights={(h - hflag) * 0.7}
                        widths={this.state.domWidth}>
                    </TABLECOMPONENT>
                    <Pagination
                        defaultCurrent={1}
                        total={e.pageSize}
                        pageSize={200}
                        current={this.state.current}
                        onChange={this.onChange}>
                    </Pagination>
                </TabPane>
            )
        })
        return (
            <Spin spinning={this.state.loading}>
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


                        <Tabs defaultActiveKey="0" onChange={this.callback}>
                            {tableTabs}
                        </Tabs>
                    </div>
                </Card >
            </Spin>
        )
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
    }
})(ContentUser));