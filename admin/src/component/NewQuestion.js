import React,{Component} from "react";
import {AsyncStorage} from "AsyncStorage";

class NewQuestion extends Component{
    constructor(props) {
      super(props);
      this.state = {id_c:'',category: false,categories:[],description: '',option1: '',option2:'',option3:'',optionCorrect:''};
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
      let change = {}
      change[e.target.name] = e.target.value
      this.setState(change)
    }
     
    loadQuestion= async() => {
      this.setState({category:true});
      const h = new Headers(); 
      console.log("aqui");
      console.log(await AsyncStorage.getItem('userToken'));
      h.append('Content-Type','application/json; charset=UTF-8');
      h.append('Authorization', await AsyncStorage.getItem('userToken'));
      // ESTO DEBERIA CAMBIARSE CUANDO ESTE HECHO EL COMPONENTE CATEGORIA,
      //PARA PODER ELEGIR ENTRE ALGUNA DE ELLAS Y AHI PONERLE EL ID 
      var c=  this.state.id_c;
      await fetch(process.env.REACT_APP_API_HOST+"/questions",{
        method: 'POST', 
        body: JSON.stringify({
          description: this.state.description, category_id: c, options: [
            {description: this.state.option1, correct: false}, 
            {description: this.state.option2, correct: false},
            {description: this.state.option3, correct: false}, 
            {description: this.state.optionCorrect, correct: true}
          ]
        }), 
        headers: h
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        alert("Pregunta cargada correctamente");
        this.props.history.push('/Menu');
      })
      .catch(error => {
        console.log("ñeeeeeeee");
        console.log(error)
      });       
    }

    categories= async() => {
      this.setState({category:false});
      const h = new Headers(); 
      console.log(await AsyncStorage.getItem('userToken'));
      h.append('Content-Type','application/json; charset=UTF-8');
      h.append('Authorization', await AsyncStorage.getItem('userToken'));
      await fetch(process.env.REACT_APP_API_HOST+"/categories",{
          method: 'GET', 
          headers: h
      })
      .then(response => response.json())
      .then(response => {
        console.log("from categories");
        console.log(response);
        let cats = [];
        Object.values(response).forEach(item => {
           cats = cats.concat(item);
        });
        this.setState({categories:cats});
      })
      .catch(error => {
        console.log(error)
      });
    }

    show(){
      if(this.state.category){
        return (
          <div className="newQuestion-page">
            <div className="form">
              <form className="question-form" >
                <label><input type="text" placeholder="Descripcion" name="description" value={this.state.description} onChange={this.handleChange} /> </label>
                <label><input type="text" placeholder="Opción correcta" name="optionCorrect" value={this.state.optionCorrect} onChange={this.handleChange} /></label>
                <label><input type="text" placeholder="Opción" name="option1" value={this.state.option1} onChange={this.handleChange} /></label>
                <label><input type="text" placeholder="Opción" name="option2" value={this.state.option2} onChange={this.handleChange} /></label>
                <label><input type="text" placeholder="Opción" name="option3" value={this.state.option3} onChange={this.handleChange} /></label>
              </form>
              <button onClick={this.loadQuestion}> Guardar</button>
            </div>
          </div> 
        );
      }
      else{
        return(
          <div className="Block-Buttom-newCat">
            <button className="button-Cate2" onClick={this.categories}> ELEGIR CATEGORIA </button>
            {this.state.categories.map(c => 
              <div key={c.id}>
                <button className="button-Cate" onClick={()=> this.setState({id_c:c.id, category:true})}> {c.category_name} </button> 
              </div>
            )}
          </div>
        );
      } 
    }

  render () {
    return (
      <div className="Home-header">
        <font className="Text-titulo"> NUEVA PREGUNTA </font>
        <div className="Block-prim">
          {this.show()}
        </div>
      </div>
    ); 
  }
}

export default NewQuestion;