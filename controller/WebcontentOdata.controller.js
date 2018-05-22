sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
], function(Controller, JSONModel, History){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.WebcontentOdata",{
        onInit: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("webcontentodata").attachPatternMatched(this._onObjectMatched, this);
        },
       
        _onObjectMatched: function(oEvent){
            var oInterval = oEvent.getParameter("arguments").interval;
            var iSelection;
            var intervalMap = {
                weekly: "webcontent_stat_weekly",
                monthly: "webcontent_stat_monthly",
                daily: "webcontent_stat_daily"
            }
            var iSelection = (!intervalMap[oInterval]) ? "webcontent_stat_daily" : intervalMap[oInterval];
         
            this.byId("tabledata").getBinding("items").sPath = "/" + iSelection;
            this.byId("tabledata").getBinding("items").refresh();
        },
        onNavBack: function(oEvent){
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPrevi
            if(sPreviousHash != undefined){
                window.history.go(-1);
            }else{
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("webcontent",{},true);
            }
        }
    });
});