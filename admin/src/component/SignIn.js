import React,{Component} from "react";
import logo from './logo.png';
import './Component.css';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '',password: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    

     login = async() => {
      //  const h = new Headers(); 
        await fetch(process.env.REACT_APP_API_HOST+"/login",{
              method: 'POST', 
              headers: { Accept: 'application/json', 'Conent-Type':'application/json',},
              body: JSON.stringify({username: this.state.username, password: this.state.password}), 
            },) 
            .then(response => {
              console.log(response);
              console.log("ahora en json");
              console.log(response.json);
             // console.log(response.json().PromiseValu);
              //  AsyncStorage.setItem('userToken', response.json().Authorization);
             //   this.props.history.push('/Menu');
              })
              .catch(error => {
                console.log("no che");
                console.log(error)
              });
      }

  render () {
        return (

          <div className="login-page">
            <div className="form">
            <img className="Sign-logo" src={logo} alt="logo" />
              <form className="login-form" onSubmit={this.login}>
                <label> 
                  <input type="text" placeholder="Nombre de usuario" username={this.state.username} onChange={this.handleChange} />
                </label>
                <label> 
                  <input type="password" placeholder="Contraseña" password={this.state.password} onChange={this.handleChange} />
                </label>
                <button type="submit"> iniciar sesion </button>
                <p className="message">No tiene una cuenta? <a href="signUp">Crear cuenta</a></p>
              </form>
            </div>
          </div>
        ); 
  }
}


export default SignIn;