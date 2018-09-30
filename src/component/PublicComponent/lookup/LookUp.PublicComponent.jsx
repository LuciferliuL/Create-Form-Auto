import React, { Component } from 'react';
import { Form, Input, Button, Modal} from 'antd'
import { connect } from 'react-redux'
import './LookUp.PublicComponent.css'
import { shows, upDataCurrentDataSource } from './action/lookup.action'
import { currentAttr } from '../../stylist/action/Stylist.action'
import { formUpdataFromCurrent } from '../../SliderRIght/action/Right.action'
import { POST$ } from '../../../lib/MATH/math'
import { API } from '../../../lib/API/check.API'
import TablePublicComponent from '../table/Table.PublicComponent'


const FormItem = Form.Item

class LookUpPublicComponent extends Component {
    state = {
        Abbr: {},
        totalPage: 0
    }
    componentDidMount() {
        
    }

    ClickHandleKey = (key,page,pagesize,show) => {
        let obj = this.props.UpdataFormData.find(e => e.key === key)
        this.props.UpDataCurrent(obj)
        if(show){
            this.props.shows(obj)
        }
       
        let body = {
            "Sql": obj.SQL,
            "Param": JSON.stringify(this.state.Abbr),
            "PageIndex": page,
            "PageSize": pagesize,
            isPage: true
        }
        POST$(API('SQL').http, body, (res) => {
            console.log(res);
            this.props.upDataCurrentDataSource(res.Results,res.RecordCount)
            this.props.upForm(this.props.current)
        })
    }
    Cancel = () => {
        this.props.shows(this.props.current)
        this.props.upForm(this.props.current)
    }
    ClickHandleShows = (key) => {
        if (Object.keys(this.props.current).length > 0) {
            let obj = this.props.UpdataFormData.find(e => e.key === key)
            this.props.UpDataCurrent(obj)

            let body = {
                "Sql": obj.SQL,
                "Param": JSON.stringify(this.state.Abbr),
                "PageIndex": 1,
                "PageSize": 100,
                isPage: true
            }
            POST$(API('SQL').http, body, (res) => {
                // console.log(res);
                this.props.upDataCurrentDataSource(res.Results,res.RecordCount)
                this.props.upForm(this.props.current)
            })
        }

    }

    ParamChange = (e) => {
        let Abbr = {}
        Abbr['Abbr'] = e.target.value
        this.setState({
            Abbr: Abbr
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { dataSource, label, id, required, message, layout, columns, show , scroll} = this.props.PublicData
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
                {
                    this.props.Read === 'R' ?
                        <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleKey.bind(this, this.props.PublicData.key,1,200,true)}>aaaa</Button>
                        : <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleShows.bind(this, this.props.current.key)}>aaaa</Button>
                }
                <FormItem
                    label={label}
                    {...layout}
                >
                    {getFieldDecorator(id, {
                        rules: [{ required: { required }, message: { message } }],
                    })(
                        <Input onChange={this.ParamChange.bind(this)}></Input>
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
        upDataCurrentDataSource: (k,totalPage) => {
            dispatch(upDataCurrentDataSource(k,totalPage))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        }
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




