import React, { Component } from 'react';
import { Table, Button, Popconfirm, Spin, message, Modal, Input, Form, Icon } from 'antd'
import { connect } from 'react-redux'
import { selectkeysToHeader } from '../Slider/action/Header.action'
import { stylistDataSourceAsync, fugai, tableFugai } from '../stylist/action/Stylist.action'
import { API } from '../../lib/API/check.API.js'
import { POST$, downloadFile, DesignDataTree } from '../../lib/MATH/math.js'

const FormItem = Form.Item
class DesignTablecomponent extends Component {
  state = {
    data: [],
    loading: true,
    visible: false,
    selectData: 0,
    CreateMenu: true,
    PKMenu: true,
    columns: [{
      title: '表格名称',
      dataIndex: 'Name',
      key: 'Name',
      render(text, record) {
        return (
          <div style={{ padding: '10px', display: 'inline-block' }}>
            {text}
          </div>
        );
      }
    }, {
      title: '所属分公司',
      dataIndex: 'BranchId',
      width: '12%',
      key: 'BranchId',
      render(text, record) {
        return (
          <div style={{ padding: '10px' }}>
            {text}
          </div>
        );
      }
    }, {
      title: '排序',
      dataIndex: 'Sort',
      width: '12%',
      key: 'Sort',
      render(text, record) {
        return (
          <div style={{ padding: '5px' }}>
            {text}
          </div>
        );
      }
    }, {
      title: '最后修改时间',
      dataIndex: 'LastModifyTime',
      width: '30%',
      key: 'LastModifyTime',
      render: (text, record) => {
        return (
          <div style={{ padding: '10px' }}>{text.slice(0, 19)}</div>
        )
      }
    }, {
      key: 'PK',
      title: '操作',
      width: '20%',
      dataIndex: 'PK',
      render: (text, record) => {
        // console.log(record);
        //增加判断
        return (
          !record.IsCategory
            ? (
              <Button.Group style={{ padding: '5px' }}>
                <Button type='primary' onClick={this.daochu.bind(this, record)}>导出配置</Button>
              </Button.Group>
            ) : null
        )
      }
    }]
  }
  componentDidMount() {
    POST$(API('POSTDATA').http, {}, (res) => {
      // console.log(res);
      res.forEach(e => {
        DesignDataTree(e)
      })
      this.setState({
        data: res,
        loading: false
      })
    })
  }
  //delete
  handleDelete = () => {
    //只是队列得删除  没有实际删除
    // const data = [...this.state.data]
    // this.setState({
    //   data: data.filter(item => item.key !== key)
    // })
    POST$(API('Delete').http + this.state.selectData.PK + '/Delete', {}, (e) => {
      if (e.result) {
        POST$(API('POSTDATA').http, {}, (res) => {
          // console.log(res);
          res.forEach(e => {
            DesignDataTree(e)
          })
          if (res) {
            this.setState({
              data: res,
            })
          }
        })
      }
    })
  }
  TableHeader = () => (
    <Button.Group>
      <Button onClick={this.CreateTable.bind(this, 'new')}>新建表单</Button>
      <Button onClick={this.CreateMenu.bind(this, 'level1')}>新建根菜单</Button>
      <Button onClick={this.CreateMenu.bind(this, 'level2')}>添加下级菜单</Button>
      <Button onClick={this.CreateTable.bind(this, 'Edit')}>编辑</Button>
      <Popconfirm title="确定删除？" onConfirm={this.handleDelete.bind(this)}>
        <Button type='danger'>删除</Button>
      </Popconfirm>
    </Button.Group>
  )
  daochu = (record) => {
    console.log(record);
    downloadFile(record.Name, record.Bytes)
  }
  CreateMenu = (e) => {
    this.props.form.resetFields()
    this.setState({
      visible: true,
      CreateMenu: e === 'level1' ? true : false,
      PKMenu:true
    })
  }
  //新曾
  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
    // console.log(e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let save = {}
        save = {
          BranchId: '',
          Bytes: '',
          Category: '',
          ParentFormID: this.state.CreateMenu ? 0 : this.state.selectData.PK,
          FK: -1,
          Name: values.userName,
          Sort: values.Sort,
          PK: this.state.PKMenu ? -1 : this.state.selectData.PK,
          Role: "",
          TelantId: "",
        }


        //新建菜单
        POST$(API('SaveForm').http, save, (res) => {
          console.log(res);
          if (res.PK) {
            POST$(API('POSTDATA').http, {}, (res) => {
              console.log(res);
              res.forEach(e => {
                DesignDataTree(e)
              })
              this.setState({
                data: res,
                loading: false,
                visible: false,
              })
            })
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  CreateTable = (dataSource) => {
    console.log(dataSource);
    //mock的数据 新建表单或者获取表单要覆盖原来的
    if (dataSource === 'new') {
      localStorage.setItem('C', 'N')
      this.props.fugai([])
      this.props.update({})
      this.props.onTodoClick(['表单设计'])
      this.props.history.push('/Design/Stylist')
    } else if (dataSource === 'Edit') {
      let selectData = this.state.selectData
      if (selectData === 0) {
        message.warning('请选中一个菜单或表单')
      } else {
        if (selectData.IsCategory) {
          //文件夹
          if (this.state.selectData.ParentFormID === 0) {
            this.setState({
              visible: true,
              CreateMenu: true,
              PKMenu: false
            })
          } else {
            this.setState({
              visible: true,
              CreateMenu: false,
              PKMenu: false
            })
          }

          console.log(this.state.selectData);
          this.props.form.setFieldsValue({ 'userName': this.state.selectData.Name });
          this.props.form.setFieldsValue({ 'Sort': this.state.selectData.Sort });
        } else {
          //表单
          let body = JSON.parse(this.state.selectData.Bytes)
          localStorage.setItem('C', JSON.stringify(this.state.selectData))
          this.props.fugai(body.FormData) //添加表单的
          this.props.tableFugai(body.TableData)//添加表格的
          this.props.update(this.state.selectData)//用来确定是否新建
          this.props.onTodoClick(['表单设计'])
          this.props.history.push('/Design/Stylist')
        }
      }
    }
  }
  rowSelection = {
    onSelect: (record) => {
      console.log(record);
      this.setState({
        selectData: record
      })
    },
    type: 'radio'
  };
  render() {
    var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.loading}>
        <Modal
          title="新建菜单"
          footer={false}
          visible={this.state.visible}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入菜单名称!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="菜单名称" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('Sort', {
                rules: [{ required: true, message: '请输入菜单排序!' }],
              })(
                <Input  placeholder="序号" />
              )}
            </FormItem>
            <FormItem style={{ textAlign: 'center' }}>
              <Button htmlType='submit'>确定</Button>
              <Button type='danger' onClick={this.handleCancel}>取消</Button>
            </FormItem>
          </Form>
        </Modal>
        <Table
          style={{ height: h }}
          title={this.TableHeader}
          bordered={true}
          columns={this.state.columns}
          rowSelection={this.rowSelection}
          dataSource={this.state.data}
          rowKey='PK' />
      </Spin>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StylistData: state.StylistData
  }
}
const mapDispatchProps = (dispatch) => {
  return {
    onTodoClick: (k) => {
      dispatch(selectkeysToHeader(k))
    },
    update: (k) => {
      dispatch(stylistDataSourceAsync(k))
    },
    fugai: (k) => {
      dispatch(fugai(k))
    },
    tableFugai: (k) => {
      dispatch(tableFugai(k))
    }
  }
}
export default connect(mapStateToProps, mapDispatchProps)(Form.create()(DesignTablecomponent));