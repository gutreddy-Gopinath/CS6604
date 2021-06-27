public with sharing class BatchOppDateUpdate implements Database.Batchable<sObject>, Database.AllowsCallouts{

    List<Opportunity> listOpp = new List<Opportunity>();
    List<Opportunity> listFinalOpp = new List<Opportunity>();
    
    public List<Opportunity> start(Database.BatchableContext context){
        listOpp = [select id,Dummy_Date__c,CloseDate from Opportunity where Dummy_Date__c=null ];
        return listOpp;
    }
    
    public void execute(Database.BatchableContext oBatchContext, List<Opportunity> listOpportunity){
        for(Opportunity objOpp : listOpportunity){
            if(objOpp.CloseDate != null){
                objOpp.Dummy_Date__c = objOpp.CloseDate;
                listFinalOpp.add(objOpp);
            }
        }
        if(!listFinalOpp.isEmpty()){
            update listFinalOpp;
            System.debug('My Final List:'+listFinalOpp);
        }
        
    }
    
    public void finish(Database.BatchableContext oBatchContext){
        Savepoint spObjBatchContext; /*  This is used for having savepoint on database before updation*/        
        spObjBatchContext = Database.setSavepoint();/* Creating Save point before update*/      
    }
}