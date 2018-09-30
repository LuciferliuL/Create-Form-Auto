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
                    <div className='slidertitle'>
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', verticalAlign: 'middle' }}>
                            <defs>
                                <style type="text/css"></style>
                            </defs>
                            <path d="M479.827 1024V889.233a133.979 133.979 0 0 1-55.83 12.216c-18.214 0-35.886-3.604-52.526-10.712-16.056-6.86-30.437-16.663-42.739-29.136-25.34-25.692-39.019-59.728-38.519-95.834 0.484-34.932 14.45-67.852 39.327-92.695 24.876-24.844 57.814-38.766 92.752-39.205 0.57-0.01 1.135-0.012 1.706-0.012 19.374 0 38.43 4.235 55.831 12.217l0.13-133.635H319.89c3.878-6.772 9.606-15.205 16.185-24.807 12.723-18.568 22.198-40.048 21.892-64.375-0.69-54.862-45.442-99.678-100.305-100.437-0.479-0.007-0.965-0.01-1.442-0.01-56.201-0.004-101.755 45.555-101.755 101.755 0 23.784 9.332 44.798 21.837 62.986 6.08 8.844 12.368 18.111 16.248 24.888H43.161C19.567 512.437 0.44 531.565 0.44 555.159v426.117c0 23.595 19.128 42.722 42.722 42.722l436.666 0.002z" fill="#57C9C2" p-id="1562"></path><path d="M889.361 543.603a133.996 133.996 0 0 1 12.216 55.83c0 35.74-13.915 69.34-39.184 94.61-25.27 25.27-58.87 39.185-94.61 39.185-0.624 0-1.258-0.004-1.888-0.012-34.933-0.484-67.85-14.45-92.696-39.326-24.843-24.876-38.766-57.815-39.205-92.748a133.996 133.996 0 0 1 12.2-57.541H511.85l0.02 160.379c-5.659-3.24-16.137-10.293-25.779-16.943-17.861-12.322-38.72-21.14-62.097-21.14-0.435 0-0.868 0.002-1.307 0.009-54.863 0.69-99.677 45.443-100.438 100.305-0.26 18.797 4.581 36.441 13.22 51.645 17.498 30.785 50.584 51.553 88.525 51.553 23.378 0 43.756-9.538 62.093-21.14 11.298-7.148 20.122-13.706 25.78-16.945V1023.434H980.705c23.596 0 42.723-19.128 42.723-42.722v-437.11H889.36z" fill="#57C9C2" p-id="1563"></path><path d="M980.838 0h-468.84v196.272s17.184-14.876 22.676-18.773c17.63-14.657 40.288-23.475 65.005-23.475 56.677 0 102.532 46.339 101.747 103.198-0.76 54.862-45.575 99.615-100.438 100.304-0.436 0.005-0.873 0.009-1.31 0.009-24.72 0-47.375-8.817-65.005-23.475-5.495-3.896-22.674-18.772-22.674-18.772v196.274H704.11c-1.484 3.034-10.062 16.043-17.074 25.947-12.732 17.982-21.3 39.427-21.003 63.235 0.69 54.86 45.443 99.675 100.305 100.436 0.479 0.007 0.963 0.011 1.444 0.011 26.313 0 50.292-9.988 68.355-26.375 20.517-18.617 33.399-45.493 33.399-75.38 0-23.319-8.788-44.12-21.041-61.966-7.804-11.367-13.702-20.098-16.86-25.597a47.27 47.27 0 0 1-0.183-0.312H1023.561V42.722C1023.56 19.128 1004.433 0 980.838 0z" fill="#57C9C2" p-id="1564">
                            </path>
                        </svg>
                        <h2 className='title'>九州通ERP</h2>
                    </div>
                    <SliderMenucomponent></SliderMenucomponent>
                </Sider>
                <Layout>
                    {/* <Headercomponent user={user}></Headercomponent> */}
                    <Content style={{ margin: '10px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 660 }}>
                            <Route path='/Design/er' component={DesignTablecomponent}></Route>
                            <Route path='/Design/Stylist' component={Stylistcomponent}></Route>
                            <Route path='/Design/Arch' component={ReadForm}></Route>
                        </div>
                    </Content>
                    <Footers></Footers>
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