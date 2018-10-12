import React, { Component } from 'react';
import { Layout } from 'antd';
import Headercomponent from '../Header/Header.component'
import SliderMenucomponent from '../Slider/SliderMenu.component'
import './Desgin.css'
import { Route } from 'react-router-dom';
import DesignTablecomponent from '../DesignTable/DesignTable.component'
import Stylistcomponent from '../stylist/Stylist.component'
import ReadForm from '../readForm/ReadForm'


const { Content, Footer, Sider } = Layout;


class Desgincomponent extends Component {
    state = {
        collapsed: false,
        user: this.props.location.state
    };
    componentWillMount() {
        // if (this.props.location.state) {

        // } else {
        //     this.props.history.push('/')
        // }
    }
    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({ collapsed })
    }

    render() {
        const { user } = this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    // onBreakpoint={(broken) => { console.log(broken); }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    
                    <SliderMenucomponent></SliderMenucomponent>
                </Sider>
                <Layout>
                    <Headercomponent user={user}></Headercomponent>
                    <Content style={{ margin: '10px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 660 }}>
                            <Route path='/Design/er' component={DesignTablecomponent}></Route>
                            <Route path='/Design/Stylist' component={Stylistcomponent}></Route>
                            <Route path='/Design/Arch' component={ReadForm}></Route>
                        </div>
                    </Content>
                    {/* <Footers></Footers> */}
                </Layout>
            </Layout >
        );
    }
}

const Footers = () => (
    <Footer style={{ textAlign: 'center' }}>
        DEV Design ©2018 Created by LEO
    </Footer>)



export default Desgincomponent;