package trivia;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.halt;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.options;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import org.javalite.activejdbc.Base;


class QuestionParam
{
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

  //usuario corriente
  static User currentUser;
  //niveles posibles
  static int[] level = {0,2,6,12,20,30,42,56,72,90,110};

  public static void main( String[] args ){

    before((request, response) -> {
      if(!Base.hasConnection()){
        Base.open();
      }
      if (request.requestMethod() != "OPTIONS"){
        System.out.println(request.headers());
        System.out.println("autorizado?"+request.headers("Authorization"));
        String headerToken = (String) request.headers("Authorization");
        if (headerToken == null || headerToken.isEmpty() || !BasicAuth.authorize(headerToken)){
          halt(401);
        }
        currentUser = BasicAuth.getUser(headerToken);
      }
    });

    after((request, response) -> {
      if (Base.hasConnection()) {
        Base.close();
      }
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      response.header("Access-Control-Allow-Headers","Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin");
    });

    options("/*", (req, response) -> {
      return "OK";
    });

//------------------------------------GET------------------------------------
    //retorna el ranking del currentUser
    get("/rank" , (req, res) ->{
      List<User> users = User.findAll();
      for(User u : users){
        if(u.getInteger("score") == null){
          u.set("score", 0);
        }
      }
      String aux="{\"cant\": \""+users.size()+"\", \"users\": {";
      int i=1;
      users= User.findAll().limit(10).orderBy("score desc");
      for(User u: users){
        aux=aux+"\"user"+i+"\": {\"username\": \""+u.get("username")+"\",";
        aux=aux+"\"dni\": \""+u.getInteger("dni")+"\",\"score\": \""+u.getInteger("score")+"\"}";
        i++;
        if(i<=users.size()){
          aux=aux+",";
        }
      }
      aux=aux+"}}";
      res.type("application/json");
      return aux;
    });

    //retorna todas las pregunta
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

    //retorna todas las categorias
    get("/categories" , (req, res) ->{
      List<Category> categories = Category.findAll();
      if(!categories.isEmpty()){
        String aux="{";
        int i=1;
        for(Category c : categories){
          aux=aux+"\"Categoria"+i+"\": "+c.toJson(true,"category_name","id", "correct","incorrect");
          i++;
          if(i<categories.size()+1){
            aux=aux+",";
          }
        }
        res.type("application/json");
        aux=aux+"}";
        return aux;
      }
      else{
        return "{\"Error\": No hay categorias cargadas. Nada para mostrar}";
      }
    });

    //retorna una categoria aleatoria
    get("/randomCategory" , (req, res) ->{
      List<Category> categories = Category.findAll();
      if(!categories.isEmpty()){
        int random= (int) (Math.random() * categories.size());
        String c="{\"cat\":\""+categories.get(random).get("id")+"\",\"name\": \""+categories.get(random).get("category_name")+"\"}";
        res.type("application/json");
        return c;
      }
      else{
        return "{\"cat\":\"null\"}";
      }
    });

    //retorna un usuario dado su id
    get("/user/:id" , (req, res) ->{
      User u = User.findById(req.params(":id"));
      if(u!=null){
        String aux= u.toJson(true);
        res.type("application/json");
        return aux;
      }
      return "Error: No se encontro la persona";
    });

    //retorna las estadisticas de un usuario dado su dni
    get("/users/:dni" , (req, res) ->{
      User u = User.findFirst("dni=?",req.params(":dni"));
      if(u!=null){
        Statistic s= new Statistic();
        List<Category> categories= Category.findAll();
        String aux="{\"cant\": \""+categories.size()+"\", \"cats\": {";
        int i=1;
        for(Category c : categories){
          s=Statistic.findFirst("user_id= ? and category_id =?", u.get("id"), c.getInteger("id"));
          if(s==null){
            s= new Statistic();
            s.set("user_id", u.get("id"));
            s.set("category_id",c.getInteger("id"));
            s.set("correct", 0);
            s.set("incorrect", 0);
            s.saveIt();
          }
          aux=aux+"\"cat"+i+"\": {\"nombre\": \""+c.get("category_name")+"\",";
          aux=aux+"\"correct\": \""+s.getInteger("correct")+"\",\"incorrect\": \""+s.getInteger("incorrect")+"\"}";
          i++;
          if(i<=categories.size()){
            aux=aux+",";
          }
        }
        aux=aux+"}}";
        res.type("application/json");
        return aux;
      }
      return "{\"Error\": \"No se encontro al usuario\"}";
    });

    //retorna una categoria dado su id
    get("/category/:id" , (req, res) ->{
      Category c  = Category.findById(req.params(":id"));
      if(c!=null){
        String aux= c.toJson(true);
        res.type("application/json");
        return aux;
      }
      return "Error: No se encontro la categoria";
    });

    //retorna una pregunta y sus opciones dado su id
    get("/question/:id" , (req, res) ->{
      Question q = Question.findById(req.params(":id"));
      if(q!=null){
        if(q.getBoolean("active")){
          List<Option> options= Option.where("question_id = ?", req.params(":id"));
          String aux= (q.toJson(true,"id","description", "category_id")) + "\n";
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

    //retorna todas las respuestas del currentUser
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

    //retorna todas las preguntas de una categoria
    get("/questions/:id" , (req, res) ->{
      List<Question> questions = Question.where("category_id=?",req.params(":id"));
      if(!questions.isEmpty()){
        String aux="{";
        for(int i=0;i<questions.size();i++){
          aux=aux+"\"question"+i+"\":"+questions.get(i).toJson(true);
          if(i<questions.size()-1){
            aux=aux+",";
          }
        }
        aux=aux+"}";
        res.type("application/json");
        System.out.println("es "+aux);
        return aux;
      }
      else{
        return "Error: No hay respuestas cargadas. Nada para mostrar";
      }
    });

    //retorna las estadisticas del currentUser, por categoria
    get("/statistics" , (req,res) ->{
      Statistic s= new Statistic();
      List<Category> categories= Category.findAll();
      String aux="{\"cant\": \""+categories.size()+"\", \"cats\": {";
      int i=1;
      for(Category c : categories){
        s=Statistic.findFirst("user_id= ? and category_id =?", currentUser.get("id"), c.getInteger("id"));
        if(s==null){
          s= new Statistic();
          s.set("user_id", currentUser.get("id"));
          s.set("category_id",c.getInteger("id"));
          s.set("correct", 0);
          s.set("incorrect", 0);
          s.saveIt();
        }
        aux=aux+"\"cat"+i+"\": {\"nombre\": \""+c.get("category_name")+"\",";
        aux=aux+"\"correct\": \""+s.getInteger("correct")+"\",\"incorrect\": \""+s.getInteger("incorrect")+"\"}";
        i++;
        if(i<=categories.size()){
          aux=aux+",";
        }
      }
      aux=aux+"}}";
      res.type("application/json");
      return aux;
    });

    //retorna las estadisticas globales del currentUser
    get("/globalStatistics" , (req,res) ->{
      List<Statistic> stats= Statistic.where("user_id = ?", currentUser.get("id"));
      int corrects=0;
      int incorrects=0;
      for(Statistic s : stats){
        corrects=corrects+s.getInteger("correct");
        incorrects=incorrects+s.getInteger("incorrect");
      }
      String aux="{\"correct\":\""+corrects+"\", \"incorrect\":\""+incorrects+"\"}";
      res.type("application/json");
      return aux;
    });

    //retorna la cantidad de veces que se repondio correcta e incorrectamente una pregunta
    get("/statisticsQuestion/:id", (req,res) ->{
      Question q= Question.findById(":id");
      res.type("application/json");
      String c="{\"corrects\":\""+q.getInteger("correct")+"\", \"incorrects\":\""+q.getInteger("incorrect")+"\"}";
      return c;
    });

    //retorna el puntajje del currentUser
    get("/score", (req,res) ->{
      User u = User.findById(currentUser.get("id"));
      if(u.getInteger("score") == null){
        u.set("score", 0);
      }
      res.type("aplication/json");
      String aux= "{\"score\":\""+u.getInteger("score")+"\"}";
      return aux;
    });

    //retorna el nivel del currentUser en cada categoria
    get("/level", (req,res) ->{
      List<Level> lvl= Level.where("user_id = ?", currentUser.get("id"));
      if (lvl.isEmpty()){
        List<Category> cat = Category.findAll();
        for (Category c: cat){
          Level l = new Level();
          l.set("level",0);
          l.set("user_id",currentUser.get("id"));
          l.set("category_id",c.getInteger("id"));
          l.saveIt();
          l.reset();
        }
   	    lvl= Level.where("user_id = ?", currentUser.get("id"));
      }
      String aux ="{";
      int i =1;
      for (Level l: lvl){
        Category c = Category.findById(l.getInteger("category_id"));
        aux = aux+"\"c"+i+"\":{\"name\":\""+c.getString("category_name")+"\",\"level\":\""+l.getInteger("level")+"\"}";
        i++;
        if(i<=lvl.size()){
          aux=aux+",";
        }
      }
      aux =aux+"}";
      return aux;
    });

//------------------------------------POST------------------------------------

    //carga un usuario
    post("/users", (req, res) -> {
      Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      User user = new User();
      user.set("dni", bodyParams.get("dni"));
      user.set("password", bodyParams.get("password"));
      user.set("username", bodyParams.get("username"));
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
      c.set("correct",0);
      c.set("incorrect",0);
      c.saveIt();
      res.type("application/json");
      return c.toJson(true);
    });

    //carga una pregunta y sus opciones
    post("/questions", (req, res) -> {
      System.out.println("probando cargar pregunta");
      Gson g = new Gson();
      QuestionParam bodyParams = g.fromJson(req.body(), QuestionParam.class);
      Question question = new Question();
      question.set("description", bodyParams.description);
      question.set("category_id", bodyParams.category_id);
      question.set("user_id",currentUser.get("id"));
      question.set("active", false);
      question.set("correct",0);
      question.set("incorrect",0);
      question.save();
      System.out.println("pregunta lista");
      for(OptionParam item: bodyParams.options) {
        Option option = new Option();
        option.set("description", item.description).set("correct", item.correct);
        question.add(option);
      }
      question.set("active", question.comprobateActive());
      question.saveIt();
      String json= question.toJson(true);
      System.out.println("listoo");
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
        u.set("username", bodyParams.get("username"));
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

    //login para la aplicacion del celular
    post("/login", (req,res) -> {
      res.type("application/json");
      return currentUser.toJson(true);
    });

    //login para la pagina web
    post("/loginAdmin", (req,res) -> {
      if(!currentUser.getBoolean("administrator")){
        System.out.println("NOOOOOOO");
        currentUser=null;
        halt(401);
      }
      System.out.println("SIIIIIIIII");
      return currentUser.toJson(true);
    });

    //logout
    post("/logout", (req,res) -> {
      currentUser=null;
      return "";
    });

    //game: elige una pregunta aleatoriamente y redirecciona a mostrarla
    post("/game" , (req,res) ->{
      Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      List<Question> questions = Question.where("active = ? and category_id = ? ", true, bodyParams.get("category_id"));
      if(!questions.isEmpty()){ //si tengo preguntas
        //saco las respuestas correctas del usuario
        List<Answer> resp = Answer.where("user_id= ? and correct= ?", currentUser.get("id"), true);
        List<Question> pregResp = new ArrayList<Question>();
        for(int i=0;i<resp.size();i++){
          Option o = Option.findById(resp.get(i).getInteger("option_id"));
          pregResp.add(Question.findById(o.getInteger("question_id")));
        }
        List<Question> qqq = new ArrayList<Question>();
        for(int i=0;i<questions.size();i++){
          boolean b= true;
          for(int j=0;j<pregResp.size();j++){
            if(pregResp.get(j).getInteger("id") == questions.get(i).getInteger("id")){
              b=false;
            }
          }
          if(b){
            qqq.add(questions.get(i));
          }
        }
        if(!qqq.isEmpty()){ //si tengo preguntas que no respondio bien todavia
          int num = (int) (Math.random() * qqq.size());
          Question q = qqq.get(num); //sacar de questionNUEVA
          List<Option> options= Option.where("question_id = ?", q.get("id"));
          String aux=  "{\"Found\": true,\"Pregunta\":"+ q.toJson(true,"id","description", "category_id");
          //aux= aux+", \"Opciones\": {\"";
          int i=1;
          for(Option o : options){
            aux= aux+", \"Opcion"+i+"\" : "+o.toJson(true,"id","description");
            i++;
          }
          aux=aux+"}";
          res.type("application/json");
          return aux;
        }
        return "{\"Found\": false, \"Pregunta\":\"No-Question \", \"Opcion1\":\"No-Option1\", \"Opcion2\":\"No-Option2 \",\"Opcion3\":\"No-Option3 \",\"Opcion4\":\"No-Option4\"}";
      }
      else{
        return"{\"Found\": false, \"Pregunta\":\"No-Question \", \"Opcion1\":\"No-Option1\", \"Opcion2\":\"No-Option2 \",\"Opcion3\":\"No-Option3 \",\"Opcion4\":\"No-Option4\"}";
      }
    });

    //hacer metodo que mire las estadisticas por categoria, si llega a 10 en x categoria, subirle un nivel.
    //Este metodo se debe ejecutar siempre despues de responder

    //Recibe una respuesta, la carga e informa si es correcta o no
    post("/answer" , (req,res) ->{
      Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      Answer a= new Answer();
      Option o= Option.findById(bodyParams.get("id"));
      Question q= Question.findById(o.getInteger("question_id"));
      Category c= Category.findById(q.getInteger("category_id"));
      a.set("user_id",currentUser.get("id"));
      a.set("option_id", o.getInteger("id"));
      a.set("correct", o.getBoolean("correct"));
      a.saveIt();
      Statistic s= Statistic.findFirst("user_id = ? and category_id = ?",currentUser.get("id"),q.getInteger("category_id"));
      User u= User.findById(currentUser.get("id"));
      if(s==null){
        s= new Statistic();
        s.set("user_id", currentUser.get("id"));
        s.set("category_id",q.getInteger("category_id"));
        s.set("correct", 0);
        s.set("incorrect", 0);
        u.set("score", 0);
      }
      String json;
      if(o!=null){
        if(q.getInteger("correct")==null){
          q.set("correct",0);
          if(q.getInteger("incorrect")==null){
            q.set("incorrect",0);
          }
        }
        if(o.getBoolean("correct")){
          c.set("correct",c.getInteger("correct")+1);
          q.set("correct",q.getInteger("correct")+1);
          s.set("correct",s.getInteger("correct")+1);
          u.set("score", u.getInteger("score")+10);
          s.saveIt();
          q.saveIt();
          u.saveIt();
          Statistic aux = Statistic.findFirst("user_id = ? and category_id = ?",currentUser.get("id"), q.getInteger("category_id"));
          Level l = Level.findFirst("user_id=? and category_id=?", currentUser.get("id"),q.getInteger("category_id"));
          if (l==null){
            l = new Level();
            l.set("level",0);
            l.set("user_id",currentUser.get("id"));
            l.set("category_id",q.getInteger("category_id"));
            l.saveIt();
          }
          for (int i=0; i<level.length ;i++){
            if (level[i]>aux.getInteger("correct") ){
              l.set("level",i-1);
              l.saveIt();
              i=level.length;
            }
          }
          json = "{\"Respuesta\":true}";
        }
        else{
          c.set("incorrect",c.getInteger("incorrect"+1));
          q.set("incorrect",q.getInteger("incorrect")+1);
          s.set("incorrect", s.getInteger("incorrect")+1);
          if (u.getInteger("score")>0){
            u.set("score", u.getInteger("score")-10);
        	}
          s.saveIt();
          q.saveIt();
          u.saveIt();
          json = "{\"Respuesta\":false}";
        }
        System.out.println("Esta preg tiene correctas:"+q.getInteger("correct"));
        System.out.println("Esta preg tiene incorrectas:"+q.getInteger("incorrect"));
        return json;
      }
      else{
        return "Respuesta invalida";
      }
    });

  }//end main

}//end class
