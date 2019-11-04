import React,{Component, Redirect} from "react";
import {AsyncStorage} from "AsyncStorage";
import './Component.css';
import logo from './logo.png';
import {Button, ButtonGroup} from 'reactstrap';
import { throws } from "assert";


class Category extends Component{
    constructor(props) {
        super(props);
        this.state = {Categorias: [], option:'', editar:'',eliminar:'', nombre_nuevo: "", nombre_editado:"", id_elegido: ""};
        this.handleChange = this.handleChange.bind(this);
      }
      
      handleChange(e) {
        let change = {}
         change[e.target.name] = e.target.value
        this.setState(change)
      }
      
      load_categories= async(opcion) => {
        this.setState({option:opcion});
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
        this.setState({Categorias:cats});
        })
        .catch(error => {
          console.log(error)
        });
    }
  	editar= async(id_elegido) => {
      this.setState({option:"editar" });
      const h = new Headers();
        h.append('Content-Type','application/json; charset=UTF-8');
        h.append('Authorization', await AsyncStorage.getItem('userToken'));
        await fetch(process.env.REACT_APP_API_HOST+"/category/"+id_elegido,{
          method: 'POST',
          body: JSON.stringify({category_name: this.state.nombre_editado,
          }),
          headers: h,
          
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          alert("Categoria Actualizada");
          this.props.history.push('/Menu');
        })
       .catch(error => {
          console.log(error);
        }) ;
    }
    
    eliminar= async(id) => {
      this.setState({option:"eliminar"});
      const h = new Headers();
      h.append('Content-Type','application/json; charset=UTF-8');
      h.append('Authorization', await AsyncStorage.getItem('userToken'));
        await fetch(process.env.REACT_APP_API_HOST+"/category/"+id,{
          method: 'POST',
          headers: h,
        })
        .then(response => response.json())
        .then(response => {
          alert("Categoria borrada existosamente");
          this.props.history.push('/Menu');
        });
    }
      
    añadir= async() => {
      this.setState({option:"añadir"});
      const h = new Headers();
        h.append('Content-Type','application/json; charset=UTF-8');
        h.append('Authorization', await AsyncStorage.getItem('userToken'));
        await fetch(process.env.REACT_APP_API_HOST+"/categories",{
          method: 'POST',
          body: JSON.stringify({category_name: this.state.nombre_nuevo, correct: 0, incorrect: 0 
          }),
          headers: h,
        })
        .then(response => response.json())
        .then(response => {
          alert("Categoria Añadida Exitosamente");
          this.props.history.push('/Menu');
        })
       .catch(error => {
          alert("Categoria ya existente");
          this.props.history.push('/Menu');
        }) ;
    }

      show(){
        // EDITARRR
        if(this.state.option=="editar"){
          return(
          <div>
          {this.state.Categorias.map(c => 
            <li key={c.id}>
              <button onClick={() =>this.setState({option:"editando", id_elegido:c.id} ) }> {c.category_name} </button>
            </li>          
          )}
          </div>
          );
        }
        else if(this.state.option=="editando"){
          return(
            <div>
            <label>
            <input type="text" placeholder="Editar Categoria" name="nombre_editado" value={this.state.nombre_editado} onChange={this.handleChange} />
            </label>
            <Button color="primary" onClick={() =>this.editar(this.state.id_elegido)} >Guardar</Button>
            </div> 
          );
        }
  //                ELIMINARRRRRR      
          else if (this.state.option=="eliminar"){
          return(
            <div>
            {this.state.Categorias.map(c => 
              <li key={c.id}>
                <button onClick={() =>this.eliminar(c.id)}> {c.category_name} </button>
              </li>          
            )}
            </div>
            );
        }
        else if(this.state.option=="añadir"){
          return(
            <div className="newCategory-page">
            <div className="form">
            <h1>
              Ingrese su nueva Categoria
            </h1>
            <label>
            <input type="text" placeholder="Nombre" name="nombre_nuevo" value={this.state.nombre_nuevo} onChange={this.handleChange} />
            </label>
            <button onClick={this.añadir}> Guardar</button>
            </div>
            </div>
        );

        }
        
        }
        //AÑADIRRR
        añadir_categoria(){
          this.setState({option:"añadir"});
        }
      render () {
        return (
          <div className="Modificar-Area">
            <div className="form">
            <img className="Sign-logo" src={logo} alt="logo" />
            <h1>Modificar Areas</h1>
            <Button color="primary" onClick={() =>this.load_categories("editar")}  >EDITAR</Button>
            <Button color="primary" onClick={() =>this.load_categories("eliminar")} >ELIMINAR</Button>
            <Button color="primary" onClick={() =>this.setState({option:"añadir"})} >AÑADIR</Button>
            </div>
            <div> 
            {this.show()}
            </div>
          </div>
        ); 
  }




}

export default Category;  