package trivia;

import trivia.User;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UserTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/triviavet_test", "root", "root");
      System.out.println("UserTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("UserTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }


  @Test
  public void validatePresenceOfParams() {
    User u = new User();
    assertEquals("A parametre can't be empty", u.isValid(), false);
  }


}
