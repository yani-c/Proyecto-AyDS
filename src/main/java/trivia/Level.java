package trivia;

import org.javalite.activejdbc.Model;

public class Level extends Model {


    static{//para que no permita cargar vacios estos campos
		validatePresenceOf("level","category_id", "user_id");
	}

}
