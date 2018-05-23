"use strict";jQuery.sap.require('sap.portal.ui5.externals.es3shims.objectgetprototypeof');jQuery.sap.require('sap.portal.ui5.externals.es5shims.arrayprototypeindexof');jQuery.sap.require('sap.portal.ui5.externals.es5shims.arrayprototypelastindexof');jQuery.sap.require('sap.portal.ui5.externals.es5shims.functionprototypebind');jQuery.sap.require('sap.portal.ui5.externals.es5shims.windowprototypegetcomputedstyle');jQuery.sap.declare('sap.portal.ui5.core.PropertyObserver');
sap.portal.ui5.core.PropertyObserver=function PropertyObserver(p,c){var o=!(this instanceof sap.portal.ui5.core.PropertyObserver)?new sap.portal.ui5.core.PropertyObserver:this;if(p){o.setObservableProperties(p);}if(c){o.setCallback(c);}return o;};
sap.portal.ui5.core.PropertyObserver.prototype={_fnCallback:null,_aProperties:[],_bIsCallableOnInit:false,_bIsSuspended:false,_oObservationTarget:null,_sObservationProperty:null,setObservableProperties:function setObservedProperties(p){if(typeof(p)==='string'){p=[p];}if(!(p instanceof Array)){throw new TypeError;}this._aProperties=p;},getObservableProperties:function getObservedProperties(){return this._aProperties;},isObservesProperty:function isObservesProperty(p){return this._aProperties?(this._aProperties.indexOf(p)!==-1):false;},setCallback:function setCallback(c){this._fnCallback=c;},getCallback:function getCallback(){return this._fnCallback;},callOnInit:function callOnInit(){this._bIsCallableOnInit=true;return this;},isCallableOnInit:function isCallableOnInit(){return this._bIsCallableOnInit;},isSuspended:function isSuspended(){return this._bIsSuspended;},suspend:function suspend(){this._bIsSuspended=true;},resume:function resume(){this._bIsSuspended=false;},updatePropertyValue:function updatePropertyValue(v,p){this._oObservationTarget.suspendPropertyObservers();this._oObservationTarget.setProperty(p||this._sObservationProperty,v);this._oObservationTarget.resumePropertyObservers();},notify:function notify(t,p,n,o){if(this.isSuspended()){return;}var P=this._oObservationTarget,s=p;this._oObservationTarget=t;this._sObservationProperty=p;var c=this.getCallback();if(typeof(c)==='string'){c=t[c];}if(typeof(c)!=='function'){throw new Error;}var r=c.call(t,p,n,o,this);this._oObservationTarget=P;this._sObservationProperty=s;return r;}};
