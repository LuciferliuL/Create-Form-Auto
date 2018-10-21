import React, { Component } from 'react';
import { Table, Tooltip, Spin } from 'antd'
import { connect } from 'react-redux'
import './Table.PublicComponent.css'
import { onClickTr ,shows,updataValues} from '../lookup/action/lookup.action'
import { formUpdataFromCurrent } from '../../SliderRIght/action/Right.action'
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
        loading:false,
        data: [],
        x: 1,
        tr: 0,
        heightTr: 300
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
        // console.log(this.props.h);

        // console.log(this.props.currentAttr);

        let data = []
        if (this.props.h > 900) {
            if (Object.keys(this.props.currentAttr).length > 0) {
                this.props.currentAttr.dataSource.map((e, i) => {
                    if (i < 300) {
                        e.indexs = i + 'table'
                        data.push(e)
                    }
                })

            }
            this.setState({
                heightTr: 300,
                data: data,
                tr: this.props.currentAttr.tr
            })
        } else {
            if (Object.keys(this.props.currentAttr).length > 0) {
                this.props.currentAttr.dataSource.map((e, i) => {
                    if (i < 300) {
                        e.indexs = i + 'table'
                        data.push(e)
                    }
                })

            }
            this.setState({
                heightTr: 28,
                data: data,
                tr: this.props.currentAttr.tr
            })
        }

    }
    componentWillReceiveProps(pre) {
        console.log(pre)

        let data = []
        if (pre.currentAttr.tr > this.state.tr) {
            if (pre.currentAttr.tr === this.state.heightTr * this.state.x && pre.currentAttr.tr < 350) {
                pre.PublicData.dataSource.map((e, i) => {
                    if (this.state.heightTr * this.state.x <= i && i < (this.state.heightTr * this.state.x + this.state.heightTr)) {
                        e.indexs = this.state.heightTr * this.state.x + i + 'table'
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
            if (pre.currentAttr.tr === (this.state.heightTr * (this.state.x - 1) - 1) && pre.currentAttr.tr > 0) {
                // console.log(this.state.x);
                pre.PublicData.dataSource.map((e, i) => {
                    if (this.state.heightTr * this.state.x <= i && i < (this.state.heightTr * this.state.x + this.state.heightTr)) {
                        e.indexs = this.state.heightTr * this.state.x + i + 'table'
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
        } else if(pre.currentAttr.tr = this.state.tr){
            // console.log(pre);

            pre.currentAttr.dataSource.map((e, i) => {
                if (i < (this.state.heightTr * this.state.x + this.state.heightTr)) {
                    e.indexs = this.state.heightTr * this.state.x + i + 'table'
                    data.push(e)
                }
            })
            this.setState((p) => (
                {
                    data: data,
                    tr: 0,
                    x: 1
                }
            ), () => {
                setTimeout(() => {
                    pre.currentAttr.tr = 0
                    this.props.UpdataFormData.find(e => e.key === pre.currentAttr.key).tr = 0
                }, 100);

            })
        }

        this.setState({
            tr: pre.currentAttr.tr
        })

    }
    onRow = (record, index) => {
        return {
            onClick: () => {
                this.props.onClickTr(index)
                // this.props.lookupCLick({keyCode:13})
            },
            onDoubleClick:()=>{
                this.props.shows(false)
                setTimeout(() => {
                    this.props.lookupCLick(index)
                }, 5);
            }
        }
    }
    render() {
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        const { columns } = this.props.PublicData
        const { heightTr } = this.state
        let widths = 0
        let heightTable = this.props.currentAttr.tr * (-38) > -228 ? '0px' : (this.props.currentAttr.tr * (-38) + 228) + 'px'
        if (columns) {
            columns.map((e, i) => {
                // console.log(e);

                if (i < this.props.currentAttr.float) {
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
        // console.log(widths);

        return (
            <Spin spinning={this.state.loading}>
                <Table
                    bordered
                    // components={this.components}
                    onRow={this.onRow.bind(this)}
                    bodyStyle={{ tableLayout: 'fixed' }}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    scroll={{ x: widths * 1.1, y: h*0.8 }}
                    rowClassName={(record, index) => {
                        // console.log(record)
                        // console.log(index);
                        if (this.props.currentAttr.tr > (heightTr - 1)) {
                            return (index === (this.props.currentAttr.tr - (heightTr * (this.state.x - 1))) ? 'black wi' : "wi")
                        } else {
                            return (index === this.props.currentAttr.tr ? 'black wi' : 'wi')
                        }
                    }}
                    rowKey='indexs'
                // size='small'
                />
            </Spin>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
        currentAttr: state.currentAttr,
        tableSource: state.tableSource,
        UpdataFormData: state.UpdataFormData
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        onClickTr: (k) => {
            dispatch(onClickTr(k))
        },
        shows: (k)=>{
            dispatch(shows(k))
        },
        upForm: (k) => {
            dispatch(formUpdataFromCurrent(k))
        },
        updataValues: (k) => {
            dispatch(updataValues(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(TablePublicComponent);




