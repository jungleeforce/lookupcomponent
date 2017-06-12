({
	doInit : function(component, event, helper) {
		var displayObject = component.get("v.object");
		var fieldName = component.get("v.fieldName");
		var secondaryFieldList = component.get("v.alternateFieldList");
		var alternateFieldValueList = [];
		component.set("v.recordDisplayName",displayObject[fieldName]);
		if(secondaryFieldList != undefined && secondaryFieldList != null && secondaryFieldList.length > 0) {
			for(var i=0;i<secondaryFieldList.length;i++) {
					alternateFieldValueList.push(displayObject[secondaryFieldList[i]]);
			}
		}
		component.set("v.alternateFieldValueList",alternateFieldValueList);
	}
})