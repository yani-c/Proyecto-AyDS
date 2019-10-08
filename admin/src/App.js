import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React,{Component} from "react";
import Home from './Home';
import Menu from './Menu';
import './App.css';
import SignIn from './SignIn';

class App extends Component{
  
  render () {
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
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
