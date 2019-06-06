package trivia;

import static spark.Spark.*;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;
import trivia.BasicAuth;

import com.google.gson.Gson;
import java.util.Map;

 import java.util.*;


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

	static User currentUser;

	public static void main( String[] args ){

	//Lo que se ejecuta antes que todo
		before((request, response) -> {
			Base.open();
			String headerToken = (String) request.headers("Authorization");
			if (headerToken == null || headerToken.isEmpty() || !BasicAuth.authorize(headerToken)){
				halt(401);
			}
			currentUser = BasicAuth.getUser(headerToken);
		});

	//Lo que se ejecuta despues de todo
		after((request, response) -> {
			Base.close();
			response.header("Access-Control-Allow-Origin", "*");
        	response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        	response.header("Access-Control-Allow-Headers","Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,");
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
					if(i.getBoolean("active")){
					q=q+"\n"+i.toJson(true);
					}
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
				if(q.getBoolean("active")){
					List<Option> options= Option.where("question_id = ?", req.params(":id"));
					String aux= (q.toJson(true,"id","description, category_id")) + "\n";
					for(Option o : options){
						aux= aux+"\n"+o.toJson(true,"id","description");
					}
					res.type("application/json");
					return aux;
				}
				else{
					return "Error: esta pregunta no esta activa";
				}
		    }
			return "Error: No se encontro la pregunta";
		 });

	//muestra todas las respuestas
		get("/answers" , (req, res) ->{
			List<Answer> answer = Answer.findAll();
			if(!answer.isEmpty()){
				String a="";
				for(Answer i : answer){
					a=a+"\n"+i.toJson(true);
				}
				res.type("application/json");
				return a;
			}
			else{
				return "Error: No hay respuestas cargadas. Nada para mostrar";
			}
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


	//carga una pregunta y sus opciones
      post("/questions", (req, res) -> {
        QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);
        Question question = new Question();
		    question.set("description", bodyParams.description);
		    question.set("category_id", bodyParams.category_id);
		    question.set("user_id",currentUser.get("id"));
		    question.set("active", false);
        question.save();
        for(OptionParam item: bodyParams.options) {
          Option option = new Option();
          option.set("description", item.description).set("correct", item.correct);
          question.add(option);
        }
		    question.set("active", question.comprobateActive());
		    question.saveIt();
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
				o.set("description", bodyParams.get("description"));
				o.set("correct", bodyParams.get("correct"));
				o.saveIt();
				//controla el campo active de la pregunta donde pertenece esta opcion
				Question q= Question.findById(o.get("question_id"));
				q.set("active", q.comprobateActive());
				q.saveIt();
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


//------------------------------------GAME------------------------------------


		post("/login", (req,res) -> {
			res.type("application/json");
			// if there is currentUser is because headers are correct, so we only
			// return the current user here
			return currentUser.toJson(true);
		});


		post("/logout", (req,res) -> {
			return "";
		});


		//elige una pregunta aleatoriamente y redirecciona a mostrarla
		get("/game" , (req,res) ->{
      int cataleatoria = (int) (Math.random() * 6);
			List<Question> questions = Question.where("active = ? and category_id = ? ", true, cataleatoria);
			if(!questions.isEmpty()){
				int num = (int) (Math.random() * questions.size());
				res.redirect("/question/"+questions.get(num).get("id"));
				return "";
			}
			else{
				return "No hay preguntas cargadas";
			}
		});




		//Recibe una respuesta, la carga e informa si es correcta o no
		//VER SI OPCION PERTENECE A PREG QUE MANDE
		post("/answer" , (req,res) ->{
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Answer a= new Answer();
			a.set("user_id",currentUser.get("id"));
			a.set("option_id", bodyParams.get("id"));
			a.saveIt();
			Option o = Option.findById(a.get("option_id"));
			if(o!=null){
				if(o.getBoolean("correct")){
					String json = "{\"Respuesta\":true}";
					return json;
				}
				else{
					String json = "{\"Respuesta\":false}";
					return json;
				}
			}
			else{
				return "Respuesta invalida";
			}
		});

	}//end main


}//end class
