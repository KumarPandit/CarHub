public with sharing class CarController {
    @AuraEnabled(Cacheable=true)
    public static List<Car__c> getCars(){
        return [SELECT Id, Name,MSRP__C,Description__c,Picture_URL__c FROM Car__c];
    }
}
