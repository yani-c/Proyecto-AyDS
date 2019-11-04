import React,{Component} from "react";
import {Button, ButtonGroup} from 'reactstrap';
import Table from 'react-bootstrap/Table'
import estad from './estad.png';
import styles from './App.module.css';
import './Component.css';

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
          <Table className="PropTable">
            <thead className="PropTable">
              <tr >
                <th className="PropTable2">CATEGORIA</th>
                <th className="PropTable2">CORRECTAS</th>
                <th className="PropTable2">INCORRECTAS</th>
              </tr>
            </thead >
            {this.state.catStatistics.map(cats => 
              <tbody key={cats.id} className="PropTable">
                <tr>
                  <td className="PropTable2">{cats.category_name}</td>
                  <td className="PropTable2" >{cats.correct}</td>
                  <td className="PropTable2">{cats.incorrect}</td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
      );
    }
    else if(this.state.statistics=="question"){
      console.log("qqqqqq");
      return(
          <div className={styles.app}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className="PropTable2"> PREGUNTA </th>
                  <th className="PropTable2"> RESPONDIERON CORRECTAMENTE</th>
                  <th className="PropTable2"> RESPONDIERON INCORRECTAMENTE</th>
                </tr>
              </thead>
              {this.state.questions.map(q =>
                <tbody key={q.id}>
                  <tr>
                    <td className="PropTable2">{q.description}</td>
                    <td className="PropTable2">{q.correct}</td>
                    <td className="PropTable2">{q.incorrect}</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
      );
    }
    else if(this.state.statistics=="cats"){
      return (
        <div className="Block-Buttom-newCat">
          {this.state.categories.map(cats => 
            <div key={cats.id}>
              <button className="button-Cate" onClick={()=> this.questions(cats.id)}> {cats.category_name} </button> 
            </div>
          )}
        </div>
      );
    }
    else if(this.state.statistics=="user"){
      return (
        <div className= "Block-Stat-User">
          <form className="login-form" >
            <label> 
              <input className="input-DNI" type="text" placeholder="DNI"name="dni" value={this.state.dni} onChange={this.handleChange}/>
            </label>
            <button className="button-Buscar" onClick={this.user}> Buscar </button>
          </form>
        </div>
      );
    }
    else if(this.state.statistics=="showUser"){
      return (
        <div>
          <Table className="PropTable">
            <thead className="PropTable">
              <tr>
                <th className="PropTable2">CATEGORIA</th>
                <th className="PropTable2">CORRECTAS</th>
                <th className="PropTable2">INCORRECTAS</th>
              </tr>
            </thead >
            {this.state.userStatistics.map(statistics => 
              <tbody key={statistics.nombre.toString()} className="PropTable">
                <tr>
                  <td className="PropTable2">{statistics.nombre}</td>
                  <td className="PropTable2" >{statistics.correct}</td>
                  <td className="PropTable2">{statistics.incorrect}</td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
      );
    }
    else{
      return (
          <img className="Sign-estadistica" src={estad} alt="estad"/>
      );
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