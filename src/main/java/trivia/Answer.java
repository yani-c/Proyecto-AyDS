package trivia;

import org.javalite.activejdbc.Model;

public class Answer extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("id_user","id_option","id_game");
	}

}
