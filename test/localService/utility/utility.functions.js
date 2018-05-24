sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "com/dla/webstat/test/localService/mockdata.constants"
], function(jQuery, MockServer){
    "use strict";
    function loadJson(filename, onLoadCompleted){
        jQuery.ajax({
            url: filename,
            dataType: 'json',
            async: false,
            success: function(data){
                onLoadCompleted(data)
            }
        });
    }
    function jsonResponse(filename){
        var tempFunct = (function(xhr){
            jQuery.ajax({
                url: filename,
                dataType: 'json',
                async: false,
                success: function(data){
                    xhr.respondJSON(200,  {
                        "Content-Type": "application/json;charset=utf-8"
                    }, data);
                }
            });
        })
        return tempFunct;
    }
    function loadOdataServerConfig(mockServerFilename, onLoadCompleted){
        var filename = mockServerFilename || MOCKDATA_CONSTANTS.DEFAULT_MOCKDATA_CONFIG;
        loadJson(filename, function(data){
            odataCreateServer(data);
            onLoadCompleted();
        })
    }
    function odataCreateServer(configFile){
        var servers = configFile.odata.servers;
        var oMockServers = [];
        if(servers){
            servers.forEach(function(value, index){
               // if(validateServer(oMockServers[index])){
                    oMockServers[index] = onCreateServer(value.rootUri, value.path)
                    console.log([MOCKDATA_CONSTANTS.DEFAULT_ODATA_ON_CREATE_SERVER_EVENT, value.name].join(" - "));
               // }
                
            });
        }
    }
    function onCreateServer(rootUri, path, options){
        var oMockServer = new MockServer({
            rootUri: rootUri
        });
        var oUriParameters = jQuery.sap.getUriParameters();
        MockServer.config({
            autoRespond: true
        });
        var sPath = jQuery.sap.getModulePath([MOCKDATA_CONSTANTS.DEFAULT_MODEL_PATH, path].join("."));
        oMockServer.simulate([sPath, path + MOCKDATA_CONSTANTS.DEFAULT_METADATA_EXTENSION].join("/"), sPath);
        return oMockServer;
    }
    function validateServer(serverObject){
        if(serverObject.name && serverObject.rootUri && serverObject.path){
            return true;
        }
        throw "Error: Could not load server configuration";
        return false;
    }
    return {
        loadJson:loadJson, 
        odataCreateServer: odataCreateServer,
        onCreateServer: onCreateServer,
        loadOdataServerConfig: loadOdataServerConfig,
        jsonResponse: jsonResponse
    }
});