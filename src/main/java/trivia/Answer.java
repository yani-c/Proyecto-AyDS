package trivia;

import org.javalite.activejdbc.Model;

public class Answer extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("user_id","option_id","game_id");
	}

}
