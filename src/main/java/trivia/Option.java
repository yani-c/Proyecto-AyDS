package trivia;

import org.javalite.activejdbc.Model;

public class Option extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("id_q", "descrip_o", "correct");
	}

}
