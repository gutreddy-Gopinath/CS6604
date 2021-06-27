public class updateCheckBoxPlan {
    @AuraEnabled
	public static void updateCheck(){
        list<Account> Pl_list = new list<Account>();
        pl_list = [select id,Test_Check__c from Account Limit 1];
        Account p =new Account();
        p.id=pl_list[0].id;
        p.Test_Check__c=true;
        update p;
    }
}