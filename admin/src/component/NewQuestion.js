import React,{Component, Redirect} from "react";
import {AsyncStorage} from "AsyncStorage";
import ReactDOM from "react-dom";


class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {description: '',option1: '',option2:'',option3:'',optionCorrect:''};
    
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
          var c= 'Ciencia';
          fetch(process.env.REACT_APP_API_HOST+"/questions",{
              method: 'POST', 
              body: {description: this.state.description, option1: this.state.option1, 
                option2: this.state.option2, option3: this.state.option3, optionCorrect:this.state.optionCorrect, cat:c}, 
                headers: { 'Authorization' : AsyncStorage.getItem('userToken')}
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
            Descripcón:
            <input type="text" description={this.state.description} onChange={this.handleChange} />
            </label>
            <label>
            Opción correcta:
            <input type="text" optionCorrect={this.state.optionCorrect} onChange={this.handleChange} />
            </label>
            <label>
            Opción:
            <input type="text" option1={this.state.option1} onChange={this.handleChange} />
            </label>
            <label>
            Opción:
            <input type="text" option2={this.state.option2} onChange={this.handleChange} />
            </label>
            <label>
            Opción:
            <input type="text" option3={this.state.option3} onChange={this.handleChange} />
            </label>
            <button type="submit"> Guardar</button>
        </form>
        ); 
  }
}


export default NewQuestion;