# Lookupcomponent

Use this lightning component in your project to enable users to select lookup record

### Properties

| Name     					| Type    			| Description 											|
| --------------------------|-------------------|-------------------------------------------------------|
| lookupId  | Id   | Set this to the id of the record that is looked up. Based on this the data will be loaded on further loading of the page. E.g., lookupId ="{!Contact.AccountId}"    |
| uniqueLookupIdentifier | String | Please make sure that this is set to some unique string. This will be sent in the event params whenever a value is selected in the dropdown.    |
|required|Boolean|Set this to true if you want the field to be required.|
|requiredErrorMessage| String| The error message if the field is left blank|
|readOnly|Boolean|Set this to true if you want to make the field readonly|
|placeholder|String|Placeholder for the input box|
|objectName|String|The API name of the object from which you wish to query.|
|fieldSet|Array|The fields that will be queried.|
|whereCondition|String|The component already filters the record based on the user entered text. But you can add more filters. Do not add 'Where' just add the condition like `AND Parent=Null AND Status='Approved'`|
|limit|Integer|The number of records that will be queried. Set this as less as possible for better performance.|
|comparisonField|String|Mention the API name of the field which will be used to compare when the query runs|
|primaryDisplayField|String|Component allows displaying of more than one field. Mention the API field name which will be displayed.|
|alternateDisplayField|String[]|Display the secondary set of fields.Usually keep it to 2. E.g., `alternateDisplayField="['Status__c','OracleId__c']"`|
|minimumCharacter|Integer|The minimum number of character after which the search should be performed. Keep it to more than 3|


### Usage:
	
  #### Default:
     <c:LookupComponent objectName="Account"
			  fieldSet="['Name','Id']"
			  whereCondition=" AND ParentId = null"
			  limit="5"
			  comparisonField="Name"
			  primaryDisplayField="Name"
			  alternateDisplayField="['Name','Id']"
			  lightningIconName="standard:account"
			  uniqueLookupIdentifier="testAccount"
			  lookupId="{!v.Opportunity.AccountId}"
			  fieldLabel="Customer"
     />
	 
 #### Readonly Mode:
    <c:LookupComponent objectName="Account"
			  fieldSet="['Name','Id']"
			  whereCondition=" AND ParentId = null"
			  limit="5"
			  comparisonField="Name"
			  primaryDisplayField="Name"
			  alternateDisplayField="['Name','Id']"
			  lightningIconName="standard:account"
			  uniqueLookupIdentifier="testAccount"
			  lookupId="{!v.Opportunity.AccountId}"
			  fieldLabel="Customer"
			  readOnly="true"
     />
  #### Required Mode:
  <c:LookupComponent objectName="Account"
			  fieldSet="['Name','Id']"
			  whereCondition=" AND ParentId = null"
			  limit="5"
			  comparisonField="Name"
			  primaryDisplayField="Name"
			  alternateDisplayField="['Name','Id']"
			  lightningIconName="standard:account"
			  uniqueLookupIdentifier="testAccount"
			  lookupId="{!v.Opportunity.AccountId}"
			  fieldLabel="Customer"
			  required="true"
			  requiredErrorMessage="Customer is mandatory"
     />
