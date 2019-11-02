import React,{Component} from "react";
import logo from './logo.png';
import './Component.css';

class Menu extends Component{
  
  handleClickNewQuestion=() => {
    this.props.history.push("/newQuestion")
  }

  handleClickSignUp=() => {
    this.props.history.push("/signUp")
  }

  handleClickStatistics=() => {
    this.props.history.push("/statistics")
  }

  render () {
    return (
      <div className="Home-header">

        <img className="Menu-logo" src={logo} alt="logo" /> 
        <font className="Text-titulo"> MENU </font>
        <div className="Block-prim">

            <div className="Block-Buttom-Menu">

              <button className="button-Menu" onClick={this.handleClickNewQuestion}> NUEVA PREGUNTA </button>
              <button className="button-Menu" onClick={this.handleClickSignUp}> MODIFICAR AREAS </button> 
              <button className="button-Menu" onClick={this.handleClickStatistics}> VER ESTADISTICAS </button> 
              <button className="button-Menu" onClick={this.handleClickSignUp}> VER PREGUNTAS </button>  

            </div>
        </div>

      </div>
    );
  }
}


export default Menu;