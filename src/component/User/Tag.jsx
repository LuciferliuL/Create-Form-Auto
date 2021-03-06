import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Spin } from 'antd'
import { addTabs, delTabs, addTable, delTable, copyThis, updata } from './User.action'
import { changeActiveKey } from '../Information/information.action'
import ContentUser from './Content.User'
import { Object } from 'es6-shim';
import { fugai, tableFugai } from '../stylist/action/Stylist.action'
const TabPane = Tabs.TabPane;

class Tags extends Component {
    constructor(props) {
        super(props);
        const panes = [];
        this.state = {
            //activeKey: '0',
            activetr: 0,
            panes,
            loading: false,
            CurrentIndex: 0,
            tf: true
        };

        this._handleKeydown = this.handleKeydown.bind(this);
    }

    onRef = (ref) => {
        this.child = ref;
    }

    componentDidMount() {
        // console.log(this.props);

        // console.log(this.props.dataContent);
        //this.setState({
        //   activeKey: this.props.dataContent[0].Name
        //});

        document.body.addEventListener('keydown', this._handleKeydown, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this._handleKeydown, false);
    }

    handleKeydown = (e) => {
        var keyCode = e.keyCode || e.which || e.charCode;
        var altKey = e.altKey;
        if (altKey && keyCode === 81) {
            this.child.SQLChecked(1);
        } else if (altKey && keyCode === 69) {
            this.child.DAOCHU();
        }
        return false;
    }

    componentWillReceiveProps(pre) {
        console.log(pre);
        this.setState({ CurrentIndex: 0, activetr: 0 });
        //this.setState({
        //    activeKey: pre.dataContent[pre.dataContent.length - 1].Name
        //})
    }

    onChange = (activeKey) => {
        // console.log(this.props);
        this.setState({ CurrentIndex: 0, activetr: 0 });

        this.props.changeActiveKey(activeKey);

        //更新formdata
        this.props.upData(this.props.TabsData.find(e => e.Name === activeKey).Source.FormData)
        this.props.tableFugai(this.props.TabsData.find(e => e.Name === activeKey).Source.TableData)
    }

    //改变tableTab的选中下表
    currentTableTab = (key) => {
        this.setState({
            CurrentIndex: key
        });
    }

    hidLoading = () => {
        this.setState((pre) => ({
            loading: false
        }));
    }

    Loading = () => {

        this.setState((pre) => ({
            loading: !pre.loading
        }));
    }

    //行选中
    currentTableTr = (trindex) => {
        this.setState({
            activetr: trindex
        });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        let activeKey = this.props.activeKey;
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
        this.props.copyThis(panes);

        this.props.changeActiveKey(activeKey);

        //this.setState({ activeKey });
    }

    ChangeOn = (e, key) => {
        // console.log(this.state.panes);
        const { activeKey } = this.props
        const { TabsData } = this.props
        // console.log(TabsData);
        let source = TabsData.find(e => e.Name === activeKey)
        let data = source.Source.FormData.find(e => e.key === key)
        Object.assign(data, e)
        //this.props.updata(TabsData)
        setTimeout(() => {
            this.setState({
                tf: !this.state.tf
            })
        }, 200);
    }

    render() {
        console.log(this.props);

        return (
            <Spin spinning={this.state.loading}>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.props.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.props.dataContent.map(
                        pane =>
                            <TabPane tab={pane.Name} key={pane.Name}>
                                <ContentUser
                                    pane={pane.Source}
                                    Loading={this.Loading.bind(this)}
                                    hidLoading={this.hidLoading.bind(this)}
                                    currentTableTr={this.currentTableTr}
                                    currentTableTab={this.currentTableTab}
                                    ChangeOn={this.ChangeOn.bind(this)}
                                    CurrentIndex={this.state.CurrentIndex}
                                    onRef={this.onRef}
                                ></ContentUser>
                            </TabPane>
                    )}
                </Tabs>
            </Spin>

        );
    }
}

function mapStateToProps(State) {
    // console.log(State);

    return {
        TableList: State.TableList,
        TabsData: State.TabsData,
        activeKey: State.activeKey
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
        tableFugai: (k) => {
            dispatch(tableFugai(k))
        },
        updata: (k) => {
            dispatch(updata(k))
        },
        changeActiveKey: (k) => {
            dispatch(changeActiveKey(k))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps
)(Tags);