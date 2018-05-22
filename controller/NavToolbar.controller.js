sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.NavToolbar",{
        onInit: function(){
            // var oModel = new JSONModel("../localService/mockdata/webcontentstat.json");
            // this.getView().setModel(oModel);
        },
        onOpenDaily: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            oRouter.navTo("webcontentodata", {
                interval: "daily"
            });
        },
        onOpenWeekly: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            oRouter.navTo("webcontentodata", {
                interval: "weekly"
            });
        },
        onOpenMonthly: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            oRouter.navTo("webcontentodata", {
                interval: "monthly"
            });
        }
    });
});