// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";var c="sap.ushell_abap.adapters.abap.LaunchPageAdapter",d="/UI2/Fiori2LaunchpadHome",D="/UI2/FLPD_CATALOG",a="X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER",S="X-SAP-UI2-CHIP:/UI2/STATIC_APPLAUNCHER",O={catalogTileNotFound:"catalogTileNotFound",referenceTileNotFound:"referenceTileNotFound",noTargetMapping:"noTargetMapping",emptyConfiguration:"emptyConfiguration",tileIntentSupportException:"tileIntentSupportException"};jQuery.sap.declare("sap.ushell_abap.adapters.abap.LaunchPageAdapter");sap.ushell_abap.adapters.abap.LaunchPageAdapter=function(u,p,A){var C,o=null,P=false,g,G,t=new sap.ui2.srvc.Map(),b=(A&&A.config)||{},T=b.services&&b.services.targetMappings,l=b.services&&b.services.launchPage,E={},f=this;if(!T){throw new Error("Configuration for target mappings service not passed");}if(!T.baseUrl){throw new Error("baseUrl was not passed in Configuration for target mappings service");}if(!T.relativeUrl){throw new Error("relativeUrl was not passed in Configuration for target mappings service");}function h(e,s,i){try{return e.getImplementationAsSapui5();}catch(n){jQuery.sap.log.error(i+": "+(n.message||n),n.stack,c);return new sap.ushell.ui.tile.StaticTile({icon:"sap-icon://error",info:"",infoState:"Critical",subtitle:n.message||n,title:s}).addStyleClass("sapUshellTileError");}}sap.ui2.srvc.testPublishAt(f);function j(e,s,i){if(e.getBagIds().indexOf(s)>-1&&e.getBag(s).getTextNames().indexOf(i)>-1){return e.getBag(s).getText(i);}}sap.ui2.srvc.testPublishAt(f);function k(e,s,i){if(e.getBagIds().indexOf(s)>-1&&e.getBag(s).getPropertyNames().indexOf(i)>-1){return e.getBag(s).getProperty(i);}}sap.ui2.srvc.testPublishAt(f);function m(i,s,n){var x,N;try{x=i.getConfigurationParameter(s);N=JSON.parse(x);}catch(e){return;}if(N[n]!==undefined){return N[n];}}sap.ui2.srvc.testPublishAt(f);function q(e,s){var x=e&&sap.ui2.srvc.isArray(e.order)?e.order:[],N={},Q=[],R,U,i,n;x=e&&sap.ui2.srvc.isArray(e.order)?e.order:[];x=x.concat(e&&sap.ui2.srvc.isArray(e.linkOrder)?e.linkOrder:[]);for(i=0,n=s.length;i<n;i+=1){R=s[i];N[R.getId()]=R;}for(i=0,n=x.length;i<n;i+=1){U=x[i];if(Object.prototype.hasOwnProperty.call(N,U)){Q.push(N[U]);delete N[U];}}for(i=0,n=s.length;i<n;i+=1){R=s[i];if(Object.prototype.hasOwnProperty.call(N,R.getId())){Q.push(R);}}return Q;}function r(){var i;try{i=JSON.parse(o.getConfiguration());i.order.splice(0,0,o.getDefaultPage().getId());}catch(e){i={order:[o.getDefaultPage().getId()]};}return q(i,o.getPages());}this.hideGroups=function(e){var i,n=new jQuery.Deferred();if(!e||!(e instanceof Array)){n.reject('Input parameter must be of type Array.');}else{i=JSON.parse(o.getConfiguration()||"{}");i.hiddenGroups=e;o.setConfiguration(JSON.stringify(i),n.resolve.bind(n),n.reject.bind(n));}return n.promise();};this.isGroupVisible=function(e){var s=o.getConfiguration(),n,x,i;if(!s){return true;}n=JSON.parse(s);if(!n||!n.hiddenGroups){return true;}x=n.hiddenGroups;for(i=0;i<x.length;i+=1){if(x[i]===e.getId()){return false;}}return true;};sap.ui2.srvc.testPublishAt(f);function v(e){function s(){e.hasOwnProperty("_loadingDeferred")&&e._loadingDeferred.resolve();delete e._loadingDeferred;delete e.$loadingPromise;}function i(n){jQuery.sap.log.error("Failed to load tile: "+n,e.toString(),c);e.hasOwnProperty("_loadingDeferred")&&e._loadingDeferred.reject();delete e._loadingDeferred;delete e.$loadingPromise;}e.load(s,i);}function w(e,i){var n=0,s=[],R=[];function x(){if(n<=0){i();}}function N(U){U._loadingDeferred=new jQuery.Deferred();U.$loadingPromise=U._loadingDeferred.promise();if(window["sap-ui-debug"]){v(U);}else{jQuery.sap._loadJSResourceAsync("sap/fiori/core-ext-light.js").then(function(){v(U);}).catch(function(){jQuery.sap.log.error("Failed to load sap/fiori/core-ext-light.js");});}}function Q(U){function V(){n-=1;x();}n+=1;U.load(V,function(W){jQuery.sap.log.error("Failed to load tile: "+W,U.toString(),c);V();});}e.forEach(function(U){U.getChipInstances().forEach(function(V){if(I(V)){Q(V);}else if(J(V)){R.push(V);}else{s.push(V);}});});s.forEach(function(U){N(U);});R.forEach(function(U){N(U);});x();}sap.ui2.srvc.testPublishAt(f,"readTargetMappings");function y(){var e=new jQuery.Deferred(),i,s,U;function n(Q){var R=[];Object.keys(Q).forEach(function(V){var x={};["semanticObject","semanticAction","formFactors"].forEach(function(W){x[W]=Q[V][W];});R.push(x);});return R;}if(jQuery.sap.getObject("compactTMPromise",undefined,b)){b.compactTMPromise.then(function(R){var x=n(R||{});e.resolve({results:x});},function(x){e.reject(x);});return e.promise();}i=jQuery.sap.getObject("services.targetMappings",0,b);s=i.cacheId||"";U="/sap/bc/ui2/start_up?so=*&action=*&tm-compact=true&shellType="+f._getShellType()+"&depth=0";if(s){U+=(U.indexOf("?")<0?"?":"&")+"sap-cache-id="+s;}var N=i.sUI2CacheDisable;if(N){U+=(U.indexOf("?")<0?"?":"&")+"sap-ui2-cache-disable="+N;}sap.ui2.srvc.get(U,false,function(x){var Q=JSON.parse(x),R=Q.targetMappings||{};var V=n(R);e.resolve({results:V});},function(x){e.reject(x);});return e.promise();}sap.ui2.srvc.testPublishAt(f);function z(s,e){return s+"-"+e;}sap.ui2.srvc.testPublishAt(f);function B(e){return!e.getConfiguration();}function F(e){var i=[],n=sap.ushell.Container.getService("PageBuilding").getFactory();e.forEach(function(s){var R=s.getRemoteCatalog(),x;if(s.getBaseChipId()==="X-SAP-UI2-CHIP:/UI2/ACTION"){return;}x=n.createChipInstance({chipId:s.getId(),remoteCatalogId:R&&R.getId()});i.push(x);});return i;}function H(){var e=o.getDefaultPage().getAllCatalogs(),n,s=e.getCatalogs(),W=[],i;for(i=0;i<s.length;i+=1){n=s[i];W.push({data:{},errorMessage:undefined,id:n.getId(),title:n.isStub()?n.getId():n.getTitle(),tiles:n.isStub()?[]:F(n.getChips()),ui2catalog:n});}return W;}function I(e){var s=e.getChip().getBaseChipId();return s===a||s===S;}function J(e){if(e.getChip().getRemoteCatalog()){return true;}return false;}function K(e){var i,s=e.getConfigurationParameter("tileConfiguration");try{i=JSON.parse(s||"{}");}catch(n){jQuery.sap.log.error("Tile with ID '"+e.getId()+"' has a corrupt configuration containing a 'tileConfiguration' value '"+s+"' which could not be parsed. If present, a (stringified) JSON is expected as value.",n.message,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");return{};}return i;}this._parseFullChipId=function(s){var e=s.split(":"),i=e.pop(),n=null;if(e.length>2){n=e.shift();}return{id:i,prefix:n,catalog:e.join(":")};};this._parseReferenceLost=function(R){var e;var s=R||Object.prototype.toString.apply(s);if(!s.match(/^Reference lost: Note \d+ Page.+\s,\sInstance ID.+$/)){jQuery.sap.log.warning("The string that describes a lost reference is in an unexpected format","This is expected to be a string exactly like 'Reference lost: Note <#> Page <CATALOG_ID> , Instance ID <CHIP_ID>' instead of the given '"+R+"'","sap.ushell_abap.adapters.abap.LaunchPageAdapter");return{id:"Unknown",catalog:"Unknown"};}e=s.split(" , ").map(function(i){return i.split(" ").pop();});return{id:e[1],catalog:e[0]};};this._flattenArray=function(i){var f=this;if(Object.prototype.toString.apply(i)!=="[object Array]"){return i;}return i.reduce(function(e,n){return e.concat(f._flattenArray(n));},[]);};this._findAndReportTileErrors=function(e,t){var i;i=this._getPossibleTileErrors(e,t);if(i.length>0){this._reportTileErrors(i);}};this._getPossibleTileErrors=function(e,t){var f=this;return e.map(function(i){return{group:{id:i.getId(),title:i.getTitle()},errors:f._getPossibleTileErrorsFromOnePage(i,t)};});};this._getPossibleTileErrorsFromOnePage=function(e,t){var f=this;var i=e.getChipInstances().reduce(function(R,n){var s,x,N,Q,U,V,W,X;X=n.getChip();x=f._parseFullChipId(X.getId());if(!X.isInitiallyDefined()){R.push({type:O.catalogTileNotFound,chipInstanceId:n.getId(),chipId:x.id,chipCatalogId:x.catalog});}else if(X.isReference()&&X.isBrokenReference()){U=f._parseReferenceLost(X.getTitle());R.push({type:O.referenceTileNotFound,chipInstanceId:n.getId(),referenceChipId:x.id,referenceChipCatalogId:x.catalog,missingReferredChipId:U.id,missingReferredCatalogId:U.catalog});}else{try{s=f._checkTileIntentSupport(n,t);}catch(Y){s={isSupported:false,reason:O.tileIntentSupportException,exception:Y};}if(!s.isSupported){Q=j(n,"tileProperties","display_title_text");N=j(n,"tileProperties","display_subtitle_text");switch(s.reason){case O.noTargetMapping:V=K(n);R.push({type:O.noTargetMapping,chipInstanceId:n.getId(),chipInstanceTitle:Q||V.display_title_text,chipInstanceSubtitle:N||V.display_subtitle_text,tileURL:V.navigation_target_url});break;case O.emptyConfiguration:W=n.getConfigurationParameter("tileConfiguration");R.push({type:O.emptyConfiguration,chipInstanceId:n.getId(),chipInstanceTitle:Q||n.getTitle(),chipInstanceSubtitle:N||null,tileConfiguration:W});break;case O.tileIntentSupportException:R.push({type:O.tileIntentSupportException,exception:s.exception,chipInstanceId:n.getId()});break;case O.referenceTileNotFound:break;default:}}}return R;},[]);return i;};this._formatTileError=function(e){switch(e.type){case O.catalogTileNotFound:return"comes from catalog tile with ID '"+e.chipId+"' but this cannot be found in catalog '"+e.chipCatalogId+"' (CATALOG TILE NOT FOUND).";case O.referenceTileNotFound:return"comes from reference tile '"+e.referenceChipId+"'"+" in catalog '"+e.referenceChipCatalogId+"'"+" which in turn refers to the tile '"+e.missingReferredChipId+"'"+" from catalog '"+e.missingReferredCatalogId+"', but this is missing (REFERENCED TILE NOT FOUND).";case O.noTargetMapping:return"was hidden because a target mapping for the tile URL '"+e.tileURL+"' was not found (TARGET MAPPING NOT FOUND).";case O.emptyConfiguration:return"the tile configuration '"+e.tileConfiguration+"' is empty or invalid (BAD CONFIGURATION).";case O.tileIntentSupportException:return"exception occurred while checking tile intent support: "+e.exception+" (EXCEPTION RAISED).";default:return"unknown error type '"+e.type+"' (UNKNOWN ERROR). Error data: "+JSON.stringify(e,null,3);}};this._reportTileErrors=function(e){var f=this;var W=[];var n=[];function x(N,Q){var R=[N,Q].map(function(s,i){return i===1&&s?"("+s+")":s;}).filter(function(s){return typeof s==="string"&&s.length>0;}).join(" ");return R.length>0?"'"+R+"'":"";}e.forEach(function(i){var N="  in Group '"+i.group.title+"' with Group ID '"+i.group.id+"'",Q=[],R=[];i.errors.forEach(function(U){var V=["  - tile instance",x(U.chipInstanceTitle,U.chipInstanceSubtitle),"with ID '"+U.chipInstanceId+"'"].filter(function(s){return s.length>0;}).join(" ");if(U.type===O.noTargetMapping){R.push([V,"    "+f._formatTileError(U)].join("\n"));}else{Q.push([V,"    "+f._formatTileError(U)].join("\n"));}});if(Q.length>0){n.push([N,Q.join("\n")].join("\n"));}if(R.length>0){W.push([N,R.join("\n")].join("\n"));}});if(n.length>0){n.unshift("Tile error(s) were detected:");jQuery.sap.log.error(n.join("\n"),null,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");}if(W.length>0){W.unshift("Tile warning(s) were detected:");jQuery.sap.log.warning(W.join("\n"),null,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");}};this.getGroups=function(){var f=this,e,i,U,n;if(P){return(new jQuery.Deferred()).resolve(r()).promise();}if(!g){g=new jQuery.Deferred();e=new jQuery.Deferred();U=sap.ushell.Container.getService("PageBuilding");if(l&&l.cacheId){U.getFactory().getPageBuildingService().readPageSet.cacheBusterTokens.put(d,l.cacheId);}if(l&&l["sap-ui2-cache-disable"]&&U.getFactory().getPageBuildingService().readPageSet){U.getFactory().getPageBuildingService().readPageSet.appendedParameters={"sap-ui2-cache-disable":l["sap-ui2-cache-disable"]};}n=U.getPageSet(d);n.fail(e.reject.bind(e)).done(function(s){o=s;o.filter([d],[D]);w(s.getPages(),e.resolve.bind(e,s));});i=y().done(function(s){var x=sap.ui2.srvc.getFormFactor();s.results.forEach(function(N){var Q=z(N.semanticObject,N.semanticAction);t.put(Q,t.get(Q)||!!(N.formFactors&&N.formFactors[x]));});});jQuery.when(i,e).done(function(s,x){P=true;if(jQuery.sap.log.getLevel()>=jQuery.sap.log.Level.DEBUG){f._findAndReportTileErrors(x.getPages(),t);}g.resolve(r());}).fail(g.reject.bind(g));}return g.promise();};this.getDefaultGroup=function(){var e=new jQuery.Deferred();this.getGroups().done(function(){e.resolve(o.getDefaultPage());}).fail(e.reject.bind(e));return e.promise();};this.getGroupTitle=function(e){return e.getTitle();};this.getGroupId=function(e){return e.getId();};this.getGroupTiles=function(i){var n;try{n=JSON.parse(i.getLayout());}catch(e){jQuery.sap.log.warning("Group "+i.getId()+": invalid layout: "+i.getLayout(),null,c);}return q(n,i.getChipInstances());};this.addGroup=function(s){var e=new jQuery.Deferred();o.appendPage(s,D,e.resolve.bind(e),e.reject.bind(e,r()));return e.promise();};this.removeGroup=function(e){var i=new jQuery.Deferred();if(o.isPageRemovable(e)){o.removePage(e,i.resolve.bind(i),i.reject.bind(i,r()));}else{i.reject(r());}return i.promise();};this.resetGroup=function(e){var i=new jQuery.Deferred();if(o.isPageRemovable(e)){i.reject(r());}else if(o.isPageResettable(e)){o.resetPage(e,function(){w([e],i.resolve.bind(i,e));},i.reject.bind(i,r()));}else{i.resolve();}return i.promise();};this.isGroupRemovable=function(e){return o.isPageRemovable(e);};this.isGroupLocked=function(e){return e.isPersonalizationLocked();};this.isTileIntentSupported=function(e){var i,s,n,x;var N=this._checkTileIntentSupport(e,t);if(!N.isSupported&&N.reason===O.noTargetMapping){i=K(e);x=j(e,"tileProperties","display_title_text")||i.display_title_text;n=j(e,"tileProperties","display_subtitle_text")||i.display_subtitle_text;s=i.navigation_target_url;jQuery.sap.log.warning("Group tile with ID '"+e.getId()+"' is filtered out as the current user has no target mapping assigned for the intent '"+s+"'","\nGroup Tile ID: '"+e.getId()+"'\n"+"Title: '"+x+"'\n"+"Subtitle: '"+n+"'\n"+"Intent: '"+s+"' - ","sap.ushell_abap.adapters.abap.LaunchPageAdapter");}return N.isSupported;};this._checkTileIntentSupport=function(e,t){var i,n;var s=z;if(!I(e)){return{isSupported:true};}if(e.isStub()){throw new sap.ui2.srvc.Error("Applauncher Tile not loaded completely","sap.ushell_abap.adapters.abap.LaunchPageAdapter");}if(e.getChip()&&typeof e.getChip().isBrokenReference==="function"&&e.getChip().isBrokenReference()){return{isSupported:false,reason:O.referenceTileNotFound};}i=K(e);if(jQuery.isEmptyObject(i)){return{isSupported:false,reason:O.emptyConfiguration};}if(!i.navigation_use_semantic_object){return{isSupported:true};}n=t.get(s(i.navigation_semantic_object,i.navigation_semantic_action));if(n){return{isSupported:true};}return{isSupported:false,reason:O.noTargetMapping};};this.moveGroup=function(e,n){var i=new jQuery.Deferred();function s(x){var N,Q=[];x.forEach(function(R){Q.push(R.getId());});N=JSON.parse(o.getConfiguration()||"{}");N.order=Q;o.setConfiguration(JSON.stringify(N),i.resolve.bind(i),i.reject.bind(i,r()));}this.getGroups().done(function(x){var N=x.indexOf(e);x.splice(N,1);x.splice(n,0,e);s(x);});return i.promise();};this.setGroupTitle=function(e,n){var i=new jQuery.Deferred();e.setTitle(n,i.resolve.bind(i),function(){i.reject(e.getTitle());});return i.promise();};this.addTile=function(e,i){var n=new jQuery.Deferred(),s=e.getChip();if(e.isStub()){n.reject(r(),"Tile was not added to the group as the tile failed loading");}else{if(!i){i=o.getDefaultPage();}i.addChipInstance(s,n.resolve.bind(n),n.reject.bind(n,r()));}return n.promise();};this.removeTile=function(e,i){var n=jQuery.Deferred();e.removeChipInstance(i,n.resolve.bind(n),n.reject.bind(n,r()));return n.promise();};this.moveTile=function(n,s,x,N,Q){var R=new jQuery.Deferred(),U=B(n),V,W=new sap.ui2.srvc.Map(),X,Y,Z,$,_=R.reject.bind(R,r()),a1=2;function b1(d1,e1,f1){var i,g1;try{g1=JSON.parse(d1.getLayout());}catch(e){g1={};}g1.order=[];for(i=0;i<e1.length;i+=1){g1.order.push(e1[i].getId());}d1.setLayout(JSON.stringify(g1),f1,_);}function c1(e){a1-=1;X=X||e;if(a1<=0){R.resolve(X);}}if(!Q){Q=N;}Z=this.getGroupTiles(N);s=Z.indexOf(n);if(s<0){jQuery.sap.log.error("moveTile: tile not found in source group",null,c);_();return R.promise();}Z.splice(s,1);if(N===Q){Z.splice(x,0,n);b1(N,Z,R.resolve.bind(R,n),_);}else{V=sap.ushell.Container.getService("PageBuilding").getFactory().getPageBuildingService();Y=n.getBagIds();Y.forEach(function(e){var i={texts:[],properties:[]},d1=n.getBag(e);d1.getOwnTextNames().forEach(function(e1){i.texts.push({name:e1,value:d1.getText(e1)});});d1.getOwnPropertyNames().forEach(function(e1){i.properties.push({name:e1,value:d1.getProperty(e1)});});if(i.texts.length>0||i.properties.length>0){W.put(e,i);}});V.openBatchQueue();$=this.getGroupTiles(Q);Q.addChipInstance(U?n.getChip():n,function(e){var i,d1;$.splice(x,0,e);Y.forEach(function(e1){d1=W.get(e1);if(d1){i=e.getBag(e1);d1.texts.forEach(function(f1){i.setText(f1.name,f1.value);});d1.properties.forEach(function(f1){i.setProperty(f1.name,f1.value);});i.save(function(){},function(){jQuery.sap.log.error("Bag "+e1+": could not be saved",null,c);});}});b1(Q,$,c1.bind(this,e));},_,n.isStub());N.removeChipInstance(n,c1,_);b1(N,Z,undefined);V.submitBatchQueue(undefined,_);}return R.promise();};this.getTileId=function(e){return e.getId();};this.getTileType=function(i){var n=i.getPage(),s;try{s=JSON.parse(n.getLayout());if(s.linkOrder&&s.linkOrder.indexOf(i.getId())>-1){return"link";}}catch(e){jQuery.sap.log.warning("Group "+n.getId()+": invalid layout: "+n.getLayout(),null,c);}return"tile";};this.getTileTitle=function(e){return e.getTitle();};this.getTileView=function(e){var f=this,i=new jQuery.Deferred(),n;function s(){n=e.getContract("types");if(n){n.setType(f.getTileType(e));}i.resolve(e.getImplementationAsSapui5());}function x(N){i.reject("Tile not successfully loaded"+(N?(": "+N):""));}if(!e.$loadingPromise){if(!e.isStub()){sap.ui2.srvc.call(s,x,!I(e));}else{x();}}else{e.$loadingPromise.fail(x).done(function(){try{s();}catch(N){x((N.message||N));}});}return i.promise();};this.getTileSize=function(e){var i=(!e.isStub()&&e.getConfigurationParameter("row"))||"1",n=(!e.isStub()&&e.getConfigurationParameter("col"))||"1";return i+"x"+n;};this.refreshTile=function(e){e.refresh();};this.setTileVisible=function(e,n){var V=!e.isStub()&&e.getContract("visible"),s,i;if(V){V.setVisible(n);return;}if(e.isStub()&&e.$loadingPromise){s=this.getTileId(e);i=E[s];E[s]=n;if(i===undefined){e.$loadingPromise.done(function(){var V=e.getContract("visible");if(V){V.setVisible(E[s]);}});}return;}};this.getTileActions=function(e){var i=!e.isStub()&&e.getContract("actions");if(i){return i.getActions();}return[];};this.getTileTarget=function(e){return null;};this.getTileDebugInfo=function(e){var i,s,n=e.getChip(),x=n.getCatalog();i={chipId:n.getId(),chipInstanceId:e.getId(),completelyLoaded:!e.isStub()};if(x){i.catalogId=x.getId();}s=JSON.stringify(i);return s;};this.getCatalogs=function(){var e,i=G,R=C===false;function n(){var Q=0,W=H();W.forEach(function(U){var V=U.ui2catalog;if(V.isStub()||V.getType()==='H'||V.getType()==='REMOTE'){Q+=1;V.refresh(function(){U.title=V.getTitle();U.tiles=F(V.getChips());e.notify(U);Q-=1;if(Q<=0){e.resolve(W);}},function(X){jQuery.sap.log.error("Failed to load catalog: "+X,V.toString(),c);U.errorMessage=X||"Error";e.notify(U);Q-=1;if(Q<=0){e.resolve(W);}});}else{e.notify(U);e.$notified=true;}});if(Q<=0){e.resolve(W);}}function s(){var W=H();W.forEach(function(Q){e.notify(Q);});e.resolve(W);}function x(Q){var U=o.getDefaultPage().getAllCatalogs();if(U.isStub()){U.load(n,e.reject.bind(e),"type eq 'CATALOG_PAGE' or type eq 'H' or type eq 'SM_CATALOG'"+" or type eq 'REMOTE'",true,"title");}else{sap.ui2.srvc.call(R?n:s,e.reject.bind(e),Q);}}function N(Q){if(T&&T.cacheId){sap.ushell.Container.getService("PageBuilding").getFactory().getPageBuildingService().readAllCatalogs.cacheBusterTokens.put(d,T.cacheId);}if(P){x(Q);}else{f.getGroups().done(x).fail(e.reject.bind(e));}}if(G&&!G.$notified&&!R){e=G;}else{e=G=new jQuery.Deferred();e.done(function(){if(e===G){C=true;}}).always(function(){if(e===G){G=null;}});if(i){if(R){C=undefined;}i.always(N);}else{N(true);}}return e.promise();};this.isCatalogsValid=function(){return!!C;};this.getCatalogData=function(e){return e.ui2catalog.getCatalogData();};this.getCatalogError=function(e){return e.errorMessage;};this.getCatalogId=function(e){return e.id;};this.getCatalogTitle=function(e){return e.title;};this.getCatalogTiles=function(e){var i,n,s=new jQuery.Deferred(),x=0;function N(){x-=1;if(x===0){s.resolve(e.tiles);}}function Q(R,U){jQuery.sap.log.error("Failed to load catalog tile: "+U,R.toString(),c);N();}for(i=0;i<e.tiles.length;i+=1){n=e.tiles[i];if(n.isStub()){x+=1;n.load(N,Q.bind(null,n));}}if(x===0){s.resolve(e.tiles);}return s.promise();};this.getCatalogTileId=function(e){var i=e.getChip(),s=i.getId();if(i.getCatalog()&&i.getCatalog().getCatalogData()&&i.getCatalog().getCatalogData().systemAlias){s+="_"+i.getCatalog().getCatalogData().systemAlias;}return s;};this.getCatalogTileTitle=function(e){return e.getChip().getTitle();};this.getCatalogTileSize=function(e){return this.getTileSize(e);};this.getCatalogTileView=function(e){var s=this.getCatalogTileTitle(e);if(e.isStub()){jQuery.sap.log.warning("CHIP (instance) is just a stub!",e.toString(true),c);return new sap.ushell.ui.tile.StaticTile({icon:"sap-icon://hide",info:"",infoState:"Critical",subtitle:"",title:s}).addStyleClass("sapUshellTileError");}if(e.getContract("preview")){e.getContract("preview").setEnabled(true);return h(e,s,"Cannot get catalog tile view as SAPUI5");}return new sap.ushell.ui.tile.StaticTile({title:s,subtitle:"",info:"",infoState:"Neutral",icon:"sap-icon://folder-full"});};this.getCatalogTileTargetURL=function(e){var s=m(e,"tileConfiguration","navigation_target_url");return s||(!e.isStub()&&e.getContract("preview")&&e.getContract("preview").getTargetUrl())||undefined;};this.getCatalogTilePreviewSubtitle=function(e){var s=j(e,"tileProperties","display_subtitle_text");return s||(!e.isStub()&&e.getContract("preview")&&e.getContract("preview").getPreviewSubtitle())||undefined;};this.getCatalogTilePreviewTitle=function(e){var s=j(e,"tileProperties","display_title_text");return s||(!e.isStub()&&e.getContract("preview")&&e.getContract("preview").getPreviewTitle())||undefined;};this.getCatalogTilePreviewIcon=function(e){var s=m(e,"tileConfiguration","display_icon_url");return s||(!e.isStub()&&e.getContract("preview")&&e.getContract("preview").getPreviewIcon())||undefined;};this.getCatalogTileKeywords=function(e){var i={},s=e.getTitle(),n=e.getChip().getDescription();function x(i,R){if(sap.ui2.srvc.isArray(R)){R.forEach(function(U){if(i.hasOwnProperty(U)){return;}i[U]=null;});}}function N(e){var R=j(e,"tileProperties","display_search_keywords");if(!sap.ui2.srvc.isString(R)){return[];}return R.trim().split(/\s*,\s*/g);}function Q(e){var R;if(e.isStub()){return[];}R=e.getContract("search");if(R){return R.getKeywords();}return[];}x(i,N(e));x(i,Q(e));if(s){x(i,[s]);}if(n){x(i,[n]);}return Object.keys(i);};this.addBookmark=function(i,n){var s=S,x={display_icon_url:i.icon||"",display_info_text:i.info||"",display_subtitle_text:i.subtitle||"",display_title_text:i.title,navigation_target_url:i.url,navigation_use_semantic_object:false},N=new jQuery.Deferred(),Q=sap.ushell.Container.getService("PageBuilding").getFactory(),U,R=new URI(),V,W,X=Q.getPageBuildingService(),Y,Z=z;function $(Y,x,N){Y.getBag("tileProperties").setText("display_title_text",x.display_title_text||"");Y.getBag("tileProperties").setText("display_subtitle_text",x.display_subtitle_text||"");Y.getBag("tileProperties").setText("display_info_text",x.display_info_text||"");Y.getBag("tileProperties").save(function(){N.resolve();},function(_){N.reject(_);});}V=new URI(i.url);if(i.url&&(i.url[0]==='#'||V.host()+V.path()===R.host()+R.path())){U=sap.ushell.Container.getService("URLParsing");W=U.parseShellHash(U.getShellHash(i.url));if(W&&t.get(Z(W.semanticObject,W.action))!==undefined){x.navigation_use_semantic_object=true;x.navigation_semantic_object=W.semanticObject;x.navigation_semantic_action=W.action;x.navigation_semantic_parameters=U.paramsToString(W.params);}}if(i.serviceUrl){s=a;x.display_number_unit=i.numberUnit;x.service_refresh_interval=i.serviceRefreshInterval||0;x.service_url=i.serviceUrl;}if(n&&!(n instanceof sap.ui2.srvc.Page)){N.reject("The given object is not a group");return N.promise();}if(P){n=n||o.getDefaultPage();Y=Q.createChipInstance({chipId:s,pageId:n.getId(),title:i.title,configuration:JSON.stringify({tileConfiguration:JSON.stringify(x)}),layoutData:""});n.addChipInstance(Y,function(_){$(_,x,N);},N.reject.bind(N),undefined);}else{try{X.createPageChipInstanceFromRawData({chipId:s,configuration:JSON.stringify({tileConfiguration:JSON.stringify(x)}),pageId:"/UI2/Fiori2LaunchpadHome",title:i.title},function(_){Q.createChipInstance(_,function(a1){$(a1,x,N);},N.reject.bind(N),undefined);},N.reject.bind(N));}catch(e){N.reject(e.toString());}}return N.promise();};sap.ui2.srvc.testPublishAt(f);function L(e,U){return I(e)&&K(e).navigation_target_url===U;}sap.ui2.srvc.testPublishAt(f);function M(U,V){var e=[],i=new jQuery.Deferred();f.getGroups().fail(i.reject.bind(i)).done(function(n){var s=0;n.forEach(function(x){x.getChipInstances().forEach(function(N){if(L(N,U)){s+=1;if(V){e.push(V(N));}}});});if(e.length===0){i.resolve(s);}else{jQuery.when.apply(jQuery,e).fail(function(x){i.reject(x);}).done(function(){i.resolve(s);});}});return i.promise();}this.countBookmarks=function(U){return M(U);};this.deleteBookmarks=function(U){return M(U,function(e){var i=new jQuery.Deferred();e.remove(i.resolve.bind(i),i.reject.bind(i));return i.promise();});};this.updateBookmarks=function(U,e){return M(U,function(i){var n=K(i),s=new jQuery.Deferred(),x=false;function N(){i.getContract("configuration").fireConfigurationUpdated(["tileConfiguration"]);R();}function Q(){i.getContract("bag").fireBagsUpdated(["tileProperties"]);s.resolve();}function R(){if(typeof n.display_title_text==="string"){i.getBag("tileProperties").setText("display_title_text",n.display_title_text);x=true;}if(typeof n.display_subtitle_text==="string"){i.getBag("tileProperties").setText("display_subtitle_text",n.display_subtitle_text);x=true;}if(typeof n.display_info_text==="string"){i.getBag("tileProperties").setText("display_info_text",n.display_info_text);x=true;}if(x){i.getBag("tileProperties").save(Q,s.reject.bind(s));}else{s.resolve();}}n.display_icon_url=e.icon||n.display_icon_url;n.display_info_text=e.info||n.display_info_text;n.display_subtitle_text=e.subtitle||n.display_subtitle_text;n.display_title_text=e.title||n.display_title_text;n.navigation_target_url=e.url||n.navigation_target_url;n.display_number_unit=e.numberUnit||n.display_number_unit;n.service_refresh_interval=e.serviceRefreshInterval||n.service_refresh_interval;n.service_url=e.serviceUrl||n.service_url;i.updateConfiguration({tileConfiguration:JSON.stringify(n)},N,s.reject.bind(s));return s.promise();});};this.onCatalogTileAdded=function(s){C=false;};};sap.ushell_abap.adapters.abap.LaunchPageAdapter.prototype._getShellType=function(){if(sap&&sap.ushell_abap&&typeof sap.ushell_abap.getShellType==="function"){return sap.ushell_abap.getShellType();}return"FLP";};}());
