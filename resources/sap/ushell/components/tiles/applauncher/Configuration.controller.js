// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/components/tiles/utils'],function(u){"use strict";sap.ui.controller("sap.ushell.components.tiles.applauncher.Configuration",{onConfigurationInputChange:function(c){u.checkInput(this.getView(),c);},aDefaultObjects:[{obj:"",name:""}],onInit:function(){var v=this.getView(),t=v.byId("targetUrl"),s=v.byId("navigation_semantic_objectInput"),a=v.byId("navigation_semantic_actionInput"),r=u.getResourceBundleModel();v.setModel(r,"i18n");var b=r.getResourceBundle();v.setViewName("sap.ushell.components.tiles.applauncher.Configuration");u.createSemanticObjectModel(this,s,this.aDefaultObjects);u.createActionModel(this,a);s.attachChange(function(C){var V=C.getSource().getValue();v.getModel().setProperty("/config/navigation_semantic_object",V);});function c(U){return!U;}t.bindProperty("enabled",{formatter:c,path:"/config/navigation_use_semantic_object"});var i=new sap.ui.core.ListItem({key:"URL",text:b.getText("configuration.tile_actions.table.target_type.url")});v.byId("targetTypeCB").addItem(i);i=new sap.ui.core.ListItem({key:"INT",text:b.getText("configuration.tile_actions.table.target_type.intent")});v.byId("targetTypeCB").addItem(i);},onAfterRendering:function(){u.updateMessageStripForOriginalLanguage(this.getView());},onValueHelpRequest:function(e){u.objectSelectOnValueHelpRequest(this,e,false);},onActionValueHelpRequest:function(e){u.actionSelectOnValueHelpRequest(this,e,false);},onCheckBoxChange:function(e){var v=this.getView(),s=v.byId("navigation_semantic_objectInput"),m=s.getModel(),a=e.getSource().getSelected();m.setProperty("/enabled",a);u.checkInput(this.getView(),e);},onIconValueHelpRequest:function(e){u.iconSelectOnValueHelpRequest(this,e,false);},onSelectIconClose:function(){u.onSelectIconClose(this.getView());},onSelectIconOk:function(){u.onSelectIconOk(this.getView());},handleTargetTypeChange:function(t){u.onTargetTypeChange(t);},onTileActionValueHelp:function(e){u.objectSelectOnValueHelpRequest(this,e,true);},onTileActionIconValueHelp:function(e){u.iconSelectOnValueHelpRequest(this,e,true);},addRow:function(){u.addTileActionsRow(this.getView());},deleteRow:function(){u.deleteTileActionsRow(this.getView());}});},true);
