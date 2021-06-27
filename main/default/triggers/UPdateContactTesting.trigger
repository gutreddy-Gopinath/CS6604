trigger UPdateContactTesting on Contact (before update) {
    
     for(Contact newAcc: Trigger.new){
        newAcc.description = 'Gopi Updated it before insert';
     }
}