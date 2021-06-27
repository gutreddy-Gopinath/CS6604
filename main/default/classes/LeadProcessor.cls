global class LeadProcessor implements Database.Batchable<sObject> {
    
    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator( [select leadsource from Lead]);
    }
    global void execute(Database.BatchableContext bc, List<Lead> lstLead){
        for(Lead objLead: lstLead){
            objLead.LeadSource = 'Dreamforce';
        }
        update lstLead;
        
    }
    global void finish(Database.BatchableContext bc){   
    }
}