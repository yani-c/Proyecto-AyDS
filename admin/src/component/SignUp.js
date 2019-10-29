import React,{Component} from "react";
import logo from './logo.png';
import './Component.css';

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '',password: '',dni: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({username: event.target.username, password: event.target.password, dni: event.target.dni});
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }

    render () {
        return (

          <div class="login-page">
            <div class="form">
            <img className="Sign-logo" src={logo} alt="logo" />
              <form class="login-form">
                <label> 
                  <input type="text" placeholder="Nombre de usuario" username={this.state.username} onChange={this.handleChange} />
                </label>
                <label> 
                  <input type="text" placeholder="DNI" dni={this.state.dni} onChange={this.handleChange} />
                </label>
                <label> 
                  <input type="password" placeholder="Contraseña" password={this.state.password} onChange={this.handleChange} />
                </label>
                <button type="submit"> Registrarse </button>
              </form>
            </div>
          </div>
        ); 
  }
}


export default SignUp;