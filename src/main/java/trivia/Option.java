package trivia;

import org.javalite.activejdbc.Model;

public class Option extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("question_id", "description", "correct");
	}

}
