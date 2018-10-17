import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Icon, Avatar, Layout } from 'antd'
import { withRouter } from 'react-router-dom'

const { Meta } = Card;
const { Header, Footer, Content } = Layout;

function mapStateToProps(state) {
    return {

    };
}

class loginLeader extends Component {
    state = {
        h: 0,
        data: [{
            IconType: "setting",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "CONFIGUI",//卡片抬头
            MetaDescription: "配置管理",//卡片描述
            href: 'http://10.3.4.177:9003/ConfigUI'//跳转地址
        }, {
            IconType: "zoom-in",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "BPMADMIN",//卡片抬头
            MetaDescription: "流程管理",//卡片描述
            href: 'http://10.3.4.177:9003/bpm-admin'//跳转地址
        }, {
            IconType: "radius-setting",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "DESGIN",//卡片抬头
            MetaDescription: "表单设计",//卡片描述<Icon type="" theme="outlined" />
            href: 'http://10.3.4.177:9003/Design'//跳转地址
        }, {
            IconType: "rocket",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "DEVTOOL",//卡片抬头
            MetaDescription: "DEVTOOL",//卡片描述<Icon type="" theme="outlined" />
            href: 'http://10.3.2.22:50003/index.html'//跳转地址
        }, {
            IconType: "bulb",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "Card title",//卡片抬头<Icon type="" theme="outlined" />
            MetaDescription: "This is the description",//卡片描述
            href: 'www.baidu.com'//跳转地址
        }]
    }
    componentDidMount() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
        this.setState({
            h: h
        })
    }
    render() {
        const { h, data } = this.state
        let dataList = []
        data.forEach((e, i) => {
            return dataList.push(
                <Col span={4} key={i}>
                    <Card
                        style={{ width: '85%' }}
                        // cover={<img alt="example" src={data.CoverSrc} style={{height:'160px',width:'100%'}}/>}
                        actions={[<Icon type={e.IconType}
                            onClick={() => {
                                // window.location.href='localhost:3000/Design'
                                if (e.MetaTitle === 'DESGIN') {
                                    // var tempwindow = window.open('_blank')
                                    this.props.history.push('/Design/er')
                                } else {
                                    // var tempwindow = window.open('_blank')
                                    // tempwindow.location = e.href
                                    window.location.href = e.href
                                }
                            }} />]}
                    >
                        <Meta
                            avatar={<Avatar src={e.AvatarSrc} />}
                            title={e.MetaTitle}
                            description={e.MetaDescription}
                        />
                    </Card>
                </Col>
            )
        })
        return (
            <Layout>
                <Header>Header</Header>
                <Content>
                    <Card style={{ height: h }}>
                        <Row align='middle' justify='start' style={{ marginTop: '5%' }}>
                            <Col span={2}></Col>
                            {dataList}
                            <Col span={2}></Col>
                        </Row>
                    </Card>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ERP Design ©2018 Created by LEO
                </Footer>
            </Layout>
        );
    }
}

export default connect(
    mapStateToProps,
)(withRouter(loginLeader));
