import { Table} from 'antd';
import React, { Component } from 'react';

const columns = [{
  title: 'Name',
  dataIndex: 'Name',
}, {
  title: 'LastModifyTime',
  dataIndex: 'LastModifyTime',
}, {
  title: 'BranchId',
  dataIndex: 'BranchId',
}];

export  class LookUptable extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };


  onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys changed: ', selectedRows);
    this.setState({ selectedRowKeys });
    this.props.tableChange(false,selectedRows)
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type:'radio'
    };
    return (
      <div> 
        <Table 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={this.props.tableDataSource} 
        pagination={{pageSize:20}}
        bordered={true}
        rowKey='Name'
        />
      </div>
    );
  }
}

