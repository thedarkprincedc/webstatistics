jQuery.sap.declare("sap.zen.crosstab.rendering.PixelScrollManager");
sap.zen.crosstab.rendering.PixelScrollManager=function(c,r){"use strict";var s={};var C=0;var i=0;var o=r.getCrossRequestManager();var t=this;var u=null;this.getCurrentHScrollPos=function(){return i;};this.destroy=function(){};this.onNewScrollbars=function(){s={};};r.registerNewScrollbarsNotification(this.onNewScrollbars);function g(S){var D=s[S];if(!D){D=$(document.getElementById(c.getId()+S));if(D&&D.length>0){s[S]=D;}}return D;}function m(p){g("_lowerLeft_scrollDiv").scrollTop(p);g("_lowerRight_scrollDiv").scrollTop(p);}function a(p){var A;var l=g("_lowerRight_scrollDiv");var U=g("_upperRight_scrollDiv");var D;var R={};R.oLRS=l;R.oURS=U;if(U[0]){D=U[0];}else if(l[0]){D=l[0];}if(D){A=c.getUtils().translateScrollLeft(D,p);}R.iPos=A;return R;}function b(p){var M=a(p);M.oURS.scrollLeft(M.iPos);M.oLRS.scrollLeft(M.iPos);}this.hScrollHandler=function(E){c.postPlanningValue();var p=E.getParameters().newScrollPos;b(p);i=p;t.sendClientScrollPosUpdate();};this.vScrollHandler=function(E){c.postPlanningValue();var p=E.getParameters().newScrollPos;m(p);C=p;t.sendClientScrollPosUpdate();};this.sendClientScrollPosUpdate=function(){if(u){clearTimeout(u);u=null;}u=setTimeout(t.doSendPosUpdate,200,null);};this.doSendPosUpdate=function(){c.getUtils().sendClientScrollPosUpdate(i,undefined,C,undefined);};function d(p){var h=c.getHScrollbar();var M=a(p);if(h){h.setScrollPosition(p);}M.oURS.scrollLeft(M.iPos);M.oLRS.scrollLeft(M.iPos);}function e(p){var v=c.getVScrollbar();if(v){v.setScrollPosition(p);}var D=$(document.getElementById(c.getId()+"_lowerRight_scrollDiv"));if(D&&D.length){D.scrollTop(p);}var f=$(document.getElementById(c.getId()+"_lowerLeft_scrollDiv"));if(f&&f.length){f.scrollTop(p);}}this.moveScrollbars=function(S,R,p,f){d(i);e(C);};this.positionHScrollDiv=function(){var p=i;var n=o.getHPixelScrollPosAfterRendering();if(n>-1){p=n;d(p);}b(p);};this.positionVScrollDiv=function(l){var p=C;var n=o.getVPixelScrollPosAfterRendering();if(n>-1){p=n;e(p);}m(p);};this.setHScrollPos=function(h){i=h;};this.setVScrollPos=function(v){C=v;};this.adjustPixelScrollbarAfterRendering=function(){var n=o.getNewPixelScrollPosAfterRendering();if(n){var v=n.iVPos;if(v>=0){oVScrollbar=c.getVScrollbar();if(oVScrollbar){oVScrollbar.setScrollPosition(v);m(v);}}var h=n.iHPos;if(h>=0){oHScrollbar=c.getHScrollbar();if(oHScrollbar){oHScrollbar.setScrollPosition(h);b(h);}}}};};