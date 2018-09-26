import React, { Component } from 'react';
import { Form, Pagination, Input, Button, Modal, Table, Radio } from 'antd'
import { connect } from 'react-redux'
import './LookUp.PublicComponent.css'
import { shows, upDataCurrentDataSource } from './action/lookup.action'
import { currentAttr } from '../../stylist/action/Stylist.action'
import { formUpdataFromCurrent } from '../../SliderRIght/action/Right.action'
import { POST$ } from '../../../lib/MATH/math'
import { API } from '../../../lib/API/check.API'

const FormItem = Form.Item

class LookUpPublicComponent extends Component {
    state = {
        Abbr: {},
        totalPage:0
    }
    componentDidMount() {

    }

    ClickHandleKey = (key) => {
        console.log(key);
        let obj = this.props.UpdataFormData.find(e => e.key === key)
        this.props.UpDataCurrent(obj)
        this.props.shows(this.props.current.shows)
        let body = {
            "Sql": obj.SQL,
            "Param": JSON.stringify(this.state.Abbr),
            "PageIndex": 1,
            "PageSize": 100,
            isPage: false
        }
        POST$(API('SQL').http, body, (res) => {
            console.log(res);
            res.Results.forEach((e, i) => {
                e['key'] = i + 'row'
            })
            this.props.upDataCurrentDataSource(res.Results)
            this.props.upForm(this.props.current)
            this.setState({
                totalPage:res.RecordCount
            })
        })
    }
    ClickHandleShows = (key) => {
        if (Object.keys(this.props.current).length > 0) {
            this.props.shows(this.props.current.shows)
            let obj = this.props.UpdataFormData.find(e => e.key === key)
            this.props.UpDataCurrent(obj)
            let body = {
                "Sql": obj.SQL,
                "Param": JSON.stringify(this.state.Abbr),
                "PageIndex": 1,
                "PageSize": 100,
                isPage: false
            }
            POST$(API('SQL').http, body, (res) => {
                console.log(res);
                res.Results.forEach((e, i) => {
                    e['key'] = i + 'row'
                })
                this.props.upDataCurrentDataSource(res.Results)
                this.props.upForm(this.props.current)
                this.setState({
                    totalPage:res.RecordCount
                })
            })
        }

    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
    onSelect_ = (record, selected, selectedRows) => {
        console.log(selected);
        console.log(record);
        console.log(selectedRows);
    }
    onSelectAll_ = (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    }
    ParamChange = (e) => {
        // console.log(
        //     e.target.value
        // );
        let Abbr = {}
        Abbr['Abbr'] = e.target.value
        this.setState({
            Abbr: Abbr
        })

    }
    render() {
        // console.log(this.props.Read);
        const rowSelection = {
            onChange: this.onSelectChange,
            onSelect: this.onSelect_,
            onSelectAll: this.onSelectAll_,
            hideDefaultSelections: true,
            type: 'radio',
            selections: true,
            selectedRowKeys: [this.props.current.tr + 'row']
        }
        const page = {
            pageSize:10,
            totle:this.state.totalPage,
            showTotal:(e,i)=>{console.log(e,i);
            },
            current:this.props.page
        }
        const { shows } = this.props.current
        const { getFieldDecorator } = this.props.form
        const { dataSource, label, id, required, message, layout, columns } = this.props.PublicData
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <Modal
                    visible={shows}
                    width='100%'
                    style={{ top: '0' }}
                    footer={null}
                >
                    <Table
                        rowKey='key'
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={dataSource}
                        type={Radio}
                        pagination={page}
                    />
                </Modal>
                {
                    this.props.Read === 'R' ?
                        <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleKey.bind(this, this.props.PublicData.key)}>aaaa</Button>
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
        upDataCurrentDataSource: (k) => {
            dispatch(upDataCurrentDataSource(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
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
        let id = v.id
        Field[id] = Form.createFormField({ value: values })
        // console.log(Field);
        return Field

    },
})(LookUpPublicComponent));




