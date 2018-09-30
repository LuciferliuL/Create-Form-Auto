import React, { Component } from 'react';
import { Pagination } from 'antd'
import { connect } from 'react-redux'

class TablePublicComponent extends Component {
    state = {
        page: 1
    }
    OnChange = (page, pagesize) => {
        // console.log(page);
        // console.log(pagesize);
        this.props.ClickHandleKey(this.props.PublicData.key, page, pagesize, false)
        this.setState({
            page: page
        })
    }
    render() {
        // console.log(this.props.PublicData);
        var w = document.documentElement.clientWidth || document.body.clientWidth;

        const { columns, dataSource, pageSize, scroll, groupname, label, totalPage, type } = this.props.PublicData
        const theads = []
        const tbodys = []
        let widths = 0
        let heightTable = this.props.currentAttr.tr * (-38) > -228 ? '0px' : (this.props.currentAttr.tr * (-38) + 228) + 'px'
        columns.forEach((e, i) => {
            widths += Number(e.width)
            theads.push(
                <th key={i + e.title} style={{
                    width: e.width + 'px', borderCollapse: "collapse",
                    textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
                    border: '1px solid #e8e8e8', backgroundColor: '#1890ff'
                }}>{e.title}</th>
            )
        });
        // theads.push(
        //     <th key='1222313213' style={{width:scroll - widths}}></th>
        // )
        //dataIndex  是老的
        //data 是新的
        let o = 0
        dataSource.forEach((e, i) => {
            if (i < 200) {
                let list = []
                columns.forEach((t, j) => {
                    o++
                    list.push(<td key={o}
                        style={{
                            width: t.width + 'px', borderCollapse: "collapse",
                            textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
                            border: '1px solid #e8e8e8'
                        }}>{e[t.dataIndex]}</td>)
                })
                tbodys.push(
                    <tr key={i + 121378}
                        style={
                            this.props.currentAttr.tr === i ?
                                { backgroundColor: '#8e8' } : null}
                    >
                        <td key={i + 'asdjosjd'} style={{
                            width: '40px', borderCollapse: "collapse",
                            textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
                            border: '1px solid #e8e8e8'
                        }}>{i}</td>
                        {
                            list
                        }
                    </tr>)
            }


        })
        // console.log(widths);

        return (
            // <Table 
            // columns={columns} 
            // dataSource={dataSource} 
            // pagination={{ pageSize: pageSize}} 
            // scroll={{ y: scroll}}
            // rowKey={groupname}/>
            <div>
                <div style={type === 'LookUp' ? {
                    overflow: 'scroll',
                    height: '400px',
                    position: 'relative'
                } : {
                        overflow: 'scroll',
                        position: 'relative'
                    }}>
                    <div style={{ position: 'relative', top: '1px', zIndex: '999' }}>
                        <table style={{
                            position: 'relative',
                            width: widths > w ? widths : '100%', border: '1', verticalAlign: 'middle',
                            boxSizing: 'border-box',
                            // height: '600px',
                            borderColor: 'inherit', textAlign: 'left', borderSpacing: '2px'
                        }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        width: '40px', borderCollapse: "collapse",
                                        textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
                                        border: '1px solid #e8e8e8', backgroundColor: '#1890ff'
                                    }}></th>
                                    {theads}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div >
                        <table
                            style={{
                                position: 'relative',
                                width: widths > w ? widths : '100%', border: '1', verticalAlign: 'middle',
                                boxSizing: 'border-box',
                                // height: '600px',
                                borderColor: 'inherit', textAlign: 'left', borderSpacing: '2px',
                                top: heightTable
                            }}>
                            <tbody>
                                {tbodys.length > 0 ? tbodys : null}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    style={{ padding: '10px', zIndex: 1080 }}
                    pageSize={200}
                    current={this.state.page}
                    onChange={this.OnChange.bind(this)} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
        currentAttr: state.currentAttr,
        UpdataFormData: state.UpdataFormData
    }
}
const mapDispatchProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchProps)(TablePublicComponent);
















