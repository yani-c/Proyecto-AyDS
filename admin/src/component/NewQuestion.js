import React,{Component, Redirect} from "react";
import {AsyncStorage} from "AsyncStorage";
import ReactDOM from "react-dom";


class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {description: '',option1: '',option2:'',option3:'',optionCorrect:''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(e) {
        let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
      }
  
      
      loadQuestion= async() => {
      const h = new Headers(); 
      console.log("aqui");
      console.log(await AsyncStorage.getItem('userToken'));
      h.append('Content-Type','application/json; charset=UTF-8');
      h.append('Authorization',await AsyncStorage.getItem('userToken'));
          var c= 'Ciencia';
          await fetch(process.env.REACT_APP_API_HOST+"/questions",{
            credentials:"include",
              method: 'POST', 
              body: {description: this.state.description, option1: this.state.option1, 
                option2: this.state.option2, option3: this.state.option3, optionCorrect:this.state.optionCorrect, cat:c}, 
                headers: h,
            }).then(response => response.json())
            .then(response => {
                console.log(response);

              })
              .catch(error => {
                console.log("ñeeeeeeee");
                console.log(error)
              });
                   
      }

  render () {
        return (
          <div className="newQuestion-page">
            <div className="form">
              <form className="question-form" >
            <label>
            <input type="text" placeholder="Descripcion" name="description" value={this.state.description} onChange={this.handleChange} />
            </label>
            <label>
            <input type="text" placeholder="Opción correcta" name="optionCorrect" value={this.state.optionCorrect} onChange={this.handleChange} />
            </label>
            <label>
            <input type="text" placeholder="Opción" name="option1" value={this.state.option1} onChange={this.handleChange} />
            </label>
            <label>
            <input type="text" placeholder="Opción" name="option2" value={this.state.option2} onChange={this.handleChange} />
            </label>
            <label>
            <input type="text" placeholder="Opción" name="option3" value={this.state.option3} onChange={this.handleChange} />
            </label>
            </form>
            <button onClick={this.loadQuestion}> Guardar</button>
            </div>
            </div>
        ); 
  }
}


export default NewQuestion;