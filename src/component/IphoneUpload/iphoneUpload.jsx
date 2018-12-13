import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    message, Button, Icon, Layout, Card, Spin
} from 'antd';
// import {getStringFromFile} from './iphoneBase64'
import $ from 'jquery'



const {
    Header, Footer, Sider, Content,
} = Layout;
let loadingUploadIphone = false
function mapStateToProps(state) {
    return {

    };
}

class iphoneUpload extends Component {

    readUploading = () => {
        loadingUploadIphone = true
        var file = document.getElementById("file").files[0];
        console.log(file);

        //获取文件
        /*
         * 使用FileReader对象将文件转换为Base64字符串
         */
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
              
                    loadingUploadIphone=false
                  
                    // console.log(params);
                    if (params) {
                        message.success('恭喜上传成功')
                    } else {
                        message.error('上传失败')
                    }
                }

            })
        }.bind(this)
    }

    render() {
        return (
            <Spin spinning={loadingUploadIphone}>
                <Layout>
                    <Header >
                        <h1 style={{ color: 'white', textAlign: 'center' }}>移动商务上传</h1>
                    </Header>
                    <Content style={{height:700}}>
                        <Card style={{marginLeft:'50%',width: '500px',
                        transform: 'translateX(-50%)',marginTop: 200}}>
                            <input type="file" id="file" name="myfile" />
                            <Button onClick={this.readUploading.bind(this)}>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Card>
                    </Content>
                </Layout>

            </Spin>


        )
    }
}

export default connect(
    mapStateToProps,
)(iphoneUpload);