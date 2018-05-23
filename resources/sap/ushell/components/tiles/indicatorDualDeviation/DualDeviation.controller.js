sap.ui.require(function(){"use strict";sap.ui.controller("tiles.indicatorDualDeviation.DualDeviation",{logError:function(e){this.oDualDeviationView.oGenericTile.setState(sap.m.LoadState.Failed);this.oDualDeviationView.oGenericTile.setState(sap.m.LoadState.Failed);sap.ushell.components.tiles.indicatorTileUtils.util.logError(e);},getThresholdsObjAndColor:function(t){try{var T={};T.arrObj=[];T.returnColor=sap.m.ValueColor.Neutral;var i=this.DEFINITION_DATA.EVALUATION.GOAL_TYPE;var w,c,a,b;if(i==="MI"){a=Number(t.criticalHighValue)||0;b=Number(t.warningHighValue)||0;if(a&&b){a=window.parseFloat(a);b=window.parseFloat(b);T.arrObj.push({value:a,color:sap.m.ValueColor.Error});T.arrObj.push({value:b,color:sap.m.ValueColor.Critical});if(this.CALCULATED_KPI_VALUE<b){T.returnColor=sap.m.ValueColor.Good;}else if(this.CALCULATED_KPI_VALUE<=a){T.returnColor=sap.m.ValueColor.Critical;}else{T.returnColor=sap.m.ValueColor.Error;}}}else if(i==="MA"){c=Number(t.criticalLowValue)||0;w=Number(t.warningLowValue)||0;if(c&&w){c=window.parseFloat(c);w=window.parseFloat(w);T.arrObj.push({value:c,color:sap.m.ValueColor.Error});T.arrObj.push({value:w,color:sap.m.ValueColor.Critical});if(this.CALCULATED_KPI_VALUE<c){T.returnColor=sap.m.ValueColor.Error;}else if(this.CALCULATED_KPI_VALUE<=w){T.returnColor=sap.m.ValueColor.Critical;}else{T.returnColor=sap.m.ValueColor.Good;}}}else{a=Number(t.criticalHighValue)||0;b=Number(t.warningHighValue)||0;c=Number(t.criticalLowValue)||0;w=Number(t.warningLowValue)||0;if(w&&b&&c&&c){a=window.parseFloat(a);b=window.parseFloat(b);w=window.parseFloat(w);c=window.parseFloat(c);T.arrObj.push({value:a,color:sap.m.ValueColor.Error});T.arrObj.push({value:b,color:sap.m.ValueColor.Critical});T.arrObj.push({value:w,color:sap.m.ValueColor.Critical});T.arrObj.push({value:c,color:sap.m.ValueColor.Error});if(this.CALCULATED_KPI_VALUE<c||this.CALCULATED_KPI_VALUE>a){T.returnColor=sap.m.ValueColor.Error;}else if((this.CALCULATED_KPI_VALUE>=c&&this.CALCULATED_KPI_VALUE<=w)||(this.CALCULATED_KPI_VALUE>=b&&this.CALCULATED_KPI_VALUE<=a)){T.returnColor=sap.m.ValueColor.Critical;}else{T.returnColor=sap.m.ValueColor.Good;}}}return T;}catch(e){this.logError(e);}},getTrendIndicator:function(t,v){var a=this;t=Number(t);try{var b=sap.m.DeviationIndicator.None;if(t>v){b=sap.m.DeviationIndicator.Down;}else if(t<v){b=sap.m.DeviationIndicator.Up;}return b;}catch(e){a.logError(e);}},getTile:function(){return this.oDualDeviationView.oGenericTile;},_updateTileModel:function(n){var m=this.getTile().getModel().getData();jQuery.extend(m,n);this.getTile().getModel().setData(m);},formSelectStatement:function(o){var t=Object.keys(o);var f="";for(var i=0;i<t.length;i++){if((o[t[i]]!==undefined)&&(o.fullyFormedMeasure)){f+=","+o[t[i]];}}return f;},setThresholdValues:function(){var t=this;var T={};T.fullyFormedMeasure=this.DEFINITION_DATA.EVALUATION.COLUMN_NAME;if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){switch(this.DEFINITION_DATA.EVALUATION.GOAL_TYPE){case"MI":T.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","MEASURE");T.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);break;case"MA":T.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","MEASURE");T.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);break;case"RA":T.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","MEASURE");T.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","MEASURE");T.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);break;}}else{T.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","FIXED");T.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","FIXED");T.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","FIXED");T.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","FIXED");T.targetValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","FIXED");T.trendValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","FIXED");}return T;},fetchKpiValue:function(s,E){var t=this;var k=0;try{var u=this.DEFINITION_DATA.EVALUATION.ODATA_URL;var a=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;var T=this.setThresholdValues();var m=T.fullyFormedMeasure;var c=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(!c){var v=sap.ushell.components.tiles.indicatorTileUtils.util.prepareFilterStructure(this.DEFINITION_DATA.EVALUATION_FILTERS,this.DEFINITION_DATA.ADDITIONAL_FILTERS);var q=sap.ushell.components.tiles.indicatorTileUtils.util.prepareQueryServiceUri(t.oTileApi.url.addSystemToServiceUrl(u),a,m,null,v);if(q){this.QUERY_SERVICE_MODEL=q.model;this.queryUriForKpiValue=q.uri;try{this.queryServiceUriODataReadRef=this.QUERY_SERVICE_MODEL.read(q.uri,null,null,true,function(f){t.writeData={};if(f&&f.results&&f.results.length){k=f.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME];if(q.unit[0]){t._updateTileModel({unit:f.results[0][q.unit[0].name]});t.writeData.unit=q.unit[0];t.writeData.unit.name=q.unit[0].name;}t.writeData.numericData=f;var S="",d;var b=k;if(t.oConfig.EVALUATION.SCALING==-2){b*=100;t.getView().oNumericContent.setFormatterValue(false);}S=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(b),t.oConfig.EVALUATION.SCALING,t.oConfig.EVALUATION.DECIMAL_PRECISION);d=t.getTrendIndicator(T.trendValue,b);if(t.oConfig.EVALUATION.SCALING==-2){t._updateTileModel({scale:"%"});}t._updateTileModel({value:S.toString(),indicator:d,valueColor:t.getThresholdsObjAndColor(T).returnColor});t.writeData.data=f;sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,t.writeData);if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){T.criticalHighValue=f.results[0][T.sCriticalHigh];T.criticalLowValue=f.results[0][T.sCriticalLow];T.warningHighValue=f.results[0][T.sWarningHigh];T.warningLowValue=f.results[0][T.sWarningLow];T.targetValue=f.results[0][T.sTarget];T.trendValue=f.results[0][T.sTrend];}s.call(t,k,T);}else{E.call(t,"no Response from QueryServiceUri");}},function(f){if(f&&f.response){E.call(t,f.message);}});}catch(e){t.logError("Error in Query Service URI");}}}else{if(c.data&&c.data.results&&c.data.results.length){var b,S,d,T;T=t.setThresholdValues();b=c.data.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME];if(t.oConfig.EVALUATION.SCALING==-2){b*=100;t.getView().oNumericContent.setFormatterValue(true);}if(t.oConfig.EVALUATION.SCALING==-2){t._updateTileModel({scale:"%"});}S=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(b),t.oConfig.EVALUATION.SCALING,t.oConfig.EVALUATION.DECIMAL_PRECISION);d=t.getTrendIndicator(T.trendValue,b);if(c.unit){t._updateTileModel({unit:c.data.results[0][c.unit.name]});}t._updateTileModel({indicator:d,value:S.toString()});if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){T.criticalHighValue=c.data.results[0][T.sCriticalHigh];T.criticalLowValue=c.data.results[0][T.sCriticalLow];T.warningHighValue=c.data.results[0][T.sWarningHigh];T.warningLowValue=c.data.results[0][T.sWarningLow];T.targetValue=c.data.results[0][T.sTarget];T.trendValue=c.data.results[0][T.sTrend];}s.call(t,c.data.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME],T);}else{E.call(t,"no Response from QueryServiceUri");}}}catch(e){E.call(t,e);}},flowWithoutDesignTimeCall:function(){var t=this;var f,a;this.DEFINITION_DATA=this.oConfig;this._updateTileModel(this.DEFINITION_DATA);if(this.oTileApi.visible.isVisible()&&!this.firstTimeVisible){this.firstTimeVisible=true;this.fetchKpiValue(function(k,b){var c=Number(k);if(this.oConfig.EVALUATION.SCALING==-2){c*=100;}f=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(c),this.oConfig.EVALUATION.SCALING,t.oConfig.EVALUATION.DECIMAL_PRECISION);this.CALCULATED_KPI_VALUE=Number(k);var d={};var e=this.getThresholdsObjAndColor(b);var g={value:Number(k),color:e.returnColor};d.valueColor=g.color;d.actualValueLabel=f.toString();d.actual=g;var h=this.DEFINITION_DATA.EVALUATION_VALUES;if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){var i=Number(b.targetValue);if(this.oConfig.EVALUATION.SCALING==-2){i*=100;}a=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(i,this.oConfig.EVALUATION.SCALING,this.oConfig.EVALUATION.DECIMAL_PRECISION);d.targetValue=Number(b.targetValue);d.targetValueLabel=a.toString();}else{for(var j=0;j<h.length;j++){if(h[j].TYPE==="TA"){var i=Number(h[j].FIXED);if(this.oConfig.EVALUATION.SCALING==-2){i*=100;}a=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(i);d.targetValue=Number(h[j].FIXED);d.targetValueLabel=a.toString();}}}this._updateTileModel(d);var n=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system);t.oDualDeviationView.oGenericTile.$().wrap("<a href ='"+n+"'/>");this.oDualDeviationView.oGenericTile.setState(sap.m.LoadState.Loaded);var s="";if(d.valueColor=="Error"){s="sb.error";}if(d.valueColor=="Neutral"){s="sb.neutral";}if(d.valueColor=="Critical"){s="sb.critical";}if(d.valueColor=="Good"){s="sb.good";}var v={status:s,actual:c,target:b.targetValue,cH:b.criticalHighValue,wH:b.warningHighValue,wL:b.warningLowValue,cL:b.criticalLowValue};var l=v;var C=t.oDualDeviationView.oGenericTile.getTileContent()[0].getContent();var o=t.oDualDeviationView.oGenericTile.getTileContent()[1].getContent();sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(C,"NT",v);sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(o,"DT",l);},this.logError);}},flowWithDesignTimeCall:function(){var t=this;try{var a=sap.ushell.components.tiles.indicatorTileUtils.cache.getEvaluationById(this.oConfig.EVALUATION.ID);if(a){t.oConfig.EVALUATION_FILTERS=a.EVALUATION_FILTERS;t.flowWithoutDesignTimeCall();}else{sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(this.oConfig,function(f){t.oConfig.EVALUATION_FILTERS=f;sap.ushell.components.tiles.indicatorTileUtils.cache.setEvaluationById(t.oConfig.TILE_PROPERTIES.id,t.oConfig);t.flowWithoutDesignTimeCall();});}}catch(e){this.logError(e);}},refreshHandler:function(c){if(!c.firstTimeVisible){if(Number(this.oTileApi.configuration.getParameterValueAsString("isSufficient"))){c.flowWithoutDesignTimeCall();}else{c.flowWithDesignTimeCall();}}},visibleHandler:function(i){if(!i){this.firstTimeVisible=false;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);}if(i){this.refreshHandler(this);}},setTextInTile:function(){var t=this;var a=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.oTileApi);this._updateTileModel({header:a.title||sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(t.oConfig),subheader:a.subTitle||sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(t.oConfig)});},onInit:function(){var t=this;this.firstTimeVisible=false;this.oDualDeviationView=this.getView();this.oViewData=this.oDualDeviationView.getViewData();this.oTileApi=this.oViewData.chip;if(this.oTileApi.visible){this.oTileApi.visible.attachVisible(this.visibleHandler.bind(this));}this.system=this.oTileApi.url.getApplicationSystem();this.oDualDeviationView.oGenericTile.setState(sap.m.LoadState.Loading);try{sap.ushell.components.tiles.indicatorTileUtils.util.getParsedChip(t.oTileApi.configuration.getParameterValueAsString("tileConfiguration"),t.oTileApi.preview.isEnabled(),function(c){t.oConfig=c;t.setTextInTile();if(t.oTileApi.preview){t.oTileApi.preview.setTargetUrl(sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system));}if(t.oTileApi.preview.isEnabled()){t._updateTileModel({valueColor:"Good",value:100,frameType:"TwoByOne",unit:"USD",actual:{value:120,color:sap.m.ValueColor.Good},targetValue:100,thresholds:[{value:0,color:sap.m.ValueColor.Error},{value:50,color:sap.m.ValueColor.Critical},{value:150,color:sap.m.ValueColor.Critical},{value:200,color:sap.m.ValueColor.Error}],showActualValue:true,showTargetValue:true});t.oDualDeviationView.oGenericTile.setState(sap.m.LoadState.Loaded);}else{t.oDualDeviationView.oGenericTile.attachPress(function(){sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(t.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,null);window.location.hash=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system);});if(Number(t.oTileApi.configuration.getParameterValueAsString("isSufficient"))){sap.ushell.components.tiles.indicatorTileUtils.cache.setEvaluationById(t.oConfig.TILE_PROPERTIES.id,t.oConfig);t.flowWithoutDesignTimeCall();}else{t.flowWithDesignTimeCall();}}});}catch(e){this.logError(e);}},_setLocalModelToTile:function(){if(!this.getTile().getModel()){this.getTile().setModel(new sap.ui.model.json.JSONModel({}));}},onExit:function(){sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);}});},true);
