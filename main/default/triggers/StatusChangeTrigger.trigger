trigger StatusChangeTrigger on Account (before update) {
    
    List<Account> lstAccount = new List<Account>();
    List<Account> lstupdateAccount = new List<Account>();
    lstAccount = Trigger.new;
   // for(Account newAccount : Trigger.new){
    for(Account newAccount: lstAccount){
        Account OldAcc = new Account();
        OldAcc = Trigger.OldMap.get(newAccount.id);
        Boolean IsOldAccountStatusBad = OldAcc.Test_Status__c.equals('Bad');
        Boolean IsNewAccountStatusBad = newAccount.Test_Status__c.equals('Bad');
        
        if(IsOldAccountStatusBad && IsNewAccountStatusBad){
            newAccount.Both_values_are_same__c = true;
            newAccount.Both_values_are_different__c = false;
            
        }
        else{
            newAccount.Both_values_are_different__c = true;
            newAccount.Both_values_are_same__c = false;
        }
       // lstupdateAccount.add(newAccount);
    }
   // update lstupdateAccount;

}