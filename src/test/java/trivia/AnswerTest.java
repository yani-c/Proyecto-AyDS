package trivia;

import trivia.Answer;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class AnswerTest {

  @Before
  public void before(){
    if(!Base.hasConnection()) {
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      Base.openTransaction();
    }
    System.out.println("AnswerTest setup");
  }

  @After
  public void after(){
    System.out.println("AnswerTest tearDown");
    if(Base.hasConnection()){
      Base.rollbackTransaction();
      Base.close();
    }
  }

  @Test
  public void validatePresenceOfParams() {
    Answer a = new Answer();
    assertEquals("A parametre can't be empty", a.isValid(), false);
  }

}
