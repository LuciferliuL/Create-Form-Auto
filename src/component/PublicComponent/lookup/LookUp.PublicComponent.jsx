import React, { Component } from 'react';
import { Form, Pagination, Input, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import './LookUp.PublicComponent.css'
import { shows } from './action/lookup.action'
import { currentAttr } from '../../stylist/action/Stylist.action'

const FormItem = Form.Item
class LookUpPublicComponent extends Component {
    ClickHandleKey = (key) => {
        console.log(key);
        let obj = this.props.UpdataFormData.find(e => e.key === key)
        this.props.UpDataCurrent(obj)
        this.props.shows(this.props.current.shows)
    }
    ClickHandleShows = () => {
        if (Object.keys(this.props.current).length > 0) {
            this.props.shows(this.props.current.shows)
        }

    }
    render() {
        console.log(this.props.Read);

        const { td, tr, shows } = this.props.current
        const { getFieldDecorator } = this.props.form
        const { dataSource, placeholder, disabled, label, id, required, message, layout, columns } = this.props.PublicData
        let thead = []
        columns.forEach((e, i) => (
            thead.push(
                <td style={{ width: e.width }} key={e.dataIndex + i} className={'tableborderHeader'}>
                    <span>{e.title}</span>
                </td>)
        ))
        let tbody = []
        dataSource.forEach((e, i) => {
            let tdlist = []
            Object.keys(e).forEach((t, j) => {
                tdlist.push(
                    <td key={e[t] + j} className={'tableborder'}>
                        <span className={(td === j && tr === i) ? 'show' : 'hide'}>{e[t]}</span>
                    </td>
                )
            })
            tbody.push(
                <tr key={'tr' + i}>
                    {tdlist}
                </tr>
            )
        })
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <Modal
                    visible={shows}
                    width='100%'
                    style={{ top: '0' }}
                    footer={<Pagination defaultCurrent={6} total={500}></Pagination>}
                >
                    <table style={{ width: '100%' }} >
                        <thead>
                            <tr>
                                {thead}
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td></td>
                            </tr>
                        </tfoot>
                        <tbody style={{ width: '100%', overflow: 'auto', height: '200px' }}>
                            {tbody}
                        </tbody>
                    </table>
                </Modal>
                {
                    this.props.Read === 'R' ?
                        <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleKey.bind(this, this.props.PublicData.key)}>aaaa</Button>
                        : <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleShows.bind(this)}>aaaa</Button>
                }
                <FormItem
                    label={label}
                    {...layout}
                    labelCol={{span:3}}
                >
                    {getFieldDecorator(id, {
                        rules: [{ required: { required }, message: { message } }],
                    })(
                        <Input></Input>
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
        }
    }
}

export default LookUpPublicComponent = connect(mapStateToProps, mapDispatchProps)(Form.create({
    mapPropsToFields(props) {
        console.log(props);
        let Field = {}
        let v = props.UpdataFormData.find(e => e.key === props.PublicData.key).values
        let id = props.UpdataFormData.find(e => e.key === props.PublicData.key).id
        Field[id] = Form.createFormField({ value: v })
        // console.log(Field);

        return Field

    },
})(LookUpPublicComponent));




