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
    if(!Base.hasConnection()){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      Base.openTransaction();
    }
    System.out.println("UserTest setup");
  }

  @After
  public void after(){
    System.out.println("UserTest tearDown");
    if(Base.hasConnection()){
      Base.rollbackTransaction();
      Base.close();
    }
  }

  @Test
  public void validatePresenceOfParams() {
    User u = new User();
    assertEquals("A parametre can't be empty", u.isValid(), false);
  }

}
