import React,{Component} from "react";
import './Home.css';

class Home extends Component{

  handleClick=() => {
    this.props.history.push("/signIn")
  }

  render () {
    return (
      <div className="Home-header">
          <button className="button" onClick={this.handleClick}> Iniciar Sesion </button> 
      </div>
    );
  }
}

export default Home;