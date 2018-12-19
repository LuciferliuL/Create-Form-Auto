import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Icon, Avatar, Layout, Dropdown, Tag, Menu } from 'antd'
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
        user: JSON.parse(sessionStorage.getItem('values')),
        userdata: JSON.parse(sessionStorage.getItem('udata')),
        model: sessionStorage.getItem("model"),
        data: [{
            IconType: "setting",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "CONFIGUI",//卡片抬头
            MetaDescription: "配置管理",//卡片描述
            // href: 'http://10.3.4.177:9003/ConfigUI',//跳转地址
            href: 'http://10.3.4.233:8090'
        }, {
            IconType: "zoom-in",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "BPMADMIN",//卡片抬头
            MetaDescription: "流程管理",//卡片描述
            href: 'http://10.3.4.233:20427/'//跳转地址
            // href:'http://10.3.4.177:9003'
        }, {
            IconType: "radius-setting",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "DESGIN",//卡片抬头
            MetaDescription: "表单设计",//卡片描述<Icon type="" theme="outlined" />
            href: 'http://10.3.4.177:9003/Design'//跳转地址
        }, {
            IconType: "rocket",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "I9群信息",//卡片抬头
            MetaDescription: "群体信息发送",//卡片描述<Icon type="" theme="outlined" />
            href: 'http://10.3.4.177:9003/Information'//跳转地址
        }, {
            IconType: "bulb",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "Iphone",//卡片抬头<Icon type="" theme="outlined" />
            MetaDescription: "移动商务打包上传",//卡片描述
            href: 'www.baidu.com'//跳转地址
        }, {
            IconType: "bulb",//图标
            AvatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//人物头像
            MetaTitle: "Management",//卡片抬头<Icon type="" theme="outlined" />
            MetaDescription: "数据库管理",//卡片描述
            href: 'www.baidu.com'//跳转地址
        }]
    }
    componentDidMount() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.85
        this.setState({
            h: h
        })
    }
    enter = () => {
        window.location.href = "/"
    }

    render() {
        const { h, data, userdata } = this.state
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.enter.bind(this)}>退出登录</a>
                </Menu.Item>
            </Menu>
        );

        let dataList = []
        let colwidth = 0
        switch (data.length) {
            case 3:
                colwidth = 8
                break;
            case 4:
                colwidth = 6
                break;
            case 5:
                colwidth = 6
                break;
            default:
                colwidth = 4
        }

        data.forEach((e, i) => {
            return dataList.push(
                <Col span={colwidth} key={i}>
                    <Card
                        style={{ width: '85%', marginTop: 20 }}
                        actions={e.MetaTitle === 'Management' ? [<Icon type={e.IconType}
                            onClick={() => { this.props.history.push('/BaseData/UserList') }} />, <a href="http://obs.myhwclouds.com/jztmobile/JzterpDataPlugin.dll">PL/SQL插件</a>]
                            : [<Icon type={e.IconType}
                                onClick={() => {
                                    if (e.MetaTitle === 'DESGIN') {
                                        this.props.history.push('/Design/er')
                                    } else if (e.MetaTitle === 'I9群信息') {
                                        this.props.history.push('/Info')
                                    } else if (e.MetaTitle === 'Iphone') {
                                        this.props.history.push('/iphoneUpload')
                                    } else if (e.MetaTitle === 'CONFIGUI') {
                                        this.props.history.push('/configUI')
                                    } else {
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
                <Header><div style={{ float: 'right' }}>
                    <Tag color='blue' style={{ float: 'left', marginTop: '25px', background: 'none', border: 'none', fontSize: '14px', color: '#fff' }}>
                        {userdata.Organization.OrganizationName}
                    </Tag>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Tag style={{ float: 'left', marginTop: '25px', background: 'none', border: 'none', fontSize: '14px', color: '#fff' }}>{userdata.UserName}</Tag>
                    </Dropdown>
                </div></Header>
                <Content>
                    <Card style={{ height: h }}>
                        <Row align='middle' justify='start' style={{ marginTop: '5%' }}>
                            {dataList}
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
