/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.NavigationHandler");jQuery.sap.require("jquery.sap.history");jQuery.sap.require("sap.m.InstanceManager");
sap.ca.ui.NavigationHandler=function(a,A){this._app=a;this.config=A;};
sap.ca.ui.NavigationHandler.prototype._getValue=function(p){var v=this[p];if(typeof v=='string'||v instanceof String){return v;}return v();};
sap.ca.ui.NavigationHandler.prototype.subscribe=function(){var h=function(p,n){if(!p||!p.id){jQuery.sap.log.error("invalid parameter: "+p);}else{if(n===jQuery.sap.history.NavType.Back){this._navBack(p.id);}else{this._navTo(p.id,p.data,false);}}};jQuery.sap.history({routes:[{path:"page",handler:jQuery.proxy(h,this)}]});var b=sap.ui.getCore().getEventBus();b.subscribe("nav","to",this._navHandler,this);b.subscribe("nav","back",this._navHandler,this);b.subscribe("nav","backMaster",this._backMaster,this);b.subscribe("nav","virtual",this._navHandler,this);};
sap.ca.ui.NavigationHandler.prototype._backMaster=function(c,e,d){this._app.backMaster();};
sap.ca.ui.NavigationHandler.prototype._navHandler=function(c,e,d){if(e==="to"){this._navTo(d.id,d.data,true);}else if(e==="back"){this._navBack(d.id);}else if(e==="virtual"){jQuery.sap.history.addVirtualHistory();}else{jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: "+e);}};
sap.ca.ui.NavigationHandler.prototype._navTo=function(i,d,w){if(i===undefined){jQuery.sap.log.error("navTo failed due to missing id");}else{if(sap.m.InstanceManager.hasOpenPopover()){sap.m.InstanceManager.closeAllPopovers();jQuery.sap.log.info("navTo - closed popover(s)");}var t=this.config.getStringValue("transition");var a=this.config.getBoolValue("isMaster",[i]);var h=a||this.config.getBoolValue("masterVisible",[i]);if(i instanceof sap.ui.core.Control){if(this._app.getPage(i.getId())===null){this._app.addPage(i);}}else{var v=this.config.getStringValue("viewType");var b=this.config.getStringValue("viewName",[i]);if(this._app.getPage(i,a)===null){var p=sap.ui.view({id:i,viewName:b,type:v});this._app.addPage(p,a);jQuery.sap.log.info("app controller > loaded page: "+i);}}this._app.toggleStyleClass("sapMSplitAppFullscreen",!h);this._app.to((p!==undefined?p.getId():i),t,d);jQuery.sap.log.info("navTo - to page: "+i);}};
sap.ca.ui.NavigationHandler.prototype._navBack=function(i){if(!i){jQuery.sap.log.error("navBack - parameters id must be given");}else{if(sap.m.InstanceManager.hasOpenPopover()){sap.m.InstanceManager.closeAllPopovers();}if(sap.m.InstanceManager.hasOpenDialog()){sap.m.InstanceManager.closeAllDialogs();jQuery.sap.log.info("navBack - closed dialog(s)");}var c=(this._app.getCurrentPage())?this._app.getCurrentPage().getId():null;if(c!==i){var a=this.config.getBoolValue("isMaster",[i]);var h=a||this.config.getBoolValue("masterVisible",[i]);this._app.toggleStyleClass("sapMSplitAppFullscreen",!h);this._app.backToPage(i);}jQuery.sap.log.info("navBack - back to page: "+i);}};
