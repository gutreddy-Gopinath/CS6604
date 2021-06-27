@isTest
public class LeadProcessorTest {
    static testMethod void testMethod1(){
        List<Lead> lstLeads = new List<Lead>();
        for(integer i=0; i<200; i++){
            Lead objLead = new Lead();
            objLead.FirstName = 'Gopi';
            objLead.LastName = 'Reddy'+i;
            objLead.company = 'Ultra Posh'+i;
            //objLead.LeadSource = 'Deloitte'+i;
            lstLeads.add(objLead);
        }
         insert lstLeads;
        Test.startTest();
            LeadProcessor objLeadPrcr = new LeadProcessor();
            Database.executeBatch(objLeadPrcr);
        Test.stopTest();
    }

}