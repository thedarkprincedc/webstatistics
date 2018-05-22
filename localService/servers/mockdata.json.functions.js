sap.ui.define([
    "jquery.sap.global"
], function(jQuery){
    "use strict";
    function listWebContentStat(xhr){
        jQuery.sap.log.debug("Incoming request for webcontentstat.json ");
        jQuery.ajax({
            url: "../localService/mockdata/webcontent_stat_daily.json",
            dataType: 'json',
            async: false,
            success: function(data){
                xhr.respondJSON(200,  {
                    "Content-Type": "application/json;charset=utf-8"
                }, data);
            }
        });
        return true;
    }
    return {
        listWebContentStat: listWebContentStat 
    }
});