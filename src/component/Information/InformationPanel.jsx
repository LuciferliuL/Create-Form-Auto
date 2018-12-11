import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import TabContent from './TabContent'
import { connect } from 'react-redux'
import { copyDataSource, changeActiveKey } from './information.action'
const TabPane = Tabs.TabPane;



class InformationPanel extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [];
        this.state = {
            activeKey: '0',
            panes,
            SQLdata: [],
        };
    }
    componentDidMount() {
        let SQLdata = JSON.parse(this.props.information.Sqls)
        console.log(SQLdata);

        if (SQLdata.length > 0) {
            let paneData = []
            SQLdata.forEach((e, i) => {
                paneData.push({ title: e.name, content: <TabContent SQLdata={e} PaneSaveData={this.PaneSaveData} i={i} news={this.props.news}></TabContent>, key: `${i}` })
            })

            this.setState({
                panes: paneData,
                activeKey: this.props.activeKey,
                SQLdata: SQLdata
            })
        }
    }

    componentWillReceiveProps(pre) {
        let SQLdata = JSON.parse(pre.information.Sqls)
        // console.log(pre.news);

        let paneData = []
        SQLdata.forEach((e, i) => {
            paneData.push({ title: e.name, content: <TabContent SQLdata={e} PaneSaveData={this.PaneSaveData} i={i} news={pre.news}></TabContent>, key: `${i}` })
        })
        this.setState({
            panes: paneData,
            activeKey: this.props.activeKey,
            SQLdata: SQLdata
        })
    }

    onChange = (activeKey) => {
        // console.log(activeKey);

        // this.setState({ activeKey });
        this.props.changeActiveKey(activeKey)
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `${panes.length - 1}`;
        panes.push({ title: 'New Tab', content: <TabContent SQLdata={{}} PaneSaveData={panes.length - 1} i={panes.length - 1} news={this.props.news}></TabContent>, key: activeKey });
        this.setState({ panes, activeKey });
        let Sqls_ = JSON.parse(this.props.information.Sqls)
        Sqls_.push({
            name: 'New Tab',
            cols: '{}',
            sql: ''
        })
        this.props.copyDataSource({ 'Sqls': JSON.stringify(Sqls_) })
    }

    remove = (targetKey) => {
        // console.log(targetKey);
        let Sqls_ = JSON.parse(this.props.information.Sqls)
        let Sqls__ = Sqls_.filter((e, i) => i !== (+targetKey))

        this.props.copyDataSource({ Sqls: JSON.stringify(Sqls__) })
        this.props.changeActiveKey('0')
    }

    render() {

        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.add} disabled={this.props.news}>添加SQL数据</Button>
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.props.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}

                >
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                </Tabs>
            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log(state.information);

    return {
        information: state.information,
        activeKey: state.activeKey
    }
}

function mapDispatchProps(dispatch) {
    return {
        copyDataSource: (k) => {
            dispatch(copyDataSource(k))
        },
        changeActiveKey: (k) => {
            dispatch(changeActiveKey(k))
        }
    }
}
export default connect(mapStateToProps, mapDispatchProps)(InformationPanel);