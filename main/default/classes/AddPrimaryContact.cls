public class AddPrimaryContact implements queueable {
    private Contact objCon;
    //private List<Account> lstAccount;
    private String state;
    
    public AddPrimaryContact(Contact con, String newState){
        this.objCon = con;
        this.state = newState;
    }
    
    public void execute(QueueableContext context){
        List<Account> lstAccount = [select id, Name from Account where BillingState =: state LIMIT 200];
        List<Contact> lstContact = new List<Contact>();
        for(Account objAcc : lstAccount){
            contact newObjCon = objCon.clone(false,false,false,false);
            objCon.AccountId = objAcc.Id;
            lstContact.add(newObjCon);
        }
        if(lstContact.size()>0){
            insert lstContact;
        }
        
    }

}