sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.Webcontent",{
        onInit: function(){
            var oModel = new JSONModel("../localService/mockdata/webcontentstat.json");
            this.getView().setModel(oModel);
        }
    });
});