import React from 'react';
import './App.css';
import { BrowserRouter , Route, Redirect, Switch} from "react-router-dom";
import LoginComponent from './component/login/login.component'
import Usercomponent from './component/User/User.Component'
import Desgincomponent from './component/Home/Desgin.component.jsx'
import loginLeader from './component/login/loginLeader'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginComponent}></Route>
          <Route path='/Design' component={Desgincomponent}></Route>
          <Route path='/USER' component={Usercomponent}></Route>
          <Route path="/loginLeader" component={loginLeader}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
