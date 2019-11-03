import React,{Component} from "react";
import {Button, ButtonGroup} from 'reactstrap';
import './Component.css';
import {Dropdown, DropdownButton } from 'react-bootstrap';
import {AsyncStorage} from "AsyncStorage";

class Statistics extends Component{

    constructor(props) {
        super(props);
        //en catStatistics se guardan las estadisticas por categoria
        //en categories todas las categorias
        //en questions todas las preguntas de la categoria elegida
        //en userStatistics las estadisticas del usuario buscado por dni
        //en dni el dni de quien se van a buscar las categorias
        //en cat la categoria en donde se van a bsucar las preguntas
        this.state = {statistics:'',catStatistics:[], categories:[],questions:[],userStatistics:[], dni:'',cat:''}

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
      this.setState({ 
        [event.target.name] : event.target.value
      });
    }

    
      Statistics_categories= async() => {
        this.setState({statistics:"category"});
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
          console.log(response);
          let cats = [];

        Object.values(response).forEach(item => {
            cats = cats.concat(item);
        });
        this.setState({catStatistics:cats});
        })
        .catch(error => {
          console.log(error)
        });
    }

    categories= async() => {
      this.setState({statistics:"cats"});
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

  questions= async(id) => {
    console.log("vamos por questions");
    this.setState({statistics:"question", cat:id});
    const h = new Headers(); 
    console.log(await AsyncStorage.getItem('userToken'));
    h.append('Content-Type','application/json; charset=UTF-8');
    h.append('Authorization', await AsyncStorage.getItem('userToken'));
    //pasar cat
    await fetch(process.env.REACT_APP_API_HOST+"/questions/"+this.state.cat,{
      method: 'GET', 
      headers: h
    })
    .then(response => response.json())
    .then(response => {
      console.log("from question");
      console.log(response);
      let q = [];

      Object.values(response).forEach(item => {
          q = q.concat(item);
      });
      this.setState({questions:q});

    })
    .catch(error => {
      console.log(error)
    });
  }

  user= async() => {
    this.setState({statistics:"showUser"});
    const h = new Headers(); 
    console.log(await AsyncStorage.getItem('userToken'));
    h.append('Content-Type','application/json; charset=UTF-8');
    h.append('Authorization', await AsyncStorage.getItem('userToken'));
    //pasar cat
    await fetch(process.env.REACT_APP_API_HOST+"/users/"+this.state.dni,{
      method: 'GET', 
      headers: h
    })
    .then(response => response.json())
    .then(response => {
      let cats = [];

      Object.values(response.cats).forEach(item => {
          cats = cats.concat(item);
      });
      this.setState({userStatistics:cats});
      
    })
    .catch(error => {
      console.log(error)
    });
  }

  
                     
      show(){
          console.log(this.state.statistics);
          if(this.state.statistics=="category"){
            return (
              <div>
              {this.state.catStatistics.map(cats => 
                <li key={cats.id}>
                  {"\n"}
                  {cats.category_name} 
                  {"\n"}
                  {cats.correct}
                  {"\n"}
                  {cats.incorrect}
                  </li>
                  )}
            </div>
              );
          }
          else if(this.state.statistics=="question"){
            console.log("qqqqqq");
              return(
                <div>
                {this.state.questions.map(q => 
                  <li key={q.id}>
                    {"\n"}
                    Activa: {q.active} 
                    {"\n"}
                    Descripcion: {q.description} 
                    {"\n"}
                    respondida correctamente: {q.correct}
                    {"\n"}
                    respondida incorrectamente: {q.incorrect}
                    </li>
                    )}
              </div>
              );
          }
          else if(this.state.statistics=="cats"){
            return (
              <div>
                  <DropdownButton id="dropdown-item-button" title="Categoria">
                {this.state.categories.map(cats => 
                  <li key={cats.id}>
                      <Dropdown.Item as="button" onClick={()=> this.questions(cats.id)}> soy {cats.category_name}</Dropdown.Item>
                  </li>
                  )}
                    </DropdownButton>
              </div>
            );

          }
          else if(this.state.statistics=="user"){
            return (
              <div>
                <form className="login-form" >
                  <label> 
                    <input type="text" placeholder="DNI"name="dni" value={this.state.dni} onChange={this.handleChange}/>
                  </label>
                </form>
                <button onClick={this.user}> Buscar </button>
                </div>
            );
          }
          else if(this.state.statistics=="showUser"){
            return (
              <div>
              {this.state.userStatistics.map(statistics => 
                <li key={statistics.nombre.toString()}>
                  {"\n"}
                  {statistics.nombre}
                  {"\n"}
                  correctas: 
                  {statistics.correct}
                  {"\n"}
                  incorrectas: 
                  {statistics.incorrect}
                </li>
                )}
                </div>
           );
          }
          else{
              return(<h1>ACA TOY</h1>);
          }
      }




  render () {

    return (
      <div className="Home-header">
        <font className="Text-titulo"> ESTADISTICAS </font>
        <div className="Block-prim">
          <div className="Block-buttonGroup">
            <ButtonGroup>
              <Button className="button-Group" onClick={this.Statistics_categories} >POR CATEGORIA</Button>
              <Button className="button-Group" onClick={this.categories}>POR PREGUNTA</Button>
              <Button className="button-Group" onClick={()=>this.setState({statistics:"user"})} >POR USUARIO</Button>
            </ButtonGroup>
          </div>
          <div>
          {this.show()}
          </div>
        </div>
    </div>
    );
  }
}
export default Statistics;