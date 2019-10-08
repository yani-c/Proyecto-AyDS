import React,{Component} from "react";
import { Link } from 'react-router-dom';

class Home extends Component{
  
  render () {
    return (
        <div>
           <Link to="/signIn" className="SignIn">Iniciar Sesion</Link>

        </div>
    );
  }
}


export default Home;