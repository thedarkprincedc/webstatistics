sap.ui.define(["sap/ui/core/Component","sap/ui/Device","./model/models","sap/ui/fl/transport/TransportDialog"],function(C,D,m,T){"use strict";var I=false;return sap.ui.core.Component.extend("sap.ushell_abap.plugins.fcc-transport-ui.Component",{metadata:{manifest:"json"},init:function(){if(I){return;}I=true;this.setModel(m.createDeviceModel(),"device");var r=new sap.ui.model.resource.ResourceModel({bundleName:"sap.ushell_abap.plugins.fcc-transport-ui.i18n.i18n"});sap.ui.getCore().setModel(r,"i18n");var e=sap.ui.getCore().getEventBus();e.subscribe("sap.fcc.services.siteService","beforeSave",function(c,E,s){s.doBeforeSave(this.onBeforeSave,this);}.bind(this));},openDialog:function(M){var d=jQuery.Deferred();var r=M;var i=M.package;var a=M.transport;var l=new sap.m.Label({text:"{i18n>LABEL_TITLE_PACKAGE}",layoutData:new sap.ui.layout.form.GridElementData({hCells:"2"})});var o=new sap.m.Input({maxLength:30,layoutData:new sap.ui.layout.form.GridElementData({hCells:"auto"}),change:function(E){M.package=E.getSource().getValue().toUpperCase();E.getSource().setValue(M.package);if(M.package){if(M.package==="$TMP"){M.transport="";e.setEnabled(false);c.setEnabled(false);c.setSelectedKey("");return;}else{if(!String.prototype.startsWith){String.prototype.startsWith=function(j,q){q=q||0;return this.indexOf(j,q)===q;};}var R="/sap/bc/ui2/cdm_fcc/vhtr";var k="GET";var n="package="+M.package;var p=sap.ui.fl.LrepConnector.createConnector();p.send(R,k,n,null).then(function(M){var q=[];if(Array.isArray(M.response.transports)){for(var j in M.response.transports){var u=M.response.transports[j];q.push({"transportId":u.transportid,"description":u.description});}}else{var u=M.response.transports;q.push({"transportId":u.transportid,"description":u.description});}var v=new sap.ui.model.json.JSONModel();v.setData(q);sap.ui.getCore().setModel(v);c.bindItems("/",new sap.ui.core.ListItem({key:"{transportId}",text:"{transportId}",additionalText:"{description}"}));M.transport=c.getFirstItem();c.setSelectedItem(M.transport);c.fireChangeEvent(M.transport);o.setValueState(sap.ui.core.ValueState.None);e.setEnabled(true);c.setEnabled(true);},function(j){jQuery.sap.log.info(JSON.stringify(j));o.setEnabled(true);o.setValueState(sap.ui.core.ValueState.Error);if(j.code===500){o.setValueStateText(sap.ui.getCore().getModel("i18n").getProperty("ERROR_HTTP500"));}else if(j.code===404){o.setValueStateText(sap.ui.getCore().getModel("i18n").getProperty("ERROR_HTTP404"));}else{o.setValueStateText(sap.ui.getCore().getModel("i18n").getProperty("ERROR_REQUESTFAILED"));}e.setEnabled(false);c.setEnabled(false);c.setSelectedKey("");});}}else{M.transport="";c.setEnabled(false);c.setSelectedKey("");}}});var L=new sap.m.Label({text:"{i18n>LABEL_TITLE_TRANSPORT}",layoutData:new sap.ui.layout.form.GridElementData({hCells:"2"})});var c=new sap.m.ComboBox({layoutData:new sap.ui.layout.form.GridElementData({hCells:"auto"}),showSecondaryValues:true,enabled:false,items:{path:"/",template:new sap.ui.core.ListItem({key:"{transportId}",text:"{transportId}",additionalText:"{description}"})},change:function(E){M.transport=E.getSource().getValue();if(M.transport){e.setEnabled(true);}}});var b=new sap.m.CheckBox({selected:false,layoutData:new sap.ui.layout.form.GridElementData({hCells:"1"}),select:function(){if(b.getSelected()){r.checkboxFlag=true;}else{r.checkboxFlag=false;}}});var t=new sap.m.Text({text:"{i18n>CHKBOX_TXT_BATCHOBJECTS}",tooltip:"{i18n>CHKBOX_TXT_BATCHOBJECTS}",wrapping:true,layoutData:new sap.ui.layout.form.GridElementData({hCells:"auto"})});var B=new sap.m.Button({text:"{i18n>BTN_TITLE_LOCALOBJECT}",tooltip:"{i18n>BTN_TITLE_LOCALOBJECT}",press:function(){r.package="$tmp";r.transport="";h.close();}});var e=new sap.m.Button({text:"{i18n>BTN_TITLE_OK}",tooltip:"{i18n>BTN_TITLE_OK}",enabled:false,press:function(){h.close();}});var f=new sap.m.Button({text:"{i18n>BTN_TITLE_CANCEL}",tooltip:"{i18n>BTN_TITLE_CANCEL}",press:function(){r.package=i;r.transport=a;r.cancelClickedFlag=true;h.close();if(r.operation==="CREATE"){var j=sap.ui.getCore().getEventBus();j.publish("sap.fcc.services.siteService","onCancelCreation");}}});if(M.package){o.setValue(M.package);o.setEnabled(false);B.setEnabled(false);o.fireChangeEvent(M.package);}var s="";if(M.id===""||M.type===""){s="{i18n>DLG_TITLE_DEFAULTNAME}";}else{var g=sap.ui.getCore().getModel("i18n").getResourceBundle();s=g.getText("DLG_TITLE_"+M.type.toUpperCase(),[M.id]);}var h=new sap.m.Dialog({title:s,resizable:true,draggable:true,content:[new sap.ui.layout.form.Form({width:"400px",editable:true,layout:new sap.ui.layout.form.GridLayout({singleColumn:true}),formContainers:[new sap.ui.layout.form.FormContainer({formElements:[new sap.ui.layout.form.FormElement({label:l,fields:[o]}),new sap.ui.layout.form.FormElement({label:L,fields:[c]}),new sap.ui.layout.form.FormElement({fields:[b,t]})]})]})],buttons:[B,e,f],afterClose:function(){h.destroy();d.resolve(r);}});h.open();return d.promise();},onBeforeSave:function(c){var t=this;return new jQuery.Deferred(function(d){try{var r=c;var M=[];for(var i in c.BATCH){var a=c.BATCH[i];M[i]={"operation":a.metadata.operation,"id":a.metadata.id,"type":a.metadata.entityType,"package":a.metadata.package,"transport":a.metadata.transportId,"openDialogFlag":false,"checkboxFlag":false,"cancelClickedFlag":false};}for(var i=0;i<M.length;i++){if(M[i].operation==="CREATE"){M[i].openDialogFlag=true;}else{if(!M[i].package){M[i].openDialogFlag=true;}else if(M[i].package.toUpperCase()==="$TMP"){M[i].openDialogFlag=false;}else if(M[i].package&&!M[i].transport){for(var j=0;j<M.length;j++){if(i!=j&&M[i].package===M[j].package&&M[j].transport){M[i].transport=M[j].transport;r.BATCH[i].metadata.transportId=M[j].transport;break;}else{M[i].openDialogFlag=true;}}}}}t.processEntry(t,r,d,M,0);}catch(e){d.reject(e);}}).promise();},processEntry:function(t,r,d,M,i){var l=M.length;while(M[i].openDialogFlag===false){if(i<l-1){i++;}else{break;}}if(M[i].openDialogFlag===true){t.openDialog(M[i]).done(function(a){r.BATCH[i].metadata.package=a.package;r.BATCH[i].metadata.transportId=a.transport;if(a.checkboxFlag===true&&a.package&&a.cancelClickedFlag===false){if(a.operation==="CREATE"&&a.package.toUpperCase()!=="$TMP"){for(var j=i+1;j<M.length;j++){if(M[j].type===a.type){r.BATCH[j].metadata.package=a.package;r.BATCH[j].metadata.transportId=a.transport;M[j].openDialogFlag=false;}}}else{for(var j=i+1;j<M.length;j++){if(M[j].package===a.package){r.BATCH[j].metadata.transportId=a.transport;M[j].openDialogFlag=false;}}}}if(M[i].cancelClickedFlag===true&&M.length===1){d.reject(sap.ui.getCore().getModel("i18n").getProperty("MSG_SINGLECANCEL"));}else if(++i<M.length){t.processEntry(t,r,d,M,i);}else{var c=0,b=0;for(var j=0;j<M.length;j++){if(M[j].openDialogFlag===true){b++;}if(M[j].cancelClickedFlag===true){c++;}}if(b===c){d.reject(sap.ui.getCore().getModel("i18n").getProperty("MSG_ALLPOPUPSCANCELLED"));}else{d.resolve(r);}}}).fail(function(){});}}});});
