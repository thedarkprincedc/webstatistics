/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/descriptorRelated/api/DescriptorVariantFactory","sap/ui/fl/descriptorRelated/api/DescriptorInlineChangeFactory","sap/ui/fl/LrepConnector","sap/ui/fl/Utils","sap/m/MessageBox","sap/ui/rta/Utils"],function(D,a,L,F,M,R){"use strict";var A={};var H=56;A.newAppVariantId="";A.getManifirstSupport=function(r){var s='/sap/bc/ui2/app_index/ui5_app_mani_first_supported/?id='+r;var l=L.createConnector();return l.send(s,'GET');};A.isStandAloneApp=function(){if(sap.ushell_abap){return false;}else{return true;}};A.getNewAppVariantId=function(){return A.newAppVariantId;};A.setNewAppVariantId=function(n){A.newAppVariantId=n;};A.trimIdIfRequired=function(i){return i.substr(0,H);};A.getId=function(b){var c;var i=b.split('.');if(i[0]!=="customer"){i[0]="customer."+i[0];}var r=false;i.forEach(function(s,d,e){var f=/^id.*/i;if(s.match(f)){s=s.replace(f,jQuery.sap.uid().replace(/-/g,"_"));e[d]=s;r=true;}});c=i.join(".");if(!r){c=c+"."+jQuery.sap.uid().replace(/-/g,"_");}c=this.trimIdIfRequired(c);this.setNewAppVariantId(c);return c;};A.createDescriptorVariant=function(p){p.layer=F.getCurrentLayer(false);return D.createNew(p);};A.getInlineChangeInput=function(v,c){return{"type":"XTIT","maxLength":50,"comment":c,"value":{"":v}};};A.getInlinePropertyChange=function(p,P){var c="New "+p+" entered by a key user via RTA tool";return this.getInlineChangeInput(P,c);};A.getInlineChangeInputIcon=function(i){return{icon:i};};A.getInlineChangeRemoveInbounds=function(i){return{"inboundId":i};};A.getURLParsedHash=function(){var u=sap.ushell.Container.getService("URLParsing");if(u.parseShellHash&&u.getHash){return u.parseShellHash(u.getHash(window.location.href));}};A.getInboundInfo=function(i){var I={};var p=this.getURLParsedHash();var b=Object.keys(i);var c=[];if(b.length){b.forEach(function(s){if((i[s].action===p.action)&&(i[s].semanticObject===p.semanticObject)){c.push(s);}});}switch(c.length){case 0:I.currentRunningInbound="customer.savedAsAppVariant";I.addNewInboundRequired=true;break;case 1:I.currentRunningInbound=c[0];I.addNewInboundRequired=false;break;default:I=undefined;break;}return I;};A.getInboundPropertiesKey=function(s,c,p){return s+"_sap.app.crossNavigation.inbounds."+c+"."+p;};A.getInlineChangesForInboundProperties=function(c,s,p,P){var C={"inboundId":c,"entityPropertyChange":{"propertyPath":p,"operation":"UPSERT","propertyValue":{}},"texts":{}};if(p==="title"||p==="subTitle"){var k=this.getInboundPropertiesKey(s,c,p);C.entityPropertyChange.propertyValue="{{"+k+"}}";C.texts[k]=this.getInlinePropertyChange(p,P);}else if(p==="icon"){C.entityPropertyChange.propertyValue=P;}return C;};A.getInlineChangeForInboundPropertySaveAs=function(c){return{"inboundId":c,"entityPropertyChange":{"propertyPath":"signature/parameters/sap-appvar-id","operation":"UPSERT","propertyValue":{"required":true,"filter":{"value":this.getNewAppVariantId(),"format":"plain"},"launcherValue":{"value":this.getNewAppVariantId()}}}};};A.getInlineChangeCreateInbound=function(c){var p=this.getURLParsedHash();var P={"inbound":{}};P.inbound[c]={"semanticObject":p.semanticObject,"action":p.action};return P;};A.createInlineChange=function(p,c){var t;if(c==="title"){return a.create_app_setTitle(p);}else if(c==="description"){return a.create_app_setDescription(p);}else if(c==="subTitle"){return a.create_app_setSubTitle(p);}else if(c==="icon"){return a.create_ui_setIcon(p);}else if(c==="inbound"){return a.create_app_changeInbound(p);}else if(c==="createInbound"){return a.create_app_addNewInbound(p);}else if(c==="inboundTitle"){t=p.texts;delete p.texts;return a.create_app_changeInbound(p,t);}else if(c==="inboundSubtitle"){t=p.texts;delete p.texts;return a.create_app_changeInbound(p,t);}else if(c==="inboundIcon"){delete p.texts;return a.create_app_changeInbound(p);}else if(c==="removeInbound"){return a.create_app_removeAllInboundsExceptOne(p);}};A.getTransportInput=function(p,n,N,t){return{getPackage:function(){return p;},getNamespace:function(){return n;},getId:function(){return N;},getDefinition:function(){return{fileType:t};}};};A.triggerCatalogAssignment=function(s,o){var r='/sap/bc/lrep/appdescr_variants/'+s+'?action=assignCatalogs&assignFromAppId='+o;var l=L.createConnector();return l.send(r,'POST');};A.showTechnicalError=function(m,t,s,e){var T=this.getTextResources();var E="";if(e.messages&&e.messages.length){if(e.messages.length>1){e.messages.forEach(function(o){E+=o.text+"\n";});}else{E+=e.messages[0].text;}}else{E+=e.stack||e.message||e.status||e;}var b=T.getText(t);var c=T.getText(s,E);return new Promise(function(r){M.error(c,{icon:m,title:b,onClose:function(){r(false);},styleClass:R.getRtaStyleClassName()});});};A.isS4HanaCloud=function(s){return s.isAtoEnabled()&&s.isAtoAvailable();};A.copyId=function(i){var t=document.createElement("textarea");t.value=i;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);};A.getTextResources=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");};return A;},true);
