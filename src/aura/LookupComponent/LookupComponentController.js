({
  doInit: function (component, event, helper){
	  var lookupId = component.get('v.lookupId');
      var sObjectType = component.get("v.objectName");
      var fields = component.get("v.fieldSet");
      var comparisonField = component.get("v.comparisonField");
      var primaryDisplayField = component.get("v.primaryDisplayField");
      component.set('v.queryErrorMessage','');
      component.set('v.queryErrorFound',false);
      component.set('v.lookupInputFocused',false);
      
      if(lookupId != undefined && lookupId != '' && lookupId != null) {
          var query = "SELECT "+fields.join(",")+" FROM "+sObjectType+" WHERE Id='"+lookupId+"'";
          var action = component.get("c.querySalesforceRecord");
            action.setParams({queryString : query});
            action.setCallback(this, function(response){
              var responseState = response.getState();
              console.log('error ', response.getError()[0]);
              if(responseState === 'SUCCESS' && response.getReturnValue() != undefined && response.getReturnValue() != null && response.getReturnValue() != '') {
                  component.set('v.selectedIndex',undefined);
                  component.set("v.searching",false);
                  component.set('v.selectedObject',response.getReturnValue()[0]);
                  component.set('v.selectedObjectDisplayName',response.getReturnValue()[0][primaryDisplayField]);
                  component.set('v.value','');
              }else {
                  console.log('error ', response.getError());
                component.set('v.queryErrorMessage',response.getError()[0]);
      			component.set('v.queryErrorFound',true);
              }
            });
            $A.enqueueAction(action);
      }
  },
  searchRecords : function(component,event,helper) {
      
    var userEnteredValue 	= component.get("v.enteredValue");
    var sObjectType 		= component.get("v.objectName");
    var fields 				= component.get("v.fieldSet");
    var conditions 			= component.get("v.whereCondition");
    var limit 				= component.get("v.limit");
    var comparisonField 	= component.get("v.comparisonField");
    var primaryDisplayField = component.get("v.primaryDisplayField");
    var minimumCharacter 	= component.get("v.minimumCharacter");
    var keyCode 			= event.getParams().keyCode;
    var objectList 			= component.get('v.objectList');
    var selectedObjectIndex = component.get('v.selectedIndex');

    switch(keyCode) {
        //up key
        case 38:
            if(objectList.length > 0) {
              if(selectedObjectIndex != undefined && selectedObjectIndex-1 >=0) {
                selectedObjectIndex--;
                component.set('v.selectedIndex',selectedObjectIndex);
              } else if((selectedObjectIndex != undefined && selectedObjectIndex-1 <0) || selectedObjectIndex == undefined) {
                selectedObjectIndex = objectList.length-1;
                component.set('v.selectedIndex',selectedObjectIndex);
              }
            }
            break;
        //down key
        case 40:
        if(objectList.length > 0) {
          if(selectedObjectIndex != undefined && selectedObjectIndex+1 < objectList.length) {
            selectedObjectIndex++;
            component.set('v.selectedIndex',selectedObjectIndex);
          } else if((selectedObjectIndex != undefined && selectedObjectIndex+1 ==objectList.length) || selectedObjectIndex == undefined) {
            selectedObjectIndex = 0;
            component.set('v.selectedIndex',selectedObjectIndex);
          }
        }
            break;
        //escape key
        case 27 :
          component.set('v.objectList',[]);
          component.set('v.lookupInputFocused',false);
          break;
        //enterKey
        case 13:
          helper.onValueselect(component, event, helper);

          break;

        //Right Key:
        case 39 :
          //don't to anything
          break;
        //Left Key
        case 37 :
          //don't to anything
          break;
        //CapsLock Key
        case 20 :
          //don't to anything
          break;
        //home
        case 35 :
          //don't to anything
          break;
        //End
        case 36 :
          //don't to anything
          break;
        //any other character entered.
        default:
        component.set('v.selectedObject',undefined);
        component.set('v.selectedObjectDisplayName','');
        component.set('v.queryErrorMessage','');
        component.set('v.queryErrorFound',false);
          if(userEnteredValue.length >= minimumCharacter) {
            component.set("v.searching",true);
            component.set('v.objectList',[]);
            //iterate thru the comparision Field.
            var comparisionStringArray=[];
            for(var i = 0;i<comparisonField.length;i++) {
            	comparisionStringArray.push(comparisonField[i]+" LIKE '%"+userEnteredValue+"%'");
            }
            var comparisionString = comparisionStringArray.join(' OR ');
            var query = "SELECT "+fields.join(",")+" FROM "+sObjectType+" WHERE ("+comparisionString+")";
            if(conditions != undefined && conditions != '') {
            	query = query +" "+ conditions;      
            }
            query += " LIMIT "+limit;
            console.log('query '+ query);
            var action = component.get("c.querySalesforceRecord");
            action.setParams({queryString : query});
            action.setCallback(this, function(response){
              var responseState = response.getState();
              if(responseState === 'SUCCESS') {
                  component.set('v.objectList',response.getReturnValue());
                  component.set('v.selectedIndex',undefined);
                  component.set("v.searching",false);
              }else {
                component.set('v.queryErrorMessage',response.getError()[0].message);
      			component.set('v.queryErrorFound',true);
                component.set('v.objectList',[]);
                component.set('v.selectedIndex',undefined);
                component.set("v.searching",false);
                console.log('error',response.getError()[0].message)
              }
            });
            $A.enqueueAction(action);
          }else {
            component.set('v.objectList',[]);
            component.set('v.selectedIndex',undefined);
            component.set("v.searching",false);
          }
    }
  },
  onRecordSelected : function(component, event, helper) {

  },
  showColorOnMouseEnter : function(component, event, helper) {
    $A.util.addClass( event.currentTarget, 'highlight');
  },
  hideColorOnMouseLeave : function(component, event, helper) {
    $A.util.removeClass( event.currentTarget, 'highlight');
  },
  inputBlurred : function(component, event, helper) {
    //component.set('v.lookupInputFocused',false);
    //delaying the setting of this flag. This is to make sure that the flag is set post the selection of the dropdown. 
    window.setTimeout(
      $A.getCallback(function() {
        component.set('v.lookupInputFocused',false);
    }), 200);
  },
  inputInFocus : function(component, event, helper) {
    component.set('v.lookupInputFocused',true);
  },
  removeSelectedOption : function(component, event, helper) {
    var selectedObject = JSON.stringify(component.get('v.selectedObject'));
    component.set('v.selectedObject',undefined);
    component.set('v.selectedObjectDisplayName','');
    component.set('v.value',undefined);
    component.set('v.lookupId','');
     
    var selectedLookupRemoved = component.getEvent("selectedLookupRemoved");
    selectedLookupRemoved.setParams({
        "selectedObject" : selectedObject,
        "uniqueLookupIdentifier" : component.get('v.uniqueLookupIdentifier')               
    });
    selectedLookupRemoved.fire();
  },
  onRowSelected : function(component, event, helper) {
    component.set('v.selectedIndex', parseInt(event.currentTarget.dataset.currentIndex));
    helper.onValueselect(component, event, helper);
  }
})
