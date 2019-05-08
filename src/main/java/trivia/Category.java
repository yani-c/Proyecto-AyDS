package trivia;

import org.javalite.activejdbc.Model;

public class Category extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("category_name");
	}

}
