@isTest
public class TestUpdateParentAccount {
    @testSetUp
    static void setup(){
        List<Account> lstAccount = new List<Account>();
        lstAccount.add(new Account(name = 'Gopi Parent')); // Adding parent account 
        for(Integer i=0; i<100; i++){                      // Adding child accounts
            lstAccount.add(new Account(name = 'Gopi Child'+i));
        }
        insert lstAccount;
    }
    static testMethod void testQueueable(){
        Id parentId = [select id from Account where name='Gopi Parent'].id;
        List<Account> lstofAccount = [select id,name from Account where name like 'Gopi Child'];
        UpdateParentAccount newUpdate = new UpdateParentAccount(lstofAccount, parentId);
        
        Test.startTest();
        System.enqueueJob(newUpdate);
        test.stopTest();
        
    }

}