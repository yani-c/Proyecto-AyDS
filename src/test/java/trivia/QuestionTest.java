package trivia;

import trivia.Question;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class QuestionTest {

  @Before
  public void before(){
    if(!Base.hasConnection()){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      Base.openTransaction();
    }
    System.out.println("QuestionTest setup");
  }

  @After
  public void after(){
    System.out.println("QuestionTest tearDown");
    if(Base.hasConnection()){
      Base.rollbackTransaction();
      Base.close();
    }
  }

  @Test
  public void validatePresenceOfParams() {
    Question q = new Question();
    assertEquals("A parametre can't be empty", q.isValid(), false);
  }

}
