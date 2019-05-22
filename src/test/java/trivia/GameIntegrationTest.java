package trivia;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static spark.Spark.after;
import static spark.Spark.before;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Base64;


import org.junit.After;
import org.junit.Before;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import trivia.User;
import trivia.Category;
import spark.utils.IOUtils;

import spark.Spark;

import java.io.OutputStreamWriter;

import com.google.gson.Gson;



public class GameIntegrationTest {
    private static int PORT = 4567;
	private static String ADMIN_USERNAME = "admin";
    private static String ADMIN_PASSWORD = "admin";
	private static String ADMIN_DNI="11111111";
	
	private static String CATEGORY = "Category";
	private static String DESCRIPTION="Question";

    @AfterClass
    public static void tearDown() {
        Spark.stop();
    }

    @After
    public void clear() {
		Base.close();
    }


    @Before
    public void beforeTest() {
		Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_dev", "root", "root");
    }

    @BeforeClass
    public static void setup() {
        App.main(null);

        Spark.awaitInitialization();

		// Create an admin user to log into system using Basic Auth before run the test
        Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_dev", "root", "root");
        User u = User.findFirst("name= ?",ADMIN_USERNAME);
		if(u==null){
			User us= new User();
		    us.set("name", ADMIN_USERNAME);
		    us.set("password", ADMIN_PASSWORD);
			us.set("dni", ADMIN_DNI);
			us.set("administrator", true);
		    us.saveIt();
		}
        Base.close();
    }


	
    @Test
    public void canCreateQuestion() {
		Question q= Question.findFirst("description=?",DESCRIPTION);
		 if(q==null){
			  String category_id= "1";//le pongo el id de una de las creadas en "insertDB.sql"
			  User u= User.findFirst("name =?",ADMIN_USERNAME);
			  String user_id=u.get("id").toString();

			  Map<String, String> parameters = new HashMap<>();
			  parameters.put("description", DESCRIPTION);
			   parameters.put("category_id", category_id);
			  parameters.put("user_id", user_id);
			  parameters.put("options", "[{description:OptionONE, correct:false},{description:OptionTWO,correct:true},{description:OptionTHRE,correct:false},{description:OptionFOUR, correct:false}]");
			  UrlResponse response = doRequest("POST", "/questions", parameters);
			  Map<String, Object> jsonResponse = new Gson().fromJson(response.body, Map.class);

			  assertNotNull(response);
			  assertNotNull(response.body);
			  assertEquals(200, response.status);
			  assertEquals(jsonResponse.get("description"), DESCRIPTION);
			  assertEquals(jsonResponse.get("active"), true);
		 }

    }


    @Test
    public void canPlay() {
			Map<String, String> parameters = new HashMap<>();
			Question q= Question.findFirst("description =?",DESCRIPTION);
		Option o = Option.findFirst("description =?","OptionTWO");
			 parameters.put("id",o.get("id").toString());
		  UrlResponse response = doRequest("POST", "/answer", parameters);
		  Map<String, Object> jsonResponse = new Gson().fromJson(response.body, Map.class);

			assertNotNull(response);
		  assertNotNull(response.body);
		  assertEquals(200, response.status);
		assertEquals(jsonResponse.get("Respuesta"), true);

    }


    private static UrlResponse doRequest(String requestMethod, String path, Map body) {
        UrlResponse response = new UrlResponse();

        try {
            getResponse(requestMethod, path, body, response);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response;
    }

    private static void getResponse(String requestMethod, String path, Map body, UrlResponse response)
            throws MalformedURLException, IOException, ProtocolException {
      URL url = new URL("http://localhost:" + PORT + path);

      // This is the point where the connection is opened.
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
 	// Set User to get Authorized request
      String userCredentials = ADMIN_USERNAME + ":" + ADMIN_PASSWORD;
      String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userCredentials.getBytes()));
      connection.setRequestProperty("Authorization", basicAuth);

      // set connection output to true (needs to be true since this request
      // is carrying an input (response) body.)
      connection.setDoOutput(true);

      // set connection verb to user
      connection.setRequestMethod(requestMethod);

      // write parameters into connection
      OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
      writer.write(body.toString());
      writer.close();

      // Open communications link (network traffic occurs here).
      connection.connect();

      //  Retrieve the response body as an InputStream.
      String res = IOUtils.toString(connection.getInputStream());

      // Build the response to return
      response.body = res;
      response.status = connection.getResponseCode();
      response.headers = connection.getHeaderFields();
    }

    // Represent a Response
    private static class UrlResponse {
      public Map<String, List<String>> headers;
      private String body;
      private int status;
    }
	

}