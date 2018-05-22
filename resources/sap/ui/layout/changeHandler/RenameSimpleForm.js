/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/fl/changeHandler/JsControlTreeModifier","sap/ui/fl/Utils"],function(B,J,U){"use strict";var R={};R.applyChange=function(c,C,p){var m=p.modifier;var v=p.view;var a=p.appComponent;var o=c.getDefinition();var s=o.content.elementSelector||o.content.sRenameId;var r=m.bySelector(s,a,v);if(o.texts&&o.texts.formText&&this._isProvided(o.texts.formText.value)){if(!C){throw new Error("no Control provided for renaming");}var V=o.texts.formText.value;m.setProperty(r,"text",V);return true;}else{U.log.error("Change does not contain sufficient information to be applied: ["+o.layer+"]"+o.namespace+"/"+o.fileName+"."+o.fileType);}};R.completeChangeContent=function(c,s,p){var C=c.getDefinition();if(!s.changeType){throw new Error("oSpecificChangeInfo.changeType attribute required");}if(s.renamedElement&&s.renamedElement.id){var r=sap.ui.getCore().byId(s.renamedElement.id);var S;if(s.changeType==="renameLabel"){S=r.getLabel();}else if(s.changeType==="renameTitle"){S=r.getTitle();}C.content.elementSelector=J.getSelector(S,p.appComponent);c.addDependentControl(S,"elementSelector",p);}else{throw new Error("oSpecificChangeInfo.renamedElement attribute required");}if(this._isProvided(s.value)){B.setTextInChange(C,"formText",s.value,"XFLD");}else{throw new Error("oSpecificChangeInfo.value attribute required");}};R._isProvided=function(s){return typeof(s)==="string";};return R;},true);