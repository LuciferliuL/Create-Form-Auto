import React, { Component } from 'react';
import { Table, Button, Popconfirm ,Spin} from 'antd'
import { connect } from 'react-redux'
import { selectkeysToHeader } from '../Slider/action/Header.action'
import { stylistDataSourceAsync, fugai } from '../stylist/action/Stylist.action'
import { API } from '../../lib/API/check.API.js'
import { GET$ } from '../../lib/MATH/math.js'

class DesignTablecomponent extends Component {
  state = {
    data: [],
    loading:true,
    columns: [{
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name'
    }, {
      title: 'BranchID',
      dataIndex: 'BranchId',
      width: '12%',
      key: 'BranchId'
    }, {
      title: 'LastModifyTime',
      dataIndex: 'LastModifyTime',
      width: '30%',
      key: 'LastModifyTime'
    }, {
      key: 'PK',
      title: '操作',
      width: '20%',
      dataIndex: 'PK',
      render: (text, record) => {
        console.log(text, record);

        //增加判断
        return (
          this.state.data.length >= 1
            ? (
              <div>
                <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
                <Button onClick={this.CreateTable.bind(this, record)}>编辑</Button>
              </div>
            ) : null
        )
      }
    }]
  }
  componentDidMount() {
    GET$(API('CheckFormList').http, (res) => {
      // console.log(res);
      this.setState({
        data: res,
        loading:false
      })
    })
  }
  //delete
  handleDelete = (key) => {
    //只是队列得删除  没有实际删除
    const data = [...this.state.data]
    this.setState({
      data: data.filter(item => item.key !== key)
    })
  }
  TableHeader = () => (
    <div>
      <Button onClick={this.CreateTable.bind(this, 'new')}>新建表单</Button>
    </div>
  )
  CreateTable = (dataSource) => {
    // console.log(dataSource);
    //mock的数据 新建表单或者获取表单要覆盖原来的
    if (dataSource === 'new') {
      this.props.onTodoClick(['表单设计'])
      this.props.history.push('/Design/Stylist')
    } else {
      this.props.fugai(JSON.parse(dataSource.Bytes))
      this.props.update(dataSource)
      this.props.onTodoClick(['表单设计'])
      this.props.history.push('/Design/Stylist')
    }
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Table
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
  }
}
export default connect(mapStateToProps, mapDispatchProps)(DesignTablecomponent);