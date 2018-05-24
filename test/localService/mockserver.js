sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "com/dla/webstat/test/localService/utility/utility.functions",
    "com/dla/webstat/test/localService/servers/mockdata.json.server"
], function(jQuery, MockServer, Utility){
    "use strict";
    return {
        init : function(){
            Utility.loadOdataServerConfig(null, function(data){
                sap.ui.core.util.MockServer.startAll();
            })
        }
    };
});