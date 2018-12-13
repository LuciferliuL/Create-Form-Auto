import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Icon,
} from 'antd';


function mapStateToProps(state) {
    return {

    };
}



class Loadup extends Component {
    readFile = () => {
        var file = document.getElementById("file").files[0];
        var reader = new FileReader();
        var fileText
        //将文件以文本形式读入页面
        reader.readAsText(file, "utf-8");
        reader.onload = function (e) {
            fileText = e.target.result.split("\n");
            // console.log(this.props);
            this.props.readUploadFiled(fileText)
        }.bind(this)
    }
    render() {
        // console.log(this.props);

        return (
            <div style={{ display: "inline-block" ,marginLeft:10}}>
                <Button onClick={this.readFile.bind(this)}>
                    <Icon type="upload" /> 读取
                </Button>
                <input type="file" id="file" name="myfile" />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Loadup);