import React, { Component } from 'react';
import { Table } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { Object } from 'core-js';
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


class TABLECOMPONENT extends Component {
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

    componentWillReceiveProps(pre) {
        // console.log('tr' + this.state.tr + ';' + 'pretr' + pre.tableSource.tr)

        let data = []
        if (pre.tableSource.tr > this.state.tr) {
            if (pre.tableSource.tr === 35 * this.state.x && pre.tableSource.tr < 350) {
                if (pre.TABLE === 'TABLE') {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (35 * this.state.x <= i && i < (35 * this.state.x + 35)) {
                            e.indexs = 35 * this.state.x + i + 'table'
                            data.push(e)
                        }
                    })
                } else {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (35 * this.state.x <= i && i < (35 * this.state.x + 35)) {
                            e.indexs = 35 * this.state.x + i + 'table'
                            data.push(e)
                        }
                    })
                }


                this.setState((p) => (
                    {
                        data: data,
                        tr: pre.tableSource.tr,
                        x: p.x + 1
                    }
                ))
            }

        } else if (pre.tableSource.tr < this.state.tr) {
            if (pre.tableSource.tr === (35 * (this.state.x - 1) - 1) && pre.tableSource.tr > 0) {
                // console.log(this.state.x);

                if (pre.TABLE === 'TABLE') {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (35 * this.state.x <= i && i < (35 * this.state.x + 35)) {
                            e.indexs = 35 * this.state.x + i + 'table'
                            data.push(e)
                        }
                    })
                } else {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (35 * this.state.x <= i && i < (35 * this.state.x + 35)) {
                            e.indexs = 35 * this.state.x + i + 'table'
                            data.push(e)
                        }
                    })
                }
                this.setState((p) => (
                    {
                        data: data,
                        tr: pre.tableSource.tr,
                        x: p.x - 1
                    }
                ))
            }
        }
        this.setState({
            tr: pre.tableSource.tr
        })

    }
    render() {
        // console.log(this.props.PublicData);
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        const { columns, dataSource, pageSize, scroll, groupname, label, totalPage, type } = this.props.PublicData
        let widths = 0
        let heightTable = this.props.tableSource.tr * (-38) > -228 ? '0px' : (this.props.tableSource.tr * (-38) + 228) + 'px'
        if (columns) {
            columns.map((e, i) => {
                widths += Number(e.width)
            });
        }
        // console.log(this.props.heights);
        console.log();
        
        return (
            <div>
                <Table
                    bordered
                    // components={this.components}
                    columns={columns}
                    dataSource={this.props.tableSource.dataSource}
                    pagination={false}
                    scroll={{ x: widths, y:  this.props.heights }}
                    rowClassName={(record, index) => {
                        // console.log(record)
                        // console.log(index);
                        if (this.props.tableSource.tr > 34) {
                            return (index === (this.props.tableSource.tr - (35 * (this.state.x - 1))) ? 'black' : "")
                        } else {
                            return (index === this.props.tableSource.tr ? 'black' : '')
                        }
                    }}
                    rowKey='indexs'
                    size='small' />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
        tableSource: state.tableSource,
        tableSource: state.tableSource
    }
}
const mapDispatchProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchProps)(TABLECOMPONENT);
















