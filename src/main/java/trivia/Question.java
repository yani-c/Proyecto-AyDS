package trivia;
import java.util.*;
import org.javalite.activejdbc.Model;

public class Question extends Model {

	static{//para que no permita cargar vacios estos campos
		validatePresenceOf("category_id", "description");
	}
	
	public boolean comprobateActive (){

	    if(this!=null){
		    List<Option> options= Option.where("question_id = ?", this.get("id"));
            int correctas = 0;
            int totales = 0;

		    for(Option o : options){
                
                if ( o.getBoolean("correct")) {
                    correctas ++;                    
                }
                totales ++;
		    }
        return ((correctas ==1)&&(totales == 4));
        }
        
       return false;
     }

}
