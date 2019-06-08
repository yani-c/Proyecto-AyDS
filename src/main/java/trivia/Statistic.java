package trivia;

import org.javalite.activejdbc.Model;

public class Statistic extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("user_id");
	}

}
