import React, { Component } from 'react';
import { Table, Button, Popconfirm, Spin } from 'antd'
import { connect } from 'react-redux'
import { selectkeysToHeader } from '../Slider/action/Header.action'
import { stylistDataSourceAsync, fugai, tableFugai } from '../stylist/action/Stylist.action'
import { API } from '../../lib/API/check.API.js'
import { GET$, POST$, POSTFETCH, downloadFile } from '../../lib/MATH/math.js'

class DesignTablecomponent extends Component {
  state = {
    data: [],
    loading: true,
    columns: [{
      title: 'Name',
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
      title: 'BranchID',
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
      title: 'LastModifyTime',
      dataIndex: 'LastModifyTime',
      width: '30%',
      key: 'LastModifyTime',
      render: (text, record) => {
        // console.log(text);

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
        // console.log(text, record);
        if (!record.IsCategory) {
          //增加判断
          return (
            this.state.data.length >= 1
              ? (
                <Button.Group style={{ padding: '5px' }}>
                  <Popconfirm title="确定删除？" onConfirm={this.handleDelete.bind(this, record)}>
                    <Button type='danger'>Delete</Button>
                  </Popconfirm>
                  <Button onClick={this.CreateTable.bind(this, record)}>编辑</Button>
                  <Button type='primary' onClick={this.daochu.bind(this, record)}>导出配置</Button>
                </Button.Group>
              ) : null
          )
        }

      }
    }]
  }
  componentDidMount() {
    POST$(API('POSTDATA').http, {}, (res) => {
      console.log(res);
      this.setState({
        data: res,
        loading: false
      })
    })
  }
  //delete
  handleDelete = (record) => {
    //只是队列得删除  没有实际删除
    // const data = [...this.state.data]
    // this.setState({
    //   data: data.filter(item => item.key !== key)
    // })
    this.setState({
      loading: true
    })
    POST$(API('Delete').http + record.PK + '/Delete', {}, (res) => {
      console.log(res);
      POST$(API('POSTDATA').http, {}, (res) => {
        console.log(res);
        this.setState({
          data: res,
          loading: false
        })
      })
    })

  }
  TableHeader = () => (
    <div>
      <Button onClick={this.CreateTable.bind(this, 'new')}>新建表单</Button>
    </div>
  )
  daochu = (record) => {
    console.log(record);
    let body = {
      Bytes: record.Bytes,
      Name: record.Name
    }
    // POSTFETCH(API('DOWNLOAD').http,JSON.stringify(body) , (res) => {
    //   console.log(res);

    // })
    downloadFile(record.Name, record.Bytes)
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
    } else {
      let body = JSON.parse(dataSource.Bytes)
      localStorage.setItem('C', JSON.stringify(dataSource))
      this.props.fugai(body.FormData) //添加表单的
      this.props.tableFugai(body.TableData)//添加表格的
      this.props.update(dataSource)//用来确定是否新建
      this.props.onTodoClick(['表单设计'])
      this.props.history.push('/Design/Stylist')
    }
  }
  render() {
    var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
    return (
      <Spin spinning={this.state.loading}>
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
export default connect(mapStateToProps, mapDispatchProps)(DesignTablecomponent);