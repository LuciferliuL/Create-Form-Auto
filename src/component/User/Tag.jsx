import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd'
import { addTabs, delTabs, addTable, delTable, copyThis } from './User.action'
import ContentUser from './Content.User'
import { Object } from 'es6-shim';
import { fugai,tableFugai } from '../stylist/action/Stylist.action'

const TabPane = Tabs.TabPane;


class Tags extends Component {
    constructor(props) {
        super(props);
        const panes = [];
        this.state = {
            activeKey: '0',
            panes,
            loading:false,
            CurrentIndex:0
        };
    }
    componentDidMount() {
        // console.log(this.props.dataContent);
        this.setState({
            activeKey: this.props.dataContent[0].Name
        })
    }
    componentWillReceiveProps(pre) {
        console.log(pre);
        this.setState({
            activeKey: pre.dataContent[pre.dataContent.length - 1].Name
        })
        // console.log(this.props);

    }
    onChange = (activeKey) => {
        this.setState({ activeKey ,   CurrentIndex:0});

        // console.log(activeKey);
        //更新formdata
        this.props.upData(this.props.TabsData.find(e => e.Name === activeKey).Source.FormData)
        this.props.tableFugai(this.props.TabsData.find(e => e.Name === activeKey).Source.TableData)
    }
    //改变tableTab的选中下表
    currentTableTab = (key) => {
        this.setState({
            CurrentIndex:key
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.props.TabsData.forEach((pane, i) => {
            if (pane.Name === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.props.TabsData.filter(pane => pane.Name !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].Name;
        }
        // console.log(panes);

        this.props.removedata(targetKey);
        this.props.copyThis(panes)
        this.setState({ activeKey });
    }

    ChangeOn = (e, key) => {
        // console.log(e);
        const { activeKey } = this.state
        const { TabsData } = this.props
        // console.log(TabsData);
        let source = TabsData.find(e => e.Name === activeKey)
        let data = source.Source.FormData.find(e => e.key === key)
        Object.assign(data, e)

    }
 
    render() {
        // console.log(this.props.TabsData);

        return (
        
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.props.TabsData.map(
                        pane =>
                            <TabPane tab={pane.Name} key={pane.Name}>
                                <ContentUser
                                    pane={pane.Source}
                                    Loading={this.props.Loading}
                                    currentTableTab={this.currentTableTab}
                                    ChangeOn={this.ChangeOn.bind(this)}
                                    CurrentIndex={this.state.CurrentIndex}
                                ></ContentUser>
                            </TabPane>
                    )}
                </Tabs>
     
        );
    }
}

function mapStateToProps(State) {
    // console.log(State);

    return {
        TableList: State.TableList,
        TabsData: State.TabsData
    };
}
const mapDispatchProps = (dispatch) => {
    return {
        addTabs: (value) => {
            dispatch(addTabs(value))
        },
        delTabs: (key) => {
            dispatch(delTabs(key))
        },
        addTable: (value) => {
            dispatch(addTable(value))
        },
        delTable: (key) => {
            dispatch(delTable(key))
        },
        copyThis: (List) => {
            dispatch(copyThis(List))
        },
        upData: (k) => {
            dispatch(fugai(k))
        },
        tableFugai:(k) => {
            dispatch(tableFugai(k))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps
)(Tags);