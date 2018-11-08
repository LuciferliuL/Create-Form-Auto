import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import TabContent from './TabContent'
const TabPane = Tabs.TabPane;



class InformationPanel extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [];
        this.state = {
          activeKey: '0',
          panes,
          SQLdata:[]
        };
      }
      componentDidMount(){
        const {selectedData} = this.props
        // console.log(selectedData);
        if(selectedData[0].PK !== -1){
          let SQLdata = JSON.parse(selectedData[0].Sqls)
          let paneData = []
          SQLdata.forEach((e,i) => {
            paneData.push({ title: e.name, content:  <TabContent SQLdata={e} PaneSaveData={this.PaneSaveData} i={this.newTabIndex}></TabContent>, key: `newTab${this.newTabIndex++}` })
          })
          this.setState({
            panes:paneData,
            activeKey: paneData[0].key,
            SQLdata:SQLdata
          })
        }
        
      }
      componentWillReceiveProps(pre){
        console.log(pre);
        const {selectedData,news} = pre
        console.log(selectedData);
        if(!news){
          let SQLdata = JSON.parse(selectedData[0].Sqls)
          let paneData = []
          SQLdata.forEach((e,i) => {
            paneData.push({ title: e.name, content:  <TabContent SQLdata={e}  PaneSaveData={this.PaneSaveData} i={this.newTabIndex}></TabContent>, key: `newTab${this.newTabIndex++}` })
          })
          this.setState({
            panes:paneData,
            activeKey: paneData[0].key,
            SQLdata:SQLdata
          })
        }else if(news){
          this.setState({
            panes:[],
            activeKey: '0',
            SQLdata:''
          })
        }
      }
      PaneSaveData = (obj,key)=>{
        // console.log(key);
        const d = this.state.SQLdata
        d[key] = obj
        console.log(obj);
        
        this.setState({
          SQLdata:d
        },()=>{
          sessionStorage.setItem('SQL',JSON.stringify({'Sqls':JSON.stringify(this.state.SQLdata)}))
        })
        // this.props.EditSelectedRow()
       
      }
      onChange = (activeKey) => {
        this.setState({ activeKey });
      }
    
      onEdit = (targetKey, action) => {
        this[action](targetKey);
      }
    
      add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex}`;
        panes.push({ title: 'New Tab', content: <TabContent SQLdata={{}}  PaneSaveData={this.PaneSaveData} i ={this.newTabIndex}></TabContent>, key: activeKey });   
        this.setState({ panes, activeKey },()=>{this.newTabIndex++});
        
      }
    
      remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
      }
    render() {
        return (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Button onClick={this.add}>添加SQL数据</Button>
            </div>
            <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} >{pane.content}</TabPane>)}
            </Tabs>
          </div>
        );
      }
    }


export default InformationPanel;