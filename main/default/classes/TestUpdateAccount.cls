@isTest
public class TestUpdateAccount { //Class
	@isTest
    
    static void testAccountdescription(){
        
        Account acc =new Account(); //
        acc.Name = 'Gopinath';
        Test.startTest();
        insert acc;
        Test.StopTest();
        
        Account objAcc = [select id,description from Account where Name='Gopinath' LIMIT 1];
        
        System.assertEquals('Gopi Updated it before insert', objAcc.Description);
        
    }
}