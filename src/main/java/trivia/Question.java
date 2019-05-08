package trivia;

import org.javalite.activejdbc.Model;

public class Question extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("id_cat", "descrip_q");
	}

}
