import React,{Component,Redirect,alert} from "react";
import {AsyncStorage} from "AsyncStorage";
import ReactDOM from "react-dom";

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '',password: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.username});
        this.setState({value: event.target.password});
      }
    
      handleSubmit(event) {
        alert('A user was submitted: ' + this.state.username);
        event.preventDefault();
      }
      
      componentDidMount(){

          var u = this.state.username;
          var p = this.state.username;
          fetch("http://192.168.0.144:4567/login",{
              method: 'POST', 
              body: {username: u, password: p }, 
                auth: {
                  username: u,
                  password: p
                } 
            }).then(response => response.json())
            .then(response => {
                AsyncStorage.setItem('userToken', response.config.headers.Authorization);
                ReactDOM.render(
                    <Redirect to="/menu" />,
                    document.getElementById('root')
                )
              });
                   
      }

  render () {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
            username:
            <input type="text" username={this.state.username} onChange={this.handleChange} />
            </label>
            <label>
            password:
            <input type="password" password={this.state.password} onChange={this.handleChange} />
            </label>
            <button type="submit"> iniciar sesion</button>
        </form>
        ); 
  }
}


export default SignIn;