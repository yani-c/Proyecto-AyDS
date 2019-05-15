package trivia;
import java.util.*;
import org.javalite.activejdbc.Model;

public class Question extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("category_id", "description");
	}

}
