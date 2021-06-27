public with sharing class AccountView {

    @auraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [select id,Name,Phone from Account Limit 10];

    }
}
