import React, { Component } from 'react';
import { Layout } from "antd";

const {Header} = Layout

class Headercomponent extends Component {
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
            </Header>
        );
    }
}

export default Headercomponent;