import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Button, Input, Form } from 'antd'
import { hidenDrawer, currentAttrUpdata, formUpdataFromCurrent } from '../SliderRIght/action/Right.action'

const InputGroup = Input.Group
const FormItem = Form.Item
const { TextArea } = Input
class Drawercomponent extends Component {
    onClose = () => {
        this.props.hidefun(false)
    };
    onSure = (e) => {
        //修改的结果在这里
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.updata(values)
                this.props.upForm(values)
            }
        });
        this.props.hidefun(false)
    }
    render() {
        // GroupValue,dataSource,SQL
        const { getFieldDecorator } = this.props.form
        console.log(this.props.flag);
        let content = []
        if (this.props.flag === 'SQL') {
            content.push(
                <FormItem
                    label='SQL语句'
                    key="SQL111">
                    {getFieldDecorator('SQL', {
                        rules: [
                            {
                                required: true,
                                message: 'please enter url description',
                            },
                        ],
                    })(<TextArea autosize></TextArea>)}
                </FormItem>
            )
        } else if (this.props.flag === 'dataSource') {
            content.push(
                <FormItem
                    label='数据源'
                    key="dataSource111">
                    {getFieldDecorator('dataSource', {
                        rules: [
                            {
                                required: true,
                                message: 'please enter url description',
                            },
                        ],
                    })(<TextArea autosize></TextArea>)}
                </FormItem>
            )
        } else if (this.props.flag === 'columns') {
            this.props.currentAttr.columns.forEach((element, i) => {
                content.push(
                    <FormItem
                        label={'列数组' + i}
                        key={"columns" + i}>
                        {getFieldDecorator(element, {
                            rules: [
                                {
                                    required: true,
                                    message: 'please enter url description',
                                },
                            ],
                        })(<Input></Input>)}
                    </FormItem>
                )
            });
        } else {

        }
        return (

            <Drawer title="详细数据"
                placement="right"
                closable={false}
                visible={this.props.hide}
            >
                <Form onSubmit={this.onSure}>
                    {content}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose.bind(this)}
                        >
                            取消
                        </Button>
                        <Button htmlType="submit" type="primary">确定</Button>
                    </div>
                </Form>
            </Drawer>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        hide: state.hide,
        currentAttr: state.currentAttr,
        flag: state.flag
    };
}
const mapDispatchProps = (dispatch) => {
    return {
        hidefun: (k) => {
            dispatch(hidenDrawer(k))
        },
        updata: (k) => {
            dispatch(currentAttrUpdata(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchProps
)(Form.create({
    mapPropsToFields(props) {
        console.log(props);
        const { currentAttr } = props
        let Field = {}
        if (Object.keys(currentAttr).length > 0 && props.flag === 'columns') {
            currentAttr.columns.forEach(e => {
                Field[e] = Form.createFormField({ value: e })
            })
        } else if (Object.keys(currentAttr).length > 0 && props.flag === 'SQL') {
            Field['SQL'] = Form.createFormField({ value: currentAttr.SQL })
        } else if (Object.keys(currentAttr).length > 0 && props.flag === 'dataSource') {
            Field['dataSource'] = Form.createFormField({ value: JSON.stringify(currentAttr.dataSource) })
        }else {
            
        }
        console.log(Field);
        return Field;


    },
})(Drawercomponent));