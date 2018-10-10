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
        if (Object.keys(this.props.currentAttr).length > 0) {
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

    }
    componentWillReceiveProps(pre) {
        console.log(pre)

        let data = []
        if (pre.currentAttr.tr > this.state.tr) {
            if (pre.currentAttr.tr === 35 * this.state.x && pre.currentAttr.tr < 350) {
                    pre.PublicData.dataSource.map((e, i) => {
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
                    pre.PublicData.dataSource.map((e, i) => {
                        if (35 * this.state.x <= i && i < (35 * this.state.x + 35)) {
                            e.indexs = 35 * this.state.x + i + 'table'
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
        }else {
            // console.log(pre);
            
            pre.currentAttr.dataSource.map((e, i) => {
                if ( i < (35 * this.state.x + 35)) {
                    e.indexs = 35 * this.state.x + i + 'table'
                    data.push(e)
                }
            })
            this.setState((p) => (
                {
                    data: data,
                    tr: 0,
                    x: 1
                }
            ),()=>{
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
    render() {
        // console.log(this.props.PublicData);
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        const { columns, dataSource, pageSize, scroll, groupname, label, totalPage, type } = this.props.PublicData
        let widths = 0
        let heightTable = this.props.currentAttr.tr * (-38) > -228 ? '0px' : (this.props.currentAttr.tr * (-38) + 228) + 'px'
        if (columns) {
            columns.map((e, i) => {
                widths += Number(e.width)
            });
        }
        // console.log(this.props.heights);

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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
        currentAttr: state.currentAttr,
        tableSource: state.tableSource,
        UpdataFormData:state.UpdataFormData
    }
}
const mapDispatchProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchProps)(TablePublicComponent);




