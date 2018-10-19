import React, { Component } from 'react';
import { Table, Tooltip } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { tAddDown, tReduceUp } from '../lookup/action/lookup.action'
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
        tr: 0,
        colHeight: 0
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
        // console.log(this.state.tr + '-----' + pre.tableSource.tr);
        // const {colHeight} = this.state
        // console.log(pre);
        let colHeight = Math.floor(pre.heights / 22)
        let data = []
        if (pre.tableSource.tr > this.state.tr) {
            if (pre.tableSource.tr === colHeight * this.state.x && pre.tableSource.tr < 350) {
                // if (pre.TABLE === 'TABLE') {
                pre.tableSource.dataSource.map((e, i) => {
                    if (colHeight * this.state.x <= i && i < (colHeight * this.state.x + colHeight)) {
                        e.indexs = colHeight * this.state.x + i + 'tables'
                        data.push(e)
                    }
                })
                // } else {
                //     pre.tableSource.dataSource.map((e, i) => {
                //         if (colHeight * this.state.x <= i && i < (colHeight * this.state.x + colHeight)) {
                //             e.indexs = colHeight * this.state.x + i + 'tables'
                //             data.push(e)
                //         }
                //     })
                // }


                this.setState((p) => (
                    {
                        data: data,
                        tr: pre.tableSource.tr,
                        x: p.x + 1,
                        colHeight: colHeight
                    }
                ))
            }

        } else if (pre.tableSource.tr < this.state.tr) {
            if (pre.tableSource.tr === (colHeight * (this.state.x - 1) - 1) && pre.tableSource.tr > 0) {
                console.log(this.state.x);

                // if (pre.TABLE === 'TABLE') {
                pre.tableSource.dataSource.map((e, i) => {
                    if (colHeight * this.state.x <= i && i < (colHeight * this.state.x + colHeight)) {
                        e.indexs = i + 'tables'
                        data.push(e)
                    }
                })
                // } else {
                //     pre.tableSource.dataSource.map((e, i) => {
                //         if (colHeight * this.state.x <= i && i < (colHeight * this.state.x + colHeight)) {
                //             e.indexs = colHeight * this.state.x + i + 'table'
                //             data.push(e)
                //         }
                //     })
                // }
                this.setState((p) => (
                    {
                        data: data,
                        tr: pre.tableSource.tr,
                        x: p.x - 1,
                        colHeight: colHeight
                    }
                ))
            }
        } else if (pre.tableSource.dataSource.length > 0) {
            // console.log(pre);
            let Source = pre.tableSource.dataSource
            if (Source.length > colHeight) {
                Source.map((e, i) => {
                    if (i < colHeight) {
                        e.indexs = i + 'tables'
                        data.push(e)
                    }
                })
            } else {

                for (let i = 0; i < colHeight; i++) {
                    if (i > (Source.length - 1)) {
                        let objs = {}
                        Object.keys(Source[0]).map(e => {
                            objs[e] = '无'
                        })
                        objs.indexs = i + 'tables'
                        data.push(objs)
                    } else {
                        Source[i].indexs = i + 'tables'
                        data.push(Source[i])
                    }

                }
                console.log(data);

            }

            // console.log(data);

            this.setState(() => (
                {
                    data: data,
                    tr: 0,
                    x: 1,
                    colHeight: colHeight
                }
            ), () => {
                setTimeout(() => {
                    pre.tableSource.tr = 0
                    // console.log(pre.tableSource.tr);
                }, 100);
            })
        } else {
            this.setState(() => (
                {
                    data: data,
                    tr: 0,
                    x: 1,
                    colHeight: colHeight
                }
            ), () => {
                setTimeout(() => {
                    pre.tableSource.tr = 0
                    // console.log(pre.tableSource.tr);
                }, 100);
            })
        }
        // this.setState({
        //     tr: pre.tableSource.tr
        // })

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
        const { colHeight } = this.state
        const { columns } = this.props.PublicData
        let widths = 0
        let heightTable = this.props.tableSource.tr * (-38) > -228 ? '0px' : (this.props.tableSource.tr * (-38) + 228) + 'px'
        if (columns) {
            columns.map((e, i) => {
                if (i < this.props.PublicData.float) {
                    e['fixed'] = 'left'
                    widths += 200
                    e.width = 200
                } else {
                    widths += 200
                    e.width = 200
                    e.render = (text) => {
                        if (text) {
                            if (/^[\u4e00-\u9fa5]/.test(text)) {//中文
                                if (text.length > 15) {
                                    // 大于10
                                    return (
                                        <Tooltip title={text}>
                                            <span style={{ width: '200px' }}>{text.slice(0, 15)} </span>
                                        </Tooltip>
                                    )
                                } else {
                                    //小于10
                                    return (
                                        <span style={{ width: '200px' }}>{text}</span>
                                    )
                                }
                            } else {//EN or NUM
                                if (text.length > 20) {
                                    return (
                                        <span style={{ width: '200px' }}>{text.slice(0, 20)}</span>
                                    )
                                } else {
                                    return (
                                        <span style={{ width: '200px' }}>{text}</span>
                                    )
                                }
                            }
                        }
                    }
                }

            });
        }
        // console.log(this.props.tableSource);

        return (
            <div>
                <Table
                    bordered
                    // bodyStyle={{height:this.props.heights}}
                    // components={this.components}
                    columns={this.props.tableSource.columns}
                    dataSource={this.state.data}
                    pagination={false}
                    scroll={{ x: widths }}
                    onHeaderRow={(column) => {
                        // console.log(column);

                        return {
                            onClick: () => {
                                window.addEventListener('keyup', this.handleKeyDown)
                            },       // 点击表头行开启键盘监听
                        };
                    }}
                    rowClassName={(record, index) => {
                        // console.log(record)
                        // console.log(index);
                        // console.log(this.state.x);
                        // console.log(this.props.tableSource.tr);

                        // console.log(colHeight);

                        if (this.props.tableSource.tr > (colHeight - 1)) {
                            return (index === (this.props.tableSource.tr - (colHeight * (this.state.x - 1))) ? 'black' : "")
                        } else {
                            return (index === this.props.tableSource.tr ? 'black' : '')
                        }
                    }}
                    rowKey='indexs'
                // size='small' 
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
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
















