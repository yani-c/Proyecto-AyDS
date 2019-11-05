package trivia;

import trivia.Option;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class OptionTest {

  @Before
  public void before(){
    if(!Base.hasConnection()){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      Base.openTransaction();
    }
    System.out.println("OptionTest setup");
  }

  @After
  public void after(){
    System.out.println("OptionTest tearDown");
    if(Base.hasConnection()){
      Base.rollbackTransaction();
      Base.close();
    }
  }


  @Test
  public void validatePresenceOfParams() {
    Option o = new Option();
    assertEquals("A parametre can't be empty", o.isValid(), false);
  }

}
