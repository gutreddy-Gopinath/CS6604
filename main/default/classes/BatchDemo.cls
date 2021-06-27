public class BatchDemo implements Database.Batchable<sObject>{

//Start Method    
    public Database.QueryLocator start(Database.BatchableContext bc){
       
        return Database.getQueryLocator('SELECT id,name from Account');
    }
   
    //Execute method
    public void execute(Database.BatchableContext bc, List<Account> lstAccount){
        List<Account> updateListAcc = new List<Account>();
        for(Account objAcc:lstAccount){
            objAcc.Description = 'Gopinath Guthikonda';
            updateListAcc.add(objAcc);
        }
        update updateListAcc;
    }
   
    public void finish(Database.BatchableContext bc){
        Database.executeBatch(new BatchforContact(), 20);
        System.debug('My Execution is successful and Account description changed');
    }
}