sap.ui.define(["sap/suite/ui/microchart/InteractiveDonutChart","sap/suite/ui/microchart/InteractiveDonutChartSegment","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/AnalyticalListPage/control/visualfilterbar/FilterItemMicroChart","sap/suite/ui/generic/template/AnalyticalListPage/util/CriticalityUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil"],function(I,a,J,F,C,b){"use strict";var c="__IS_OTHER__";var d=F.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItemMicroDonut",{metadata:{properties:{labelWidthPercent:{type:"float",group:"Misc",defaultValue:1/2}},aggregations:{control:{type:"sap.suite.ui.microchart.InteractiveDonutChart",multiple:false}}},renderer:{}});d.prototype.init=function(){this._chart=new sap.suite.ui.microchart.InteractiveDonutChart({selectionEnabled:true,segments:[]});this.setControl(this._chart);this.setModel(new J(),'__alp_chartJSONModel');this._otherField="__IS_OTHER__";this._sorters=[];F.prototype.init.apply(this,arguments);};d.prototype._applyDonutChartSelections=function(o,D){var s=this._chart.getSegments(),p=this.getParentProperty(),S=[],e,r;if(o.dimValue===c){s.forEach(function(f){e=f.getCustomData()[0].getValue();if(e!==c){if(f.getSelected()){S.push(e);}r={"exclude":true,"operation":"EQ"};r.keyField=p;r.value1=e;D.ranges.push(r);}});if(S.length>0){D.items=D.items.filter(function(f){return S.indexOf(f.key)===-1;});D.ranges=D.ranges.filter(function(r){return!(r.exclude===false&&r.operation==="EQ"&&r.keyField===p&&S.indexOf(r.value1)>-1);});}}else{D.items.push({key:o.dimValue,text:o.dimValueDisplay});var i=false;s.forEach(function(f){e=f.getCustomData()[0].getValue();if(e===c&&f.getSelected()){i=true;}if(e!==c){S.push(e);}});if(i){D.ranges=D.ranges.filter(function(r){return!(r.exclude===true&&r.operation==="EQ"&&r.keyField===p&&S.indexOf(r.value1)>-1);});}}return D;};d.prototype._updateBinding=function(){this.applyOverlay();this._chart.setBusyIndicatorDelay(0);this._chart.setBusy(true);this._chart.unbindSegments();var e=this.getEntitySet(),f=this.getDimensionField(),g=this.getDimensionFieldDisplay(),m=this.getMeasureField(),u=this.getUnitField(),h=this.getDimensionFilterExternal(),s=[],S=[],s=this.getSortOrder(),o=F._getSorter(s);this._sorters=o.sorter;S=o.sortFields;if(!e||!m||!f||!g){return;}var i=[m,f,S];if(f!=g){i.push(g);}if(u){i.push(u);}var j=[];if(h&&h.aFilters&&h.aFilters.length){j=[h];}var k=this;var M=this.getModel();var B="/"+e;if(M){var D=C.getDataPoint(M,this);if(D){(D.ValueFormat&&D.ValueFormat.ScaleFactor)?this.setScaleFactor(b.getPrimitiveValue(D.ValueFormat.ScaleFactor)):this.setScaleFactor(null);(D.ValueFormat&&D.ValueFormat.NumberOfFractionalDigits)?this.setNumberOfFractionalDigits(b.getPrimitiveValue(D.ValueFormat.NumberOfFractionalDigits)):this.setNumberOfFractionalDigits(null);var r=C.getCriticalityRefProperties(D);}if(this.getSmartFilterId()){var l=sap.ui.getCore().byId(this.getSmartFilterId());if(l&&l.getEntitySet()===e){var t=this.getModel("_templPriv"),n=t.getProperty('/alp/searchable');if(n){B=this.considerAnalyticBinding(B,l);}else{this.applyOverlay(this.requiredFilterMessage);return;}}}if(this._oTop4ReadObject){this._oTop4ReadObject.abort();}if(this._oTotalReadObject){this._oTotalReadObject.abort();}var T=this._fetchData(M,B,j,i,false,r,D),p=this._fetchData(M,B,j,[m],true);jQuery.when(T,p).then(function(q,v){if(!q[1]){k.applyOverlay(k.noDataIssueMessage);}else if(q[1]<=3){k._onDataReceived(q[0]);}else if(q[1]>3){if(v[1]){k._onDataReceived(q[0],v[0]);}else{k.applyOverlay(k.noDataIssueMessage);}}},function(E,q){if(!E||(E.statusCode!==0&&E.statusText!=="abort")){if(q===true){k._oTotalReadObject=null;}else{k._oTop4ReadObject=null;}k.applyOverlay(k.technicalIssueMessage);}});}};d.prototype._fetchData=function(m,B,f,s,t,r,D){var e=this;var o=new jQuery.Deferred();if(!m&&!B){o.reject(null,t);}else{var g={async:true,filters:f,urlParameters:{"$select":r?[r].concat(s).join(","):s.join(","),"$top":(t)?1:4},success:function(h,i){if(t===true){e._oTotalReadObject=null;}else{e._oTop4ReadObject=null;}h=D?C.CalculateCriticality(D,h,e.getMeasureField()):h;var j=(h&&h.results&&h.results.length)?h.results.length:0;o.resolve(h,j);},error:function(h,t){o.reject(h,t);}};if(!t){g.sorters=this._sorters;}if(t){this._oTotalReadObject=m.read(B,g);}else{this._oTop4ReadObject=m.read(B,g);}}return o.promise();};d.prototype._onDataReceived=function(t,T){var r=[],D=this.getDimensionFieldDisplay(),m=this.getMeasureField(),s=this.getDimensionField();if(!T){t.results.forEach(function(h,i){h['dimensionValue']=h[s];r.push(h);});}else{var f=0,o=0;t.results.forEach(function(h,i){if(i<2){h['dimensionValue']=h[s];r.push(h);f+=parseFloat(h[m]);}});if(T){T.results.forEach(function(h){var i=this.getModel("i18n"),j=jQuery.extend(true,{},h);j['dimensionValue']=this._otherField;j[s]=this._otherField;j[D]=i?i.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):"";if(f<0){o=parseFloat(h[m])+f;}else{o=parseFloat(h[m])-f;}j[m]=o;r.push(j);}.bind(this));}}F.prototype._onDataReceived.call(this,r);this.getModel('__alp_chartJSONModel').setData(r);this._chart.setModel(this.getModel('__alp_chartJSONModel'));var e=3,g={path:'/',template:new a(this._getChartAggregationSettings(true)),startIndex:0,length:e};this._chart.bindSegments(g);this._chart.setBusy(false);};return d;},true);
