sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
], function(jQuery, MockServer){
    "use strict";
    var oMockServer = new MockServer({
        rootUri: "/data/WebContentStatistics.svc/"
    });
    var oUriParameters = jQuery.sap.getUriParameters();
    MockServer.config({
        autoRespond: true,
        autoRespondAfter: oUriParameters.get("serverDelay") || 1000
    });
    var sPath = jQuery.sap.getModulePath("com.dla.webstat.test.localService.mockdata.webcontent_stat");
    oMockServer.simulate(sPath + "/webcontent_stat.metadata.xml", sPath);
    return oMockServer;
});