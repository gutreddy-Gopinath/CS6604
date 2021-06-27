trigger UpdateContact on Contact (before insert,before update) {
    
    Set<Id> setIds = new Set<Id>();
    for(Contact NewCon:Trigger.New){
    //NewCon.Description='Updaeted Value';
    setIds.add(NewCon.OwnerId);
    }
    
    List<User> lstUsers = [select id,ManagerId from User where Id IN: setIds];
    //Create a map of users to Managers
    map<Id,Id> mapUserIdToManagerId = new map<Id,Id>();
    for (user u : lstusers){
        mapUserIdToManagerId.put(u.id, u.ManagerId);
    }
    //updating Contact's Manager Id with Users Manager Id 
    for(Contact con: Trigger.new){
        con.ReportsToId = mapUserIdToManagerId.get(con.Id);
    }
}