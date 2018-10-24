import React, { Component } from 'react';
import { Layout } from 'antd';
import Headercomponent from '../Header/Header.component'
import SliderMenucomponent from '../Slider/SliderMenu.component'
import './Desgin.css'
import { Route } from 'react-router-dom';
import DesignTablecomponent from '../DesignTable/DesignTable.component'
import Stylistcomponent from '../stylist/Stylist.component'
import ReadForm from '../readForm/ReadForm'
const { Content, Sider } = Layout;

class Desgincomponent extends Component {
    state = {
        collapsed: false,
        user: ''
    };
    componentWillMount() {
        var values = sessionStorage.getItem('values')
        this.setState({
            user: values
        });
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        var h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.92
        const { user } = this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <SliderMenucomponent></SliderMenucomponent>
                </Sider>
                <Layout>
                    <Headercomponent user={user}></Headercomponent>
                    <Content style={{ margin: '5px' }}>
                        <div style={{ padding: 10, background: '#fff', minHeight: h }}>
                            <Route path='/Design/er' component={DesignTablecomponent}></Route>
                            <Route path='/Design/Stylist' component={Stylistcomponent}></Route>
                            <Route path='/Design/Arch' component={ReadForm}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

// const Footers = () => (
//     <Footer style={{ textAlign: 'center' }}>
//         DEV Design ©2018 Created by LEO
//     </Footer>)



export default Desgincomponent;