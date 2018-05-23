// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.adapters.cdm.ClientSideTargetResolutionAdapter");sap.ushell.adapters.cdm.ClientSideTargetResolutionAdapter=function(s,p,a){this._oAdapterConfig=a&&a.config;jQuery.sap.require("sap.ushell.utils.utilsCdm");this._oLocalSystemAlias={http:{host:"",port:"",pathPrefix:"/sap/bc/"},https:{host:"",port:"",pathPrefix:"/sap/bc/"},rfc:{systemId:"",host:"",service:0,loginGroup:"",sncNameR3:"",sncQoPR3:""},id:"",client:"",language:""};};sap.ushell.adapters.cdm.ClientSideTargetResolutionAdapter.prototype.getInbounds=function(){var t=this;if(!this._getInboundsDeferred){this._getInboundsDeferred=new jQuery.Deferred();sap.ushell.Container.getService("CommonDataModel").getSite().done(function(s){var i=sap.ushell.utils.utilsCdm.formatSite(s)||[];t._getInboundsDeferred.resolve(i);}).fail(function(e){t._getInboundsDeferred.reject(e);});}return this._getInboundsDeferred.promise();};sap.ushell.adapters.cdm.ClientSideTargetResolutionAdapter.prototype._getSystemAliases=function(){var t=this;if(!this._getSystemAliasesDeferred){this._getSystemAliasesDeferred=new jQuery.Deferred();sap.ushell.Container.getService("CommonDataModel").getSite().done(function(s){var S=jQuery.extend(true,{},s.systemAliases||{});Object.keys(S).forEach(function(i){S[i].id=i;});t._getSystemAliasesDeferred.resolve(S);}).fail(function(e){t._getSystemAliasesDeferred.reject(e);});}return this._getSystemAliasesDeferred.promise();};sap.ushell.adapters.cdm.ClientSideTargetResolutionAdapter.prototype.resolveSystemAlias=function(s){var d=new jQuery.Deferred(),t=this;this._getSystemAliases().done(function(S){var m,o=s===""?t._oLocalSystemAlias:S[s];if(o){d.resolve(o);}else{m="Cannot resolve system alias "+s;jQuery.sap.log.warning(m,"The system alias cannot be found in the site response","sap.ushell.adapters.cdm.ClientSideTargetResolutionAdapter");d.reject(m);}}).fail(function(){d.reject();});return d.promise();};}());