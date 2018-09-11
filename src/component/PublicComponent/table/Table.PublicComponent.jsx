import React, { Component } from 'react';
import { Table } from 'antd'


class TablePublicComponent extends Component {
    render() {
        const { columns, data , pageSize ,scroll ,label} = this.props.PublicData
        return (
            <Table title={()=>label} columns={columns} dataSource={data} pagination={{ pageSize: pageSize}} scroll={{ y: scroll}}/>
        )
    }
}

export default TablePublicComponent ;




