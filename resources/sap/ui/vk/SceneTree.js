/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/table/TreeTable","sap/ui/table/Column","sap/ui/model/json/JSONModel","sap/m/Title","./CheckEye","./ContentConnector","./ViewStateManager"],function(q,l,C,T,a,J,b,c,d,V){"use strict";var S=C.extend("sap.ui.vk.SceneTree",{metadata:{library:"sap.ui.vk",aggregations:{_tree:{type:"sap.ui.table.TreeTable",multiple:false,visibility:"hidden"}},associations:{contentConnector:{type:"sap.ui.vk.ContentConnector",multiple:false},viewStateManager:{type:"sap.ui.vk.ViewStateManager",multiple:false}}}});var g=function(i,s){return sap.ui.vk.getResourceBundle().getText(i?"SCENETREE_VISIBILITYSTATEVISIBLE":"SCENETREE_VISIBILITYSTATEHIDDEN");};S.prototype._createNodeForSceneTree=function(n,e,v){var f=v.getVisibilityState(e);return{name:n,id:e,visible:f,checkEyeTooltip:g(f,this)};};S.prototype.setScene=function(s,v){this.setViewStateManager(v);this._setScene(s);};S.prototype._setScene=function(s){this._scene=s;this.refresh();};S.prototype.init=function(){if(C.prototype.init){C.prototype.init.apply(this);}var _=new b({text:sap.ui.vk.getResourceBundle().getText("SCENETREE_TITLE"),tooltip:sap.ui.vk.getResourceBundle().getText("SCENETREE_TITLE")});_.onAfterRendering=function(){var $=this.$();$.addClass("sapUiVkTitle");};this._visibilityColumnHeader=new c({checked:true,tooltip:g(true,this),change:function(e){var i=e.getParameters("checked").checked;this.setTooltip(g(i,this));this._toggleVisibilityForAllChildren(this._model.getData(),i);}.bind(this)});this._tree=new T({title:_,columnHeaderHeight:32,columns:[new a({label:sap.ui.vk.getResourceBundle().getText("SCENETREE_NAME"),tooltip:sap.ui.vk.getResourceBundle().getText("SCENETREE_NAME"),template:new sap.m.Text({text:"{name}",maxLines:1,tooltip:"{name}"}),resizable:false}),new a({label:this._visibilityColumnHeader,template:new c({checked:"{visible}",tooltip:"{checkEyeTooltip}"}),width:"2.7em",resizable:false,hAlign:"Center"})],selectionMode:"MultiToggle",selectionBehavior:"RowSelector",visibleRowCountMode:"Fixed",expandFirstLevel:false,collapseRecursive:true,rowHeight:32});this.setAggregation("_tree",this._tree,true);this._model=new J();this._tree.setModel(this._model);this._tree.bindRows({path:"/"});this._tree.attachRowSelectionChange(this._nodeSelection.bind(this));this._tree.getBinding("rows").attachChange(this._dataChange.bind(this));this._scene=null;this._syncing=false;this._selected={};this._toggled={};this._vsmSelected={};this._forwardTimer=0;this._reverseTimer=0;this._vSyncing=false;this._lastChangeIsExpand=false;this._forwardVTimer=0;this._reverseVTimer=0;this._scrollTimer=0;this._totalNodes=null;};S.prototype.onBeforeRendering=function(){this._tree.setVisible(true);};S.prototype._pathToNode=function(p,e,t){p=p.substr(1);if(e==undefined){e=this._model.getData();}var n=e;var f=n;var h="";while(p.length>0){var i=p.indexOf("/");if(i>=0){h=p.substr(0,i);p=p.substr(i+1);}else{h=p;p="";}f=n;n=f[h];}if(t!=undefined){f[h]=t;}return n;};S.prototype._indexToNodeRef=function(i){var e=this._tree.getContextByIndex(i);if(e){var n=this._pathToNode(e.sPath,e.oModel.oData);return n.id;}else{return null;}};S.prototype._deselectHidden=function(){var v=this._vsmSelected;var e=this._viewStateManager;var f=[];var u={};for(var i=0;;i++){var r=this._indexToNodeRef(i);if(r==null){break;}if(v.hasOwnProperty(r)){u[r]=true;}}for(var k in v){if(v.hasOwnProperty(k)&&v[k]==true&&!u.hasOwnProperty(k)&&k!=""){f.push(k);v[k]=false;}}if(f.length>0){this._syncing=true;e.setSelectionState(f,false,false);this._syncing=false;}};S.prototype._nodeSelection=function(e){if(this._tree.getBinding("rows")._aSelectedContexts!=undefined){return;}if(!this._syncing){if(this._forwardTimer>0){clearTimeout(this._forwardTimer);}var p=e.mParameters;var f=p.rowIndices;var h=this._tree.getSelectedIndices();if(f.length>=1&&h.length==1){if(f.indexOf(h[0])!=-1){this._deselectHidden();}}for(var i=0;i<f.length;i++){var j=f[i];if(this._toggled.hasOwnProperty(j)){this._toggled[j]=!this._toggled[j];}else{this._toggled[j]=true;}if(!this._selected.hasOwnProperty(j)){this._selected[j]=false;}}this._forwardTimer=setTimeout(this._resyncSelectionForward.bind(this,f),100);}};S.prototype._handleSelectionChanged=function(e){if(!this._syncing){if(this._reverseTimer>0){clearTimeout(this._reverseTimer);}var s=e.mParameters.selected;var f=e.mParameters.unselected;for(var i=0;i<f.length;i++){if(this._vsmSelected[f[i]]!=undefined){delete this._vsmSelected[f[i]];}}for(var j=0;j<s.length;j++){this._vsmSelected[s[j]]=true;}if(s.length==1){this._expandToNode(s[0],this._resyncSelectionReverse.bind(this));}else{this._reverseTimer=setTimeout(this._resyncSelectionReverse.bind(this),100,true);}}};S.prototype._resyncSelectionForward=function(t){this._forwardTimer=0;if(this._syncing){return false;}this._syncing=true;for(var i in this._selected){if(this._selected.hasOwnProperty(i)){var r=this._indexToNodeRef(parseInt(i,10));if(r==null||r==""){continue;}var e=this._selected[i];if(this._toggled[i]){e=!e;}if(t.indexOf(parseInt(i,10))!==-1){this._viewStateManager.setSelectionState(r,e,false);if(!e){var n=this._viewStateManager.getNodeHierarchy();var f=n.getAncestors(r);var p=f[f.length-1];if(this._viewStateManager.getSelectionState(p)){this._viewStateManager.setSelectionState(p,false);var s=this._tree.getSelectedIndices();for(var j=0,h=s.length;j<h;j++){var k=s[j];if(p===this._indexToNodeRef(k)){this._selected[k]=false;this._tree.removeSelectionInterval(k,k);break;}}this._vsmSelected[p]=false;}}}this._selected[i]=e;this._vsmSelected[r]=e;}}this._toggled={};this._syncing=false;};S.prototype._resyncSelectionReverse=function(s){this._reverseTimer=0;if(this._syncing){return;}this._syncing=true;var v=this._viewStateManager;var t=this._tree;var e=0;this._selected={};for(var i=0;;i++){var r=this._indexToNodeRef(i);if(r==null||r==""){break;}var f=v.getSelectionState(r);if(f){this._selected[i]=true;e++;}if(f!=t.isIndexSelected(i)){if(f){t.addSelectionInterval(i,i);}else{t.removeSelectionInterval(i,i);}}}this._syncing=false;};S.prototype._expandToNode=function(n,e){var t=this._totalNodes;var f=function(r,u){u.forEach(function(v){r=r[v];});return r;};var h=function(r,u,v){var w;if((u<r)||(u>=(r+v))){w=u-(v/2);}else{w=r;}w=w>0?Math.floor(w):0;return w;};var s=function(r,u){var v=r.getVisibleRowCount(),w=r.getFirstVisibleRow(),x=h(w,u,v);if(x!==w){r.setFirstVisibleRow(x);}};var i=function(r,n){var u=null,v;for(var w=0;w<t;w++){v=r.getContextByIndex(w);if(v){var x=v.getPath().split("/");x.shift();var y=v.getModel().getData();if(f(y,x).id===n){u=w;break;}}}return u;};var j=this._scene.getDefaultNodeHierarchy(),k=j.getAncestors(n);var m=function(r,u,k,v){if(v.getParameter("reason")==="expand"){r(u,k);}};var o;var p=function(r,k){setTimeout(function(){if(k.length){var u=k.shift();var v=i(r,u);if(v!==null){r.expand(v);}}else{var w=i(r,n);if(w!==null){s(r,w);r.getBinding("rows").detachChange(o);e();}}},70);};o=m.bind(this,p,this._tree,k);this._tree.getBinding("rows").attachChange(o);p(this._tree,k);};S.prototype._dataChange=function(e){if(this._viewStateManager==null||this._scene==null||this._vSyncing){return;}if(this._lastChangeIsExpand){this._lastChangeIsExpand=false;return;}if(this._forwardVTimer>0){clearTimeout(this._forwardVTimer);}this._forwardVTimer=setTimeout(this._resyncVisibilityForward.bind(this),100);};S.prototype._resyncVisibilityForward=function(){if(!this._vSyncing){this._vSyncing=true;this._forwardVTimer=0;this._setNodeVisibilityRecursive(this._model.getData(),this._viewStateManager);this._vSyncing=false;}};S.prototype._enumerateChildrenIntoArray=function(n,e){var f=this._scene.getDefaultNodeHierarchy();f.enumerateChildren(n,function(p){var r=p.getNodeRef();e.push(r);if(p.getHasChildren()){this._enumerateChildrenIntoArray(r,e);}});};S.prototype._setNodeVisibilityRecursive=function(n,v){if(n.id!=null&&v.getVisibilityState(n.id)!=n.visible){v.setVisibilityState(n.id,n.visible,true);if(n[0]!==undefined||n.hasOwnProperty("children")){if(this._reverseVTimer>0){clearTimeout(this._reverseVTimer);}this._reverseVTimer=setTimeout(this._resyncVisibilityReverse.bind(this),100);}}else{var e=n.hasOwnProperty("children")?n.children:n;for(var i=0;e[i]!=null;i++){this._setNodeVisibilityRecursive(e[i],v);}}};S.prototype._toggleVisibilityForAllChildren=function(n,e){var f=n.hasOwnProperty("children")?n.children:n;for(var i=0;f[i]!=null;i++){this._viewStateManager.setVisibilityState(f[i].id,e,true);}};S.prototype._handleVisibilityChanged=function(e){if(!this._vSyncing){if(this._reverseVTimer>0){clearTimeout(this._reverseVTimer);}this._reverseVTimer=setTimeout(this._resyncVisibilityReverse.bind(this),100);}};S.prototype._resyncVisibilityReverse=function(){if(!this._vSyncing){this._vSyncing=true;this._forwardVTimer=0;this._getNodeVisibilityRecursive(this._model.getData(),this._viewStateManager);this._tree.getModel().refresh(true);this._vSyncing=false;}};S.prototype._getNodeVisibilityRecursive=function(n,v){if(n.id!=null){n.visible=v.getVisibilityState(n.id);n.checkEyeTooltip=g(n.visible,this);}var e=n.hasOwnProperty("children")?n.children:n;for(var i=0;e[i]!=null;i++){this._getNodeVisibilityRecursive(e[i],v);}};S.prototype.updateHeight=function(h){this._tree.setVisibleRowCount(Math.floor(h/this._tree.getRowHeight())-2);};S.prototype.refresh=function(){if(this._scene==null||!this._viewStateManager||!this._viewStateManager.getNodeHierarchy()){this._model.setData([]);return;}var n=this._scene.getDefaultNodeHierarchy();var t=[];this._totalNodes=0;var e=function(t,f){f.forEach(function(h,i){var j=n.createNodeProxy(h);var k=this._createNodeForSceneTree(j.getName(),j.getNodeRef(),this._viewStateManager);t[i]=k;n.destroyNodeProxy(j);this._totalNodes++;k.children=[];e.bind(this)(k.children,n.getChildren(h));}.bind(this));};e.bind(this)(t,n.getChildren());this._model.setData(t);this._tree.setModel(this._model);this._tree.bindRows({path:"/",parameters:{arrayNames:["children"]}});this._tree.getBinding("rows").attachChange(this._dataChange.bind(this));this._visibilityColumnHeader.setChecked(true);this._visibilityColumnHeader.setTooltip(g(true,this));};S.prototype._onBeforeClearContentConnector=S.prototype._onBeforeClearViewStateManager=function(){this._setScene(null);};S.prototype._onAfterUpdateContentConnector=S.prototype._onAfterUpdateViewStateManager=function(){if(this._contentConnector){this._setContent(this._contentConnector.getContent());}};S.prototype._setContent=function(e){var s=null;if(e){s=e.scene;}this._setScene(s);};S.prototype._handleContentReplaced=function(e){this._setContent(e.getParameter("newContent"));};S.prototype._handleNodeHierarchyReplaced=function(e){this._setScene(this._scene);};S.prototype._handleContentChangesFinished=function(e){this.refresh();};d.injectMethodsIntoClass(S);V.injectMethodsIntoClass(S);return S;},true);
