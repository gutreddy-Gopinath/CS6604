@isTest
public class ContactManagerTestClass {

    @istest
public static void isTestmethod(){
       
    //UserRole r = new UserRole(DeveloperName = 'MyCustomRole', Name = 'My Role');
     //insert r;
  user m = new user();
     //u.ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id;
     m.ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id;
     m.LastName = 'last';
     m.Email = 'puser000@amamama.com';
     m.Username = 'puser000@amamama.com' + System.currentTimeMillis();  
     m.Alias = 'alias';
     //m.ManagerId = u.id;
     m.TimeZoneSidKey = 'America/Los_Angeles';
     m.EmailEncodingKey = 'UTF-8';
     m.LanguageLocaleKey = 'en_US';
     m.LocaleSidKey = 'en_US';
     //u.UserRoleId = r.Id;
    // u.Name='Testuser';
     insert m;
     
     user u = new user();
     //u.ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id;
     u.ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id;
     u.LastName = 'last';
     u.Email = 'puser000@amamama.com';
     u.Username = 'puser000@amamama.com' + System.currentTimeMillis();
     u.CompanyName = 'TEST';
     u.ManagerId = m.Id;
     u.Title = 'title';
     u.Alias = 'alias';
     u.TimeZoneSidKey = 'America/Los_Angeles';
     u.EmailEncodingKey = 'UTF-8';
     u.LanguageLocaleKey = 'en_US';
     u.LocaleSidKey = 'en_US';
     //u.UserRoleId = r.Id;
    // u.Name='Testuser';
     insert u;
    system.debug('Print User manager: '+u.ManagerId);
    Contact con = new contact();
    con.Lastname = 'test test';
    con.OwnerId = u.Id;
       
        Test.startTest();
        insert con;  
       Test.stopTest();
    Contact Ocon = [select id,Manager__c,OwnerId from Contact LIMIT 1];
    system.debug('Print user id: '+u.id);
    system.debug('Print user manager id: '+u.ManagerId);
    system.debug('Print contact owner: '+Ocon.OwnerId);
    system.debug('Print contact manager: '+Ocon.Manager__c);
    system.assertEquals(m.Id, Ocon.Manager__c);
    
    }
   
           
}