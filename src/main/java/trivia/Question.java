package trivia;
import java.util.*;
import org.javalite.activejdbc.Model;

public class Question extends Model {
	private int id;
	private ArrayList<Option> opciones;
	private String description;

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("id_cat", "description_q");
	}

}
