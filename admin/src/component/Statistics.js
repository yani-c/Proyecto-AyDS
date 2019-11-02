import React,{Component} from "react";
import {Button, ButtonGroup} from 'reactstrap';
import './Component.css';
import {Dropdown, DropdownButton } from 'react-bootstrap';
import {AsyncStorage} from "AsyncStorage";

class Statistics extends Component{

    constructor(props) {
        super(props);
        //en cats se guardan las estadisticas por categoria
        //en c todas las categorias
        //en question todas las preguntas de la categoria elegida
        //en u las estadisticas del usuario buscado por dni
        this.state = {statistics:'',cats:[], c:[],q:[],u:[], dni:'',cat:''}

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
        await fetch(process.env.REACT_APP_API_HOST+"/statistics",{
          method: 'GET', 
          headers: h
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          let cats = [];

        Object.values(response.cats).forEach(item => {
            cats = cats.concat(item);
        });
        this.setState({cats:cats});
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
        console.log("A VER");
        console.log(response);
        let cats = [];

      Object.values(response.cats).forEach(item => {
         cats = cats.concat(item);
      });
      this.setState({c:cats});
      })
      .catch(error => {
        console.log(error)
      });
  }

  questions= async() => {
    this.setState({statistics:"questions"});
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
      console.log(response);


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
      this.setState({u:cats});
      
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
              {this.state.cats.map(cats => 
                <li>
                  {"\n"}
                  {cats.nombre} 
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
              return(
                <h1> HOLIS</h1>
              );
          }
          else if(this.state.statistics=="cats"){
            return (
              <div>
                  <DropdownButton id="dropdown-item-button" title="Dropdown button">
                {this.state.c.map(cats => 
                  <li>
                      <Dropdown.Item as="button">{cats.category_name}</Dropdown.Item>
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
            console.log(this.state.u);
            const c = this.state.u;
            console.log("y ahora?");
            console.log(c);
            return (
              <div>
              {this.state.u.map(statistics => 
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

    function Item(props) {
        return <li>{props.value}</li>;
     }
     
     function MyList(items) {
        return (
         <ul>
           {items.map((item) => <Item key={item.nombre} value={item} />)}
         </ul>
       );
     }

    return (
      <div className="Statics-header">
        <font className="Text-titulo"> ESTADISTICAS </font>
        <div className="Block-prim">
          <div className="Block-Buttom-Menu">
            <ButtonGroup>
              <Button color="primary" onClick={this.Statistics_categories} >POR CATEGORIA</Button>
              <Button color="primary" onClick={this.categories}>POR PREGUNTA</Button>
              <Button color="primary" onClick={()=>this.setState({statistics:"user"})} >POR USUARIO</Button>
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