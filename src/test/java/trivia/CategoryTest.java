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
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      System.out.println("CategoryTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("CategoryTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }


  @Test
  public void validatePresenceOfParams() {
    Category c = new Category();
    assertEquals("A parametre can't be empty", c.isValid(), false);
  }



}
