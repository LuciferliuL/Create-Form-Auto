import React, { Component } from 'react';
import { Form, Pagination, Input, Button, Modal, Table, Radio } from 'antd'
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
    render() {
        // console.log(this.props.Read);
        const rowSelection = {
            onChange: this.onSelectChange,
            onSelect: this.onSelect_,
            onSelectAll: this.onSelectAll_,
            hideDefaultSelections: true,
            type:'radio',
            selections:true,
            selectedRowKeys:[this.props.current.tr]
        }
        const { shows } = this.props.current
        const { getFieldDecorator } = this.props.form
        const { dataSource, placeholder, disabled, label, id, required, message, layout, columns } = this.props.PublicData
        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                <Modal
                    visible={shows}
                    width='100%'
                    style={{ top: '0' }}
                    footer={null}
                >
                    <Table columns={columns}
                        rowSelection={rowSelection}
                        dataSource={dataSource}
                        type={Radio}
                    />
                </Modal>
                {
                    this.props.Read === 'R' ?
                        <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleKey.bind(this, this.props.PublicData.key)}>aaaa</Button>
                        : <Button style={{ opacity: 0, width: '50%', position: 'absolute', zIndex: 2, right: '5%' }} onClick={this.ClickHandleShows.bind(this)}>aaaa</Button>
                }
                <FormItem
                    label={label}
                    {...layout}
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
        let v = props.UpdataFormData.find(e => e.key === props.PublicData.key)
        let values = v.values[v.uniqueKey]
        let id = props.UpdataFormData.find(e => e.key === props.PublicData.key).id
        Field[id] = Form.createFormField({ value: values })
        // console.log(Field);
        return Field

    },
})(LookUpPublicComponent));




