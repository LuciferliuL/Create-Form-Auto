import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { selectkeysToHeader } from '../Slider/action/Header.action'
import { stylistDataSourceAsync } from '../stylist/action/Stylist.action'


class DesignTablecomponent extends Component {
  state = {
    data: [{
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [{
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      }, {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [{
          key: 121,
          name: 'Jimmy Brown',
          age: 16,
          address: 'New York No. 3 Lake Park',
        }],
      }, {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [{
          key: 131,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park'
        }],
      }],
    }, {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }],
    columns: [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      width: '12%',
    }, {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
    }, {
      title: 'Address',
      width: '20%',
      dataIndex: '',
      render: (text, record) => {
        //增加判断
        return (
          this.state.data.length >= 1
            ? (
              <div>
                <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
                <Button onClick={this.CreateTable.bind(this, text)}>编辑</Button>
              </div>
            ) : null
        )
      }
    }]
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
      <Button onClick={this.CreateTable.bind(this, '')}>新建表单</Button>
    </div>
  )
  CreateTable = (dataSource) => {
    console.log(dataSource);
    //mock的数据 新建表单或者获取表单要覆盖原来的
    const data = [
      { id: 1, name: 'apple' }, { id: 2, name: 'watermelon' }, { id: 3, name: 'banana' },
      { id: 4, name: 'lemon' }, { id: 5, name: 'orange' }, { id: 6, name: 'grape' },
      { id: 8, type: 'INPUT', width: 4, required: true, message: "123", attr: "11", label: "输入框", defaultValue: "123", disabled: false, content: true }, { id: 9, name: 'peach' }]
    this.props.update(data)
    this.props.onTodoClick(['表单设计'])
    this.props.history.push('/Design/Stylist')
  }
  render() {
    return (
      <div>
        <Table
          title={this.TableHeader}
          bordered={true}
          columns={this.state.columns}
          rowSelection={this.rowSelection}
          dataSource={this.state.data} />
      </div>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchProps)(DesignTablecomponent);