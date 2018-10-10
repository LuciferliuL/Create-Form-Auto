import React, { Component } from 'react';
import { Pagination, Table } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
// import { Resizable } from 'react-resizable';


// const ResizeableTitle = (props) => {
//     const { onResize, width, ...restProps } = props;

//     if (!width) {
//         return <th {...restProps} />;
//     }

//     return (
//         <Resizable width={width} height={0} onResize={onResize}>
//             <th {...restProps} />
//         </Resizable>
//     );
// };


class TablePublicComponent extends Component {
    state = {
        // page: 1,
        data: [],
        x: 1,
        tr: 0
    }
    // components = {
    //     header: {
    //         cell: ResizeableTitle,
    //     },
    // };
    // handleResize = index => (e, { size }) => {
    //     this.setState(({ columns }) => {
    //         const nextColumns = [...columns];
    //         nextColumns[index] = {
    //             ...nextColumns[index],
    //             width: size.width,
    //         };
    //         return { columns: nextColumns };
    //     });
    // };
    componentDidMount() {
        // console.log(this.props.currentAttr);
        let data = []
        this.props.currentAttr.dataSource.map((e, i) => {
            if (i < 35) {
                e.indexs = i + 'table'
                data.push(e)
            }
        })
        this.setState({
            data: data,
            tr: this.props.currentAttr.tr
        })
    }
    componentWillReceiveProps(pre) {
        // console.log('tr' + this.state.tr + ';' + 'pretr' + pre.currentAttr.tr)

        let data = []
        if (pre.currentAttr.tr > this.state.tr) {
            if (pre.currentAttr.tr === 35 * this.state.x && pre.currentAttr.tr < 350) {
                pre.currentAttr.dataSource.map((e, i) => {
                    if (35 * this.state.x <= i && i < (35 * this.state.x + 35)) {
                        e.indexs = 35 * this.state.x + i + 'table'
                        data.push(e)
                    }
                })

                this.setState((p) => (
                    {
                        data: data,
                        tr: pre.currentAttr.tr,
                        x: p.x + 1
                    }
                ))
            }

        } else if (pre.currentAttr.tr < this.state.tr) {
            if (pre.currentAttr.tr === (35 * (this.state.x - 1) - 1) && pre.currentAttr.tr > 0) {
                // console.log(this.state.x);

                pre.currentAttr.dataSource.map((e, i) => {
                    if (parseInt(pre.currentAttr.tr / 35) * 35 <= i && i < 35 * (this.state.x - 1)) {
                        data.push(e)
                    }
                })
                this.setState((p) => (
                    {
                        data: data,
                        tr: pre.currentAttr.tr,
                        x: p.x - 1
                    }
                ))
            }
        }
        this.setState({
            tr: pre.currentAttr.tr
        })

    }
    // OnChange = (page, pagesize) => {
    //     // console.log(page);
    //     // console.log(pagesize);
    //     this.props.ClickHandleKey(this.props.PublicData.key, page, pagesize, false)
    //     this.setState({
    //         page: page
    //     })
    // }
    render() {
        // console.log(this.props.PublicData);
        var w = document.documentElement.clientWidth || document.body.clientWidth;

        const { columns, dataSource, pageSize, scroll, groupname, label, totalPage, type } = this.props.PublicData
        const theads = []
        const tbodys = []
        let widths = 0
        let heightTable = this.props.currentAttr.tr * (-38) > -228 ? '0px' : (this.props.currentAttr.tr * (-38) + 228) + 'px'
        columns.map((e, i) => {
            widths += Number(e.width)
            // ({
            //     ...e,
            //     onHeaderCell: column => ({
            //         width: column.width,
            //         onResize: this.handleResize(i),
            //     }),
            // })

            // theads.push(
            //     <th key={i + e.title} style={{
            //         borderCollapse: "collapse",
            //         textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
            //         border: '1px solid #e8e8e8', backgroundColor: '#1890ff'
            //     }}>{e.title}</th>
            // )
        });
        //dataIndex  是老的
        //data 是新的
        // let o = 0
        // dataSource.forEach((e, i) => {
        //     if (i < 200) {
        //         let list = []
        //         columns.forEach((t, j) => {
        //             o++
        //             list.push(<td key={o}
        //                 style={{
        //                     borderCollapse: "collapse",
        //                     textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
        //                     border: '1px solid #e8e8e8', whiteSpace: 'nowrap'
        //                 }}>{e[t.data]}</td>)
        //         })
        //         tbodys.push(
        //             <tr key={i + 121378}
        //                 style={
        //                     this.props.currentAttr.tr === i ?
        //                         { backgroundColor: '#8e8' } : null}
        //             >
        //                 <td key={i + 'asdjosjd'} style={{
        //                     width: '40px', borderCollapse: "collapse",
        //                     textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
        //                     border: '1px solid #e8e8e8'
        //                 }}>{i}</td>
        //                 {
        //                     list
        //                 }
        //             </tr>)
        //     }


        // })
        // console.log(widths);


        // console.log(columns);
        // console.log(this.state.data);

        return (
            <div>
                <Table
                    bordered
                    // components={this.components}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    scroll={{ x: widths, y: 800 }}
                    rowClassName={(record, index) => {
                        // console.log(record)
                        // console.log(index);
                        if (this.props.currentAttr.tr > 34) {
                            return (index === (this.props.currentAttr.tr - (35 * (this.state.x - 1))) ? 'black' : "")
                        } else {
                            return (index === this.props.currentAttr.tr ? 'black' : '')
                        }

                    }}
                    rowKey='indexs'
                    size='small' />
                {/* <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    style={{ padding: '10px', zIndex: 1080 }}
                    pageSize={200}
                    current={this.state.page}
                    onChange={this.OnChange.bind(this)} /> */}
            </div>









            // <div>
            //     <div style={{ position: 'relative', top: '1px', zIndex: '999' ,height:'800px'}}>
            //         <table style={{
            //             position: 'relative',
            //             width: widths > w ? widths : '100%', border: '1', verticalAlign: 'middle',
            //             boxSizing: 'border-box',
            //             borderColor: 'inherit', textAlign: 'left', borderSpacing: '2px'
            //         }}>
            //             <thead>
            //                 <tr>
            //                     <th style={{
            //                         width: '40px', borderCollapse: "collapse",
            //                         textAlign: 'left', padding: '8px 8px', wordBreak: 'break-word',
            //                         border: '1px solid #e8e8e8', backgroundColor: '#1890ff'
            //                     }}></th>
            //                     {theads.length > 0 ? theads : null}
            //                     {/* <th style={{width:'17px',borderCollapse: "collapse",}}></th> */}
            //                 </tr>
            //             </thead>
            //         </table>
            //     </div>
            //     <div style={{width: widths > w ? widths : '100%'}}>
            //         <table
            //             style={{
            //                 position: 'relative',
            //                 width: widths > w ? widths : '100%', border: '1', verticalAlign: 'middle',
            //                 boxSizing: 'border-box',
            //                 borderColor: 'inherit', textAlign: 'left', borderSpacing: '2px',

            //             }}>
            //             <tbody style={{  top: heightTable, position: 'relative' }}>
            //                 {tbodys.length > 0 ? tbodys : null}
            //             </tbody>
            //         </table>
            //     </div>
            //     {/* </div> */}
            //     <Pagination
            //         defaultCurrent={1}
            //         total={totalPage}
            //         style={{ padding: '10px', zIndex: 1080 }}
            //         pageSize={200}
            //         current={this.state.page}
            //         onChange={this.OnChange.bind(this)} />
            // </div>
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
















