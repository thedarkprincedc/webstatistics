/* Ephox mentions plugin
 *
 * Copyright 2010-2016 Ephox Corporation.  All rights reserved.
 *
 * Version: 1.0.3-34
 */
!function(){var a={},b=function(b){for(var c=a[b],e=c.deps,f=c.defn,g=e.length,h=new Array(g),i=0;i<g;++i)h[i]=d(e[i]);var j=f.apply(null,h);if(void 0===j)throw"module ["+b+"] returned undefined";c.instance=j},c=function(b,c,d){if("string"!=typeof b)throw"module id must be a string";if(void 0===c)throw"no dependencies for "+b;if(void 0===d)throw"no definition function for "+b;a[b]={deps:c,defn:d,instance:void 0}},d=function(c){var d=a[c];if(void 0===d)throw"module ["+c+"] was undefined";return void 0===d.instance&&b(c),d.instance},e=function(a,b){for(var c=a.length,e=new Array(c),f=0;f<c;++f)e.push(d(a[f]));b.apply(null,b)},f={};f.bolt={module:{api:{define:c,require:e,demand:d}}};var g=c,h=function(a,b){g(a,[],function(){return b})};h("1",tinymce.PluginManager),h("2",tinymce.util.VK),h("3",tinymce.util.Tools),h("4",document),h("e",tinymce.DOM),g("f",[],function(){var a=Math.min,b=Math.max,c=Math.round,d=function(a,b,d){var e,f,g,h,j,k;return e=b.x,f=b.y,g=a.w,h=a.h,j=b.w,k=b.h,d=(d||"").split(""),"b"===d[0]&&(f+=k),"r"===d[1]&&(e+=j),"c"===d[0]&&(f+=c(k/2)),"c"===d[1]&&(e+=c(j/2)),"b"===d[3]&&(f-=h),"r"===d[4]&&(e-=g),"c"===d[3]&&(f-=c(h/2)),"c"===d[4]&&(e-=c(g/2)),i(e,f,g,h)},e=function(a,b,c,e){var f,g;for(g=0;g<e.length;g++)if(f=d(a,b,e[g]),f.x>=c.x&&f.x+f.w<=c.w+c.x&&f.y>=c.y&&f.y+f.h<=c.h+c.y)return e[g];return null},f=function(a,b,c){return i(a.x-b,a.y-c,a.w+2*b,a.h+2*c)},g=function(c,d){var e,f,g,h;return e=b(c.x,d.x),f=b(c.y,d.y),g=a(c.x+c.w,d.x+d.w),h=a(c.y+c.h,d.y+d.h),g-e<0||h-f<0?null:i(e,f,g-e,h-f)},h=function(a,c,d){var e,f,g,h,j,k,l,m,n,o;return j=a.x,k=a.y,l=a.x+a.w,m=a.y+a.h,n=c.x+c.w,o=c.y+c.h,e=b(0,c.x-j),f=b(0,c.y-k),g=b(0,l-n),h=b(0,m-o),j+=e,k+=f,d&&(l+=e,m+=f,j-=g,k-=h),l-=g,m-=h,i(j,k,l-j,m-k)},i=function(a,b,c,d){return{x:a,y:b,w:c,h:d}},j=function(a){return i(a.left,a.top,a.width,a.height)};return{inflate:f,relativePosition:d,findBestRelativePosition:e,intersect:g,clamp:h,create:i,fromClientRect:j}}),g("9",["e","3","f"],function(a,b,c){var d=function(a){return a=a.cloneRange(),a.setStart(a.startContainer,a.startOffset+1),a},e=function(b,d,e){var f,g;return f=a.getViewPort(),f.w-=30,f.h-=30,g=c.findBestRelativePosition(b,d,f,e),b=c.relativePosition(b,d,g)},f=function(a,b){return h(a,a.dom.getRect(b))},g=function(b,c,d,g){var h,i=f(b,d);h=a.getRect(c),h=e(h,i,g),a.setStyles(c,{position:"absolute",left:h.x,top:h.y})},h=function(b,c){var d;return b.inline||(d=a.getPos(b.getContentAreaContainer()),c.x+=d.x,c.y+=d.y),c};return{exludeFirstCharacter:d,positionRect:e,moveRelativeTo:g,getRectFromEditorElm:f,transposeRelativeToEditorArea:h}}),h("g",tinymce.ui.Menu),g("5",["9","e","g","3","f","4"],function(a,b,c,d,e,f){return function(g,h,i,j){var k,l,m=-1,n=function(c,d){var f,g;g=p(a.exludeFirstCharacter(c.rng)),f=a.positionRect(b.getRect(d.getEl()),e.inflate(g,0,2),["bl-tl","tl-bl","tl-br","bl-tr"]),d.moveTo(f.x,f.y)},o=function(c,d){var e;e=a.positionRect(b.getRect(c),b.getRect(d),["tr-tl","tl-tr","bl-br","br-bl"]),b.setStyles(c,{left:e.x,top:e.y})},p=function(c){var d;d=c.getClientRects()[0];var e=g.inline?b.getViewPort():{x:0,y:0};return a.transposeRelativeToEditorArea(g,{x:d.left+e.x,y:d.top+e.y,w:d.width,h:d.height})},q=function(){l&&(b.remove(l),l=null)},r=function(){q(),k&&(k.remove(),k=null)},s=function(){q(),k&&k.hide()},t=function(a){return d.map(a,function(a){return{text:a.fullName,data:a,onclick:function(){z(this),C()},onmouseenter:function(){z(this)}}})},u=function(){return k?k:(k=new c({onhide:function(){q()},classes:"contextmenu"}).renderTo(),g.on("remove",r),k)},v=function(a){a.getEl().style.width="",a.getEl("body").style.width=""},w=function(a){h(function(b){return 0===b.length?void(k&&k.hide()):(k=u().show(),v(k),k.items().remove(),k.add(t(b)),k.renderNew(),k.initLayoutRect(),n(a,k),m=-1,void z(k.items()[0]))})},x=function(a){return a.settings.data},y=function(a){j(x(a),function(c){a.getEl().parentNode&&0!==k.items().length&&k.visible()&&(b.setStyles(c,{position:"absolute",left:-65535,top:-65535}),b.add(f.body,c),o(c,a.getEl()),q(),l=c)})},z=function(a){q(),k.items().each(function(b,c){b===a&&m!==c&&(a.hover(),y(a),m=c)})},A=function(){z(k.items()[m-1])},B=function(){z(k.items()[m+1])},C=function(){var a;s(),a=k.items()[m],a&&i(a.settings.data)},D=function(){return k&&k.visible()};return{isVisible:D,selectNext:B,selectPrev:A,showAt:w,hide:s,complete:C}}}),g("6",[],function(){var a=/[\u00a0 \t\r\n]/,b=function(b,c){var d;for(d=c-1;d>=0;d--){if(a.test(b.charAt(d)))return null;if("@"===b.charAt(d))break}return d===-1||c-d<2?null:b.substring(d+1,c)};return{parse:b}}),g("7",["6"],function(a){var b=function(a){return a.collapsed&&3===a.startContainer.nodeType},c=function(c){var d,e,f;return b(c)?(d=c.startContainer,e=c.startOffset,f=a.parse(c.startContainer.data,e),null===f?null:(c=c.cloneRange(),c.setStart(d,e-f.length-1),c.setEnd(d,e),{text:f,rng:c})):null};return{getMentionFromRange:c}}),g("8",["3"],function(a){return function(b){var c=function(){},d=function(a,b){return"function"==typeof a?a:b},e=function(b,c){var e;return b=d(b,c),function(){var c,d;c=a.toArray(arguments),d={};var f=function(a){return function(){d===e&&a.apply(null,arguments)}};c=c.map(function(a){return"function"==typeof a&&(a=f(a)),a}),d=e={},b.apply(null,c)}},f=function(a,b){var c;return c=a.dom.create("span",{class:"mention"}),c.appendChild(a.dom.doc.createTextNode("@"+b.name)),c},g=function(a,b){b([])},h=e(b.mentions_menu_hover,c),i=e(b.mentions_fetch,g),j=d(b.mentions_menu_complete,f),k=d(b.mentions_menu_cancel,c),l=e(b.mentions_select,c);return{hover:h,fetch:i,complete:j,select:l,cancel:k}}}),g("h",[],function(){var a=0,b=1,c=-1,d=function(a){return parseInt(a,10)},e=function(a){return function(){return a}},f=function(a,b,c){return{major:e(a),minor:e(b),patch:e(c)}},g=function(a){var b=/([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(a);return b?f(d(b[1]),d(b[2]),d(b[3])):f(0,0,0)},h=function(d,e){var f=d-e;return 0===f?a:f>0?b:c},i=function(b,c){var d=h(b.major(),c.major());if(d!==a)return d;var e=h(b.minor(),c.minor());if(e!==a)return e;var f=h(b.patch(),c.patch());return f!==a?f:a};return{nu:f,parse:g,compare:i}}),g("a",["h"],function(a){var b=function(a){var b=[a.majorVersion,a.minorVersion].join(".");return b.split(".").slice(0,3).join(".")},c=function(c){return c?a.parse(b(c)):null},d=function(b,d){return a.compare(c(b),a.parse(d))<0};return{getVersion:c,isLessThan:d}}),h("i",window),g("b",["i"],function(a){var b=function(a,b){return function(){var c=a.console;c&&b in c&&c[b].apply(c,arguments)}};return{log:b(a,"log"),error:b(a,"error"),warn:b(a,"warm")}}),h("j",setTimeout),h("k",clearTimeout),g("c",["j","k"],function(a,b){var c=function(c,d){var e,f;return f=function(){var f=arguments;b(e),e=a(function(){c.apply(this,f)},d)},f.stop=function(){b(e)},f};return{debounce:c}}),h("d",tinymce),g("0",["1","2","3","4","5","6","7","8","9","a","b","c","d"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=function(a){if(j.isLessThan(m,"4.3.13"))return k.error("The mentions plugin requires at least 4.3.13 version of TinyMCE."),function(){};var f,n=new h(a.settings),o={},p="data-mce-mentions-id",q=function(a){k.error(a)},r=function(){return a.settings.mentions_selector||".mention"},s=function(){return g.getMentionFromRange(a.selection.getRng())},t=function(a){return a&&"string"==typeof a.id&&"string"==typeof a.name},u=function(a){t(a)||q("mentions_fetch didn't produce a valid list of users.")},v=function(a){z(a)||q("mentions_complete needs to produce a element that matches selector: "+r())},w=function(a){var b,d;b=s(),b&&(d={term:b.text},n.fetch(d,function(b){c.each(b,u),b=b.slice(0,10),a(c.grep(b,t))}))},x=function(){var b=[],d=c.map(a.dom.select("["+p+"]"),function(a){return a.getAttribute(p)});return c.each(o,function(a){c.inArray(d,a.id)!==-1&&b.push(a)}),b},y=function(b){var c,d;c=n.complete(a,b),v(c)||(d=g.getMentionFromRange(a.selection.getRng()),c.contentEditable=!1,c.setAttribute("data-mce-mentions-id",b.id),o[b.id]=b,a.selection.setRng(d.rng),a.insertContent(c.outerHTML))},z=function(b){return a.dom.is(b,r())},A=function(){f&&(f.parentNode.removeChild(f),f=null)},B=function(b){a.$(r(),b).prop("contentEditable",!1)},C=function(b,c){var d=a.$(r(),b);d.removeAttr("contenteditable"),c||d.removeAttr("data-mce-mentions-id")},D=function(){a.on("SetContent",function(){B(a.getBody(),!0)}),a.on("PreProcess",function(a){C(a.node,a.source_view)}),a.on("ResolveName",function(a){z(a.target)&&(a.name="mention")}),a.on("keypress",l.debounce(H,100)),a.on("keydown",J),a.on("keyup",K),a.on("nodechange",L),a.on("remove",A)},E=new e(a,w,y,n.hover),F=function(a){return a&&a.text.length>=2},G=function(){E.isVisible()&&n.cancel(),E.hide()},H=function(){if(!a.removed){var b=s();F(b)?E.showAt(b):G()}},I=function(a,b){a.preventDefault(),b()},J=function(a){if(!E.isVisible()||b.modifierPressed(a))return void G();switch(a.keyCode){case 27:I(a,G);break;case b.UP:I(a,E.selectPrev);break;case b.DOWN:I(a,E.selectNext);break;case 13:I(a,E.complete)}},K=function(a){a.keyCode===b.BACKSPACE&&H(),a.keyCode!==b.LEFT&&a.keyCode!==b.RIGHT||G()},L=function(b){var c=b.element;z(c)&&a.selection.isCollapsed()===!1?n.select(c,function(b){A(),f=b,d.body.appendChild(b),i.moveRelativeTo(a,b,c,["bl-tl","tl-bl","tl-br","bl-tr"])}):A()};return D(),{getUsers:x}};return a.add("mentions",n),function(){}}),d("0")()}();
