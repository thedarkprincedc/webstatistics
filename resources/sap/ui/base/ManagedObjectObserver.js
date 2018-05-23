/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','sap/ui/base/ManagedObject','sap/ui/base/EventProvider','jquery.sap.script'],function(q,B,M,E){"use strict";var a=B.extend("sap.ui.base.ManagedObjectObserver",{constructor:function(C){if(!C&&typeof C!=="function"){throw new Error("Missing callback function in ManagedObjectObserver constructor");}this._fnCallback=C;}});a.prototype.observe=function(i,C){if(!(i instanceof M)){if(i==null){return;}throw new TypeError("ManagedObjectObserver can only handle ManagedObjects, but observe was called for "+i);}o(i,C);c(i,this,C);};a.prototype.unobserve=function(i,C){if(!(i instanceof M)){if(i==null){return;}throw new TypeError("ManagedObjectObserver can only handle ManagedObjects, but unobserve was called for "+i);}if(C){o(i,C);}r(i,this,C);};a.prototype.isObserved=function(i,C){if(!(i instanceof M)){if(i==null){return false;}throw new TypeError("ManagedObjectObserver can only handle ManagedObjects, but isObserved was called for "+i);}return d(i,this,C);};a.prototype.disconnect=function(){e(this);};a.prototype.getConfiguration=function(i){return g(i,this);};var O={},t=Object.create(null);O.propertyChange=function(i,n,v,N){h("properties",i,n,function(){return{type:"property",old:v,current:N};});};O.aggregationChange=function(i,n,s,v){h("aggregations",i,n,function(){return{type:"aggregation",mutation:s,children:Array.isArray(v)?v:null,child:!Array.isArray(v)?v:null};});};O.associationChange=function(i,n,s,I){h("associations",i,n,function(){return{type:"association",mutation:s,ids:I};});};O.eventChange=function(i,n,s,L,F,D){h("events",i,n,function(){return{type:"event",mutation:s,listener:L,func:F,data:D};});};O.bindingChange=function(i,n,s,p,v){h("bindings",i,n,function(){return{type:"binding",mutation:s,bindingInfo:p,memberType:v};});};O.objectDestroyed=function(i){h("destroy",i,null,function(){return{type:"destroy"};});r(i,this,null);delete i._observer;};function h(T,n,N,C){var I=n.getId(),p=t[I];if(p){var s;for(var i=0;i<p.listeners.length;i++){if(b(p.configurations[i],T,N)){if(!s){s=C();s.name=N;s.object=n;}var L=p.listeners[i];L._fnCallback(s);}}}}function b(C,T,n){if(C==null||!T){return false;}if(T!="destroy"&&!n){return false;}return C[T]===true||(Array.isArray(C[T])&&C[T].indexOf(n)>-1);}function c(T,L,C){u(T,L,C,false);}function g(T,L){var i=T.getId();var n=t[i];if(n&&n.listeners){var I=n.listeners.indexOf(L);if(I>=0){var C=q.extend(true,{},n.configurations[I]);return C;}}return null;}function r(T,L,C){C=C||g(T,L);u(T,L,C,true);}function d(T,L,C){var i=T.getId(),n=t[i];C=C||g(T,L);if(!n){return false;}var I=n.listeners.indexOf(L);if(I===-1){return false;}else{return l(n.configurations[I].properties,C.properties)&&l(n.configurations[I].aggregations,C.aggregations)&&l(n.configurations[I].associations,C.associations)&&l(n.configurations[I].bindings,C.bindings)&&l(n.configurations[I].events,C.events)&&m(n.configurations[I].destroy,C.destroy);}}function e(L){for(var n in t){var T=t[n];for(var i=0;i<T.listeners.length;i++){if(T.listeners[i]===L){T.listeners.splice(i,1);T.configurations.splice(i,1);}}if(T.listeners&&T.listeners.length===0){delete t[n];T.object._observer=undefined;}}}function u(T,L,C,R){var i=T.getId(),n=t[i],p,I;if(R){if(!n){return;}I=n.listeners.indexOf(L);if(I>=0){p=n.configurations[I];}}else{if(!n){n=t[i]={listeners:[],configurations:[],object:T};}I=n.listeners.indexOf(L);if(I===-1){n.listeners.push(L);n.configurations.push(C);}else{p=n.configurations[I];}}if(p){p.properties=p.properties||[];k(p.properties,C.properties,R);p.aggregations=p.aggregations||[];k(p.aggregations,C.aggregations,R);p.associations=p.associations||[];k(p.associations,C.associations,R);p.bindings=p.bindings||[];k(p.bindings,C.bindings,R);p.events=p.events||[];k(p.events,C.events,R);if(C.destroy!=null){p.destroy=C.destroy;}}var s=j(T,"events");if(T._observer&&R){if(!s&&f(T)){T.detachEvent("EventHandlerChange",H);}if(!s&&!j(T,"properties")&&!j(T,"aggregations")&&!j(T,"associations")&&!j(T,"destroy")&&!j(T,"bindings")){delete T._observer;delete t[i];}}else if(!T._observer&&!R){if(s&&!f(T)){T.attachEvent("EventHandlerChange",H);}T._observer=O;}}function f(T){var R=E.getEventList(T)["EventHandlerChange"];return(R&&R.indexOf(H)===-1);}function j(T,s){var i=T.getId(),n=t[i];if(n){var C=n.configurations.filter(function(p){return p.hasOwnProperty(s)&&p[s]&&(p[s]===true||p[s].length>0);});return C.length>0;}return false;}function H(i){var T=i.getSource(),s=i.mParameters.EventId;if(T.getMetadata().hasEvent(s)){if(i.mParameters.type==="listenerAttached"){O.eventChange(T,s,"insert",i.mParameters.listener,i.mParameters.func,i.mParameters.data);}else if(i.mParameters.type==="listenerDetached"){O.eventChange(T,s,"remove",i.mParameters.listener,i.mParameters.func,i.mParameters.data);}}}function k(n,A,R){if(!A){return;}for(var i=0;i<A.length;i++){var I=n.indexOf(A[i]);if(I>-1&&R){n.splice(I,1);}else if(I===-1&&!R){n.push(A[i]);}}}function l(F,s){if(!Array.isArray(s)||s.length==0){return true;}if(!Array.isArray(F)||F.length==0){return false;}var U=q.sap.unique(F.concat(s));return F.length===U.length;}function m(i,C){if(C==null){return true;}return i===C;}function o(i,C){var n=i.getMetadata(),p=Object.keys(n.getAllProperties()),A=Object.keys(n.getAllAggregations()),s=Object.keys(n.getAllAssociations()),v=q.sap.unique(p.concat(A)),w=Object.keys(n.getAllEvents());C.properties=C.properties===true?p:C.properties;C.aggregations=C.aggregations===true?A:C.aggregations;C.associations=C.associations===true?s:C.associations;C.bindings=C.bindings===true?v:C.bindings;C.events=C.events===true?w:C.events;C.destroy=(C.destroy==null)?false:C.destroy;}return a;});
