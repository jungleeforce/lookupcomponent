# Lookupcomponent

Use this lightning component in your project to enable users to select lookup record

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
				lookupId="{!v.lookupId}"
				fieldLabel="Customer"
     />
