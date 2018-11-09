import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginComponent from './component/login/login.component'
import Usercomponent from './component/User/User.Component'
import Desgincomponent from './component/Home/Desgin.component.jsx'
import loginLeader from './component/login/loginLeader'
import UserList from './component/BaseData/UserList'
import UserInfo from './component/BaseData/UserInfo'
import UserAuthorization from './component/BaseData/UserAuthorization'
import DBList from './component/BaseData/DBList'
import DBInfo from './component/BaseData/DBInfo'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginComponent}></Route>
          <Route path='/Design' component={Desgincomponent}></Route>
          <Route path='/USER' component={Usercomponent}></Route>
          <Route path="/loginLeader" component={loginLeader}></Route>
          <Route path="/BaseData/UserList" component={UserList}></Route>
          <Route path="/BaseData/UserInfo" component={UserInfo}></Route>
          <Route path="/BaseData/UserAuthorization" component={UserAuthorization}></Route>
          <Route path="/BaseData/DBList" component={DBList}></Route>
          <Route path="/BaseData/DBInfo" component={DBInfo}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
