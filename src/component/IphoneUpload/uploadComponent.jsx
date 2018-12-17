import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    message, Button, Icon, Card
} from 'antd';
import $ from 'jquery'



function mapStateToProps(state) {
    return {

    };
}

class UploadComponent extends Component {
    state = {
        fileName: ''
    }
    readUploading = () => {
        this.props.spinChange()
        var file = document.getElementById("file").files[0];
        // // console.log(file);

        // //获取文件
        // /*
        //  * 使用FileReader对象将文件转换为Base64字符串
        //  */
        var reader = new FileReader();
        reader.readAsDataURL(file, "UTF-8");
        reader.onload = function (e) {
            let fileStringBase64 = e.target.result;
            fileStringBase64 = fileStringBase64.substring(fileStringBase64.indexOf(",") + 1, fileStringBase64.length);
            // console.log(fileStringBase64);
            let base64 = {
                "PicInfoByBase64": fileStringBase64,
                "BranchId": "FDG",
                "FileName": "1111.apk",
                "PicType": "jztmobile"
            }
            $.ajax({
                url: "http://10.3.2.21:20361/api/TwoInvoice/UpLoadObjectWithCover",
                dataType: "JSON",
                type: 'post',
                data: base64,
                success: function (params) {
                    // console.log(params);
                    this.props.spinChange()
                    if (params) {
                        message.success('恭喜上传成功')
                    } else {
                        message.error('上传失败')
                    }
                }
            })
        }.bind(this)
    }
    updataName = (e) => {
        console.log(e.target.value);
        let value = e.target.value
        let arr = value.split('\\')
        let fileName = arr[arr.length - 1]
        console.log(fileName);
        this.setState({
            fileName: fileName
        })
    }
    render() {
        return (
            <Card style={{
                marginLeft: '50%', width: '500px',
                transform: 'translateX(-50%)', marginTop: 200
            }}>
                <Button onClick={this.readUploading.bind(this)}>
                    <Icon type="upload" /> 确认上传
                </Button>
                <div>
                    <a
                        href="javascript:void(0);"
                        style={{ position: 'relative', padding: 20,display:'block' }}
                        onChange={this.updataName.bind(this)}>
                        点击上传文件

                <input type="file" id="file" name="myfile"
                            style={{
                                color: 'transparent',
                                position: 'absolute',
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                height: '40px',
                                opacity: 0,
                                transform: 'translate(-100px, 0px)',
                                width: 125
                            }} />
                    </a>
                    <div>{this.state.fileName}</div>
                </div>

            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(UploadComponent);