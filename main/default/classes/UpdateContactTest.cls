@isTest
public class UpdateContactTest {
   
	 @isTest static void contactTest(){
	Contact con = new Contact();
	con.LastName='Gopi';
	insert con;
        con.LastName='Gopinath';
        update con;
	}

}