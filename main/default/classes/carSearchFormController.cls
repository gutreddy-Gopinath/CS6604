public with sharing class carSearchFormController{
    @Auraenabled(cacheable=true)
    public static List<Car_type__c> getCarTypes(){
        return [select id,name from Car_type__c];
    }
}
