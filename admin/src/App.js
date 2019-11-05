import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React,{Component} from "react";
import Home from './component/Home';
import Menu from './component/Menu';
import SignUp from './component/SignUp';
import Statistics from './component/Statistics';
import './App.css';
import SignIn from './component/SignIn';
import NewQuestion from './component/NewQuestion';
import Category from './component/Category';

class App extends Component{
  
  render () {
    require('dotenv').config();
    return (
      <BrowserRouter>
        <div>
          <Redirect 
          from="/"
           to= "/home" />
          <Switch>
            <Route
              path="/home"
              component={Home} />
              <Route
              path="/signIn"
              component={SignIn} />
               <Route
              path="/signUp"
              component={SignUp} />
              <Route
              path="/menu"
              component={Menu} />
              <Route
              path="/newQuestion"
              component={NewQuestion} />
              <Route
              path="/statistics"
              component={Statistics} />
              <Route
              path="/category"
              component={Category} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
