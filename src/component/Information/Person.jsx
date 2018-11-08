import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Row, Col, Table, Button } from 'antd';
import { API } from '../../lib/API/I9'
import "../../lib/API/url.API"
import { POST$ } from '../../lib/MATH/math'

const Search = Input.Search;

function mapStateToProps(state) {
  return {

  };
}

class Person extends Component {
  state = {
    selectedRows: [],
    index:0,
    columns: [{
      title: '姓名',
      dataIndex: 'name',
      width: 100
    }, {

      title: '职位',
      dataIndex: 'jobTitle',
      width: 100
    }, {
      title: 'openId',
      dataIndex: 'openId',
    }],
    data: [],
    columns2: [{
      title: '姓名',
      dataIndex: 'name',
      width: 200
    }, {

      title: '职位',
      dataIndex: 'jobTitle',
      width: 200
    }, {
      title: '操作',
      dataIndex: 'openId',
      render: (text, record) => {
        return (
          <div>
            <a href="javascript:;" onClick={this.delRow.bind(this, text)}>删除</a>
          </div>
        )
      }
    }],
    data2: [],
  }
  componentDidMount() {
    console.log(this.props.selectedData);
    const { selectedData } = this.props
    if (selectedData[0].PK !== -1) {
      let l = []
      JSON.parse(selectedData[0].Receivers).forEach(e => {
        let o = {}
        o['openId'] = e.RecOpenid
        o['name'] = e.RecName
        l.push(o)
      })
      this.setState({
        data2: l
      })
    }

  }
  componentWillReceiveProps(pre) {
    // console.log(pre);
    const { selectedData, news } = pre
    if (!news) {
      let l = []
      JSON.parse(selectedData[0].Receivers).forEach(e => {
        let o = {}
        o['openId'] = e.RecOpenid
        o['name'] = e.RecName
        l.push(o)
      })
      this.setState({
        data2: l
      })
    }else if(news && this.state.index === 0){
      this.setState((pre)=>({
          data2:[],
          data:[],
          index:pre.index ++
      }))
    }
  }
  componentWillUnmount(){
    this.setState({
      data2:[],
      data:[]
    })
  }
  //搜索
  onsearch = (e) => {
    let ss = {
      eId: global.msgcfg.eId,
      secret: global.msgcfg.esecret,
      pagesize: 1000,
      keywords: e
    }
    let param = {
      Param: JSON.stringify(ss),
    };
    POST$(API('geti9allpersons').http, param, (res) => {
      // console.log(res);
      this.setState({
        data: res
      })
    })
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRows);
    this.setState({ selectedRowKeys, selectedRows });
  }
  //添加到右边
  AddRightTable = () => {
    const { data2, selectedRows } = this.state
    let D = [ ...data2,...selectedRows]

    this.setState({
      data2: this.un(D)
    }, () => {
      let list = []
      this.state.data2.forEach(e => {
        let o = {}
        o['RecOpenid'] = e.openId
        o['RecName'] = e.name
        list.push(o)
      })
      this.props.EditSelectedRow({ Receivers: JSON.stringify(list) })
    })

  }
  un = (arr) => {
    const res = new Map();
    return arr.filter((a) => !res.has(a.openId) && res.set(a.openId, 1))
  }
  delRow = (e) => {
    // console.log(e);
    // const {data2} = this.state
    // data2.filter(item => item.openId !== e)
    this.setState((pre) => ({
      data2: pre.data2.filter(item => item.openId !== e)
    }), () => {
      let list = []
      this.state.data2.forEach(e => {
        let o = {}
        o['RecOpenid'] = e.openId
        o['RecName'] = e.name
        list.push(o)
      })
      this.props.EditSelectedRow({ Receivers: JSON.stringify(list) })
    })
  }
  render() {
    const { data, columns, selectedRowKeys, columns2, data2 } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card>
        <Row gutter={12}>
          <Col span={10}>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              rowSelection={rowSelection}
              pagination={false}
              scroll={{ y: 600 }}
              rowKey='openId'
              title={() =>
                <div>
                  <Search
                    placeholder="input search text"
                    onSearch={this.onsearch.bind(this)}
                    style={{ width: '80%' }}
                  />
                  <Button onClick={this.AddRightTable.bind(this)}>添加</Button>
                </div>
              }
            />
          </Col>
          <Col span={14}>
            <Table
              columns={columns2}
              dataSource={data2}
              bordered
              pagination={false}
              scroll={{ y: 600 }}
              rowKey='openId'
            />
          </Col>
        </Row>

      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
)(Person);