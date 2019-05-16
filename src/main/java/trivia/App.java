package trivia;

import static spark.Spark.*;
import java.util.*;
import static spark.Spark.before;
import static spark.Spark.after;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;

import com.google.gson.Gson;
import java.util.Map;

 import java.util.List;


class QuestionParam
{
	int user_id;
	String description;
	ArrayList<OptionParam> options;
	int category_id;
}

class OptionParam
{
	String description;
	Boolean correct;
}


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


	//muestra una pregunta y sus opciones dado su id 
		get("/question/:id" , (req, res) ->{
		    Question q = Question.findById(req.params(":id"));
			if(q!=null){
				List<Option> options= Option.where("question_id = ?", req.params(":id"));
				String aux= q.toJson(true)+"\n";
				for(Option o : options){
					aux= aux+"\n"+o.toJson(true);
				}
				res.type("application/json");
				return aux;
		    }
			return "Error: No se encontro la pregunta";
		 });
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////

      // dado un usuario, su password, una pregunta y un opcion
      // valida que todos los datos existan y que sean correctos
      // y retorna si respondio bien o mal.  

      get("/answer/:id_u/:pass/:id_q/:id_o" , (req,res) ->{

        User u = User.findById(req.params(":id_u"));
        Question q = Question.findById(req.params(":id_q"));
        Option o = Option.findById(req.params(":id_o"));

        String r_answer = "";
        String login = " login fail ";

        if(u!=null){

            String u_pass = "";
            String pass = "";
            int flag_u = 0;

            u_pass = u_pass + u.get("password");
            pass = pass + req.params(":pass");

            if (u_pass.equals(pass)){
              login = " login ok -> "; 
              flag_u = 1;
            }
            r_answer = r_answer + login;

            if(flag_u == 1) {

                if((q!=null) && (o!=null) ) {

                    String str_o = ""; 
                    String str_q = "";
                    String q_id = ""; 
                    String o_q_id = "";
                    String op_c ="";

                    str_o = str_o + o.get("description");
                    str_q = str_q + q.get("description");
                    q_id  = q_id  + req.params(":id_q");
                    o_q_id = o_q_id + o.get("question_id");
                    op_c = op_c + o.get("correct");

                    r_answer = r_answer + str_q + " - " + str_o;

                    if((o_q_id.equals(q_id)) && ( op_c.equals("true"))){
                      r_answer = r_answer +" -> opcion correcta ";

                    }else{
                      r_answer = r_answer + " -> Opcion incorrecta ";
                    }


                }else{
                    r_answer = r_answer + " No se encuentra la pregunta o la opcion ";
                }
            }
        }

        return r_answer;
           
      });

///////////////////////////////////////////////////////////////////////////////////////////////////////////



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


	//carga una pregunta y sus opciones
      post("/questions", (req, res) -> {
        QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);
        Question question = new Question();
		question.set("description", bodyParams.description);
		question.set("category_id", bodyParams.category_id);
		question.set("user_id",bodyParams.user_id);
		question.set("active", false);
        question.save();
        for(OptionParam item: bodyParams.options) {
          Option option = new Option();
          option.set("description", item.description).set("correct", item.correct);
          question.add(option);
        }
		String json= question.toJson(true);
        return json;
      });

//------------------------------------DELETE------------------------------------


	//borra un usuario
		delete("/user/:id", (req, res) -> {
			User u = User.findById(req.params(":id"));
			if(u!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				u.delete();
				res.type("application/json");
				return "Se ha borrado"+u.toJson(true,"id","dni");
			}
			return "Error: No se pudo borrar.No se encontraron registro de la persona";
		});


	//borrar una pregunta y sus opciones
		delete("/question/:id", (req, res) -> {
			Question q = Question.findById(req.params(":id"));
			if(q!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				q.delete();
				res.type("application/json");
				return "Se ha borrado"+q.toJson(true,"id","description")+" y sus respectivas opciones";
			}
			return "Error: No se pudo borrar.No se encontraron registro de la pregunta";
		});


	//borrar una opcion
		delete("/option/:id", (req, res) -> {
			Option o = Option.findById(req.params(":id"));
			if(o!=null){
				Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
				o.delete();
				res.type("application/json");
				return "Se ha borrado"+o.toJson(true,"id","description");
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
				q.set("description", bodyParams.get("description"));
				q.set("category_id", bodyParams.get("category_id"));
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
				o.set("description", bodyParams.get("description"));
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

