import React, { Component } from 'react';
import { Table, Tooltip } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { tAddDown, tReduceUp } from '../lookup/action/lookup.action';
import { MathRandom } from '../../../lib/MATH/math'

let nums = 0
let pointX = 0 //点击原点
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

        // console.log(pre);
        let row = []
        pre.PublicData.columns.forEach(e => {
            row.push(e)
        })
        //加新数据
        let colHeight = Math.floor(pre.heights / 24)
        let data = []
        let Source = pre.PublicData.dataSource
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
                    columnskeys: pre.PublicData.columns
                }
            ))
        }



    }
    onmouseup = () => {

        document.removeEventListener('mousemove', this.mos)
    }
    onMouseDown = (i) => {
        nums = i
        document.addEventListener('mousedown', this.offset)
        document.addEventListener('mousemove', this.mos)
    }
    offset = (e) => {
        // console.log(e.pageX);
        pointX = e.pageX
    }
    mos = (e) => {
        // console.log(e.pageX);
        let offsetX = e.pageX
        const { columnskeys } = this.state
        this.move(nums, columnskeys, offsetX)
    }
    move = (i, columnskeys, e) => {
        if (i < columnskeys.length - 1) {
            //第一个
            if ((pointX - e) > 0) {//向左
                columnskeys[i]['width'] -= 2
                columnskeys[i + 1]['width'] += 2
                pointX = e
            } else {//向右
                columnskeys[i]['width'] += 2
                columnskeys[i + 1]['width'] -= 2
                pointX = e
            }
            // console.log(columnskeys);

            this.setState(
                {
                    columnskeys: columnskeys
                }
            )
        } else {
            //最后一个
            this.setState(
                {
                    columnskeys: columnskeys
                }
            )
        }
    }
    render() {
        const { data, columnskeys } = this.state
        const { tr } = this.props.PublicData
        let widths = 0
        let columnsData = []
        let tbodyData = []
        // console.log(columnskeys);

        if (columnskeys) {
            columnskeys.map((e, i) => {
                if (e['width'] > 0) {
                    widths += e['width']
                    columnsData.push(
                        <th
                            key={e.dataIndex + MathRandom()}
                            style={{ width: e['width'], border: '1px solid #ddd' }}
                            className='tablesback'
                            onMouseUp={this.onmouseup.bind(this)}
                            onMouseLeave={this.onmouseup.bind(this)}
                        >

                            <span>{e.title}</span>
                            <span
                                style={{ float: 'right', cursor: 'col-resize' }}
                                onMouseDown={this.onMouseDown.bind(this, i)}>|</span>
                        </th>
                    )
                } else {
                    widths += 200
                    e['width'] = 200
                    columnsData.push(
                        <th
                            key={e.dataIndex + MathRandom()}
                            style={{ width: '200px', border: '1px solid #ddd' }}
                            className='tablesback'
                            onMouseUp={this.onmouseup.bind(this)}
                            onMouseLeave={this.onmouseup.bind(this)}
                        >
                            <span>{e.title}</span>
                            <span
                                style={{ float: 'right', cursor: 'col-resize' }}
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
                    <tr key={e.indexs + 'tr'} className={tr === i ? 'black' : ''}>
                        {tbodytd}
                    </tr>
                )
            })
        } else {
            tbodyData.push(<tr key={Math.random()}>没有数据</tr>)
        }

        return (
            <div style={{ marginRight: 0, overflowX: 'auto', width: this.props.widths + 40 }}>
                <table>
                    <tbody>

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
                            <td>
                                <div
                                    style={{ height: this.props.heights - 40, overflowY: 'auto' }}>
                                    <table style={{ tableLayout: "fixed", width: this.props.widths + 20 }}>
                                        <tbody>
                                            {tbodyData}
                                        </tbody>
                                    </table>
                                </div>
                            </td>

                        </tr>

                    </tbody>
                </table>
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
















