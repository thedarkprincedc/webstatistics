sap.ui.define([],function(){"use strict";return o;function o(){var R=jQuery.sap.registerModulePath;jQuery.sap.registerModulePath=function(m,u){if(typeof u==="object"){u.url=r(u.url);}else if(typeof u==="string"){u=r(u);}R(m,u);};}function r(u){var m,U,c,s;if(typeof u!=="string"||u===""||a(u)){return u;}function a(d){var e=new URI(d),p=e.path();if(e.is("absolute")){return false;}if(p&&p.charAt(0)==="/"){return false;}return true;}m=u.match(/(.*)(\/~[\w\-]+~[A-Z0-9]?)(.*)/);if(m){U=m[1];c=m[2];s=m[3];}function n(d){return new URI(d).normalizePathname().toString();}function b(p){var S=new URI(p).segment(),i,P=0;for(i=0;i<S.length&&P>=0;i+=1){if(S[i]===".."){P=P-1;}else{P=P+1;}}return P<0;}if(c){if(s&&b(s)){u=U+s;}}return n(u);}});
