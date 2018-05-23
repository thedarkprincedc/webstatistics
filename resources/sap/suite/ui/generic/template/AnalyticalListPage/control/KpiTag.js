sap.ui.define(["sap/ui/core/Control","sap/m/Label","sap/m/NumericContent","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/AnalyticalListPage/controller/KpiTagController","sap/suite/ui/generic/template/AnalyticalListPage/util/KpiUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/KpiAnnotationHelper","sap/suite/ui/generic/template/AnalyticalListPage/util/CriticalityUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms"],function(C,L,N,J,K,a,b,c,F,V){"use strict";return C.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.KpiTag",{metadata:{properties:{value:{type:"string",defaultValue:"",bindable:true},name:{type:"string",defaultValue:"",bindable:true},scale:{type:"string",defaultValue:undefined,bindable:true},indicator:{type:"sap.m.ValueColor",defaultValue:undefined},entitySet:{type:"string",defaultValue:"",bindable:false},qualifier:{type:"string",defaultValue:"",bindable:false},modelName:{type:"string",defaultValue:undefined,bindable:false}},aggregations:{_name:{type:"sap.m.Label",multiple:false,visibility:"visible"},_value:{type:"sap.m.Label",multiple:false,visibility:"visible"},_content:{type:"sap.m.NumericContent",multiple:false,visibility:"visible"}},events:{press:{}}},_firstTime:true,_dataModel:undefined,_controller:undefined,_isRelative:false,_isPercent:false,_sUnitofMeasure:"",_relativeToProperties:[],_getDataModel:function(){if(!this._dataModel){this._dataModel=new J();}return this._dataModel;},_getController:function(){if(!this._controller){this._controller=new K();}return this._controller;},onBeforeRendering:function(){if(this._firstTime){this.setBusy(true);this._firstTime=false;if(this.getModelName()){var m=this.getModel(this.getModelName());m.getMetaModel().loaded().then(function(){var M=m.getMetaModel();var e=M.getODataEntitySet(this.getEntitySet());var E=M.getODataEntityType(e.entityType);var s="com.sap.vocabularies.UI.v1.SelectionPresentationVariant#"+this.getQualifier();var S=E[s];if(!S){return;}var o=S.SelectionVariant&&S.SelectionVariant.Path;if(!o){jQuery.sap.log.error("SelectionVariant does not have Path.");return;}if(/^@/.test(o)){o=o.slice(1);}var d=E[o];var f=[];var g=d&&d.SelectOptions;var h,r;if(g){for(var i=0;i<g.length;i++){h=g[i];for(var j=0;j<h["Ranges"].length;j++){r=h["Ranges"][j];if(r.Sign.EnumMember===V.SelectionRangeSignType+"/I"||r.Sign.EnumMember===V.SelectionRangeSignType+"/E"){if(r.Low){f.push(new sap.ui.model.Filter(a.getFilter(r,h)));}}}}}var p=S.PresentationVariant&&(S.PresentationVariant.AnnotationPath||S.PresentationVariant.Path);if(!p){return;}if(/^@/.test(p)){p=p.slice(1);}var D;var v=E[p].Visualizations;v.forEach(function(A){if(A.AnnotationPath.indexOf("DataPoint")>0){D=A.AnnotationPath.split("@")[1];}});var k=E[D];this.dataPointAnnotation=k;var l=M.getODataProperty(E,k.Value.Path);this._checkForPercent(m,l);this._getCriticalityRefProperties(k);this.setModel(this._getDataModel());var P=b.resolveParameterizedEntitySet(m,e,d);if(k.Value){if(k.Value.Path){this.bindValue("/0/"+k.Value.Path);}else{this.setProperty("value",k.Value.String);}}m.read(P,{async:true,filters:f,urlParameters:{"$select":[k.Value.Path].concat(this._relativeToProperties).join(","),"$top":1},success:function(n,q){this._getDataModel().setData(n.results);n=F.readProperty(this.dataPointAnnotation,"Value.Path")?c.CalculateCriticality(this.dataPointAnnotation,n,this.dataPointAnnotation.Value.Path):n;this.setIndicator(n.results[0].color);this._setScaleInformation(this.dataPointAnnotation);this._setNameInformation(this.dataPointAnnotation);this.setBusy(false);}.bind(this),error:function(n){jQuery.sap.log.error("Error reading URL:"+n);}});}.bind(this));}}},init:function(){if(C.prototype.init){C.prototype.init.call(this);}},_onMouseClick:function(e){K.openKpiCard(e);},_onKeyPress:function(e){if(e.which===jQuery.sap.KeyCodes.ENTER||e.which===jQuery.sap.KeyCodes.SPACE){K.openKpiCard(e);}},_checkForPercent:function(m,e){this._sUnitofMeasure=a.getUnitofMeasure(m,e);if(this._sUnitofMeasure=="%"){this._isPercent=true;}},_checkIfRelative:function(d){var t=d.TrendCalculation;this._isRelative=a.isRelative(d);if(this._isRelative){if(t.ReferenceValue.Path){this._relativeToProperties.push(t.ReferenceValue.Path);}}},_setNameInformation:function(d){var t=d.Title;var r=this.getModel("i18n").getResourceBundle();var n=a.getPathOrPrimitiveValue(t);if(n===undefined){n="";}if(n.indexOf(">")>0){this.bindProperty("name",{path:n,formatter:function(v){this._nameFromPath=v;return this._getNameFromHeuristic(v);}.bind(this)});}else{this._nameFromPath=n;this.setProperty("name",this._getNameFromHeuristic(n));}var e=this._isPercent?(a.formatNumberForPresentation(this.getValue(),true,1,this.getProperty("scale"))+this._sUnitofMeasure):(a.formatNumberForPresentation(this.getValue(),true,0,this.getProperty("scale")));var f;switch(this.getIndicator()){case sap.m.ValueColor.Error:f="KPI_TOOLTIP_ERROR";break;case sap.m.ValueColor.Good:f="KPI_TOOLTIP_GOOD";break;case sap.m.ValueColor.Critical:f="KPI_TOOLTIP_CRITICAL";break;default:f="KPI_TOOLTIP_NEUTRAL";break;}this.setTooltip(r.getText(f,[this._nameFromPath,e]));},_setScaleInformation:function(d){if(d.ValueFormat){if(d.ValueFormat.ScaleFactor){this.setProperty("scale",a.getPathOrPrimitiveValue(d.ValueFormat.ScaleFactor));}}},_getCriticalityRefProperties:function(d){var e=d.CriticalityCalculation;var f=d.Criticality;if(f&&f.Path){this._relativeToProperties.push(f.Path);}else if(e){if(e.DeviationRangeLowValue&&e.DeviationRangeLowValue.Path){this._relativeToProperties.push(e.DeviationRangeLowValue.Path);}if(e.DeviationRangeHighValue&&e.DeviationRangeHighValue.Path){this._relativeToProperties.push(e.DeviationRangeHighValue.Path);}if(e.ToleranceRangeLowValue&&e.ToleranceRangeLowValue.Path){this._relativeToProperties.push(e.ToleranceRangeLowValue.Path);}if(e.ToleranceRangeHighValue&&e.ToleranceRangeHighValue.Path){this._relativeToProperties.push(e.ToleranceRangeHighValue.Path);}}},_getTitleRefProperty:function(d){var t=d.Title;if(t&&t.Path){this._relativeToProperties.push(t.Path);}},_getNameFromHeuristic:function(s){var p=s.split(/\s/);return p.length===1?this._getNameFromSingleWordHeuristic(s):this._getNameFromMultiWordHeuristic(p);},_getNameFromSingleWordHeuristic:function(w){return w.substr(0,3).toUpperCase();},_getNameFromMultiWordHeuristic:function(w){var p=[];p.push(w[0].charAt(0));p.push(w[1].charAt(0));if(w.length>=3){p.push(w[2].charAt(0));}return p.join("").toUpperCase();},renderer:function(r,o){r.write("<div");r.writeAttributeEscaped("tabIndex",0);r.writeControlData(o);r.addClass("sapSmartTemplatesAnalyticalListPageKpiTag sapSmartTemplatesAnalyticalListPageKpiTagCozy sapUiSmallMarginEnd");o._addColorClasses(r);r.writeClasses();r.writeAttributeEscaped("aria-label",o._getAriaLabelText(o.getTooltip()));r.writeAttributeEscaped("title",o.getTooltip());r.write(">");r.write("<div");r.addClass("sapSmartTemplatesAnalyticalListPageKpiTagName");r.writeClasses();r.write(">");r.writeEscaped(o.getName());r.write("</div>");r.write("<div");r.addClass("sapSmartTemplatesAnalyticalListPageKpiTagValue");r.writeClasses();r.write(">");r.writeEscaped(o._isPercent?a.formatNumberForPresentation(o.getValue(),true,1,o.getProperty("scale"))+o._sUnitofMeasure:a.formatNumberForPresentation(o.getValue(),true,0,o.getProperty("scale")));r.write("</div>");r.write("</div>");},_getAriaLabelText:function(k){var r=this.getModel("i18n").getResourceBundle();return r.getText("KPI_ARIALABEL_TAG",[k]);},_addColorClasses:function(r){switch(this.getIndicator()){case sap.m.ValueColor.Neutral:r.addClass("sapSmartTemplatesAnalyticalListPageKPINeutral");break;case sap.m.ValueColor.Error:r.addClass("sapSmartTemplatesAnalyticalListPageKPINegative");break;case sap.m.ValueColor.Good:r.addClass("sapSmartTemplatesAnalyticalListPageKPIPositive");break;case sap.m.ValueColor.Critical:r.addClass("sapSmartTemplatesAnalyticalListPageKPICritical");break;default:r.addClass("sapSmartTemplatesAnalyticalListPageKPINeutral");break;}},onAfterRendering:function(){setTimeout(function(){this.detachBrowserEvent("click",this._onMouseClick).attachBrowserEvent("click",this._onMouseClick);this.detachBrowserEvent("keypress",this._onKeyPress).attachBrowserEvent("keypress",this._onKeyPress);}.bind(this),1);},exit:function(){this._relativeToProperties=[];}});},true);
