@isTest
public class TestUpdate {
	@isTest
    public static void TestingCheckbox(){
        
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator']; 
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com', 
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');

        Account acc=new Account();
        
        acc.Name='Gopi';
        //acc.RecordTypeId='0122v000002KtA4AAK';
        //Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('CWS_Review_Account').getRecordTypeId(); 
        insert acc;
        Test.StartTest(); 

			ApexPages.StandardController sc = new ApexPages.StandardController(acc);
			TestController  obj = new TestController(sc);
        	obj.reconfirmEmail();

		Test.StopTest();
		
    }
   
}