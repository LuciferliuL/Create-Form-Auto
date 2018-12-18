import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Layout,  Spin
} from 'antd';
// import {getStringFromFile} from './iphoneBase64'

import UploadComponent from './uploadComponent'


const {
    Header, Content,
} = Layout;

function mapStateToProps(state) {
    return {

    };
}

class iphoneUpload extends Component {
    state = {
     loadingUploadIphone : false
    }
    spinChange = () => {
        this.setState({
            loadingUploadIphone:!this.state.loadingUploadIphone
        })
    }
    render() {
        return (
            <Spin spinning={this.state.loadingUploadIphone}>
                <Layout>
                    <Header >
                        <h1 style={{ color: 'white', marginLeft: '50%',
                        transform: 'translateX(-50%)',display:"inline-block" }}>移动商务上传</h1>
                        <a  href="javascript:void(0);" style={{color:'white',float:'right'}}
                        onClick={()=>{this.props.history.push('/loginLeader')}}>返回首页</a>
                    </Header>
                    <Content style={{height:700}}>
                        <UploadComponent spinChange={this.spinChange}></UploadComponent>
                    </Content>
                </Layout>
            </Spin>
        )
    }
}

export default connect(
    mapStateToProps,
)(iphoneUpload);