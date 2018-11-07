import React from 'react';
import './App.css';
import { BrowserRouter , Route, Redirect, Switch} from "react-router-dom";
import LoginComponent from './component/login/login.component'
import Usercomponent from './component/User/User.Component'
import Desgincomponent from './component/Home/Desgin.component.jsx'
import loginLeader from './component/login/loginLeader'
import Info from './component/Information/info.jsx'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginComponent}></Route>
          <Route path='/Design' component={Desgincomponent}></Route>
          <Route path='/USER' component={Usercomponent}></Route>
          <Route path="/loginLeader" component={loginLeader}></Route>
          <Route path="/Info" component={Info}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
