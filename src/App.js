import React from 'react';
import './App.css';
import { BrowserRouter , Route, Redirect, Switch} from "react-router-dom";
import LoginComponent from './component/login/login.component'
import Desgincomponent from './component/Home/Desgin.component'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginComponent}></Route>
          <Route path='/desgin' component={Desgincomponent}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
