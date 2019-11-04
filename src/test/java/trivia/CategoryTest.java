package trivia;

import trivia.Category;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CategoryTest {

  @Before
  public void before(){
    if(!Base.hasConnection()){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      Base.openTransaction();
    }
    System.out.println("CategoryTest setup");
  }

  @After
  public void after(){
    System.out.println("CategoryTest tearDown");
    if(Base.hasConnection()){
      Base.rollbackTransaction();
      Base.close();
    }
  }

  @Test
  public void validatePresenceOfParams() {
    Category c = new Category();
    assertEquals("A parametre can't be empty", c.isValid(), false);
  }

}
