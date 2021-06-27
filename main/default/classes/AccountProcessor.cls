public class AccountProcessor {
    @Future
    public static void countContacts(Set<Id> setAccountIds){
        
        List<Account> newLstAccIds = [select id, Number_of_Contacts__c, (select id from contacts) from Account where id =: setAccountIds];
        for( Account acc: newLstAccIds){
            List<Contact> lstContacts = acc.Contacts;
            acc.Number_of_Contacts__c = lstContacts.size();
        }
        update newLstAccIds;
    }

}