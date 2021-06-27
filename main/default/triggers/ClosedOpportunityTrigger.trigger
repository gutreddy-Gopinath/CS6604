trigger ClosedOpportunityTrigger on Opportunity (before insert) {

List<Task> Tasklist = new List<Task>();

  for(opportunity opp: Trigger.new){
     {
        if(opp.StageName=='Closed Won')
        {
            Task t= new Task();
            t.Subject='Follow up Task';
            t.WhatId=opp.Id;
            
            Tasklist.add(t);
            
        }
        
    }
    
    if(Tasklist.size() > 0){
        insert Tasklist ;
    
  }
}
}