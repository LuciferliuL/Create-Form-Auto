import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import './LookUp.PublicComponent.css'
import { shows, upDataCurrentDataSource, updataValues,trAddDown, trReduceUp, } from './action/lookup.action'
import { currentAttr } from '../../stylist/action/Stylist.action'
import { formUpdataFromCurrent } from '../../SliderRIght/action/Right.action'
import { POST$ } from '../../../lib/MATH/math'
import { API } from '../../../lib/API/check.API'
import TablePublicComponent from '../table/Table.PublicComponent'
import keydown from 'react-keydown'

const FormItem = Form.Item
let abbr = {}

class LookUpPublicComponent extends Component {
    state = {
        totalPage: 0
    }
    componentDidMount() {
        // console.log(res);
        let res = this.props.UpdataFormData[this.props.UpdataFormData.length - 1] //每次获取新加入的
        if (res.label !== 'LookUp') {
            let obj = this.props.UpdataFormData.find(e => e.key === res.key)
            this.props.UpDataCurrent(obj)
            let body = {
                "Sql": obj.SQL,
                "Param": JSON.stringify(abbr),
                "PageIndex": 1,
                "PageSize": 100,
                isPage: true
            }
            POST$(API('SQL').http, body, (res) => {
                // console.log(res);
                this.props.upDataCurrentDataSource(res.Results, res.RecordCount)
                this.props.upForm(this.props.current)

            })
        }
    }
    ClickHandleKey = (key, page, pagesize, show) => {
        let obj = this.props.UpdataFormData.find(e => e.key === key)
        this.props.UpDataCurrent(obj)
        if (show) {
            this.props.shows(obj)
        }

        let body = {
            "Sql": obj.SQL,
            "Param": JSON.stringify(abbr),
            "PageIndex": page,
            "PageSize": pagesize,
            isPage: true
        }
        POST$(API('SQL').http, body, (res) => {
            console.log(res);
            this.props.upDataCurrentDataSource(res.Results, res.RecordCount)
            this.props.upForm(this.props.current)
        })
    }
    Cancel = () => {
        this.props.shows(this.props.current)
        this.props.upForm(this.props.current)
    }

    ParamChange = (e) => {
        // console.log(e);
        abbr['Abbr'] = e
    }

    OnPressEnter = (key, page, pagesize, show, e) => {
        // console.log(e.target.value);
        // console.log(key);
        this.ParamChange(e.target.value)
        this.ClickHandleKey(key, page, pagesize, show)
        setTimeout(() => {
            window.addEventListener('keyup', this.handleKeyDown)
        }, 1000);
    }
    handleKeyDown = (e) => {
        const { dataSource, columns } = this.props.current
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
                this.props.shows(this.props.current)
                this.CLick()
                break
            case 27:
                this.props.shows(this.props.current)
                this.props.upForm(this.props.current)
                break
        }
    }
    CLick = () => {
        const { dataSource } = this.props.current
        if (dataSource !== []) {
            // console.log(this.props.currentAttr.tr);
            let dataSource_ = JSON.parse(JSON.stringify(dataSource[this.props.current.tr]))
            //更新lookup对应得input
            this.props.updataValues(dataSource_)
            window.removeEventListener('keyup', this.handleKeyDown)

            let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.current.id)
            agg.forEach(e => {
                e.defaultValue = dataSource_.type
            })
            console.log(agg);
            //更新整个form
            this.props.upForm(this.props.current)

        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { dataSource, label, id, required, message, layout, columns, show, scroll } = this.props.PublicData
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <Modal
                    visible={show}
                    width='100%'
                    style={{ top: '0' }}
                    footer={null}
                    onCancel={this.Cancel.bind(this)}
                >
                    <TablePublicComponent
                        PublicData={this.props.current}
                        ClickHandleKey={this.ClickHandleKey.bind(this)}
                        totalPage={this.state.totalPage}>
                    </TablePublicComponent>
                </Modal>
                <FormItem
                    label={label}
                    {...layout}
                >
                    {getFieldDecorator(id, {
                        rules: [{ required: { required }, message: { message } }],
                    })(
                        <Input
                            onPressEnter={this.OnPressEnter.bind(this, this.props.PublicData.key, 1, 200, true)}></Input>
                    )}
                </FormItem>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);

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
    }
}

export default LookUpPublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props) {
        // console.log(props);
        let Field = {}
        let v = props.UpdataFormData.find(e => e.key === props.PublicData.key)
        let values = v.values[v.uniqueKey]
        // console.log(v);
        let id = v.id
        Field[id] = Form.createFormField({ value: values })
        // console.log(Field);
        return Field

    },
})(LookUpPublicComponent));




