public class UpdateParentAccount {
    private List<Account> lstAccount;
    private Id parentId;
    
    public UpdateParentAccount(List<Account> records, Id id){
        this.lstAccount = records;
        this.parentId = id;
    }
    public void execute(QueueableContext context){
        for(Account objAccount : lstAccount){
            objAccount.parentId = parentId;
        }
        update lstAccount;
    }

}