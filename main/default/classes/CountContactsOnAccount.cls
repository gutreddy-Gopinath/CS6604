public class CountContactsOnAccount {
    
    @future
    public static void countContactsOn(set<Id> setAccountId){
        List<Account> lstAcc = new List<Account>();
        lstAcc = [select id,Number_of_Contacts__c,(select id from Contacts) from Account where Id IN: setAccountId];
        for(Account objAcc: lstAcc){
            List<Contact> lstCon = objAcc.contacts;
            objAcc.Number_of_Contacts__c = lstCon.size();
            System.debug('Number of Contact:'+lstCon.size());
        }
        update lstAcc;
    }

}