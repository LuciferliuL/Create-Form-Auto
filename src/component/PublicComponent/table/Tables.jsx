import React, { Component } from 'react';
import { Table, Tooltip } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { tAddDown, tReduceUp } from '../lookup/action/lookup.action';
import { isdate, formatDate } from '../../../lib/MATH/math'
import { width } from 'window-size';

class TABLECOMPONENT extends Component {
    state = {
        // page: 1,
        data: [],
        x: 1,
        tr: 0,
        colHeight: 0,
        pageNum: 1,
        domWidth: 0
    }

    componentWillReceiveProps(pre) {

        // console.log(pre.tableSource.columns);
        let row = []
        pre.tableSource.columns.forEach(e => {
            row.push(e.dataIndex)
        })
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
                    colHeight: colHeight,
                    columnskeys: row
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
                    colHeight: colHeight,
                    columnskeys: pre.tableSource.columns
                }
            ))
        }



    }
    onmouseup = () => {
        document.removeEventListener('mousemove', this.aa)
    }
    onMouseDown = (i) => {
        const { columnskeys } = this.state
        document.addEventListener('mousemove', function aa(e){
            this.move(i, columnskeys, e)
        })
    }
    move = (i, columnskeys, e) => {
        console.log(e.pageX);
        if (i === 0) {
            //第一个
            columnskeys[i]['width'] += e.pageX
            columnskeys[i + 1]['width'] -= e.pageX
            this.setState((pre) => (
                {
                    columnskeys: columnskeys
                }
            ))
        } else if (i === columnskeys.length - 1) {
            //第二个

        } else {
            //中间得

        }
    }
    render() {
        const { colHeight, data, columnskeys } = this.state
        const { columns, pageSize } = this.props.PublicData
        let widths = 0
        let columnsData = []
        let tbodyData = []
        if (columnskeys) {
            columnskeys.map((e, i) => {
                if (width > 0) {
                    widths += e['width']
                    columnsData.push(
                        <th key={e.dataIndex} style={{ width: e['width'] }} className='tablesback'>
                            <span>{e.title}</span>
                            <span
                                onClick={this.onClickRight.bind(this, i)}
                                style={{ float: 'right', cursor: 'col-resize' }}
                                onMouseUp={this.onmouseup.bind(this)}>|</span>
                        </th>
                    )
                } else {
                    widths += 200
                    e['width'] = 200
                    columnsData.push(
                        <th key={e.dataIndex} style={{ width: '200px', border: '1px solid #ddd' }} className='tablesback'>
                            <span>{e.title}</span>
                            <span
                                style={{ float: 'right', cursor: 'col-resize' }}
                                onMouseUp={this.onmouseup.bind(this)}
                                onMouseDown={this.onMouseDown.bind(this, i)}>|</span>
                        </th>
                    )
                }

            });
            if (widths < this.props.widths) {
                widths = this.props.widths
            }
        }
        // console.log(this.props.tableSource.tr);

        if (data.length > 0) {
            data.forEach((e, i) => {
                let tbodytd = []
                columnskeys.forEach((key, index) => {
                    tbodytd.push(
                        <td key={e.indexs + index}
                            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', border: '1px solid #ddd', width: key.width }}>
                            <span >  {e[key.dataIndex]}</span>

                        </td>
                    )
                })
                tbodyData.push(
                    <tr key={e.indexs + 'tr'} className={this.props.tableSource.tr === i ? 'black' : ''}>
                        {tbodytd}
                    </tr>
                )
            })
        } else {
            tbodyData.push(<tr>没有数据</tr>)
        }

        return (
            <div style={{ marginRight: 0, overflowX: 'auto', width: this.props.widths + 40 }}>
                <table>
                    <tr>
                        <td>
                            <table style={{ tableLayout: "fixed", marginRight: 17, width: this.props.widths + 20, zIndex: 999, background: '#0e7cff4f' }}>
                                <thead >
                                    <tr>
                                        {columnsData}
                                    </tr>
                                </thead>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <div
                            style={{ height: this.props.heights - 40, overflowY: 'auto' }}>
                            <table style={{ tableLayout: "fixed", width: this.props.widths + 20 }}>
                                <tbody>
                                    {tbodyData}
                                </tbody>
                            </table>
                        </div>
                    </tr>
                </table>
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
















