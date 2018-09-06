import React, { Component } from 'react';
import { Layout } from 'antd';
import Headercomponent from '../Header/Header.component'
import SliderMenucomponent from '../Slider/SliderMenu.component'
const { Content, Footer, Sider } = Layout;


class Desgincomponent extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    onBreakpoint={(broken) => { console.log(broken); }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <SliderMenucomponent></SliderMenucomponent>
                </Sider>
                <Layout>
                    <Headercomponent></Headercomponent>
                    <Content style={{ margin: '10px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 660 }}>
                            Bill is a cat.
                        </div>
                    </Content>
                    <Footers></Footers>
                </Layout>
            </Layout>
        );
    }
}

const Footers = () => (
    <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
    </Footer>)



export default Desgincomponent;