import React, { Component } from 'react';
import { Table, Tooltip } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { tAddDown, tReduceUp } from '../lookup/action/lookup.action';
import { dateFtt } from '../../../lib/MATH/math'

// import { Resizable } from 'react-resizable';



class TABLECOMPONENT extends Component {
    state = {
        // page: 1,
        data: [],
        x: 1,
        tr: 0,
        colHeight: 0,
        pageNum: 1,
    }

    // componentWillReceiveProps(pre) {
    //     console.log(pre.tableSource)
    //     let colHeight = Math.floor(pre.heights / 23)
    //     let data = []
    //     if (pre.tableSource.tr > this.state.tr) {
    //         if (pre.tableSource.tr === colHeight * this.state.x && pre.tableSource.tr < 350) {
    //             // if (pre.TABLE === 'TABLE') {
    //             pre.tableSource.dataSource.map((e, i) => {
    //                 if (colHeight * this.state.x <= i && i < (colHeight * this.state.x + colHeight)) {
    //                     e.indexs = colHeight * this.state.x + i + 'tables'
    //                     data.push(e)
    //                 }
    //             })
    //             this.setState((p) => (
    //                 {
    //                     data: data,
    //                     tr: pre.tableSource.tr,
    //                     x: p.x + 1,
    //                     colHeight: colHeight
    //                 }
    //             ))
    //         }

    //     } else if (pre.tableSource.tr < this.state.tr) {
    //         if (pre.tableSource.tr === (colHeight * (this.state.x - 1) - 1) && pre.tableSource.tr > 0) {
    //             console.log(this.state.x);

    //             // if (pre.TABLE === 'TABLE') {
    //             pre.tableSource.dataSource.map((e, i) => {
    //                 if (colHeight * this.state.x <= i && i < (colHeight * this.state.x + colHeight)) {
    //                     e.indexs = i + 'tables'
    //                     data.push(e)
    //                 }
    //             })
    //             this.setState((p) => (
    //                 {
    //                     data: data,
    //                     tr: pre.tableSource.tr,
    //                     x: p.x - 1,
    //                     colHeight: colHeight
    //                 }
    //             ))
    //         }
    //     } else if (pre.tableSource.dataSource.length > 0) {
    //         // console.log(pre);
    //         let Source = pre.tableSource.dataSource
    //         if (Source.length > colHeight) {
    //             Source.map((e, i) => {
    //                 if (i < 200) {
    //                     e.indexs = i + 'tables'
    //                     data.push(e)
    //                 }
    //             })
    //         } else {

    //             for (let i = 0; i < colHeight; i++) {
    //                 if (i > (Source.length - 1)) {
    //                     let objs = {}
    //                     Object.keys(Source[0]).map(e => {
    //                         objs[e] = '-'
    //                     })
    //                     objs.indexs = i + 'tables'
    //                     data.push(objs)
    //                 } else {
    //                     Source[i].indexs = i + 'tables'
    //                     data.push(Source[i])
    //                 }

    //             }
    //             console.log(data);

    //         }

    //         // console.log(data);

    //         this.setState(() => (
    //             {
    //                 data: data,
    //                 tr: 0,
    //                 x: 1,
    //                 colHeight: colHeight
    //             }
    //         ), () => {
    //             setTimeout(() => {
    //                 pre.tableSource.tr = 0
    //                 // console.log(pre.tableSource.tr);
    //             }, 100);
    //         })
    //     } else {
    //         this.setState(() => (
    //             {
    //                 data: data,
    //                 tr: 0,
    //                 x: 1,
    //                 colHeight: colHeight
    //             }
    //         ), () => {
    //             setTimeout(() => {
    //                 pre.tableSource.tr = 0
    //                 // console.log(pre.tableSource.tr);
    //             }, 100);
    //         })
    //     }
    // }
    componentDidMount() {
        console.log(1);

    }
    componentWillReceiveProps(pre) {
        // console.log(pre);
        // if (pre.tableSource.pageNum === this.state.pageNum) {
        //加新数据
        let colHeight = Math.floor(pre.heights / 23)
        let data = []
        let Source = pre.tableSource.dataSource
        // console.log(Source.length);
        
        if (Source.length < colHeight && Source.length>0) {
            // console.log(2);
            
            let keys = Object.keys(Source[0])
            Source.map((e, i) => {
                e.indexs = i + 'tables'
                data.push(e)
            })
            for (var i = 0; i < colHeight - Source.length; i++) {
                let e = {}
                keys.forEach(x => {
                    e[x] = '-'
                })
                e.indexs = i + 'tt'
                data.push(e)
            }
            this.setState(() => (
                {
                    data: data,
                    colHeight: colHeight
                }
            ))
        } else {
            // console.log(1);
            
            Source.map((e, i) => {
                e.indexs = i + 'tables'
                data.push(e)
            })
            this.setState(() => (
                {
                    data: data,
                    colHeight: colHeight
                }
            ))
        }


       
    }

    // handleKeyDown = (e) => {
    //     const { dataSource, columns } = this.props.tableSource
    //     switch (e.keyCode) {
    //         case 40://下
    //             if (this.props.tableSource.tr < dataSource.length - 1) {
    //                 // console.log(this.props.current.tr);
    //                 this.props.tAddDown(this.props.tableSource.tr, 1)
    //             }
    //             break;
    //         case 38://上
    //             if (this.props.tableSource.tr > 0) {
    //                 this.props.tReduceUp(this.props.tableSource.tr, 1)
    //             }
    //             break;
    //         case 37:

    //             break
    //         case 39:

    //             break
    //     }
    // }

    render() {
        const { colHeight } = this.state
        const { columns, pageSize } = this.props.PublicData
        let widths = 0
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

                            //format datetime;
                            let ss = text;
                            let crtTime = new Date(ss);
                            if (isNaN(crtTime.getDate()))
                                text = ss;
                            else
                                text = dateFtt("yyyy-MM-dd", crtTime);

                            if (/^[\u4e00-\u9fa5]/.test(text)) {//中文
                                if (text.length > 10) {
                                    // 大于10
                                    return (
                                        // <Tooltip title={text}>
                                        <span style={{ width: '200px' }}>{text.slice(0, 10)} </span>
                                        // </Tooltip>
                                    )
                                } else {
                                    //小于10
                                    return (
                                        <span style={{ width: '200px' }}>{text}</span>
                                    )
                                }
                            } else {//EN or NUM
                                if (text.length > 15) {
                                    return (
                                        <span style={{ width: '200px' }}>{text.slice(0, 15)}</span>
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
                    pagination={false}
                    columns={this.props.tableSource.columns}
                    dataSource={this.state.data}
                    scroll={{ x: widths, y: colHeight * 23 }}
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

                        // if (this.props.tableSource.tr > (colHeight - 1)) {
                        //     return (index === (this.props.tableSource.tr - (colHeight * (this.state.x - 1))) ? 'black' : "")
                        // } else {
                        return (index === this.props.tableSource.tr ? 'black' : '')
                        // }
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
















