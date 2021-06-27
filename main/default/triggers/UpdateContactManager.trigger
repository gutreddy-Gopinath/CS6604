trigger UpdateContactManager on Contact (before insert,before update) {
   
    set<id> setids = new set<id>();
    List<Contact> lstContact = new List<Contact>();
    lstContact = trigger.new;
    if(lstContact.size() > 0){
    for(Contact con : trigger.new){
       setids.add(con.OwnerId);
        system.debug('Look for setids: '+setids);
           }  
    }
     List<User> lstusers = [select id,ManagerId from user where id IN:setids];
    system.debug('Size of list users: '+lstusers.size());
     map<Id,Id> mapUserIdToManagerId = new map<Id,Id>();
    if(lstusers.size() >0){
     for (user u : lstusers){
      mapUserIdToManagerId.put(u.id, u.ManagerId);
         system.debug('check for Manager id map: '+ mapUserIdToManagerId);
         system.debug('Check map keys: '+ mapUserIdToManagerId.keyset());
         system.debug('Check map keys: '+ mapUserIdToManagerId.values());
         
        }
    }
        if(lstContact.size() > 0){
        for(contact c: trigger.new){
           // system.debug('Check for values: '+ c
            if(!mapUserIdToManagerId.isEmpty()){
            if(mapUserIdToManagerId.containskey(c.OwnerId)){
                if(mapUserIdToManagerId.get(c.OwnerId) != null){
            c.Manager__c = mapUserIdToManagerId.get(c.OwnerId);
            system.debug('Print manager value: '+mapUserIdToManagerId.get(c.Id));
        }
            }}
        }}
         
}