import React,{Component,alert} from "react";
import logo from './logo.png';
import './Component.css';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '',password: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({username: event.target.username, password: event.target.password});
      }
    
      handleSubmit(event) {
        alert('A user was submitted: ' + this.state.username);
        event.preventDefault();
      }
      /*
      componentDidMount(){
         // var u = this.state.username;
         // var p = this.state.username;
          fetch(process.env.REACT_APP_API_HOST+"/login",{
              method: 'POST', 
              body: JSON.stringify({username: this.state.username, password: this.state.password}), 
              mode: "no-cors"
            }) 
            .then(response => {
              console.log(response);
                AsyncStorage.setItem('userToken', response.config.headers.Authorization);
                ReactDOM.render(
                   <Menu/>,
                    document.getElementById('root')
                )
              })
              .catch(error => {
                console.log(error)
              });
                   
      }*/

     login(){
      //  const h = new Headers(); 
      //await
         fetch(process.env.REACT_APP_API_HOST+"/login",{
              method: 'POST', 
              headers: { Accept: 'application/json',},
              body: JSON.stringify({username: this.state.username, password: this.state.password}), 
              
            },) 
            .then(response => {
              console.log(response.json());
             // console.log(response.json().PromiseValu);
              //  AsyncStorage.setItem('userToken', response.json().Authorization);
             //   this.props.history.push('/Menu');
              })
              .catch(error => {
                console.log(error)
              });
      }

  render () {
        return (

          <div class="login-page">
            <div class="form">
            <img className="Sign-logo" src={logo} alt="logo" />
              <form class="login-form" onSubmit={this.login()}>
                <label> 
                  <input type="text" placeholder="Nombre de usuario" username={this.state.username} onChange={this.handleChange} />
                </label>
                <label> 
                  <input type="password" placeholder="Contraseña" password={this.state.password} onChange={this.handleChange} />
                </label>
                <button type="submit"> iniciar sesion </button>
                <p class="message">No tiene una cuenta? <a href="#">Crear cuenta</a></p>
              </form>
            </div>
          </div>
        ); 
  }
}


export default SignIn;