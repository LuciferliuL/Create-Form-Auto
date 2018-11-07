import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Row, Col, Table } from 'antd';
import { API } from '../../lib/API/I9'
import { POST$ } from '../../lib/MATH/math'

const Search = Input.Search;

function mapStateToProps(state) {
  return {

  };
}

class Person extends Component {
  state = {
    columns: [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: '',
      dataIndex: '',
    }],
    data: []
  }

  componentDidMount() {

  }
  onsearch = (e) => {
    let ss = {
      eId: "8070424",
      secret: "ArqyyWkxcIl3jmXcUXwmxTqvtetoZvgG",
      pagesize: 1000,
      keywords: e
    }
    POST$(API('geti9allpersons').http, ss, (res) => {
      console.log(res);

    })
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { data, columns, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card>
        <Row gutter={2}>
          <Col span={10}>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              rowSelection={rowSelection}
              pagination={false}
              scroll={{ y: 600 }}
              title={() =>
                <Search
                  placeholder="input search text"
                  onSearch={this.onsearch.bind(this)}
                />}
            />
          </Col>
          <Col></Col>
        </Row>

      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
)(Person);