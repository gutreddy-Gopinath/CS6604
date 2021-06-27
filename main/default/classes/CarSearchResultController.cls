public with sharing class CarSearchResultController {
    @auraEnabled(cacheable=true)
    public static List<Car__c> getCars(string carTypeid) {
        if(string.isEmpty(carTypeid)){
        return [SELECT Id, Name, Picture__c, Contact__r.Name,
                    Geolocation__latitude__s, Geolocation__longitude__s
                    FROM Car__c 
                    WHERE Available_For_Rent__c = true ];
    }else {
        return [SELECT Id, Name, Picture__c, Contact__r.Name,
                    Geolocation__latitude__s, Geolocation__longitude__s
                    FROM Car__c 
                    WHERE Available_For_Rent__c = true AND Car_type__c =: carTypeid ];
        }
    }
}