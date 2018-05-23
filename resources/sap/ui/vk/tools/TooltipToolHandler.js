/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/EventProvider"],function(q,E){"use strict";var T=E.extend("sap.ui.vk.tools.TooltipToolHandler",{metadata:{publicMethods:["hover","beginGesture","move","endGesture","click","doubleClick","contextMenu"]},constructor:function(t){this._tool=t;this._rect=null;this._rayCaster=new THREE.Raycaster();this._mouse=new THREE.Vector2();}});T.prototype.destroy=function(){this._tool=null;this._rect=null;};T.prototype._updateMouse=function(e){var s=this.getViewport().getRenderer().getSize();this._mouse.x=((e.x-this._rect.x)/s.width)*2-1;this._mouse.y=((e.y-this._rect.y)/s.height)*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef());};T.prototype.hover=function(e){var g=this._tool.getGizmo();if(g&&this._inside(e)){this._updateMouse(e);var i=this._rayCaster.intersectObject(this.getViewport().getScene().getSceneRef(),true);g.update(e.x-this._rect.x,e.y-this._rect.y,e.x,e.y,i.length>0?i[0].object:null);e.handled=i.length>0;}};T.prototype.beginGesture=function(e){};T.prototype.move=function(e){};T.prototype.endGesture=function(e){};T.prototype.click=function(e){};T.prototype.doubleClick=function(e){};T.prototype.contextMenu=function(e){};T.prototype.getViewport=function(){return this._tool._viewport;};T.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};T.prototype._inside=function(e){var i=this._tool._viewport.getIdForLabel();var d=document.getElementById(i);if(d==null){return false;}var o=this._getOffset(d);this._rect={x:o.x,y:o.y,w:d.offsetWidth,h:d.offsetHeight};return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};return T;},true);
