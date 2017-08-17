<aura:application implements="force:appHostable"  extends="force:slds">
	<aura:handler name="lookupSelected" event="c:LookupSelected" action="{!c.handleEvent}"/>
    <aura:handler name="selectedLookupRemoved" event="c:selectedLookupRemoved" action="{!c.handleEvent}"/>
    <aura:attribute name="result" type="String"/>
    <aura:attribute name="uniqueId" type="String"/>
    <aura:attribute name="num" type="Integer"/>
    <aura:attribute name="lookupId" type="Id"/>
    <aura:attribute name="value" type="Object"/>
    
    ==> {!v.result} <br/>
    ==> {!v.uniqueId}<br/>
    ===> {!v.lookupId}
    
    <c:LookupComponent objectName="Account"
                            fieldSet="['Name','Id']"
                            whereCondition="AND ParentId = null"
                            limit="5"
                            comparisonField="['Name','Phone']"
                            primaryDisplayField="Name"
                            alternateDisplayField="['Name','Id']"
                            minimumCharacter="3"
                            lightningIconName="standard:account"
                            uniqueLookupIdentifier="testAccount"
                            lookupId="{!v.lookupId}"
                            value="{!v.value}"
                            readOnly="false"
                            required="true"
                            requiredErrorMessage="The Customer is required"
                            fieldLabel="Customer"
                            />
</aura:application>
