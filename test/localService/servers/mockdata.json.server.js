sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "com/dla/webstat/test/localService/utility/utility.functions"
], function(jQuery, MockServer, Utility){
    "use strict";
    var oMockServer = new MockServer({
        rootUri: "../localService/mockdata/"
    });
    var oUriParameters = jQuery.sap.getUriParameters();
    MockServer.config({
        autoRespond: true
    });
    oMockServer.setRequests([{
        method: "GET",
        path: RegExp("webcontentstat.json"),
        response: Utility.jsonResponse("../test/localService/mockdata/webcontent_stat/webcontent_stat_daily.json")
    }]);
    return oMockServer;
});