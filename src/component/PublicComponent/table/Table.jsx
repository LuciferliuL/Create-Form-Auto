import React, { Component } from 'react';
import { Table, Tooltip } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { tAddDown, tReduceUp } from '../lookup/action/lookup.action';
import { isdate, formatDate } from '../../../lib/MATH/math'

class TABLECOMPONENT extends Component {
    state = {
        // page: 1,
        data: [],
        x: 1,
        tr: 0,
        colHeight: 0,
        pageNum: 1,
    }

    componentDidMount() {
    }
    componentWillReceiveProps(pre) {
        //加新数据
        let colHeight = Math.floor(pre.heights / 24)
        let data = []
        let Source = pre.tableSource.dataSource
        if (Source.length < colHeight && Source.length > 0) {

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
                            if (isdate(text))
                                text = formatDate(new Date(ss), "yyyy-MM-dd");
                            else {
                                text = ss;
                            }

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

        return (
            <div>
                <Table
                    bordered
                    pagination={false}
                    columns={this.props.tableSource.columns}
                    dataSource={this.state.data}
                    scroll={{ x: widths, y: colHeight * 23 }}
                    onHeaderRow={(column) => {
                        return {
                            onClick: () => {
                                window.addEventListener('keyup', this.handleKeyDown)
                            },       // 点击表头行开启键盘监听
                        };
                    }}
                    rowClassName={(record, index) => {
                        return (index === this.props.tableSource.tr ? 'black' : '')
                    }}
                    rowKey='indexs'
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
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
















