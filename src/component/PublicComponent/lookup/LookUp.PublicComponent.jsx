import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import './LookUp.PublicComponent.css'
import { shows, upDataCurrentDataSource, updataValues, trAddDown, trReduceUp,onClickTr } from './action/lookup.action'
import { currentAttr } from '../../stylist/action/Stylist.action'
import { formUpdataFromCurrent } from '../../SliderRIght/action/Right.action'
import { POST$ } from '../../../lib/MATH/math'
import { API } from '../../../lib/API/check.API'
import TablePublicComponent from '../table/Table.PublicComponent'

const FormItem = Form.Item
let abbr = {}

class LookUpPublicComponent extends Component {
    state = {
        totalPage: 0,
        h: 0,
        isEnter: true
    }
    componentDidMount() {
        var h = document.documentElement.clientHeight
        // console.log(h);
        this.setState({
            h: h
        })
        // console.log(res);
        let res = this.props.UpdataFormData[this.props.UpdataFormData.length - 1] //每次获取新加入的
        if (res.SQL && res.SQL.length > 0) {
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
            if (show) {
                this.props.shows(show)
            }
            this.props.upForm(this.props.current)
            setTimeout(() => {
                window.addEventListener('keyup', this.handleKeyDown)
            }, 1000);

        })
    }
    Cancel = () => {
        this.props.shows(false)
        this.props.upForm(this.props.current)
    }

    ParamChange = (e) => {
        // console.log(e);
        abbr['Abbr'] = e
    }

    OnPressEnter = (key, page, pagesize, show, e) => {
        // console.log(e.target.value);
        // console.log(key);
        this.setState({
            isEnter: true
        })
        this.ParamChange(e.target.value)
        this.ClickHandleKey(key, page, pagesize, show)
    }
    handleKeyDown = (e) => {
        const { dataSource, columns } = this.props.current
        switch (e.keyCode) {
            case 40://下
                if (this.props.current.tr < dataSource.length - 1) {
                    // console.log(this.props.current.tr);

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
                this.props.shows(false)
                console.log(this.props.current.show);

                if (!this.props.current.show) {
                    this.CLick(false)
                }

                break
            case 27:
                this.props.shows(false)
                this.props.upForm(this.props.current)
                this.props.form.resetFields()
                break
        }
    }
    CLick = (key) => {
        console.log(key);
        
        const { dataSource } = this.props.current
<<<<<<< HEAD
        if (dataSource.length >= 1) {
            // console.log(this.props.current.tr);
            let dataSource_ = JSON.parse(JSON.stringify(dataSource[this.props.current.tr]));

            //更新lookup对应得input
            this.props.updataValues(dataSource_);
            window.removeEventListener('keyup', this.handleKeyDown);

            //debugger
            let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.current.id)
            agg.forEach(e => {
                e.defaultValue = dataSource_[e.typePoint]
                this.props.upForm(e)
            })
            //console.log(agg);

            //更新整个form
            this.props.upForm(this.props.current);
            //console.log(this.props.UpdataFormData);

        } else {
            this.props.upForm(this.props.current)
            window.removeEventListener('keyup', this.handleKeyDown)
=======
        if(key){
            console.log(key);
            
            if (dataSource.length >= 1) {
                // console.log(this.props.current.tr);
                let dataSource_ = JSON.parse(JSON.stringify(dataSource[key]));
    
                //更新lookup对应得input
                this.props.updataValues(dataSource_);
                window.removeEventListener('keyup', this.handleKeyDown);
    
                let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.current.key)
                agg.forEach(e => {
                    e.defaultValue = dataSource_[e.typePoint]
                    this.props.upForm(e)
                })
                // console.log(agg);
                this.props.onClickTr(key)
                //更新整个form
                this.props.upForm(this.props.current);
                console.log(this.props.UpdataFormData);
    
    
            } else {
                this.props.upForm(this.props.current)
                window.removeEventListener('keyup', this.handleKeyDown)
            }
        }else{
            if (dataSource.length >= 1) {
                // console.log(this.props.current.tr);
                let dataSource_ = JSON.parse(JSON.stringify(dataSource[this.props.current.tr]));
    
                //更新lookup对应得input
                this.props.updataValues(dataSource_);
                window.removeEventListener('keyup', this.handleKeyDown);
    
                let agg = this.props.UpdataFormData.filter(e => e.type === 'INPUT' && e.isTrueInLookUp === this.props.current.key)
                agg.forEach(e => {
                    e.defaultValue = dataSource_[e.typePoint]
                    this.props.upForm(e)
                })
                // console.log(agg);
    
                //更新整个form
                this.props.upForm(this.props.current);
                console.log(this.props.UpdataFormData);
    
    
            } else {
                this.props.upForm(this.props.current)
                window.removeEventListener('keyup', this.handleKeyDown)
            }
>>>>>>> 862a752f20a99bfa7d1f38542244371a63c0f115
        }
       
    }
    LookUpChange = (e) => {
        if (e.target.value === '') {
            // console.log(e.target.value);
            let key = this.props.current.key
            this.props.UpdataFormData.find(e => e.key === key).values = ''
            // let Field = {}
            // let key =  this.props.current.key
            // Field[key] = ' '
            // this.props.form.setFieldsValue(Field)
            this.setState({
                isEnter: true
            })
        } else {
            this.setState({
                isEnter: false
            })
        }

    }
    //失去焦点
    Blur = (e) => {
        //debugger;
        console.log(this.state.isEnter);

        if (!this.state.isEnter) {
            let Field = {}
            let v = this.props.current
            let values = v.values[v.uniqueKey]
            // console.log(v);
            let key = v.key
            if (values !== '') {
                Field[key] = values
                this.props.form.setFieldsValue(Field)
            } else {
                Field[key] = ' '
                this.props.form.setFieldsValue(Field)
            }
        }

    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { dataSource, label, key, required, message, layout, columns, show, scroll } = this.props.PublicData
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <Modal
                    visible={show}
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
                    {getFieldDecorator(key, {
                        rules: [{ required: { required }, message: message === '' ? '必填' : message }],
                    })(
                        <Input
                            onChange={this.LookUpChange.bind(this)}
                            onPressEnter={this.OnPressEnter.bind(this, this.props.PublicData.key, 1, 200, true)}
                            onBlur={this.Blur.bind(this)}
                        >
                        </Input>
                    )}
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

export default LookUpPublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props) {
        console.log(props);
        let Field = {}
        let v = props.UpdataFormData.find(e => e.key === props.PublicData.key)
        let values = v.values[v.uniqueKey]
        // console.log(v);
        let key = v.key
        Field[key] = Form.createFormField({ value: values })
        //console.log(Field);
        return Field

    },
})(LookUpPublicComponent));




