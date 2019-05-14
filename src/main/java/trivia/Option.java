package trivia;

import org.javalite.activejdbc.Model;

public class Option extends Model {
	private int id;
	private String description;
	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("id_q", "description_o", "correct");
	}

}
