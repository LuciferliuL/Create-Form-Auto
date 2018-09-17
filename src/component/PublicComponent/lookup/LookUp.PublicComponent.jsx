import React, { Component } from 'react';
import { Form, Pagination, Input, Button, Modal } from 'antd'
import './LookUp.PublicComponent.css'

const FormItem = Form.Item
class LookUpPublicComponent extends Component {
    state = {
        visibles: false,
        td: 0,
        tr: 0,
        list: []
    }

    componentDidMount() {
        console.log(this.state.tr);
        console.log(this.state.td);
        const { dataSource, columns } = this.props.PublicData
        let arr = []
        dataSource.forEach(e => {
            let l = []
            Object.keys(e).forEach(t => {
                l.push(e[t])
            })
            arr.push(l)
        })
        this.setState({
            list: arr
        })
    }
    handleKeyDown = (e) => {
        const { dataSource, columns } = this.props.PublicData
        switch (e.keyCode) {
            case 37://左
                if (this.state.td > 0) {
                    this.setState((pre) => ({ td: pre.td - 1 }))
                }
                break;
            case 38://下
                if (this.state.tr > 0) {
                    this.setState((pre) => ({ tr: pre.tr - 1 }))
                }
                break;
            case 39://右
                if (this.state.td < columns.length - 1) {
                    this.setState((pre) => ({ td: pre.td + 1 }))
                }
                break;
            case 40://上
                if (this.state.tr < dataSource.length - 1) {
                    this.setState((pre) => ({ tr: pre.tr + 1 }))
                }
                break;

            case 13:
                this.CLick()
                this.setState({
                    visibles: false,
                });
                break

        }
    }
    showModal = () => {
        this.setState({
            visibles: true,
        },()=>{window.addEventListener('keyup', this.handleKeyDown)});
    }

    CLick = () => {
        console.log(this.state.tr);
        console.log(this.state.td);
        let id = this.props.PublicData.id
        let obj = {}
        obj[id] = JSON.parse(JSON.stringify(this.state.list[this.state.tr][this.state.td]))  
        this.props.form.setFieldsValue(obj)
    }
    render() {
        const { td, tr } = this.state
        const { getFieldDecorator } = this.props.form
        const { optionLable, dataSource, placeholder, disabled, label, id, required, message, layout, columns } = this.props.PublicData
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
                    visible={this.state.visibles}
                    width='100%'
                    style={{ top: '0' }}
                    footer={<Pagination defaultCurrent={6} total={500}></Pagination>}
                >
                    <table style={{ width: '100%' }}>
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
                <Button style={{ opacity: 0, width: '100%', position: 'absolute', zIndex: 2 }} onClick={this.showModal.bind(this)}>aaaa</Button>
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

export default LookUpPublicComponent = Form.create()(LookUpPublicComponent);




