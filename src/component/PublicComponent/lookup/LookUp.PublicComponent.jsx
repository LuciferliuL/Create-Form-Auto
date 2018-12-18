import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd'
import { connect } from 'react-redux'
import './LookUp.PublicComponent.css'
import { shows, upDataCurrentDataSource, updataValues, trAddDown, trReduceUp, onClickTr } from './action/lookup.action'
import { currentAttr } from '../../stylist/action/Stylist.action'
import { formUpdataFromCurrent } from '../../SliderRIght/action/Right.action'
import { POST$, GETFetch } from '../../../lib/MATH/math'
import { API } from '../../../lib/API/check.API'
import TablePublicComponent from '../table/Table.PublicComponent'

const FormItem = Form.Item
let abbr = {}

class LookUpPublicComponent extends Component {
    state = {
        totalPage: 0,
        h: 0,
        shows: false,
        value: ' ',
        loading: false
    }
    componentDidMount() {
        var h = document.documentElement.clientHeight
        this.setState({
            h: h
        })
        let res = this.props.UpdataFormData[this.props.UpdataFormData.length - 1] //每次获取新加入的
        if (res.SQL && res.SQL.length > 0) {
            let obj = this.props.UpdataFormData.find(e => e.key === res.key)

            console.log(obj);
            if (obj.isCustomDirective) {
                if (obj.CustomDirectiveMethod === 1) {

                    let urlString = `&Sql= ${obj.SQL}&abbr=${abbr}&PageIndex=${1}&PageSize= 1&isPage=true`
                    GETFetch(obj.CustomDirectiveURL + urlString, (res) => {
                        obj.dataSource = res.Results
                        obj.totalPage = res.RecordCount
                        this.props.upForm(obj)
                    })
                } else {
                    let body = {
                        "Sql": obj.SQL,
                        ...abbr,
                        "PageIndex": 1,
                        "PageSize": 1,
                        isPage: true
                    }
                    POST$(API('SQL').http, body, (res) => {
                        obj.dataSource = res.Results
                        obj.totalPage = res.RecordCount
                        this.props.upForm(obj)
                    })
                }
            } else {
                let body = {
                    "Sql": obj.SQL,
                    "Param": JSON.stringify(abbr),
                    "PageIndex": 1,
                    "PageSize": 1,
                    isPage: true
                }
                POST$(API('SQL').http, body, (res) => {
                    obj.dataSource = res.Results
                    obj.totalPage = res.RecordCount
                    this.props.upForm(obj)
                })
            }
        }
    }
    componentWillReceiveProps(pre) {
        // console.log(pre);
        this.setState({
            value: pre.PublicData.values[pre.PublicData.uniqueKey] ? pre.PublicData.values[pre.PublicData.uniqueKey] : ''
        })
    }
    ClickHandleKey = (key, page, pagesize, show) => {
        let obj = this.props.PublicData


        if (obj.isCustomDirective) {
            if (obj.CustomDirectiveMethod === 1) {

                let urlString = `&Sql= ${obj.SQL}&abbr=${abbr}&PageIndex=${1}&PageSize= 1&isPage=true`
                GETFetch(obj.CustomDirectiveURL + urlString, (res) => {
                    this.props.UpDataCurrent(obj)
                    this.props.upDataCurrentDataSource(res.Results, res.RecordCount)
                    this.props.upForm(this.props.current)
                    this.setState({
                        shows: true,
                        loading: false
                    }, () => {
                        setTimeout(() => {
                            window.addEventListener('keyup', this.handleKeyDown)
                        }, 1000);
                    })
                })
            } else {
                let body = {
                    "Sql": obj.SQL,
                    ...abbr,
                    "PageIndex": 1,
                    "PageSize": 1,
                    isPage: true
                }
                POST$(API('SQL').http, body, (res) => {
                    this.props.UpDataCurrent(obj)
                    this.props.upDataCurrentDataSource(res.Results, res.RecordCount)
                    this.props.upForm(this.props.current)
                    this.setState({
                        shows: true,
                        loading: false
                    }, () => {
                        setTimeout(() => {
                            window.addEventListener('keyup', this.handleKeyDown)
                        }, 1000);
                    })
                })
            }
        } else {
            let body = {
                "Sql": obj.SQL,
                "Param": JSON.stringify(abbr),
                "PageIndex": 1,
                "PageSize": 1,
                isPage: true
            }
            POST$(API('SQL').http, body, (res) => {
                this.props.UpDataCurrent(obj)
                this.props.upDataCurrentDataSource(res.Results, res.RecordCount)
                this.props.upForm(this.props.current)
                this.setState({
                    shows: true,
                    loading: false
                }, () => {
                    setTimeout(() => {
                        window.addEventListener('keyup', this.handleKeyDown)
                    }, 1000);
                })
            })
        }


        let body = {
            "Sql": obj.SQL,
            "Param": JSON.stringify(abbr),
            "PageIndex": page,
            "PageSize": pagesize,
            isPage: true
        }

        POST$(API('SQL').http, body, (res) => {
            // console.log(res);
            this.props.UpDataCurrent(obj)
            this.props.upDataCurrentDataSource(res.Results, res.RecordCount)
            this.props.upForm(this.props.current)
            this.setState({
                shows: true,
                loading: false
            }, () => {
                setTimeout(() => {
                    window.addEventListener('keyup', this.handleKeyDown)
                }, 1000);
            })
        })
    }
    Cancel = () => {
        this.setState({
            shows: false
        })
    }

    ParamChange = (e) => {
        // console.log(e);
        abbr['Abbr'] = e
    }

    OnPressEnter = (key, page, pagesize, show, e) => {
        this.setState({
            loading: true
        })
        this.ParamChange(e.target.value)
        this.ClickHandleKey(key, page, pagesize, show)
    }
    handleKeyDown = (e) => {
        const { dataSource } = this.props.current
        switch (e.keyCode) {
            case 40://下
                if (this.props.current.tr < dataSource.length - 1) {
                    this.props.trAddDown(this.props.current.tr, 1)
                }
                break;
            case 38://上
                if (this.props.current.tr > 0) {
                    this.props.trReduceUp(this.props.current.tr, 1)
                }
                break;
            case 37:

                break
            case 39:

                break
            case 13:
                this.CLick(false)

                break
            case 27:
                this.setState({
                    shows: false,
                    value: ''
                })
                let unqueData = this.props.UpdataFormData.find(e => e.key === this.props.PublicData.key)
                unqueData.values = ''
                unqueData.dataSource = []
                window.removeEventListener('keyup', this.handleKeyDown);
                break
        }
    }
    CLick = (key) => {
        const { dataSource } = this.props.current
        // console.log(key);
        window.removeEventListener('keyup', this.handleKeyDown);
        if (key) {
            if (dataSource.length >= 1) {
                // console.log(this.props.current.tr);
                let dataSource_ = JSON.parse(JSON.stringify(dataSource[key]));
                //对关联input的数据修改-----------------------------------------------------------
                let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.current.id)
                agg.forEach(e => {
                    e.defaultValue = dataSource_[e.typePoint]
                    // console.log(dataSource_);

                    this.props.upForm(e)
                    this.props.ChangeOn(e, e.key)
                })
                //关联input数据修改结束-------------------------------------------------------------
                let unqueData = this.props.UpdataFormData.find(e => e.key === this.props.PublicData.key)
                unqueData.values = dataSource_
                // unqueData.show = false

                let keys = unqueData.uniqueKey
                // console.log(keys);
                this.props.ChangeOn(unqueData, this.props.PublicData.key)
                this.setState({
                    shows: false,
                    value: dataSource_[keys]
                })
            } else {
                this.props.upForm(this.props.current)
                this.props.ChangeOn(this.props.current, this.props.PublicData.key)
            }
        } else {
            if (dataSource.length >= 1) {
                // console.log(this.props.current.tr);
                let dataSource_ = JSON.parse(JSON.stringify(dataSource[this.props.current.tr]));
                //关联数据input修改----------------------------------------------------------------
                let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.current.id)
                agg.forEach(e => {
                    e.defaultValue = dataSource_[e.typePoint]
                    // console.log(dataSource_);
                    this.props.upForm(e)
                    this.props.ChangeOn(e, e.key)
                })
                //关联数据修改结束--------------------------------------------------------------------
                let unqueData = this.props.UpdataFormData.find(e => e.key === this.props.PublicData.key)
                unqueData.values = dataSource_
                let keys = unqueData.uniqueKey
                this.props.ChangeOn(unqueData, this.props.PublicData.key)
                this.setState({
                    shows: false,
                    value: dataSource_[keys]
                })
            } else {
                this.props.upForm(this.props.current)
                this.props.ChangeOn(this.props.current, this.props.PublicData.key)
            }
        }

    }
    LookUpChange = (e) => {
        // console.log(e.target.value);

        if (e.target.value === '') {
            let data = this.props.PublicData
            this.setState({
                value: ''
            })

            data.values = ''
            this.props.ChangeOn(data, data.key)
            this.props.UpdataFormData.find(e => e.key === data.key).values = ''
            console.log(this.props.UpdataFormData);
        } else {
            this.setState({
                value: e.target.value
            })
        }
    }
    //失去焦点
    Blur = (e) => {
        let data = this.props.PublicData
        // console.log(this.state.value);
        if (this.state.value === '') {
            data.values = ''
            this.props.ChangeOn(data, data.key)
            this.props.UpdataFormData.find(e => e.key === data.key).values = ''
        } else {
            // this.props.ChangeOn(this.state.value, data.key)
            this.setState({
                value: data.values[data.uniqueKey]
            })
        }
    }
    render() {
        const { label, layout } = this.props.PublicData
        const { shows } = this.state
        // console.log(this.props.PublicData);

        return (

            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <Modal
                    visible={shows}
                    width='100%'
                    style={{ top: '0' }}
                    footer={null}
                    onCancel={this.Cancel.bind(this)}
                    bodyStyle={{ overflow: 'scroll' }}
                    destroyOnClose={true}
                >
                    <TablePublicComponent
                        PublicData={this.props.current}
                        ClickHandleKey={this.ClickHandleKey.bind(this)}
                        h={this.state.h}
                        lookupCLick={this.CLick}>
                    </TablePublicComponent>
                </Modal>
                <FormItem
                    label={label}
                    {...layout}
                >
                    <Input
                        value={this.state.value}
                        onChange={this.LookUpChange.bind(this)}
                        onPressEnter={this.OnPressEnter.bind(this, this.props.PublicData.key, 1, 200, true)}
                        onBlur={this.Blur.bind(this)}
                    >
                    </Input>
                </FormItem>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
        current: state.currentAttr,
        UpdataFormData: state.UpdataFormData
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        shows: (k) => {
            dispatch(shows(k))
        },
        UpDataCurrent: (k) => {
            dispatch(currentAttr(k))
        },
        upDataCurrentDataSource: (k, totalPage) => {
            dispatch(upDataCurrentDataSource(k, totalPage))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        },
        trAddDown: (k, i) => {
            dispatch(trAddDown(k, i))
        },
        trReduceUp: (k, i) => {
            dispatch(trReduceUp(k, i))
        },
        onClickTr: (k) => {
            dispatch(onClickTr(k))
        }
    }
}

export default LookUpPublicComponent = connect(mapStateToProps, mapDispatchProps)(LookUpPublicComponent)




