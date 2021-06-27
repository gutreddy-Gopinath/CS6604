@isTest
public class AccountProcessorTest {
    public static testMethod void TestAccountProcessorTest(){
        Account acc = new Account();
        acc.Name = 'Gopi Test';
        insert acc;
        
        Contact con = new contact();
        con.LastName = 'Reddy';
        con.AccountId = acc.Id;
        insert con;
        
        Set<Id> setAccId = new Set<Id>();
        setAccId.add(acc.Id);
        
        Test.startTest();
           AccountProcessor.countContacts(setAccId);
        Test.stopTest();
        
        Account accn = [select id, Number_of_Contacts__c from Account];
        System.assertEquals(1, accn.Number_of_Contacts__c, 'You failed here');
        
    }

}