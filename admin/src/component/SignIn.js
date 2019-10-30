import React,{Component} from "react";
import logo from './logo.png';
import { AsyncStorage } from 'AsyncStorage';
import './Component.css';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '',password: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(e) {
        let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
      }
    
    

     login= async() => {
       console.log(this.state.username);
       console.log(this.state.password);
        const h = new Headers(); 
        h.append('Accept', 'application/json');
         await fetch(process.env.REACT_APP_API_HOST+"/login",{
              method: 'POST', 
              headers:h,
              body: JSON.stringify({username: this.state.username, password: this.state.password}), 
              mode:'cors',
              cache:'default',
            },) 
            .then(response => {
                return response.json();
            })
            .then((res) => {
              console.log(res);
              AsyncStorage.setItem('userToken', res.Authorization);
              //lo comento para poder probar el login, porque despues una vez
              //que me logeo, no viene mas al login si esta descomentado
              //this.props.history.push('/Menu');
            })
              .catch(error => {
                console.log(error)
              });
      }

  render () {
        return (

          <div className="login-page">
            <div className="form">
            <img className="Sign-logo" src={logo} alt="logo" />
              <form className="login-form" >
                <label> 
                  <input type="text" placeholder="Nombre de usuario" username={this.state.username} onChange={this.handleChange} />
                </label>
                <label> 
                  <input type="password" placeholder="Contraseña" password={this.state.password} onChange={this.handleChange} />
                </label>
                <p className="message">No tiene una cuenta? <a href="signUp">Crear cuenta</a></p>
              </form>
              <button onClick ={this.login}>
                iniciar sesion
                </button>
            </div>
          </div>
        ); 
  }
}


export default SignIn;