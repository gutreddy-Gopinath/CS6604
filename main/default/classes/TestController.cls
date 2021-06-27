public class TestController {
    
    private final Account acct;
     List<Account> lstAcc; 
    //Created a constructor 
	public TestController(ApexPages.StandardController stdController) {
    this.acct = (Account)stdController.getRecord(); // Getting on going record 
    }
    
    public PageReference reconfirmEmail() {
        lstAcc =[select id,Test_Check__c from Account where id =: acct.id];
        lstAcc[0].Test_Check__c = true;
        update lstAcc[0];// Fetching the details of on going account and updating it.
     
        //Reloading the same page.
       // PageReference pr = new PageReference('https://gutreddy-dev-ed.lightning.force.com/lightning/r/Account/'+lstAcc[0].id+'/view');
        //return pr; 
        return null;
    }
    
    public PageReference messagedisplay(){
         //Reloading the same page.
         System.debug('My List:'+lstAcc[0].id);
        PageReference pr = new PageReference('https://gutreddy-dev-ed.lightning.force.com/lightning/r/Account/'+lstAcc[0].id+'/view');
        return pr; 
        
        
    }
}