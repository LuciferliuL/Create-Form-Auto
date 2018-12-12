import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Upload, message, Button, Icon,
} from 'antd';


function mapStateToProps(state) {
    return {

    };
}

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Loadup extends Component {
    readFile = () => {
        var file = document.getElementById("file").files[0];
        var reader = new FileReader();

        //将文件以文本形式读入页面
        reader.readAsText(file, "gb2312");
        reader.onload = function (e) {
            var fileText = e.target.result.split("\n");
            console.log(fileText);
        }
    }
    render() {
        return (
            <div>
                <input type="file" id="file" name="myfile" />
                <Button onClick={this.readFile}>
                    <Icon type="upload" /> 读取
                </Button>
            </div>


        );
    }
}

export default connect(
    mapStateToProps,
)(Loadup);