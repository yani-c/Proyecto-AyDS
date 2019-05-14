package trivia;

import static spark.Spark.*;

import static spark.Spark.before;
import static spark.Spark.after;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;

import com.google.gson.Gson;
import java.util.Map;

 import java.util.List;

public class App{

	public static void main( String[] args ){

	//Lo que se ejecuta antes que todo
		before((request, response) -> {
			Base.open();
		});

	//Lo que se ejecuta despues de todo
		after((request, response) -> {
			Base.close();
		});

	//Metodo de ejemplo
		get("/hello/:name", (req, res) -> {
			return "hello" + req.params(":name");
		});

//------------------------------------GET------------------------------------

	//muestra todos los usuarios 
		get("/users" , (req, res) ->{
			List<User> users = User.findAll();
			if(!users.isEmpty()){
				String u="";
				for(User i : users){
					u=u+"\n"+i.toJson(true);
				}
				res.type("application/json");
				return u;
			}
			else{
				return "Error: No hay usuarios cargados. Nada para mostrar";
			}
		});

	//muestra todas las pregunta
		get("/questions" , (req, res) ->{
			List<Question> questions = Question.findAll();
			if(!questions.isEmpty()){
				String q="";
				for(Question i : questions){
					q=q+"\n"+i.toJson(true);
				}
				res.type("application/json");
				return q;
			}
			else{
				return "Error: No hay preguntas cargadas. Nada para mostrar";
			}
		});

	//muestra todas las opciones
		get("/options" , (req, res) ->{
			List<Option> options = Option.findAll();
			if(!options.isEmpty()){
				String o="";
				for(Option i : options){
					o=o+"\n"+i.toJson(true);
				}
				res.type("application/json");
				return o;
			}
			else{
				return "Error: No hay opciones cargadas. Nada para mostrar";
			}
		});

	//muestra todas las categorias
		get("/categories" , (req, res) ->{
			List<Category> categories = Category.findAll();
			if(!categories.isEmpty()){
				String c="";
				for(Category i : categories){
					c=c+"\n"+i.toJson(true);
				}
				res.type("application/json");
				return c;
			}
			else{
				return "Error: No hay categorias cargadas. Nada para mostrar";
			}
		});


	//muestra un usuario dado su id 
		get("/user/:id" , (req, res) ->{
			User u = User.findById(req.params(":id"));
			if(u!=null){
				String aux= u.toJson(true);
				res.type("application/json");
				return aux;
			}
			return "Error: No se encontro la persona";
		});


	//muestra una categoria dado su id 
		get("/category/:id" , (req, res) ->{
		    Category c  = Category.findById(req.params(":id"));
			if(c!=null){
				String aux= c.toJson(true);
				res.type("application/json");
				return aux;
		    }
			return "Error: No se encontro la categoria";
		 });


	//muestra una pregunta dado su id 
		get("/question/:id" , (req, res) ->{
		    Question q = Question.findById(req.params(":id"));
			if(q!=null){
				String aux= q.toJson(true);
				res.type("application/json");
				return aux;
		    }
			return "Error: No se encontro la pregunta";
		 });


	//muestar una opcion dado su id 
		get("/option/:id" , (req, res) ->{
		    Option o  =  Option.findById(req.params(":id"));
			if(o!=null){
				String aux= o.toJson(true);
				res.type("application/json");
				return aux;
		    }
			return "Error: No se encontro la opcion";
		 });


//------------------------------------POST------------------------------------


	//carga un usuario
		post("/users", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			User user = new User();
			user.set("dni", bodyParams.get("dni"));
			user.set("password", bodyParams.get("password"));
			user.set("name", bodyParams.get("name"));
			user.set("administrator",bodyParams.get("administrator"));
			user.saveIt();
		    res.type("application/json");
			return user.toJson(true);
		});

	//carga una categoria
		post("/categories", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Category c = new Category();
			c.set("category_name", bodyParams.get("category_name"));
			c.saveIt();
			res.type("application/json");
			return c.toJson(true);
		});


	//carga una pregunta
		post("/questions", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Question q = new Question();
			q.set("descrip_q", bodyParams.get("descrip_q"));
			q.set("id_cat", bodyParams.get("id_cat"));
			q.set("user_id", bodyParams.get("user_id"));
			q.set("active", false);
			q.saveIt();
			res.type("application/json");
			return q.toJson(true);
		});


	//carga una opcion
		post("/options", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Option o = new Option();
			o.set("descrip_o", bodyParams.get("descrip_o"));
			o.set("id_q", bodyParams.get("id_q"));
			o.set("correct", bodyParams.get("correct"));
		    o.saveIt();
			res.type("application/json");
			return o.toJson(true);
		});
		
//------------------------------------DELETE------------------------------------


	//borra un usuario
		post("/deleteuser", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			User u = User.findById(bodyParams.get("id"));
			if(u!=null){
				u.delete();
				res.type("application/json");
				return "Se ha borrado"+u.toJson(true,"id","dni");
			}
			return "Error: No se pudo borrar.No se encontraron registro de la persona";
		});


	//borrar una pregunta y sus opciones
		post("/deletequestions", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Question q = Question.findById(bodyParams.get("id"));
			if(q!=null){
				q.delete();
				res.type("application/json");
				return "Se ha borrado"+q.toJson(true,"id","descrip_q")+" y sus respectivas opciones";
			}
			return "Error: No se pudo borrar.No se encontraron registro de la pregunta";
		});


	//borrar una opcion
		post("/deleteoptions", (req, res) -> {
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Option o = Option.findById(bodyParams.get("id"));
			if(o!=null){
				o.delete();
				res.type("application/json");
				return "Se ha borrado"+o.toJson(true,"id","descrip_o");
			}
			return "Error: No se pudo borrar.No se encontraron registro de la opcion";
		});

//------------------------------------PUT------------------------------------

	//actualiza datos de un usuario
		put("/user/:id" , (req,res) -> {
			User u = User.findById(req.params(":id"));
			if(u!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				u.set("dni", bodyParams.get("dni"));
				u.set("password", bodyParams.get("password"));
				u.set("name", bodyParams.get("name"));
				u.saveIt();	
				res.type("application/json");
				return "Actualizado con exito : "+u.toJson(true);
			}	
			res.type("application/json");
			return "Error: No se pudo actualizar.No se encontraron registros de la persona";
		});


	//actualiza datos de una pregunta
		put("/question/:id", (req, res) -> {
			Question q = Question.findById(req.params(":id"));
			if(q!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				q.set("descrip_q", bodyParams.get("descrip_q"));
				q.set("id_cat", bodyParams.get("id_cat"));
				q.set("active", bodyParams.get("active"));
				q.saveIt();	
				res.type("application/json");
				return "Actualizado con exito : "+q.toJson(true);
			}	
			res.type("application/json");
			return "Error: No se pudo actualizar.No se encontraron registros de la persona";
		});


	//actualiza datos de una opcion
		put("/option/:id", (req, res) -> {
			Option o = Option.findById(req.params(":id"));
			if(o!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				o.set("id_q", bodyParams.get("id_q"));
				o.set("descrip_o", bodyParams.get("descrip_o"));
				o.set("correct", bodyParams.get("correct"));
				o.saveIt();	
				res.type("application/json");
				return "Actualizado con exito : "+o.toJson(true);
			}	
			res.type("application/json");
			return "Error: No se pudo actualizar.No se encontraron registros de la persona";
		});


	//actualiza datos de una categoria
		put("/category/:id", (req, res) -> {
			Category c = Category.findById(req.params(":id"));
			if(c!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				c.set("category_name", bodyParams.get("category_name"));
				c.saveIt();	
				res.type("application/json");
				return "Actualizado con exito : "+c.toJson(true);
			}	
			res.type("application/json");
			return "Error: No se pudo actualizar.No se encontraron registros de la persona";
		});


	}//end main

}//end class

