/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/core/theming/Parameters','sap/ushell/library','sap/ushell/resources'],function(C,P,l,r){"use strict";var V=C.extend("sap.ushell.ui.launchpad.ViewPortContainer",{metadata:{library:"sap.ushell",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},visible:{type:"boolean",group:"Appearance",defaultValue:true},defaultState:{type:"sap.ushell.ui.launchpad.ViewPortState",group:"Appearance",defaultValue:sap.ushell.ui.launchpad.ViewPortState.Center}},aggregations:{leftViewPort:{type:"sap.ui.core.Control",multiple:true,singularName:"leftViewPort"},centerViewPort:{type:"sap.ui.core.Control",multiple:true,singularName:"centerViewPort"},rightViewPort:{type:"sap.ui.core.Control",multiple:true,singularName:"rightViewPort"}},associations:{initialCenterViewPort:{type:"sap.ui.core.Control",multiple:false},initialRightViewPort:{type:"sap.ui.core.Control",multiple:false},initialLeftViewPort:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{},afterSwitchState:{parameters:{from:{type:"sap.ui.core.Control"},to:{type:"sap.ui.core.Control"}}},afterSwitchStateAnimationFinished:{parameters:{from:{type:"sap.ui.core.Control"},to:{type:"sap.ui.core.Control"}}},afterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},to:{type:"sap.ui.core.Control"}}}}}});V.prototype.init=function(){this.bShiftCenterTransition=true;this.bShiftCenterTransitionEnabled=false;this.sCurrentState="Center";var c=sap.ui.getCore().getConfiguration();this.bIsRTL=!jQuery.isEmptyObject(c)&&c.getRTL?c.getRTL():false;this._oViewPortsNavigationHistory={leftViewPort:{visitedControls:[],indexOfCurrentlyDisplayedControl:null},centerViewPort:{visitedControls:[],indexOfCurrentlyDisplayedControl:null},rightViewPort:{visitedControls:[],indexOfCurrentlyDisplayedControl:null}};this._states={Left:{translateX:'',visibleViewPortsData:[{viewPortId:'leftViewPort',className:"leftClass",isActive:true}]},Center:{translateX:'',visibleViewPortsData:[{viewPortId:'centerViewPort',className:"centerClass",isActive:true}]},Right:{translateX:'',visibleViewPortsData:[{viewPortId:'rightViewPort',className:"rightClass",isActive:true}]},LeftCenter:{translateX:'',visibleViewPortsData:[{viewPortId:'leftViewPort',className:"front",isActive:true},{viewPortId:'centerViewPort',className:"backLeft",isActive:false}]},CenterLeft:{translateX:'',visibleViewPortsData:[{viewPortId:'centerViewPort',className:"frontLeft",isActive:true},{viewPortId:'leftViewPort',className:"back",isActive:false}]},RightCenter:{translateX:'',visibleViewPortsData:[{viewPortId:'rightViewPort',className:"front",isActive:true},{viewPortId:'centerViewPort',className:"backRight",isActive:false}]},CenterRight:{translateX:'',visibleViewPortsData:[{viewPortId:'centerViewPort',className:"frontRight",isActive:true},{viewPortId:'rightViewPort',className:"back",isActive:false}]}};sap.ui.Device.media.attachHandler(this._handleSizeChange.bind(this),null,sap.ui.Device.media.RANGESETS.SAP_STANDARD);sap.ui.Device.orientation.attachHandler(this._handleSizeChange,this);jQuery(window).bind("resize",function(){this._handleSizeChange();}.bind(this));};V.prototype.removeCenterViewPort=function(c,s){this.removeAggregation('centerViewPort',c,s);this._popFromViewPortNavigationHistory('centerViewPort',c);};V.prototype.setApplicationFullWidth=function(f){var j=jQuery("#"+this._sCurrentControlId);j.toggleClass("sapUShellApplicationContainerLimitedWidth",!f);};V.prototype._popFromViewPortNavigationHistory=function(v,c){var n=this._oViewPortsNavigationHistory[v],a=n?n.visitedControls:[],i=a.indexOf(c);if(a.length>0){n.visitedControls=a.slice(i+1,n.visitedControls.length);n.indexOfCurrentlyDisplayedControl=n.visitedControls.length-1;}};V.prototype.addCenterViewPort=function(c){jQuery.sap.measure.start("FLP:ViewPortContainer.addCenterViewPort","addCenterViewPort","FLP");var i=this._isInCenterViewPort(c);c.toggleStyleClass("hidden",true);c.addStyleClass("sapUshellViewPortItemSlideFrom");if(!i){this.addAggregation('centerViewPort',c,true);}if(this.domRef&&!i){this.getRenderer().renderViewPortPart(c,this.domRef,'centerViewPort');}jQuery.sap.measure.end("FLP:ViewPortContainer.addCenterViewPort");};V.prototype.addLeftViewPort=function(c){c.toggleStyleClass("hidden",true);if(this.domRef){this.getRenderer().renderViewPortPart(c,this.domRef,'leftViewPort');}this.addAggregation('leftViewPort',c,true);};V.prototype.addRightViewPort=function(c){c.toggleStyleClass("hidden",true);if(this.domRef){this.getRenderer().renderViewPortPart(c,this.domRef,'rightViewPort');}this.addAggregation('rightViewPort',c,true);};V.prototype.setInitialCenterViewPort=function(c){var s=this._getCurrentlyDispalyedControl('centerViewPort'),i=this._isInCenterViewPort(c);c.addStyleClass("sapUshellViewPortItemSlideFrom");if(this.domRef&&!i){this.getRenderer().renderViewPortPart(c,this.domRef,'centerViewPort');}this._setCurrentlyDisplayedControl('centerViewPort',c);if(!i){this.addAggregation('centerViewPort',c,true);}this.setAssociation('initialCenterViewPort',c,true);if(s&&s!==c.getId()){this.fireAfterNavigate({fromId:s,from:sap.ui.getCore().byId(s),to:sap.ui.getCore().byId(c),toId:c.getId()});}};V.prototype._isInViewPort=function(v,c){var a=this.getAggregation(v),i=a?a.indexOf(c)>-1:false;return i;};V.prototype._isInCenterViewPort=function(c){return this._isInViewPort('centerViewPort',c);};V.prototype.getCurrentCenterPage=function(){return this._getCurrentlyDispalyedControl('centerViewPort');};V.prototype.navTo=function(v,c,t,d,T){jQuery.sap.measure.start("FLP:ShellController.navTo","navTo","FLP");var s=this._getCurrentlyDispalyedControl(v),a=this.getAggregation(v),b=a.some(function(e,i){if(e.getId()===c){return true;}});if(!b){jQuery.sap.log.error("ViewPort Container Error: Couldn't find target control");}else if(!s||s!==c){var o=sap.ui.getCore().byId(c);o.toggleStyleClass("hidden",false);var O=function(){this.fireAfterNavigate({toId:c,to:c?sap.ui.getCore().byId(c):null,fromId:s,from:s?sap.ui.getCore().byId(s):null});}.bind(this);this._setCurrentlyDisplayedControl(v,o,t,O);}jQuery.sap.measure.end("FLP:ShellController.navTo");};V.prototype._getCurrentlyDispalyedControl=function(v){var n=this._oViewPortsNavigationHistory[v];return n.visitedControls[n.indexOfCurrentlyDisplayedControl];};V.prototype._setCurrentlyDisplayedControl=function(v,c,t,o){jQuery.sap.measure.start("FLP:ViewPortContainer._setCurrentlyDisplayedControl","_setCurrentlyDisplayedControl","FLP");var n=this._oViewPortsNavigationHistory[v],a=n.visitedControls,s=this._getCurrentlyDispalyedControl(v),b=s?sap.ui.getCore().byId(s):null,T=(v==='centerViewPort'&&t)?t:'show';a.push(c.getId());n.indexOfCurrentlyDisplayedControl=jQuery.isNumeric(n.indexOfCurrentlyDisplayedControl)?n.indexOfCurrentlyDisplayedControl+1:0;this._handleViewPortTransition(v,T,c,b,o);this._sCurrentControlId=c.getId();jQuery.sap.measure.end("FLP:ViewPortContainer._setCurrentlyDisplayedControl");};V.prototype._handleViewPortTransition=function(v,t,T,c,o){if(v!=='centerViewPort'){return;}T.toggleStyleClass("hidden",false);if(c){c.toggleStyleClass("hidden");}if(o){o();}};V.prototype.switchState=function(s){var a=function(){var b,t=[],f=[],c,d=this;for(c=0;c<d._states[d.sCurrentState].visibleViewPortsData.length;c++){f.push(d._states[d.sCurrentState].visibleViewPortsData[c].viewPortId);}for(c=0;c<d._states[s].visibleViewPortsData.length;c++){t.push(d._states[s].visibleViewPortsData[c].viewPortId);}var i=0,e;for(e=0;e<f.length;e++){b=d.getAggregation(f[e]);if(b){for(i=0;i<b.length;i++){if(b[i].onViewStateHide){b[i].onViewStateHide();}}}}for(e=0;e<t.length;e++){b=d.getAggregation(t[e]);if(b){for(i=0;i<b.length;i++){if(b[i].onViewStateShow){b[i].onViewStateShow();}}}}}.bind(this);jQuery.sap.measure.start("FLP:switchState","start animiation flow","FLP1");switch(s){case"LeftCenter":this.meAreaShow(s);break;case"Center":this.centerAreaShow(s,a);break;case"RightCenter":this.notificationAreaShow(s);break;default:}var S=function(e){var c=parseInt(window.getComputedStyle(e.currentTarget).width,10);if(e.pageX>c){this.switchState('Center');}}.bind(this);var j=jQuery(this.domRef).find('.sapUshellViewPortLeft');if(s!=='Center')j.on('click',S);else j.off('click',S);this._handleSizeChange();};V.prototype.notificationAreaShow=function(s){this._areaShow(s,this._animateNotificationAreaShow.bind(this),this._animateMinimalNotificationAreaShow.bind(this),true);};V.prototype._notificationAreaClose=function(s){this._areaShow(s,this._animateNotificationAreaClose.bind(this),this._animateMinimalNotificationAreaClose.bind(this),false);};V.prototype.meAreaShow=function(s){this._areaShow(s,this._animateMeAreaShow.bind(this),this._animateMinimalMeAreaShow.bind(this),true);};V.prototype._meAreaClose=function(s){this._areaShow(s,this._animateMeAreaClose.bind(this),this._animateMinimalMeAreaClose.bind(this),false);};V.prototype.centerAreaShow=function(s,a){if(this.sCurrentState==="LeftCenter"){this._meAreaClose(s);}else if(this.sCurrentState==="RightCenter"){this._notificationAreaClose(s);}else{this._fireTransitionEnd(s);if(a){a();};}};jQuery.sap.measure.end("FLP:switchState");V.prototype._animateNotificationAreaShow=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd(s);this.setEnableResizeHandler(true);this.switchKeyframeAnimationDuration("0ms",[v.centerViewPort,v.rightViewPort]);v.centerViewPort.removeEventListener("animationend",t);v.centerViewPort.addEventListener('click',this.switchState.bind(this,"Center"));if(v.leftViewPort.classList.contains("sapUshellMeAreaShow")){v.leftViewPort.classList.remove("sapUshellMeAreaShow");v.leftViewPort.classList.remove("sapUshellMeAreaClose");v.leftViewPort.classList.add("sapUshellShellHidden");}}.bind(this);this.toggleMeAreaScrollBar(false);this.switchKeyframeAnimationDuration("480ms",[v.centerViewPort,v.rightViewPort,v.leftViewPort]);v.centerViewPort.classList.add("sapUshellDisableScroll");this.setEnableResizeHandler(false);v.centerViewPort.addEventListener("animationend",t,false);v.rightViewPort.classList.remove("sapUshellShellHidden");setTimeout(function(){if(v.leftViewPort.classList.contains("sapUshellMeAreaShow")){v.leftViewPort.classList.add("sapUshellMeAreaClose");v.centerViewPort.classList.add("sapUshellCenterLeft");v.centerViewPort.classList.remove("sapUshellCenterRight");v.rightViewPort.classList.remove("sapUshellNotificationAreaClose");}else{v.centerViewPort.classList.add("sapUshellSmallLeft");}v.rightViewPort.classList.add("sapUshellNotificationAreaShow");},0);};V.prototype._removeAllAnimationClasses=function(){var v=this._getViewPorts(),c=["sapUshellDisableScroll","sapUshellMeAreaShow","sapUshellMeAreaClose","sapUshellSmallRight","sapUshellSmallRightToLargeCenter","sapUshellNotificationAreaClose","sapUshellNotificationAreaShow","sapUshellCenterRight","sapUshellCenterLeft","sapUshellSmallLeft","sapUshellSmallLeftToLargeCenter"];for(var k in v){if(v.hasOwnProperty(k)){c.forEach(function(a){v[k].classList.remove(a);});}}};V.prototype._animateNotificationAreaClose=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd();this.setEnableResizeHandler(true);this._removeAllAnimationClasses();v.rightViewPort.classList.add("sapUshellShellHidden");v.centerViewPort.removeEventListener("animationend",t);v.centerViewPort.removeEventListener('click',this.switchState.bind(this,"Center"));}.bind(this);this.switchKeyframeAnimationDuration("480ms",[v.centerViewPort,v.rightViewPort]);this.setEnableResizeHandler(false);v.centerViewPort.addEventListener("animationend",t,false);setTimeout(function(){v.centerViewPort.classList.remove("sapUshellCenterLeft");v.centerViewPort.classList.remove("sapUshellCenterRight");v.rightViewPort.classList.add("sapUshellNotificationAreaClose");v.centerViewPort.classList.add("sapUshellSmallLeftToLargeCenter");},0);};V.prototype._leftViewPortOnClickHandler=function(e){var E=document.elementsFromPoint(e.x,e.y);E.every(function(a){if(a.classList.contains("sapUshellViewPortCenter")){this.switchState("Center");return false;}return true;}.bind(this));};V.prototype._animateMeAreaShow=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd(s);this.setEnableResizeHandler(true);this.toggleMeAreaScrollBar(true);this.switchKeyframeAnimationDuration("0ms",[v.centerViewPort,v.leftViewPort]);v.centerViewPort.classList.add("sapUshellDisableScroll");v.centerViewPort.removeEventListener("animationend",t);v.centerViewPort.addEventListener('click',this.switchState.bind(this,"Center"));if(v.rightViewPort.classList.contains("sapUshellNotificationAreaShow")){v.rightViewPort.classList.remove("sapUshellNotificationAreaShow");v.rightViewPort.classList.remove("sapUshellNotificationAreaClose");v.rightViewPort.classList.add("sapUshellShellHidden");}}.bind(this);this.switchKeyframeAnimationDuration("480ms",[v.centerViewPort,v.rightViewPort,v.rightViewPort]);this.setEnableResizeHandler(false);var m=sap.ui.getCore().byId("meArea");if(m){m.onViewStateShow();}v.centerViewPort.addEventListener("animationend",t,false);v.leftViewPort.classList.remove("sapUshellShellHidden");setTimeout(function(){if(v.rightViewPort.classList.contains("sapUshellNotificationAreaShow")){v.rightViewPort.classList.add("sapUshellNotificationAreaClose");v.centerViewPort.classList.add("sapUshellCenterRight");v.centerViewPort.classList.remove("sapUshellCenterLeft");v.leftViewPort.classList.remove("sapUshellMeAreaClose");}else{v.centerViewPort.classList.add("sapUshellSmallRight");}v.leftViewPort.classList.add("sapUshellMeAreaShow");},0);};V.prototype._animateMeAreaClose=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd();this.setEnableResizeHandler(true);this._removeAllAnimationClasses();v.centerViewPort.removeEventListener('click',this.switchState.bind(this,"Center"));v.leftViewPort.classList.add("sapUshellShellHidden");v.centerViewPort.removeEventListener("animationend",t);}.bind(this);this.switchKeyframeAnimationDuration("480ms",[v.centerViewPort,v.leftViewPort]);this.toggleMeAreaScrollBar(false);this.setEnableResizeHandler(false);v.centerViewPort.addEventListener("animationend",t,false);setTimeout(function(){v.centerViewPort.classList.remove("sapUshellCenterLeft");v.centerViewPort.classList.remove("sapUshellCenterRight");v.leftViewPort.classList.add("sapUshellMeAreaClose");v.centerViewPort.classList.add("sapUshellSmallRightToLargeCenter");},0);};V.prototype.toggleMeAreaScrollBar=function(s){document.getElementById('leftViewPort').classList.toggle("sapUshellMeAreaScrollable",s);};V.prototype.switchKeyframeAnimationDuration=function(d,D){D.forEach(function(i){i.style.animationDuration=d;});};V.prototype.setEnableResizeHandler=function(e){};V.prototype._animateMinimalNotificationAreaShow=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd(s);this.setEnableResizeHandler(true);this.toggleMeAreaScrollBar(true);v.viewPortContainer.removeEventListener("transitionend",t);}.bind(this);this.setEnableResizeHandler(false);v.viewPortContainer.addEventListener("transitionend",t,false);v.rightViewPort.classList.remove("sapUshellShellHidden");setTimeout(function(){v.viewPortContainer.classList.add("sapUshellMinimalNotificationAreaShow");v.viewPortContainer.classList.remove("sapUshellMinimalMeAreaShow");},0);};V.prototype._animateMinimalNotificationAreaClose=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd(s);this.setEnableResizeHandler(true);v.rightViewPort.classList.add("sapUshellShellHidden");v.viewPortContainer.removeEventListener("transitionend",t);v.viewPortContainer.classList.remove("sapUshellMinimalNotificationAreaClose");}.bind(this);this.toggleMeAreaScrollBar(false);this.setEnableResizeHandler(false);v.viewPortContainer.addEventListener("transitionend",t,false);setTimeout(function(){v.viewPortContainer.classList.add("sapUshellMinimalNotificationAreaClose");v.viewPortContainer.classList.remove("sapUshellMinimalNotificationAreaShow");},0);};V.prototype._animateMinimalMeAreaShow=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd(s);this.setEnableResizeHandler(true);this.toggleMeAreaScrollBar(true);v.viewPortContainer.removeEventListener("transitionend",t);}.bind(this);this.setEnableResizeHandler(false);v.viewPortContainer.addEventListener("transitionend",t,false);v.leftViewPort.classList.remove("sapUshellShellHidden");setTimeout(function(){v.viewPortContainer.classList.add("sapUshellMinimalMeAreaShow");v.viewPortContainer.classList.remove("sapUshellMinimalNotificationAreaShow");},0);};V.prototype._animateMinimalMeAreaClose=function(s){var v=this._getViewPorts(),t=function(e){this._fireTransitionEnd(s);this.setEnableResizeHandler(true);v.leftViewPort.classList.add("sapUshellShellHidden");v.viewPortContainer.classList.remove("sapUshellMinimalMeAreaClose");v.viewPortContainer.removeEventListener("transitionend",t);}.bind(this);this.toggleMeAreaScrollBar(false);this.setEnableResizeHandler(false);v.viewPortContainer.addEventListener("transitionend",t,false);setTimeout(function(){v.viewPortContainer.classList.add("sapUshellMinimalMeAreaClose");v.viewPortContainer.classList.remove("sapUshellMinimalMeAreaShow");},0);};V.prototype._areaShow=function(s,f,m,S){this.setCurrentState(s);if(this._getAnimationMode()==='full'){f(s);}else{m(S);}};V.prototype._handleSizeChange=function(){var a=this.getCurrentState(),v=this._states[a].visibleViewPortsData;if(v[0].viewPortId==="leftViewPort"){if(this.bIsRTL){var p=window.innerWidth-jQuery("#leftViewPort").width();jQuery("#leftViewPort").css("padding-left",p);jQuery("#viewPortCursorPointerArea").css("width",p);jQuery("#viewPortCursorPointerArea").css("left","0");}else{var b=window.innerWidth-jQuery("#leftViewPort").width();jQuery("#leftViewPort").css("padding-right",b);jQuery("#viewPortCursorPointerArea").css("width",b);jQuery("#viewPortCursorPointerArea").css("right","0");}}};V.prototype._getAnimationMode=function(){var m=this.getModel(),a;if(m){a=m.getProperty('/animationMode');}return a||'full';};V.prototype._fireTransitionEnd=function(s){if(!s){s=this.sCurrentState;}this.fireAfterSwitchStateAnimationFinished({to:s,from:this.sCurrentState});};V.prototype._getViewPorts=function(){var e=document.getElementById('viewPortContainer');if(e){return{viewPortContainer:e,leftViewPort:document.getElementById('leftViewPort'),centerViewPort:document.getElementById('centerViewPort-wrapper'),rightViewPort:document.getElementById('rightViewPort')}}};V.prototype.setCurrentState=function(s){var f=this.sCurrentState;this.sCurrentState=s;this.fireAfterSwitchState({to:s,from:f});};V.prototype.getCurrentState=function(){return this.sCurrentState;};V.prototype.getViewPortControl=function(v,d){var a=this.getAggregation(v),i;if(a){for(i=0;i<a.length;i++){if(a[i]&&(a[i].getId()===d)){return a[i];}}}return null;};V.prototype.getViewPort=function(p){var a=this.getCenterViewPort(),i;for(i=0;i<a.length;i++){if(a[i]&&(a[i].getId()===p)){return a[i];}}return null;};V.prototype.shiftCenterTransitionEnabled=function(e){this.bShiftCenterTransitionEnabled=e;};V.prototype.shiftCenterTransition=function(s){this.bShiftCenterTransition=s;};V.prototype.onAfterRendering=function(){this.domRef=this.getDomRef();this._handleSizeChange();};V.transitions=V.transitions||{};return V;});
