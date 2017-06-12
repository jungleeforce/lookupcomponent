public with sharing class Lookupcontroller {
	public Lookupcontroller() {

	}
	@AuraEnabled
	public static List<sObject> querySalesforceRecord(String queryString) {
		return Database.query(queryString);
	}
}