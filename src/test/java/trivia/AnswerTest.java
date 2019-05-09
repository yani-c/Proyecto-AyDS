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
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/triviavet_test", "root", "root");
      System.out.println("AnswerTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("AnswerTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }


  @Test
  public void validatePresenceOfParams() {
    Answer a = new Answer();
    assertEquals("A parametre can't be empty", a.isValid(), false);
  }



}
