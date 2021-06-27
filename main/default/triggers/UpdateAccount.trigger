trigger UpdateAccount on Account (before update, before insert,before delete, after update, after insert, after delete) {
// key  //Name            //Object (//Trigger events)
    
    //Context Variables
    if(Trigger.isINsert) {
        if(Trigger.isBefore){
            System.debug('Insert Before');
        }
        if(Trigger.isAfter){
            System.debug('Insert After');
        }
    }
    
    if(Trigger.isInsert && Trigger.isBefore){
        System.debug('Before insert');
    }
    
    
    if(Trigger.isUpdate && Trigger.isBefore){
        System.debug('Before update');
        for(Account newAcc: Trigger.new) {
            System.debug('Old Value:'+Trigger.OldMap.get(newAcc.id).Test_Status__c);
        }
    }
    
    
    
    
}