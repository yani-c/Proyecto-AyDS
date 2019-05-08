package trivia;

import static spark.Spark.get;
import static spark.Spark.post;

import static spark.Spark.before;
import static spark.Spark.after;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;

import com.google.gson.Gson;
import java.util.Map;

 import java.util.List;

public class App
{
    public static void main( String[] args )
    {
      before((request, response) -> {
        Base.open();
      });

      after((request, response) -> {
        Base.close();
      });

      get("/hello/:name", (req, res) -> {
        return "hello" + req.params(":name");
      });


	//agregar para ver que haya usuarios antes de querer mostrarlos
	get("/users" , (req, res) ->{
		List<User> users = User.findAll();
		String u="";
		for(User i : users){
			u=u+i;
		}
		return u;
	});

	//carga usuario
      post("/users", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
        User user = new User();
	    user.set("dni", bodyParams.get("dni"));
		user.set("lastname", bodyParams.get("lastname"));
		user.set("name", bodyParams.get("name"));
        user.saveIt();

	

        res.type("application/json");

        return user.toJson(true);
      });

	//carga categoria
	 post("/categories", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
       	Category c = new Category();
	    c.set("category_name", bodyParams.get("category_name"));
        c.saveIt();

	res.type("application/json");

        return c.toJson(true);
      });

	//carga pregunta
	post("/questions", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
        Question q = new Question();
	    q.set("descrip_q", bodyParams.get("descrip_q"));
		q.set("id_cat", bodyParams.get("id_cat"));
        q.saveIt();
        res.type("application/json");

        return q.toJson(true);
      });

	//carga opcion
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
	
// intento de borrado.Todavia no anda
	post("/deleteuser", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
        User u = new User();
	u= User.findById("id_user");
	    u.delete();

	

        res.type("application/json");

        return u.toJson(true);
      });

        
    }
}

