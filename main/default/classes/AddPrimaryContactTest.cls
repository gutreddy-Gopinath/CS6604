@isTest
public class AddPrimaryContactTest {
    @testSetUp
    static void setup(){
        List<Account> lstAccounts = new List<Account>();
        for(integer i=0; i<50; i++){
            Account objAccount = new Account();
            objAccount.BillingState = 'NY';
            objAccount.Name ='NewYork Account'+i;
            lstAccounts.add(objAccount);
        }
        for(integer j=0; j<50; j++){
            lstAccounts.add(new Account(name='California Account'+j,BillingState ='CA'));
        }
        insert lstAccounts;
          
        }
     static testMethod void test(){
         Contact objContact = new Contact(Lastname='testContact');
         String state = 'CA';
         Test.startTest();
         AddPrimaryContact newInstance = new AddPrimaryContact(objContact,state);
         System.enqueueJob(newInstance); 
         Test.stopTest();
    }

}