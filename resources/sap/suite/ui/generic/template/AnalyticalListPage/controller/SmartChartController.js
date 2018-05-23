sap.ui.define(["sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/FlexItemData","sap/m/ToolbarDesign","sap/ui/core/mvc/Controller","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil"],function(O,T,F,b,C,c){"use strict";var d=C.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.SmartChartController",{setState:function(s){this.triggeredByTableSort=false;this.tableSortSelection;this._selectFilterByMeasure=false;this.oState=s;s.oSmartChart.attachInitialise(this._onSmartChartInit,this);s.oSmartChart.attachBeforeRebindChart(this._onBeforeRebindChart,this);s.oSmartChart.attachDataReceived(this._onDataReceived,this);},_onBeforeRebindChart:function(E){if(this.triggeredByTableSort&&this.tableSortSelection){var v=this.oState.oSmartChart.fetchVariant();if(this.tableSortSelection.length>0){v.sort={};v.sort.sortItems=[];for(var i=0;i<(this.tableSortSelection.length);i++){E.mParameters.bindingParams.sorter.push(this.tableSortSelection[i]);v.sort.sortItems.push({columnKey:this.tableSortSelection[i].sPath,operation:this.tableSortSelection[i].bDescending?"Descending":"Ascending"});}}else{E.mParameters.bindingParams.sorter=this.tableSortSelection;if(v.sort){delete v.sort;}}this.oState.oSmartChart.applyVariant(v);this.triggeredByTableSort=false;}if(this.oState.oSmartFilterbar&&this.oState.oSmartFilterbar.getAnalyticBindingPath&&this.oState.oSmartFilterbar.getConsiderAnalyticalParameters()){try{var a=this.oState.oSmartFilterbar.getAnalyticBindingPath();if(a){this.oState.oSmartChart.setChartBindingPath(a);}}catch(e){jQuery.sap.log.warning("Mandatory parameters have no values","","AnalyticalListPage");}}this.oState.oController.onBeforeRebindChartExtension(E);this.checkToPreventChartBinding(E);},_onDataReceived:function(e){if(!this.oState.oSmartChart.getToolbar().getEnabled()){this.oState.oContentArea.enableToolbar();}this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(e.getSource());},_onSmartChartInit:function(e){var s=this.oState;this.oChart=s.oSmartChart.getChart();s.oSmartChart.attachShowOverlay(function(E){s.oSmartChart.getToolbar().setEnabled(!E.getParameter("overlay").show);},this);this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(e.getSource());this.oChart.attachSelectData(this._onChartSelectData,this);this.oChart.attachDeselectData(this._onChartDeselectData,this);this.oState.oSmartChart.attachChartDataChanged(this._onPersonalisationDimeasureChange,this);if(this.oState._pendingChartToolbarInit&&this.oState.oSmartTable){this.oState.oSmartChart.getToolbar().insertContent(this.oState.alr_viewSwitchButtonOnChart,this.oState.oSmartChart.getToolbar().getContent().length);}delete this.oState._pendingChartToolbarInit;this._changeValueAxisTitleVisibility();this.oState.oSmartChart.getChart().setVizProperties({"legendGroup":{"layout":{"position":"bottom"}}});this.oState.oSmartChart.attachSelectionDetailsActionPress(function(E){var o=E.getSource();var a=E.getParameter("itemContexts")&&E.getParameter("itemContexts")[0];s.oTemplateUtils.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){if(!a){jQuery.sap.log.error("Binding context for the selected chart item is missing");return;}if(o.data("CrossNavigation")){s.oTemplateUtils.oCommonEventHandlers.onEditNavigateIntent(o,a,s.oSmartFilterbar,s.oSmartChart.getChart());return;}s.oTemplateUtils.oCommonUtils.navigateFromListItem(a,s.oSmartChart);},jQuery.noop,s);});jQuery.sap.log.info("Smart Chart Annotation initialized");},_onChartSelectData:function(e){var a=this.oState.oSmartChart.getChart();if(a._getVizFrame().vizSelection()){var s=this.oState.oTemplateUtils.oCommonUtils.getSelectionPoints(a).dataPoints;this._lastSelected=this._getLastSel(s,this._lastSelectedList);this._lastSelectedList=s;}this._updateTable();this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(e.getSource());},_onPersonalisationDimeasureChange:function(e){var o=e.getParameters().changeTypes;if(o.dimeasure&&!o.filter&&!o.sort){this._onChartSelectData(e);}this._changeValueAxisTitleVisibility();},_getLastSel:function(n,o){var e=this.oState.oSmartChart.getChart();var f=this.oState.detailController&&this.oState.detailController._getSelParamsFromDPList(n);var g=this.oState.detailController&&this.oState.detailController._getSelParamsFromDPList(o);if(f){for(var i=0;i<f.length;i++){var h=f[i];var m=false;for(var j=0;j<g.length;j++){var k=g[j];m=true;for(var a in k){if(a.indexOf("__")!=-1){continue;}if(h[a]!=k[a]){m=false;break;}}if(m){break;}}if(!m){var l=e.getVisibleDimensions();var p={};for(var j=0;j<l.length;j++){var q=l[j];p[q]=h[q];}return p;}}}return null;},_onChartDeselectData:function(e){var m=this;this._lastSelected=null;setTimeout(function(){var f=m.oState.oSmartChart.getChart();if(m.oState.oTemplateUtils.oCommonUtils.getSelectionPoints(f).count==0){m._updateTable();}else if(f.getSelectionMode()=="MULTIPLE"){m._onChartSelectData(e);}},1);var a=e.getParameter("oSource");if(a&&a instanceof sap.m.Link&&a.getParent()instanceof sap.m.Breadcrumbs){m._onChartDrilledUp(e);}this.oState.oTemplateUtils.oCommonUtils.setEnabledToolbarButtons(e.getSource());this.oState.oTemplateUtils.oCommonUtils.setEnabledFooterButtons(e.getSource());},_onChartDrilledUp:function(e){this._updateTable();},_onChartDrilledDown:function(e){this._updateTable();},_updateTable:function(){var a=this.oState.oSmartChart.getChart();if(!a){return;}var e=[];if(a._getVizFrame().vizSelection()){e=this.oState.oTemplateUtils.oCommonUtils.getSelectionPoints(a).dataPoints;}if(!e||e.length==0){this._lastSelected=null;}if(this.oState.detailController){this.oState.detailController.applyParamsToTable();}},checkToPreventChartBinding:function(e){var p=false;var a=e.mParameters.bindingParams.filters;var f=e.mParameters.bindingParams.sorter;p=this._lastFilter&&!c.isFilterDiff(this._lastFilter,a);p=p?this._lastSorter&&!c.isFilterDiff(this._lastSorter,f):false;this._lastFilter=a;this._lastSorter=f;var s=e.mParameters.bindingParams.parameters.custom&&e.mParameters.bindingParams.parameters.custom.search;var g=s?e.mParameters.bindingParams.parameters.custom.search:s;if(this._lastSearch||g){p=p?(this._lastSearch===g):false;this._lastSearch=g;}var o=this.oState.oSmartFilterbar.getFilterData();var h={};for(var k in o){if(k.indexOf("$Parameter")!==-1){h[k]=o[k];}}p=p?this._lastParam&&!c.isFilterObjDiff(this._lastParam,h):false;this._lastParam=h;if(p){e.mParameters.bindingParams.preventChartBind=true;this.oState.oSmartChart.showOverlay(false);this.oState.oSmartChart.getToolbar().setEnabled(true);}},_changeValueAxisTitleVisibility:function(){if(this.oState.oSmartChart.getChart().getChartType().indexOf("dual_")==0){this.oState.oSmartChart.getChart().setVizProperties({"valueAxis":{"title":{"visible":true}}});}else{this.oState.oSmartChart.getChart().setVizProperties({"valueAxis":{"title":{"visible":false}}});}}});return d;});