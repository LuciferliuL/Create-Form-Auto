import React from 'react';
import './App.css';
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginComponent from './component/login/login.component'
import Usercomponent from './component/User/User.Component'
import Desgincomponent from './component/Home/Desgin.component.jsx'
import loginLeader from './component/login/loginLeader'

import Info from './component/Information/info.jsx'
import UserHome from './component/BaseData/UserHome.jsx'
import iphoneUpload from './component/IphoneUpload/iphoneUpload'
import configUI from './component/configUI/configUI.jsx'
import form from './buildForm/form'

class App extends React.Component {
    render() {
        return (
            <HashRouter >
                <Switch>
                    <Route exact path='/' component={LoginComponent}></Route>
                    <Route path='/Design' component={Desgincomponent}></Route>
                    <Route path='/USER' component={Usercomponent}></Route>
                    <Route path="/loginLeader" component={loginLeader}></Route>
                    <Route path='/BaseData' component={UserHome}></Route>
                    <Route path="/Info" component={Info}></Route>
                    <Route path='/iphoneUpload' component={iphoneUpload}></Route>
                    <Route path='/configUI' component={configUI}></Route>
                    <Route path='/form' component={form}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
            </HashRouter >
        );
    }
}

export default App;
