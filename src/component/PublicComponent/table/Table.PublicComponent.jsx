import React, { Component } from 'react';
import { Table } from 'antd'


class TablePublicComponent extends Component {
    render() {
        const { columnsTable, dataSource , pageSize ,scroll ,label} = this.props.PublicData
        return (
            <Table columns={columnsTable} dataSource={dataSource} pagination={{ pageSize: pageSize}} scroll={{ y: scroll}}/>
        )
    }
}

export default TablePublicComponent ;
















