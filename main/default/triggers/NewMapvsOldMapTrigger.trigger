trigger NewMapvsOldMapTrigger on Account (before insert,after insert,before update,after update, before delete, after delete) {
	
    for(Account Acc:trigger.new){
        
        if(trigger.isupdate){
       Account oldaccount = new Account();
        oldaccount = trigger.oldmap.get(Acc.id); // trigger old map to get old value(existing value) of the record 
        
        if(oldaccount.AccountSource !=Acc.AccountSource ){
            
            Acc.AccountSource = 'web';
           
            system.debug('uuuuuuuuuu'+userinfo.getName());
}


}
    }
}