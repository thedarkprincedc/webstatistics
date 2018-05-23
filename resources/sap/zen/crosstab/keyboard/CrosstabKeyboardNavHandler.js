jQuery.sap.declare("sap.zen.crosstab.keyboard.CrosstabKeyboardNavHandler");jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");
sap.zen.crosstab.keyboard.CrosstabKeyboardNavHandler=function(c,E){"use strict";var f=-1;var F=-1;var o=-1;var O=-1;var n=0;var N=0;var t=this;var b=false;var d=c.getDataArea();this.reset=function(){this.disableCell(f,F);this.disableCell(o,O);f=-1;F=-1;o=-1;O=-1;n=0;N=0;};this.setEnabled=function(p){b=p;};this.attachEvents=function(j){if(!b){return;}j.off("keydown",this.keyboardNavKeyHandler);j.on("keydown",this.keyboardNavKeyHandler);j.attr("tabindex",sap.zen.crosstab.rendering.RenderingConstants.TABINDEX);};this.getFocusScrollDiv=function(C){var D=null;if(C.getArea().isDataArea()||C.getArea().isColHeaderArea()){D=document.getElementById(c.getId()+'_lowerRight_scrollDiv');}else if(C.getArea().isRowHeaderArea()){D=document.getElementById(c.getId()+'_lowerLeft_scrollDiv');}return D;};this.movePixelCellIntoFocus=function(C,D,s,u,l,e){var h=false;var g=c.getUtils().getRtlAwareBoundingClientRect(D);var S=s.width;var i=g.width;var j=s.height;var k=g.height;if(i<S){if(g.end>s.end){var m=c.getHScrollbar().getScrollPosition();c.scrollHorizontal(m+g.end-s.end);h=true;}else if(g.begin<s.begin){var m=c.getHScrollbar().getScrollPosition();c.scrollHorizontal(m-(s.begin-g.begin));h=true;}}if(u||l||e){if(k<j){if(g.bottom>s.bottom){var m=c.getVScrollbar().getScrollPosition();c.scrollVertical(m+g.bottom-s.bottom);h=true;}else if(g.top<s.top){var m=c.getVScrollbar().getScrollPosition();c.scrollVertical(m-(s.top-g.top));h=true;}}else{var m=c.getVScrollbar().getScrollPosition();c.scrollVertical(m-(s.top-g.top));h=true;}}return h;};this.moveRowHeaderAreaCellHorizontally=function(C,D){var s=c.getUtils().getRtlAwareBoundingClientRect(document.getElementById(c.getId()+"_lowerLeft_scrollDiv"));var e=c.getUtils().getRtlAwareBoundingClientRect(D);var S=s.width;var i=e.width;var h=c.getHorizontalHeaderScrollbar();if(i<S){if(e.end>s.end){var g=h.getScrollPosition();c.scrollHeaderHorizontal(g+e.end-s.end);}else if(e.begin<s.begin){var g=h.getScrollPosition();c.scrollHeaderHorizontal(g-(s.begin-e.begin));}}};this.moveRowColCellIntoFocus=function(C,D,s,u,l,e){var h=false;var g=c.getUtils().getRtlAwareBoundingClientRect(D);var S=s.width;var i=g.width;var r=c.getDataArea().getRenderStartCol();var R=c.getDataArea().getRenderStartRow();var m=c.getDataArea().getRowCnt()-1;if(C.getArea().isDataArea()||C.getArea().isColHeaderArea()){var H=c.getHScrollbar();if(H){if(i<S){if(g.end>s.end){c.scrollHorizontal(r+1);h=true;}else if(g.begin<s.begin){c.scrollHorizontal(r-1);h=true;}}}}if(c.isHeaderHScrolling()===true&&C.getArea().isRowHeaderArea()){this.moveRowHeaderAreaCellHorizontally(C,D);}if(R===C.getTableRow()-c.getTableFixedColHeaderRowCnt()){return h;}if(C.getArea().isDataArea()||(C.getArea().isRowHeaderArea()&&u)||l||e){var v=c.getVScrollbar();if(v){var j=c.getDataArea().getRenderRowCnt();var k=v.getScrollPosition();var p=C.getTableRow()-c.getTableFixedColHeaderRowCnt();if(p<R){c.scrollVertical(p);h=true;}else if(p+C.getRowSpan()>(R+j)){var q=R+j-C.getRow();var w=C.getRowSpan()-q;var x=Math.max(0,Math.min(k+w+1,m));if(w!==0){c.scrollVertical(x);h=true;}R=c.getDataArea().getRenderStartRow();if(R>p){c.scrollVertical(p);h=true;}}R=c.getDataArea().getRenderStartRow();if(R===C.getTableRow()-c.getTableFixedColHeaderRowCnt()){return h;}if(h){D=document.getElementById(C.getId());g=c.getUtils().getRtlAwareBoundingClientRect(D);k=v.getScrollPosition();}if(g.bottom>s.bottom){while(g.bottom>s.bottom&&k<m){c.scrollVertical(Math.min(k+1,m));k=v.getScrollPosition();D=document.getElementById(C.getId());g=c.getUtils().getRtlAwareBoundingClientRect(D);h=true;}}else if(g.top<s.top){c.scrollVertical(Math.max(0,k-1));h=true;}}}return h;};this.getCellIntoDom=function(C,e,g){var i=0;if(N===0){var h=c.getHScrollbar();if(h&&!g){if(n>0){i=h.getScrollPosition()+e.getColSpan();}else if(n<0){i=C.getTableCol()-c.getTableFixedRowHeaderColCnt();}c.scrollHorizontal(i);}}else if(n==0){var v=c.getVScrollbar();if(v){if(N>0){i=v.getScrollPosition()+e.getRowSpan();}else{if(N<0){i=C.getTableRow()-c.getTableFixedColHeaderRowCnt();}}c.scrollVertical(i);}}};this.getRowLookAheadCell=function(C){var l=null;var T=null;var m=0;var M=0;if(C.getRowSpan()>1){if(n>0){M=C.getTableCol();m=c.getRenderStartCol()+c.getRenderColCnt()+c.getTableFixedRowHeaderColCnt();for(var i=M;i<=m;i++){T=c.getTableCellWithSpans(f,i);if(T.getRowSpan()===1){l=T;break;}else{if(l){if(T.getRowSpan()<l.getRowSpan()){l=T;}}else{l=T;}}}}}else{l=C;}return l;};this.scrollCellIntoFocus=function(C,u,e,g){var l=C;var L=false;if(!u&&C.getArea().isRowHeaderArea()&&e===true&&c.getVScrollbar()&&!c.isHeaderHScrolling()){if(n>0&&N===0){l=this.getRowLookAheadCell(C);}}if(l!==C){C=l;L=true;}var D=this.getFocusScrollDiv(C);if(!D){return false;}var h=false;var i=c.getPropertyBag().isPixelScrolling();var j=document.getElementById(C.getId());if(!j&&!i){this.getCellIntoDom(C,g,e);}if(!j){return false;}var s=c.getUtils().getRtlAwareBoundingClientRect(D);if(i){h=this.movePixelCellIntoFocus(C,j,s,u,L,e);}else{h=this.moveRowColCellIntoFocus(C,j,s,u,L,e);}return h;};this.keyboardNavKeyHandler=function(e){if(f>-1&&F>-1){n=0;N=0;if(e.which===9){n=1;}else if(e.which===38){N=-1;}else if(e.which===40){N=1;}else if(e.which===37){n=-1;}else if(e.which===39){n=1;}if(n===0&&N===0){return true;}else{if(!c.hasLoadingPages()){t.moveCellFocus();}sap.zen.crosstab.utils.Utils.cancelEvent(e);return false;}}return true;};this.restoreFocusOnCell=function(){if(!b){return;}if(f>-1&&F>-1&&!c.hasLoadingPages()){var r=c.getTableCellWithSpans(f,F);if(r&&!r.isLoading()){this.disableCell(o,O);this.navigateToCellAction(r,-1,-1);}}};function a(j,D){var x=D.scrollLeft;var y=D.scrollTop;j.focus();if(D.scrollLeft!==x){D.scrollLeft=x;}if(D.scrollTop!==y){D.scrollTop=y;}}this.navigateToCellAction=function(C,s,S){var j=null;var J=null;var D=null;var e=null;j=$(document.getElementById(C.getId()));j.addClass("sapzencrosstab-CellFocus");J=$(document.getElementById(C.getId()+"_contentDiv"));e=j.find("#"+$.sap.encodeCSS(C.getId()+"_textContentDiv"));if(!C.isEntryEnabled()){D=this.getFocusScrollDiv(C);if(e.length>0){J=e;}if($.browser.mozilla){a(J,D);}var g=J[0];if(g&&s===-1&&S===-1){sap.zen.crosstab.utils.Utils.selectTextInElement(g);}a(J,D);}else{E.provideInputEnabledCell(C,C.getId(),J,s,S);}};this.navigateFromCellAction=function(C){var j=$(document.getElementById(C.getId()));if(j.length>0){j.removeClass("sapzencrosstab-CellFocus");}var i=j.find("input");i.focusout();};this.focusNewCell=function(C,s,S){if(!b){return false;}if(!C){return false;}var h=false;if(f>-1&&F>-1){this.disableCell(f,F);}f=C.getTableRow();F=C.getTableCol();o=f;O=F;var v=c.getVScrollbar();var H=c.getHScrollbar();if(v||H){if(v){h=this.scrollCellIntoFocus(C,true,false,null);}}this.navigateToCellAction(C,s,S);return h;};this.scrollToCell=function(C){var D=C.getTableRow()-c.getTableFixedColHeaderRowCnt();var i=C.getTableCol()-c.getTableFixedRowHeaderColCnt();var v=D<c.getRenderStartRow()||D>(c.getRenderStartRow()+c.getRenderRowCnt());var h=false;if(C.getArea().isDataArea()||C.getArea().isColHeaderArea()){h=i<c.getRenderStartCol()||i>(c.getRenderStartCol()+c.getRenderColCnt());}if(c.getVScrollbar()&&v){c.scrollVertical(C.getTableRow()-c.getTableFixedColHeaderRowCnt());}if(c.getHScrollbar()&&C.getArea().isDataArea()&&h){c.scrollHorizontal(C.getTableCol()-c.getTableFixedRowHeaderColCnt());}};this.disableCell=function(T,i){var C=null;if(T>-1&&T>-1){C=c.getTableCellWithSpans(T,i);if(C&&!C.isLoading()){this.navigateFromCellAction(C);}}};this.moveCellFocus=function(){if(!b){return;}var e=null;var s=-1;var S=-1;var m=c.getTableRowCnt()-1;var M=c.getTableColCnt()-1;var i=c.getTableFixedColHeaderRowCnt();o=f;O=F;var g=false;var u=false;var C=c.getTableCellWithSpans(o,O);if(C&&!c.hasLoadingPages()){if(n!==0||N!==0){this.scrollToCell(C);}}if(N<0){if(C.getTableRow()===i){return;}}else if(N>0){if((C.getTableRow()+C.getRowSpan()-1)===m){return;}}this.disableCell(C.getTableRow(),C.getTableCol());if(f>-1&&F>-1){if(n===0&&N===0){return;}var h=f;var j=F;if(n!==0){if(n>0){j=C.getTableCol()+C.getColSpan()+n-1;if(j>M){if(h<m){h++;j=0;s=0;g=true;}else{j=M;h=m;}}}else{j=C.getTableCol();j--;if(j>=0){var p=c.getTableCellWithSpans(h,j);if(!p){return;}if(p.isLoading()){return;}j=p.getTableCol();}else{if(h>i){h--;j=M;s=M;if(h<d.getRenderStartRow()+i){S=h-i;}g=true;}else{j=0;h=i;}}}e=c.getTableCellWithSpans(h,j);if(e.isLoading()){return;}if(C){if(C.getArea()!==e.getArea()&&s===-1){s=0;}}}else if(N!==0){if(N>0){h=Math.min(C.getTableRow()+C.getRowSpan()+N-1,m);}else if(N<0){h=Math.max(C.getTableRow()+N,i);}e=c.getTableCellWithSpans(h,j);if(e.isLoading()){return;}h=e.getTableRow();u=true;}f=h;F=j;}if(e){if(S>=0){c.scrollVertical(S);}if(s>=0){c.scrollHorizontal(s);}this.scrollCellIntoFocus(e,u,g,C);this.navigateToCellAction(e,-1,-1);}};};
