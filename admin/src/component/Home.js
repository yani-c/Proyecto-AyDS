import React,{Component} from "react";
import logo from './logo.png';
import './Component.css';

class Home extends Component{

  handleClickSignIn=() => {
    this.props.history.push("/signIn")
  }

  handleClickSignUp=() => {
    this.props.history.push("/signUp")
  }

  render () {
    return (
      <div className="Home-header">
        <font className="Text-titulo"> TRIVIAVET</font>
        <div className="Block-prim">
          <img className="Home-logo" src={logo} alt="logo" />
          <div className="Block-Buttom">
            <button className="Button-Home" onClick={this.handleClickSignIn}> Iniciar Sesion </button>
            <button className="Button-Home" onClick={this.handleClickSignUp}> Registrarse </button>  
          </div>
        </div>
      </div>
    );
  }
}

export default Home;