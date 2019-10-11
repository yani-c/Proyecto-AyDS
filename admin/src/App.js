import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React,{Component} from "react";
import Home from './component/Home';
import Menu from './component/Menu';
import './App.css';
import SignIn from './component/SignIn';
import NewQuestion from './component/NewQuestion';

class App extends Component{
  
  render () {
    require('dotenv').config();
    return (
      <BrowserRouter>
        <div>
          <Redirect
            from="/"
            to="/home" />
          <Switch>
            <Route
              path="/home"
              component={Home} />
              <Route
              path="/signIn"
              component={SignIn} />
              <Route
              path="/menu"
              component={Menu} />
              <Route
              path="/newQuestion"
              component={NewQuestion} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
