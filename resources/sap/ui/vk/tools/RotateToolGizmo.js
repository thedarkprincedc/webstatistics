/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","./Gizmo"],function(q,b,G){"use strict";var R=G.extend("sap.ui.vk.tools.RotateToolGizmo",{metadata:{library:"sap.ui.vk.tools",properties:{},publicMethods:["hasDomElement","getCoordinateSystem","setCoordinateSystem","rotate","adjustCameraClipPlanes","render"],events:{},associations:{},aggregations:{}}});R.prototype.init=function(){if(G.prototype.init){G.prototype.init.apply(this);}this._viewport=null;this._tool=null;this._sceneGizmo=new THREE.Scene();this._gizmo=new THREE.Group();this._touchAreas=new THREE.Group();this._sceneGizmo.add(this._gizmo);this._coordinateSystem=sap.ui.vk.tools.CoordinateSystem.Local;this._nodes=[];this._matViewProj=new THREE.Matrix4();this._gizmoSize=144;this._gizmoRotation=new THREE.Vector3();function c(e,f,r,s){var g=new THREE.TorusBufferGeometry(r,window.devicePixelRatio/288,4,s);if(e===0){g.rotateY(Math.PI/2);}else if(e===1){g.rotateX(Math.PI/2);}var h=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:f,transparent:true}));h.matrixAutoUpdate=false;h.userData.color=f;return h;}function a(e,r,s){var g=new THREE.TorusBufferGeometry(r,24/144,4,s);if(e===0){g.rotateY(Math.PI/2);}else if(e===1){g.rotateX(Math.PI/2);}return new THREE.Mesh(g,new THREE.MeshBasicMaterial({opacity:0.2,transparent:true}));}for(var i=0;i<3;i++){this._gizmo.add(c(i,0xFF<<8*(2-i),1,128));this._touchAreas.add(a(i,1,24));}this._gizmo.add(new THREE.AxisHelper(0.75));var d=new THREE.MeshBasicMaterial({color:0x0080FF,opacity:0.5,transparent:true,side:THREE.DoubleSide});this._arcMesh=new THREE.Mesh(new THREE.Geometry(),d);this._arcMesh.drawMode=THREE.TriangleFanDrawMode;this._arcMesh.visible=false;this._gizmo.add(this._arcMesh);this._axisTitles=this._createAxisTitles();this._sceneGizmo.add(this._axisTitles);};R.prototype.hasDomElement=function(){return false;};R.prototype.getCoordinateSystem=function(){return this._coordinateSystem;};R.prototype.setCoordinateSystem=function(c){this._coordinateSystem=c;var s=c===sap.ui.vk.tools.CoordinateSystem.Screen;this._gizmo.children[0].visible=this._gizmo.children[1].visible=!s;this._touchAreas.children[0].visible=this._touchAreas.children[1].visible=!s;this._axisTitles.visible=!s;};R.prototype.show=function(v,t){this._viewport=v;this._tool=t;this._nodes.length=0;};R.prototype.hide=function(){this._viewport=null;this._tool=null;};R.prototype.getGizmoCount=function(){if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Local){return this._nodes.length;}else{return this._nodes.length>0?1:0;}};R.prototype.getTouchObject=function(i){if(this._nodes.length===0){return null;}this._updateGizmoObjectTransformation(this._touchAreas,i);return this._touchAreas;};R.prototype.getGizmoObject=function(){return this._nodes.length>0?this._gizmo:null;};R.prototype.highlightHandle=function(a,h){for(var i=0;i<3;i++){var c=this._gizmo.children[i];var d=i===a?0xFFFF00:c.userData.color;c.material.color.setHex(d);c.material.opacity=a===-1||i===a?1:0.35;c.material.visible=h||i===a;}this._axisTitles.children.forEach(function(o,i){o.material.color.setHex(i===a?0xFFFF00:o.userData.color);o.material.opacity=a===-1||i===a?1:0.35;o.material.visible=h||i===a;});};R.prototype.beginGesture=function(){this._updateSelection(this._viewport._viewStateManager);this._matOrigin=this._gizmo.matrixWorld.clone();this._nodes.forEach(function(n){n.node.parent.updateMatrixWorld(true);n.matOrigin=n.node.matrixWorld.clone();n.matLocalOrigin=n.node.matrix.clone();n.matParentInv=new THREE.Matrix4().getInverse(n.node.parent.matrixWorld);n.quaternion=n.node.quaternion.clone();});};R.prototype.endGesture=function(){this._arcMesh.visible=false;this._tool.fireRotated({x:this._gizmoRotation.x,y:this._gizmoRotation.y,z:this._gizmoRotation.z});};R.prototype._rotate=function(e){this._gizmoRotation.set(THREE.Math.radToDeg(e.x),THREE.Math.radToDeg(e.y),THREE.Math.radToDeg(e.z));var a=new THREE.Quaternion();if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Local){a.setFromEuler(e);this._nodes.forEach(function(h){h.node.quaternion.copy(h.quaternion).multiply(a);h.node.matrixWorldNeedsUpdate=true;});this._viewport._updateBoundingBoxesIfNeeded();}else{e=e.toArray();for(var i=0;i<3;i++){var c=e[i];if(c){var d=e[3].charCodeAt(i)-88;if(d>=0&&d<3){var f=new THREE.Vector3().setFromMatrixColumn(this._matOrigin,d).normalize();var m=new THREE.Matrix4().makeRotationAxis(f,c);var p=new THREE.Vector3().setFromMatrixPosition(this._matOrigin);m.setPosition(p.sub(p.clone().applyMatrix4(m)));for(var n=0,g=this._nodes.length;n<g;n++){var h=this._nodes[n];if(!h.ignore){var j=h.node;j.position.setFromMatrixPosition(h.matOrigin).applyMatrix4(m).applyMatrix4(h.matParentInv);var s=new THREE.Vector3().setFromMatrixScale(h.matOrigin);var l=f.clone().transformDirection(new THREE.Matrix4().getInverse(h.matOrigin)).multiply(s).normalize();a.setFromAxisAngle(l,c);j.quaternion.copy(h.quaternion).multiply(a);j.matrixWorldNeedsUpdate=true;}}}}}}this._viewport._updateBoundingBoxesTransformation();this._viewport.setShouldRenderFrame();};R.prototype._setRotationAxisAngle=function(c,d,e){var f=e-d;if(Math.abs(f)>Math.PI){f-=Math.PI*2*Math.sign(f);}var g=[0,0,0];g[c]=f;g=new THREE.Euler().fromArray(g);if(this._tool.fireEvent("rotating",{x:THREE.Math.radToDeg(g.x),y:THREE.Math.radToDeg(g.y),z:THREE.Math.radToDeg(g.z)},true)){this._rotate(g);var v=[0,0,0];var h=new THREE.Vector3();var j=(c+1)%3,k=(c+2)%3;var n=Math.max(Math.ceil(Math.abs(f)*64/Math.PI),1);f*=this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Local?-1:1;for(var i=0;i<=n;i++){var a=d+f*(i/n);h.set(0,0,0).setComponent(j,Math.cos(a)).setComponent(k,Math.sin(a));v.push(h.x,h.y,h.z);}this._arcMesh.geometry=new THREE.BufferGeometry().addAttribute("position",new THREE.Float32BufferAttribute(v,3));this._arcMesh.visible=true;}};R.prototype.rotate=function(a){this.beginGesture();this._rotate(new THREE.Euler(THREE.Math.degToRad(a.x||0),THREE.Math.degToRad(a.y||0),THREE.Math.degToRad(a.z||0)));};R.prototype.adjustCameraClipPlanes=function(c){this._adjustCameraClipPlanes(c.getCameraRef());};R.prototype.render=function(){this._updateSelection(this._viewport._viewStateManager);if(this._nodes.length>0){var r=this._viewport.getRenderer(),c=this._viewport.getCamera().getCameraRef();this._matViewProj.multiplyMatrices(c.projectionMatrix,new THREE.Matrix4().getInverse(c.matrixWorld));r.clearDepth();for(var i=0,l=this.getGizmoCount();i<l;i++){var s=this._updateGizmoObjectTransformation(this._gizmo,i);this._updateAxisTitles(this._axisTitles,this._gizmo,c,this._gizmoSize-18,s);r.render(this._sceneGizmo,c);}}};R.prototype.onBeforeRendering=function(){};R.prototype.onAfterRendering=function(){};return R;},true);
