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
  handleClickCategory=() => {
    this.props.history.push("/category")
  }

  render () {
    return (
      <div className="Home-header">

        <img className="Menu-logo" src={logo} alt="logo" /> 
        <font className="Text-titulo"> MENU </font>
        <div className="Block-prim">

            <div className="Block-Buttom-Menu">

              <button className="Button-Menu" onClick={this.handleClickNewQuestion}> NUEVA PREGUNTA </button>
              <button className="Button-Menu" onClick={this.handleClickCategory}> MODIFICAR AREAS </button> 
              <button className="Button-Menu" onClick={this.handleClickStatistics}> VER ESTADISTICAS </button> 
              <button className="Button-Menu" onClick={this.handleClickSignUp}> VER PREGUNTAS </button>  

            </div>
        </div>

      </div>
    );
  }
}


export default Menu;