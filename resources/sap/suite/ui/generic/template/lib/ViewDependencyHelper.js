sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/js/AnnotationHelper","sap/suite/ui/generic/template/lib/testableHelper"],function(B,A,t){"use strict";function g(T){function s(E){E=E||[];for(var i in T.componentRegistry){if(E.indexOf(i)===-1){var C=T.componentRegistry[i];C.oComponent.setIsRefreshRequired(true);}}}function a(C,n,l){var p,P,m=T.componentRegistry;var M=C.getId();var o=T.componentRegistry[M];var r=o.routeConfig;if(r){if(r.viewLevel===0){return false;}else{for(var f in m){if(f!==M){p=m[f].routeConfig;if(p&&p.viewLevel===(r.viewLevel-1)&&(r.viewLevel===1||p.entitySet===r.parentEntitySet)){P=m[f].oComponent;b(P,n);if(!l||l>1){var S;S=l&&l-1;a(P,undefined,S);}break;}}}}}}function b(C,n){if(n){var r=T.componentRegistry[C.getId()];var R=r.oGenericData.mRefreshInfos;R[n]=true;if(r.utils.isComponentActive()){(r.methods.refreshBinding||jQuery.noop)(false,r.oGenericData.mRefreshInfos);r.oGenericData.mRefreshInfos={};}}else{if(typeof C.setIsRefreshRequired==="function"){C.setIsRefreshRequired(true);}}}function c(C){var f=[];var r=T.componentRegistry[C.getId()].routeConfig;for(var o in T.componentRegistry){var O=T.componentRegistry[o];var h=O.routeConfig;if(r.viewLevel+1===h.viewLevel&&r.entitySet===h.parentEntitySet){f.push(O.oComponent);}}return f;}function d(C){var S=[];var f=c(C);for(var i=0;i<f.length;i++){S=S.concat(d(f[i]));}return S.concat(f);}function u(C,f){var S=d(C);for(var i=0;i<S.length;i++){T.componentRegistry[S[i].getId()].oComponent.getComponentContainer().unbindElement();}if(f){C.getComponentContainer().unbindElement();}}function e(){if(T.rootContainer){var i=T.rootContainer.getComponentInstance();if(i&&typeof i.setIsRefreshRequired==="function"){i.setIsRefreshRequired(true);}}}var a=t.testable(a,"setParentToDirty");return{setAllPagesDirty:s,setParentToDirty:a,setMeToDirty:b,unbindChildren:u,setRootPageToDirty:e};}return B.extend("sap.suite.ui.generic.template.lib.ViewDependencyHelper",{constructor:function(T){jQuery.extend(this,g(T));}});});