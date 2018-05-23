/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control'],function(l,C){"use strict";var S=C.extend("sap.m.SuggestionsList",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},associations:{parentInput:{type:"sap.ui.core.Control",multiple:false,singularName:"parentInput"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:{render:function(r,L){r.write("<ul");r.writeControlData(L);r.addClass("sapMSuL");r.addClass("sapMSelectList");r.writeClasses();r.writeAccessibilityState({role:"listbox","multiselectable":"false"});r.addStyle("width",L.getWidth());r.addStyle("max-width",L.getMaxWidth());r.writeStyles();r.write(">");this.renderItems(r,L);r.write("</ul>");},renderItems:function(r,L){var s;var a=L.getSelectedItemIndex();try{s=sap.ui.getCore().byId(L.getParentInput()).getValue();}catch(e){s="";}L.getItems().forEach(function(i,b){i.render(r,i,s,b===a);});}}});S.prototype.init=function(){this._iSelectedItem=-1;};S.prototype.onBeforeRendering=function(){this.$().off();};S.prototype.onAfterRendering=function(){this.$().on("mousedown",function(e){e.preventDefault();});};S.prototype.getItems=function(){try{return sap.ui.getCore().byId(this.getParentInput()).getSuggestionItems();}catch(e){return[];}};S.prototype.update=function(){var r;var d=this.getDomRef();if(d){r=sap.ui.getCore().createRenderManager();this.getRenderer().renderItems(r,this);r.flush(d);r.destroy();}return this;};S.prototype.selectByIndex=function(i,r){var a=this.getItems();var b;var c;var d;var p=sap.ui.getCore().byId(this.getParentInput());var e="aria-activedecendant";if(isNaN(parseInt(i,10))){i=-1;r=false;}if((!a.length)||(r&&i===0)||(!r&&i<0)){b=-1;}else{if(r){if(this._iSelectedItem<0){b=(i<0?a.length:-1)+i;}else{b=this._iSelectedItem+i;}}else{b=i;}b=Math.min(Math.max(b,0),a.length-1);}this._iSelectedItem=b;if(a.length){this.$().children("li").removeClass("sapMSelectListItemBaseSelected").attr("aria-selected","false").eq(b).addClass("sapMSelectListItemBaseSelected").attr("aria-selected","true");}if(p){if(b>=0){c=p.getSuggestionItems()[b];d=c&&c.getId();}if(d){p.$("I").attr(e,d);}else{p.$("I").removeAttr(e);}}return this._iSelectedItem;};S.prototype.getSelectedItemIndex=function(){return this._iSelectedItem;};return S;});
