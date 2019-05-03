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
    }
}

