public class DeleteUnacceptedQuotes {
	@invocableMethod
    public static void deleteQuotes(List <Id> lstOppIds){
        
        System.debug('My List of OppIds'+lstOppIds);
        List<Opportunity> lstOpp = [Select id from Opportunity where Opportunity.id IN :lstOppIds]; 
        System.debug('My List of Opp'+lstOpp);
       // List Quotes= [select id from Quotes where Opportunity.id :OppIds and Status != 'Accepted'];
        
        delete lstOpp;
        
    }    

}