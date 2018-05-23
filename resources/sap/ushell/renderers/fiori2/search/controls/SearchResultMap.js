sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchConfiguration'],function(S){"use strict";return sap.ui.core.Control.extend('sap.ushell.renderers.fiori2.search.controls.SearchResultMap',{minLat:0,minLon:0,maxLat:0,maxLon:0,centerLat:0,centerLon:0,iNrLocations:0,metadata:{aggregations:{"_map":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},urlMapClient:"/sap/hana/spatial/mapClient/map.xsjs?col={X}&row={Y}&level={LOD}",init:function(){var m={"MapProvider":[{"name":"HEREMAPS","type":"terrain","description":"","tileX":"256","tileY":"256","maxLOD":"20","copyright":"Tiles Courtesy of HERE Maps","Source":[{"id":"s1","url":this.urlMapClient},{"id":"s2","url":this.urlMapClient}]}],"MapLayerStacks":[{"name":"DEFAULT","MapLayer":{"name":"layer1","refMapProvider":"HEREMAPS","opacity":"0.9","colBkgnd":"RGB(255,255,255)"}}]};var g=new sap.ui.vbm.GeoMap({legendVisible:false,scaleVisible:false,refMapLayerStack:'DEFAULT',mapConfiguration:m,width:'100%',height:'100%',zoomlevel:6,zoomChanged:this.zoomChanged.bind(this),centerChanged:this.centerChanged.bind(this)});this.setAggregation('_map',g);},splitCoordinates:function(c){var a=c.split(';');return[parseFloat(a[0]),parseFloat(a[1])];},deg2rad:function(d){return Math.PI*d/180;},rad2deg:function(r){return 180*r/Math.PI;},getDistanceFromLatLonInKm:function(l,b,e,f){var R=6371;var L=this.deg2rad(e-l);var g=this.deg2rad(f-b);var a=Math.sin(L/2)*Math.sin(L/2)+Math.cos(this.deg2rad(l))*Math.cos(this.deg2rad(e))*Math.sin(g/2)*Math.sin(g/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;},getLatLonDiff:function(v){var a,b,l,c,d,e,m,f;var g,h,i,j;a=v.upperLeft.split(";");b=v.lowerRight.split(";");l=parseFloat(a[1],10);c=parseFloat(b[1],10);f=(l+c)/2;g=l-c;i=g*111;i=Math.floor(i);d=parseFloat(a[0],10);e=parseFloat(b[0],10);if((d<0&&e>0)|(d>0&&e<0)){h=Math.abs(d)+Math.abs(e);}else{h=Math.abs(e-d);}j=this.getDistanceFromLatLonInKm(f,d,f,e);j=Math.floor(j);m="lat= "+g+" ("+i+" km); lon= "+h+" ("+j+" km)";return m;},calculateZoomLevel:function(s,k){var e=40075004;var w=s;var m=e/256;var z=0;while((m*w)>(k*1000)){m=m/2.2;z=z+1;}console.log('zoomLevel calc: '+z);return z;},loadObjects:function(c){var t=this;var r=t.getModel().oData.origBoResults.elements;var R,l,T,C,a,b,s;var d=new sap.ui.vbm.Containers();var n=0;var m,f,g,h;var i=0;for(var k in r){if(!r.hasOwnProperty(k))continue;R=r[k];if(!R.LOC_4326)continue;l=R.LOC_4326;for(var o in R){if(!R.hasOwnProperty(o))continue;var A=R[o];T="";var p=false;if(A.$$MetaData$$){var q=A.$$MetaData$$.presentationUsage;for(var j=0;j<q.length;++j){if(q[j]=="Title"){T=A.value;T=T.replace(/<[^>]*>/g,"");p=true;break;}}}if(p){break;}}C=null;try{C=JSON.parse(l.value).coordinates;}catch(e){}if(!C||C.length===0){continue;}n++;a=C[0];b=C[1];if(!b||!a){continue;}i++;if(i===1){m=a;f=a;g=b;h=b;}else{if(a<m){m=a;}if(a>f){f=a;}if(b<g){g=b;}if(b>h){h=b;}}t.minLon=m;t.maxLon=f;t.minLat=g;t.maxLat=h;var u=new sap.m.Button({text:T});var B=new sap.m.Button({icon:"sap-icon://map",type:sap.m.ButtonType.Emphasized});var v=new sap.ui.layout.HorizontalLayout({content:[B,u]});s=new sap.ui.vbm.Container({position:a+';'+b+';0',item:v,alignment:6});d.addItem(s);}t.iNrLocations=n;console.log("++++++");console.log("number of locations: "+t.iNrLocations);t.getAggregation('_map').removeAllVos();t.getAggregation('_map').addVo(d);t.centerMap();var w=S.prototype.parseUrlParameters();for(var x in w){if(x==='box'&&w[x]!=="false"){t.showBoundariesAndCenter();}}},centerMap:function(){var t=this;t.centerLon=t.minLon+(t.maxLon-t.minLon)/2;t.centerLat=t.minLat+(t.maxLat-t.minLat)/2;console.log("centerLat, centerLon: "+t.centerLat+";"+t.centerLon);console.log("NB center of Germany: 51.126586;10.472796");t.getAggregation('_map').setCenterPosition(t.centerLon+";"+t.centerLat);},setVisualFrame:function(){var t=this;var v={};v.minLon=t.minLon*0.5;v.maxLon=t.maxLon*1.2;v.minLat=t.minLat*0.8;v.maxLat=t.maxLat*1.2;t.getAggregation('_map').setVisualFrame(v);},showBoundariesAndCenter:function(){var t=this;var c=new sap.ui.vbm.Spots({items:[new sap.ui.vbm.Spot({type:"Error",text:"center",position:(t.centerLon+" ;  "+t.centerLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"TLeft",position:(t.minLon+" ;  "+t.maxLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"TRight",position:(t.maxLon+" ;  "+t.maxLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"BLeft",position:(t.minLon+" ;  "+t.minLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"BRight",position:(t.maxLon+" ;  "+t.minLat+";0")})]});t.getAggregation('_map').addVo(c);},renderer:function(r,c){c.loadObjects(c);r.write('<div ');r.writeControlData(c);r.addClass('sapUshellSearchResultMap');r.writeClasses();r.write('>');if(c.iNrLocations===0){var e=new sap.m.Label({text:"No coordinates available to display on a map."});r.renderControl(e);}else{r.renderControl(c.getAggregation('_map'));}r.write('</div>');},zoomChanged:function(e){var v=e.getParameter('viewportBB');var z=e.getParameter('zoomLevel');console.log("-----");console.log('zoomLevel ',z,'LatLonDiff:',this.getLatLonDiff(v));},centerChanged:function(e){var c=e.getParameter('centerPoint');console.log("-----");console.log('centerPoint: '+c);},setZoomLevelAfterRendering:function(s){var t=this;var k=this.getDistanceFromLatLonInKm(this.minLat,this.minLon,this.maxLat,this.maxLon);k=Math.floor(k);console.log("BOX minLat, minLon, maxLat, maxLon: ",this.minLat,this.minLon,this.maxLat,this.maxLon);console.log('iKm for zoomLevel calc: '+k);console.log('iScreenWidth for zoomLevel calc: '+s);var z=this.calculateZoomLevel(s,k);z=z-1;if(k>599&&k<701){z=6;}if(this.iNrLocations===1){z=9;}window.setTimeout(function(){t.getAggregation('_map').setZoomlevel(z);},200);},setZoomLevelAfterRenderingOld:function(s){var t=this;var k=this.getDistanceFromLatLonInKm(this.minLat,this.minLon,this.maxLat,this.maxLon);k=Math.floor(k);console.log("BOX minLat, minLon, maxLat, maxLon: ",this.minLat,this.minLon,this.maxLat,this.maxLon);console.log('iKm for zoomLevel calc: '+k);console.log('iScreenWidth for zoomLevel calc: '+s);var z=this.calculateZoomLevel(s,k);if(z>7){}if(this.iNrLocations===1){this.getAggregation('_map').setZoomlevel(9);}else{window.setTimeout(function(){t.getAggregation('_map').setZoomlevel(z);},200);}},resizeMap:function(e){var h=$(".sapUshellSearchResultMap").parent().parent().parent().css("height");h=parseInt(h,10);h=0.85*h;h=""+h+"px";$(".sapUshellSearchResultMap").css("height",h);$(".sapUshellSearchResultMap").css("vertical-align","middle");$(".sapUshellResultListMoreFooter").hide();},onAfterRendering:function(e){var t=this;t.resizeMap();t.centerMap();window.onresize=t.resizeMap;var i=$(".sapUshellSearchResultMap")[0].id;var s=$("#"+i).width();s=s*0.8;t.setZoomLevelAfterRendering(s);}});});