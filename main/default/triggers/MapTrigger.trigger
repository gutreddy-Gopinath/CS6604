trigger MapTrigger on Account (before insert, before update, before delete, after insert, after update, after delete) {
List<Account> lstAccount = new List<Account>();
    lstAccount = Trigger.New;     //Fetching New Accounts
    for(Account Newacc:lstAccount){   // Iterating New Accounts
        Account oldAcc = new Account();  
        oldAcc = Trigger.oldMap.get(Newacc.id); //Fetching Old Account
        if(oldAcc.AccountSource != Newacc.AccountSource ){ //Checking the condition
            Newacc.AccountSource = 'Web';
        }
    }
}