import React, { Component } from 'react';
import { Icon, Popconfirm } from 'antd'
import { Dragact } from 'dragact'
import { connect } from 'react-redux'
import { stylistDataSourceGet, formSourceData, currentAttr, formSourceDataUpdata } from '../../stylist/action/Stylist.action'
import PublicComponent from '../Public.Component'

const getblockStyle = isDragging => {
    
    return {
        background: isDragging ? '#1890ff' : 'white'
    }
}
class GroupPublicComponent extends Component {
    allowDrop = (ev) => {
        ev.preventDefault()
    }
    drop = (ev) => {
        ev.preventDefault();
        // console.log(ev);

        var data = ev.dataTransfer.getData("ID");
        console.log(this.props.currentTagsUpdata);
        // if (data === this.props.currentTagsUpdata.id) {
        this.props.FormData(this.props.currentTagsUpdata)
        // setTimeout(() => {
        //     this.props.FormDataUpata(this.dragact.getLayout())
        // }, 1000);
        // }
    }
    confirm = (e) => {
        // console.log(this.dragact.getLayout());
        this.props.FormDataUpata(this.dragact.getLayout())
        this.props.rightUpdata(e)

    }
    cancel = (e) => {
        // console.log(e);

    }
    //固定位置
    time = () => {
        this.props.FormDataUpata(this.dragact.getLayout())
    }
    render() {
       
        return (
            <Dragact
                ref={(n) => { this.dragact = n }}
                layout={[]} //必填项
                col={24} //必填项
                width={750} //必填项
                rowHeight={40} //必填项
                margin={[5, 5]} //必填项
                className="plant-layout" //必填项
                style={{ border: '1px dashed black' }} //非必填项
                placeholder={true}
                onDragEnd={this.time.bind(this)}
            >
                {(item, provided) => {
                    // console.log(item);
                    return (
                        <div
                            {...provided.props}
                            {...provided.dragHandle}
                            style={{
                                ...provided.props.style,
                                ...getblockStyle(provided.isDragging),
                                padding: '5px',
                                border: '1px dashed black'
                            }}
                        >
                            <Popconfirm title="你要干什么？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="编辑" cancelText="删除"
                                onConfirm={this.confirm.bind(this, item)}
                                onCancel={this.cancel.bind(this, item)}>
                                <Icon
                                    className="Delete"
                                    type="minus-square"
                                    theme="filled" />
                            </Popconfirm>
                            <PublicComponent PublicData={item} ></PublicComponent>
                        </div>
                    )
                }}
            </Dragact>
        )
    }
}

const mapStateToProps = (State) => {
    console.log(State);

    return {
        InitStylistData: State.InitStylistData.InitStylistData,
        currentTagsUpdata: State.currentTagsUpdata.InitialTags,
        UpdataFormData: State.UpdataFormData,
        currentAttr: State.currentAttr
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        updateData: (k) => {
            dispatch(stylistDataSourceGet(k))
        },
        FormData: (k) => {
            dispatch(formSourceData(k))
        },
        FormDataUpata: (k) => {
            dispatch(formSourceDataUpdata(k))
        },
        rightUpdata: (k) => {
            dispatch(currentAttr(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(GroupPublicComponent);




