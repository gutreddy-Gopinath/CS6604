trigger UpdateOpp on Account (before update) {
    List<Account> lstAcc = new List<Account>(); //Collection
    List<Opportunity> lstOpp = new List<Opportunity>(); //Collection
   
    lstAcc = Trigger.new; // Assignment
    for(Account newAcc : lstAcc){  //For Loop
        System.debug('My Account ----:'+newAcc);
        List<Opportunity> newOpp = [select id,name,description from Opportunity where AccountId =: newAcc.id ]; //Collection and SOQL
        for(Opportunity newFinalOpp: newOpp){ //For Loop
            System.debug('My Opp ----:'+newFinalOpp);
            newFinalOpp.description = 'Limit of Location exceeded 10';  //Fields Assignment
            lstOpp.add(newFinalOpp);  //List addition - Collection
        } 
    }
    update lstOpp; //Data base udpate
}