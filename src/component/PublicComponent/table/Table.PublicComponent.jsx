import React, { Component } from 'react';
import { Table } from 'antd'


class TablePublicComponent extends Component {
    render() {
        const { columns, dataSource , pageSize ,scroll ,label} = this.props.PublicData
        return (
            <Table 
            columns={columns} 
            dataSource={dataSource} 
            pagination={{ pageSize: pageSize}} 
            scroll={{ y: scroll}}
            rowKey={'key'}/>
        )
    }
}

export default TablePublicComponent ;
















