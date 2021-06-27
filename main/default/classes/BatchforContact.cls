public class BatchforContact implements Database.Batchable<sObject>{

	//Start Method    
    public Database.QueryLocator start(Database.BatchableContext bc){
        
        return Database.getQueryLocator('SELECT id,name,Description from Contact');
    }
    
    //Execute method
    public void execute(Database.BatchableContext bc, List<Contact> lstContact){
        List<Contact> updateListCon = new List<Contact>();
        for(Contact objAcc:lstContact){
            if(STRING.ISNOTEMPTY(objAcc.Description)){
            //if(ISNULL(objAcc.Description)){
                objAcc.Description = 'Gopinath Reddy';
            updateListCon.add(objAcc);
            }
            
        }
        update updateListCon;
    }
    
    public void finish(Database.BatchableContext bc){
        
           AsyncApexJob asyncJob = [select Id,Status,NumberofErrors,JobItemsProcessed,TotalJobItems from AsyncApexJob where id=: bc.getJobId()];
		Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
        String[] emailAddress = new String[] {'gopinath.guttikonda@gmail.com'} ;
        mail.setToaddresses(emailAddress);
        mail.setSubject('Batch Status'+asyncJob.status);
        mail.setPlainTextbody('Number of Records Processed '+asyncJob.TotalJobItems+'Number of Failures'+asyncJob.NumberOfErrors);
        
        
        System.debug('My Execution is successful and Account description changed');
    }
}