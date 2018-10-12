import React, { Component } from 'react';
import { Table } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import {  tAddDown, tReduceUp} from '../lookup/action/lookup.action'
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
        console.log(pre.tableSource)
        console.log(this.state.tr);
        
        let data = []
        if (pre.tableSource.tr > this.state.tr) {
            if (pre.tableSource.tr === 25 * this.state.x && pre.tableSource.tr < 350) {
                if (pre.TABLE === 'TABLE') {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (25 * this.state.x <= i && i < (25 * this.state.x + 25)) {
                            e.indexs = 25 * this.state.x + i + 'tables'
                            data.push(e)
                        }
                    })
                } else {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (25 * this.state.x <= i && i < (25 * this.state.x + 25)) {
                            e.indexs = 25 * this.state.x + i + 'tables'
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
            if (pre.tableSource.tr === (25 * (this.state.x - 1) - 1) && pre.tableSource.tr > 0) {
                // console.log(this.state.x);

                if (pre.TABLE === 'TABLE') {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (25 * this.state.x <= i && i < (25 * this.state.x + 25)) {
                            e.indexs =  i + 'tables'
                            data.push(e)
                        }
                    })
                } else {
                    pre.tableSource.dataSource.map((e, i) => {
                        if (25 * this.state.x <= i && i < (25 * this.state.x + 25)) {
                            e.indexs = 25 * this.state.x + i + 'table'
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
        }else {
            // console.log(pre);
            
            pre.tableSource.dataSource.map((e, i) => {
                if ( i <  25) {
                    e.indexs =  i + 'tables'
                    data.push(e)
                }
            })
            console.log(data);
            
            this.setState((p) => (
                {
                    data: data,
                    tr: 0,
                    x: 1
                }
            ),()=>{
                setTimeout(() => {
                    pre.tableSource.tr = 0
                }, 100);
                
            })
        }
        this.setState({
            tr: pre.tableSource.tr
        })

    }
    handleKeyDown = (e) => {
        const { dataSource, columns } = this.props.tableSource
        switch (e.keyCode) {
            case 40://下
                if (this.props.tableSource.tr < dataSource.length - 1) {
                    // console.log(this.props.current.tr);
                    this.props.tAddDown(this.props.tableSource.tr, 1)
                }
                break;
            case 38://上
                if (this.props.tableSource.tr > 0) {
                    this.props.tReduceUp(this.props.tableSource.tr, 1)
                }
                break;
            case 37:

                break
            case 39:

                break
        }
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
        console.log(this.state.data);
        
        return (
            <div>
                <Table
                    bordered
                    // bodyStyle={{height:this.props.heights}}
                    // components={this.components}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    scroll={{ x: widths }}
                    onHeaderRow={(column) => {
                        return {
                          onClick: () => {window.addEventListener('keyup', this.handleKeyDown)
                          },        // 点击表头行开启键盘监听
                        };
                      }}
                    rowClassName={(record, index) => {
                        // console.log(record)
                        // console.log(index);
                        if (this.props.tableSource.tr > 24) {
                            return (index === (this.props.tableSource.tr - (25 * (this.state.x - 1))) ? 'black' : "")
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
        tAddDown: (k, i) => {
            dispatch(tAddDown(k, i))
        },
        tReduceUp: (k, i) => {
            dispatch(tReduceUp(k, i))
        },
    }
}
export default connect(mapStateToProps, mapDispatchProps)(TABLECOMPONENT);
















