sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "com/dla/webstat/localService/servers/mockdata.json.server",
    "com/dla/webstat/localService/servers/mockdata.odata.server"
], function(jQuery, MockServer){
    "use strict";
    return {
        init : function(){
            this.log("Starting MockServer");
            sap.ui.core.util.MockServer.startAll();
        },
        log: function(string){
            console.log(string)
        }
    };
});