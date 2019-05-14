package trivia;

import org.javalite.activejdbc.Model;

public class User extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("name", "password", "dni", "administrator");
	}


}
