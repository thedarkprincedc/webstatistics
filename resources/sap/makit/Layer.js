/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.makit.Layer");jQuery.sap.require("sap.makit.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.makit.Layer",{metadata:{deprecated:true,publicMethods:["getSelectedSeries"],library:"sap.makit",properties:{"type":{type:"sap.makit.ChartType",group:"Appearance",defaultValue:sap.makit.ChartType.Column},"lineThickness":{type:"float",group:"Appearance",defaultValue:1},"primaryColorPalette":{type:"any",group:"Misc",defaultValue:null},"drawOnSecondaryAxis":{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{"rows":{type:"sap.makit.Row",multiple:true,singularName:"row",bindable:"bindable"},"columns":{type:"sap.makit.Column",multiple:true,singularName:"column",bindable:"bindable"},"series":{type:"sap.makit.Series",multiple:false},"values":{type:"sap.makit.Value",multiple:true,singularName:"value"}}}});
/*!
* @copyright@
 */
jQuery.sap.require("sap.makit.MakitLib");
sap.makit.Layer.prototype.init=function(){this._datarows=[];this._createRowsCalled=false;this._lineType=null;};
sap.makit.Layer.prototype.addValue=function(v){sap.ui.core.Element.prototype.addAggregation.call(this,"values",v,false);v.attachEvent("_change",{type:"values"},this._onDataRegionPropChanged,this);return this;};
sap.makit.Layer.prototype.addColumn=function(v){sap.ui.core.Element.prototype.addAggregation.call(this,"columns",v,false);v.attachEvent("_change",{type:"columns"},this._onColumnPropChanged,this);return this;};
sap.makit.Chart.prototype.insertValue=function(v,i){sap.ui.core.Element.prototype.insertAggregation.call(this,"values",v,i,false);v.attachEvent("_change",{type:"values"},this._onDataRegionPropChanged,this);return this;};
sap.makit.Chart.prototype.removeValue=function(v){var r=sap.ui.core.Element.prototype.removeAggregation.call(this,"values",v,false);if(r!=null){r.detachEvent("_change",this._onDataRegionPropChanged,this);}return r;};
sap.makit.Chart.prototype.removeAllValues=function(){var r=sap.ui.core.Element.prototype.removeAllAggregation.call(this,"values",false);var l=r.length;var i;for(i=0;i<l;i++){r[i].detachEvent("_change",this._onDataRegionPropChanged,this);}return r;};
sap.makit.Layer.prototype.setSeries=function(s){sap.ui.core.Element.prototype.setAggregation.call(this,"series",s,false);s.attachEvent("_change",{type:"series"},this._onDataRegionPropChanged,this);return this;};
sap.makit.Layer.prototype.bindAggregation=function(n,b){if(n==="rows"){if(typeof b=="string"){b={path:arguments[1],template:arguments[2],sorter:arguments[3],filters:arguments[4]};}b.template=undefined;b.factory=function(){};return sap.ui.core.Element.prototype.bindAggregation.call(this,n,b);}return sap.ui.core.Element.prototype.bindAggregation.apply(this,arguments);};
sap.makit.Layer.prototype.addRow=function(r){jQuery.sap.log.error("The control manages the rows aggregation. The method \"addRow\" cannot be used programmatically!");};
sap.makit.Layer.prototype.insertRow=function(r,i){jQuery.sap.log.error("The control manages the rows aggregation. The method \"insertRow\" cannot be used programmatically!");};
sap.makit.Layer.prototype.removeRow=function(r){jQuery.sap.log.error("The control manages the rows aggregation. The method \"removeRow\" cannot be used programmatically!");};
sap.makit.Layer.prototype.removeAllRows=function(){jQuery.sap.log.error("The control manages the rows aggregation. The method \"removeAllRows\" cannot be used programmatically!");};
sap.makit.Layer.prototype.destroyRows=function(r){jQuery.sap.log.error("The control manages the rows aggregation. The method \"destroyRows\" cannot be used programmatically!");};
sap.makit.Layer.prototype.updateRows=function(){this.fireEvent("_startUpdateRows",this);this._createRows();this._createRowsCalled=true;this.fireEvent("rowsUpdated");this.fireEvent("_endUpdateRows",this);};
sap.makit.CombinationChart.prototype.setType=function(t){if(t==sap.makit.ChartType.Pie||t==sap.makit.ChartType.Donut||t==sap.makit.ChartType.Bubble){throw new Error("Combination Chart does not support "+t+" chart type");return;}else{sap.ui.core.Element.prototype.setProperty.call(this,"type",t,false);}return this;};
sap.makit.Layer.prototype._onDataRegionPropChanged=function(e,d){var p=e.mParameters;p["type"]=d["type"];if(d["type"]=="values"){var v=e.oSource;var i=this.indexOfValue(v);p["index"]=i;}this.fireEvent("dataRegionChanged",p);};
sap.makit.Layer.prototype._onColumnPropChanged=function(e,d){var p=e.mParameters;if(p["name"]=="name"&&this._createRowsCalled){jQuery.sap.log.info("Column name property is changed due to name has been binded");this._createRows();}};
sap.makit.Layer.prototype._createRows=function(){var t=new sap.makit.Row(this.getId()+"-dummyrows");var c=this.getColumns();for(var i=0,l=c.length;i<l;i++){var C=c[i];if(C){var n=c[i].getName();var o=C.clone("col"+i);o.detachEvent("_change",this._onColumnPropChanged,this);for(var p in C.mProperties){if(C.mProperties.hasOwnProperty(p)){o.setProperty(p,C.getProperty(p),false);}}o.data("sap-ui-colindex",i);t.addAggregation("cells",o);o.unbindAggregation("name",true);}}this.destroyAggregation("rows");var a=undefined;var b=this.getBinding("rows");if(b){a=b.getContexts();}var d=b.getLength();this._datarows=[];var e=this.getBindingInfo("rows");var m=undefined;if(e&&e.model){m=e.model;}for(var i=0;i<d;i++){if(a&&a[i]){var o=t.clone("row"+i);o.setBindingContext(a[i],m);this.addAggregation("rows",o);this._datarows.push(o._datarow);}}t.destroy();};
sap.makit.Layer.prototype.setLineType=function(l){this._lineType=l;};
sap.makit.Layer.prototype.getLineType=function(){return this._lineType;};
sap.makit.Layer.prototype.getSyntax=function(p,s){var a=this.getSeries();var b='';if(a){b='<Series Column="'+a.getColumn()+'"';if(a.getFormat()){b+=' format="'+a.getFormat()+'"';}if(a.getDisplayName()){b+=' displayname="'+a.getDisplayName()+'"';}b+='/>';}var d=this.getDrawOnSecondaryAxis();var v='<Values>';var c=d?s:p;if(c){v='<Values';if(d){v+=' SecondaryAxis="'+d+'"';}v+=' showprimaryline="'+c.getShowPrimaryLine()+'"';v+=' showgrid="'+c.getShowGrid()+'"';v+=' showlabel="'+c.getShowLabel()+'"';v+=' thickness="'+c.getThickness()+'"';v+=' color="'+c.getColor()+'"';if(c.getMin()!==""){v+=' min="'+c.getMin()+'"';}if(c.getMax()!==""){v+=' max="'+c.getMax()+'"';}v+='>';}var e=this.getValues();var l=e.length;if(l==0){throw new Error("Chart '"+this.getId()+"' needs at least one Value data region");}var f;for(var i=0;i<l;i++){f=e[i];v+='<Value Expression="'+f.getExpression()+'"';if(f.getFormat()){v+=' format="'+f.getFormat()+'"';}if(f.getDisplayName()){v+=' displayname="'+f.getDisplayName()+'"';}if(f.getLocale()!==""){v+=' Locale="'+f.getLocale()+'"';}v+='/>';}v+='</Values>';var t=this.getType().toLowerCase();var g=this.getLineType();var h=null;if(t==="donut"||t==="pie"){h=t;t="pie";}else if(t==="line"&&g){t=g;}var j='<Layer Name="'+this.getId()+'" ChartType="'+t+'"';if(h!==null){j+=' PieStyle="'+h+'"';}j+=' >';if(a){j+=b;}j+=v;j+='</Layer>';return j;};
sap.makit.Layer.prototype.getDataTable=function(){if(this._datarows&&this._datarows.length>0){var d=this._datarows;var a=new window.$MA.DataTable();var c=this.getColumns();var b=c.length;if(b==0){c=this.getRows()[0].getCells();b=c.length;}for(var i=0;i<b;i++){a.addColumn(c[i].getName(),c[i].getType());}a.addRows(d);return a;}return null;};
sap.makit.Layer.prototype.getSelectedSeries=function(){var p=this.getParent();if(p){return p._getSelectedSeries(this);}};
