({
	onValueselect : function(component, event, helper) {
		var primaryDisplayField = component.get("v.primaryDisplayField");
		var objectList 			= component.get('v.objectList');
		var selectedObjectIndex = component.get('v.selectedIndex');
		if(selectedObjectIndex != undefined) {
			component.set('v.selectedObject',objectList[selectedObjectIndex]);
			component.set('v.selectedObjectDisplayName',objectList[selectedObjectIndex][primaryDisplayField]);
			component.set('v.value',objectList[selectedObjectIndex]);
            component.set('v.lookupId',objectList[selectedObjectIndex]['Id']);
            component.set('v.objectList',[]);
            component.set('v.enteredValue','');
			component.set('v.lookupInputFocused',false);
            var lookupSelectedEvent = component.getEvent("lookupSelected");
            lookupSelectedEvent.setParams({
                "selectedObject" : component.get('v.selectedObject'),
                "uniqueLookupIdentifier" : component.get('v.uniqueLookupIdentifier')               
            });
            lookupSelectedEvent.fire();
		}
	}
})