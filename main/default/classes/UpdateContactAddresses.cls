global class UpdateContactAddresses implements Database.Batchable<sObject>{
    
    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator(
            'SELECT ID, BillingStreet, BillingCity, BillingState, ' +
            'BillingPostalCode, (SELECT ID, MailingStreet, MailingCity, ' +
            'MailingState, MailingPostalCode FROM Contacts) FROM Account ' + 
            'Where BillingCountry = \'USA\''
        );
    }
    global void execute (Database.BatchableContext bc, List<Account> lstAccount){
        List<Contact> contacts = new List<Contact>();
        for (Account account : lstAccount) {
            for (Contact contact : account.contacts) {
                contact.MailingStreet = account.BillingStreet;
                contact.MailingCity = account.BillingCity;
                contact.MailingState = account.BillingState;
                contact.MailingPostalCode = account.BillingPostalCode;
                // add contact to list to be updated
                contacts.add(contact);
                // increment the instance member counter
               // recordsProcessed = recordsProcessed + 1;
            }
        }
        update contacts;
    }
    global void finish(Database.BatchableContext bc){
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, 
            JobItemsProcessed,
            TotalJobItems, CreatedBy.Email
            FROM AsyncApexJob
            WHERE Id = :bc.getJobId()];
        //EmailUtils.sendMessage(Job);
        //EmailUtils.sendMessage(job);
    }

}