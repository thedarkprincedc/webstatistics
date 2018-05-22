sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "com/dla/webstat/localService/servers/mockdata.json.functions",
], function(jQuery, MockServer, MockServerFunctions){
    "use strict";
    var oMockServer = new MockServer({
        rootUri: "../localService/mockdata/"
    });
    var oUriParameters = jQuery.sap.getUriParameters();
    MockServer.config({
        autoRespond: true,
        autoRespondAfter: oUriParameters.get("serverDelay") || 1000
    });
    oMockServer.setRequests([{
        method: "GET",
        path: RegExp("webcontentstat.json"),
        response: MockServerFunctions.listWebContentStat
    }]);
    return oMockServer;
});