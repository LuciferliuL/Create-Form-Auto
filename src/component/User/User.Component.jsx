import React, { Component } from 'react';
import TreeUser from './Tree.User.jsx'
import { Layout, Spin } from 'antd'
import Headercomponent from '../Header/Header.component'
import { withRouter } from 'react-router-dom'
import Tags from './Tag'


const { Sider, Content } = Layout;
class USER extends Component {
    state = {
        loading: true,
        user: '',
        dataContent: []
    };

    componentWillMount() {
        if (sessionStorage.getItem('token')) {

        } else {
            this.props.history.push('/')
        }
        var values = sessionStorage.getItem('values')
        setTimeout(() => {
            this.setState((pre) => ({
                loading: !pre.loading,
                user: JSON.parse(values)
            }))
        }, 1000);

    }


    dataChange = (e) => {

        console.log(e);

        let list = [];
        let flag = true
        if (this.state.dataContent.length > 0) {
            this.state.dataContent.forEach(c => {
                if (c.Name === e.Name) {
                    list.push(e);
                    flag = false
                }
                else {
                    list.push(c);
                }
            })
            if(flag){
                list.push(e)
            }
        }
        else {
            list.push(e);
        }

        this.setState({
            dataContent: list
        })


        // this.setState((pre) => ({
        //     dataContent: [...pre.dataContent, e]
        // }))

    }

    removedata = (ss) => {
        //删除
        // console.log(ss);

        const { dataContent } = this.state;
        let _sss = dataContent.filter(e => e.Name !== ss);
        this.setState({
            dataContent: _sss
        });

    }

    render() {
        const { user, loading, dataContent } = this.state

        // console.log(dataContent);

        return (
            <Spin spinning={loading} size='large'>
                <Layout>
                    <Sider
                        style={{ overflow: 'auto', height: '100vh', left: 0 }}
                    >
                        <TreeUser dataChange={this.dataChange}></TreeUser>
                    </Sider>
                    <Layout >
                        <Headercomponent user={user} R={'R'} ></Headercomponent>
                        <Content style={{ overflow: 'initial', backgroundColor: 'white' }} >
                            {/* <ContentUser Loading={this.Loading.bind(this)} hidLoading={this.hidLoading.bind(this)}></ContentUser> */}
                            {
                                dataContent.length > 0 ?
                                    <Tags
                                        //Loading={this.Loading.bind(this)}
                                        //hidLoading={this.hidLoading.bind(this)}
                                        removedata={this.removedata}
                                        dataContent={dataContent}>
                                    </Tags>
                                    : <h3 style={{ paddingLeft: '5px' }}>欢迎使用通用表单查询管理系统</h3>
                            }

                        </Content>
                    </Layout>
                </Layout>
            </Spin>);
    }
}



export default withRouter(USER);