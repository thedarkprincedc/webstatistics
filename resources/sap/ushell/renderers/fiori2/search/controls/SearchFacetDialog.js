sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchFacetDialogHelper','sap/ushell/renderers/fiori2/search/SearchFacetDialogHelperCharts','sap/ushell/renderers/fiori2/search/controls/SearchAdvancedCondition','sap/m/Dialog'],function(s,a){"use strict";sap.m.Dialog.extend('sap.ushell.renderers.fiori2.search.controls.SearchFacetDialog',{constructor:function(o){var t=this;t.bShowCharts=true;t.bOldPieChart=true;if(jQuery.sap.getUriParameters().mParams.newpie&&jQuery.sap.getUriParameters().get("newpie")!=="false"){t.bOldPieChart=false;}t.chartOnDisplayIndex=o.selectedTabBarIndex;t.facetOnDisplayIndex=0;t.chartOnDisplayIndexByFilterArray=[];t.aItemsForBarChart=[];t.tabBarItems=o.tabBarItems;t.searchFacetDialogHelperCharts=a;if(!t.tabBarItems){a.setDummyTabBarItems(t);}o=jQuery.extend({},{showHeader:false,horizontalScrolling:false,verticalScrolling:false,contentHeight:'35rem',beginButton:new sap.m.Button({text:sap.ushell.resources.i18n.getText("okDialogBtn"),press:function(e){t.onOkClick(e);t.close();t.destroy();}}),endButton:new sap.m.Button({text:sap.ushell.resources.i18n.getText("cancelDialogBtn"),press:function(e){t.close();t.destroy();}}),content:[t.createContainer()]},o);t.selectedAttribute=o.selectedAttribute?o.selectedAttribute:"";delete o.selectedAttribute;delete o.selectedTabBarIndex;delete o.tabBarItems;sap.m.Dialog.prototype.constructor.apply(this,[o]);s.init(t);a.init(t);t.addStyleClass('sapUshellSearchFacetDialog');},renderer:'sap.m.DialogRenderer',createContainer:function(){var t=this;t.oSplitContainer=new sap.m.SplitContainer({masterPages:t.createMasterPages()});t.oSplitContainer.bindAggregation("detailPages","/facetDialog",function(i,c){return t.createDetailPages(i,c);});t.oSplitContainer.addStyleClass('sapUshellSearchFacetDialogContainer');return t.oSplitContainer;},createMasterPages:function(){var t=this;var f=new sap.m.List({mode:sap.m.ListMode.SingleSelectMaster,selectionChange:function(e){t.onMasterPageSelectionChange(e);}});f.addStyleClass('sapUshellSearchFacetDialogFacetList');f.bindAggregation("items","/facetDialog",function(i,c){var l=new sap.m.StandardListItem({title:"{title}",counter:"{count}"});return l;});var r=new sap.m.Button({icon:"sap-icon://clear-filter",tooltip:sap.ushell.resources.i18n.getText("resetFilterButton_tooltip"),type:'Transparent',enabled:false,press:function(e){t.resetAllFilters(e);}});r.addStyleClass("sapUshellSearchFacetDialogFilterResetButton");var m=new sap.m.Page({title:sap.ushell.resources.i18n.getText("filters"),headerContent:r,content:[f]}).addStyleClass('sapUshellSearchFacetDialogMasterContainer');m.addEventDelegate({onAfterRendering:function(e){if(t.selectedAttribute){for(var i=0;i<f.getItems().length;i++){var l=f.getItems()[i];var b=l.getBindingContext().getObject();if(t.selectedAttribute===b.dimension){f.setSelectedItem(l);t.facetOnDisplayIndex=i;t.chartOnDisplayIndexByFilterArray.push(t.chartOnDisplayIndex);}else{var n=0;var c=l.getBindingContext().getModel().oData.facets;for(var j=0;j<c.length;j++){if(c[j].chartIndex&&c[j].dimension===b.dimension&&!isNaN(c[j].chartIndex)){n=c[j].chartIndex;}}t.chartOnDisplayIndexByFilterArray.push(n);}}}if(!f.getSelectedItem()){f.setSelectedItem(f.getItems()[0]);}var S=f.getSelectedItem();s.updateDetailPage(S,null,true);t.resetEnabledForFilterResetButton();}});var M=[m];return M;},resetAllFilters:function(e){var b=$(".sapUshellSearchFacetDialogSettingsContainer").find(".sapMCbBg.sapMCbHoverable.sapMCbMark");if(b.length===1){var i=b[0].parentNode.id;var c=sap.ui.getCore().byId(i);c.setSelected(false);c.setEnabled(false);}var m=this.getModel();m.aFilters=[];s.bResetFilterIsActive=true;var M=s.getFacetList();var f=M.getItems();for(var j=0;j<f.length;j++){f[j].setCounter(0);}this.resetAdvancedConditionFilters();s.resetChartQueryFilters();s.updateDetailPage(M.getSelectedItem());this.resetEnabledForFilterResetButton();s.bResetFilterIsActive=false;},resetAdvancedConditionFilters:function(){var t=this;var A,c,n,b,p,C,j;var d=t.oSplitContainer.getDetailPages();for(var i=0;i<d.length;i++){var D=d[i];n=s.POS_ATTRIBUTE_LIST_CONTAINER;A=D.getContent()[n];if(A){for(j=A.getContent().length-2;j>0;j--){c=A.getContent()[j];p=c.getParent();C=c;p.removeContent(C);}}else{n=s.POS_ICONTABBAR;b=s.POS_TABBAR_CONDITION;A=D.getContent()[n].getItems()[b].getContent()[0];if(A){for(j=A.getContent().length-1;j>-1;j--){c=A.getContent()[j];if(c.getContent&&c.getContent()[1]){var e=c.getContent()[1].getContent()[1];var f=e.getValue();if(f&&(""+f).length>0){p=c.getParent();C=c;p.removeContent(C);}}}}}}},resetEnabledForFilterResetButton:function(f){var F=false;var o=0;var m=s.getFacetList();var b=m.getItems();for(var i=0;i<b.length;i++){o+=b[i].getCounter();}var M=this.getModel();if(M.aFilters&&M.aFilters.length>0||f||o>0){F=true;}var c=$('.sapUshellSearchFacetDialogFilterResetButton')[0].id;var r=sap.ui.getCore().byId(c);r.setEnabled(F);},onMasterPageSelectionChange:function(e){var t=this;var l=e.mParameters.listItem;t.facetOnDisplayIndex=l.getParent().indexOfItem(l.getParent().getSelectedItem());t.setChartOnDisplayIndexForFacetListItem(t.facetOnDisplayIndex);var m=l.getParent().getModel();var b=l.getBindingContext().sPath;t.resetIcons(m,b,t);s.updateDetailPage(l);if(t.oSplitContainer.getMode()==="ShowHideMode"){t.oSplitContainer.hideMaster();}t.controlChartVisibility(t,t.chartOnDisplayIndex);},createDetailPages:function(i,c){var t=this;var f=c.oModel.getProperty(c.sPath).facetType;var d=c.oModel.getAttributeDataType(c.oModel.getProperty(c.sPath).dataType);var S=new sap.m.Select({items:[new sap.ui.core.Item({text:sap.ushell.resources.i18n.getText("notSorted"),key:"notSorted"}),new sap.ui.core.Item({text:sap.ushell.resources.i18n.getText("sortByCount"),key:"sortCount"}),new sap.ui.core.Item({text:sap.ushell.resources.i18n.getText("sortByName"),key:"sortName"})],selectedKey:(d==="string"||d==="text")?"sortCount":"notSorted",change:function(E){t.onSelectChange(E);}}).addStyleClass('sapUshellSearchFacetDialogSettingsSelect');var h=new sap.m.HBox({alignItems:sap.m.FlexAlignItems.End,justifyContent:sap.m.FlexJustifyContent.End,items:[S]});var C=new sap.m.CheckBox({text:sap.ushell.resources.i18n.getText("showSelectedOnTop"),enabled:false,select:function(E){t.onCheckBoxSelect(E);}});var o=new sap.m.VBox({items:[h,C]}).addStyleClass('sapUshellSearchFacetDialogSettingsContainer');o.setVisible(false);var l=new sap.m.List({backgroundDesign:sap.m.BackgroundDesign.Transparent,includeItemInSelection:true,showNoData:false,showSeparators:sap.m.ListSeparators.None,selectionChange:function(E){t.onDetailPageSelectionChange(E);}});l.addStyleClass('sapUshellSearchFacetDialogDetailPageList');l.addStyleClass('largeChart0');if(f==="attribute"){l.setMode(sap.m.ListMode.MultiSelect);}var b={path:"items",factory:function(i,c){var B=c.oModel.getProperty(c.sPath);var q=new sap.m.StandardListItem({title:"{label}",tooltip:sap.ushell.resources.i18n.getText("facetListTooltip",["{label}","{value}"]),info:"{valueLabel}",selected:"{selected}"});if(B.selected){c.oModel.addFilter(B);}return q;}};if(d==="number"){S.removeItem(2);}b.filters=new sap.ui.model.Filter("advanced",sap.ui.model.FilterOperator.NE,true);l.bindAggregation("items",b);l.setBusyIndicatorDelay(0);l.data('dataType',d);if(t.bShowCharts){l.addEventDelegate({onAfterRendering:function(E){t.hideSelectively(E,t,0);}});}var L,e,g;e=a.getBarChartPlaceholder();e.addEventDelegate({onAfterRendering:function(E){t.hideSelectively(E,t,1);}});e.data('dataType',d);if(t.bOldPieChart){g=a.getPieChartPlaceholder();}else{g={};}g.addEventDelegate({onAfterRendering:function(E){t.hideSelectively(E,t,2);}});if(t.bShowCharts&&(d==="string"||d==="text")){L=new sap.m.ScrollContainer({height:'67.2%',horizontal:false,vertical:true,content:[l,e,g]});}else{L=new sap.m.ScrollContainer({height:'calc(100% - 0.25rem)',horizontal:false,vertical:true,content:[l]});}L.addStyleClass('sapUshellSearchFacetDialogDetailPageListContainer');L.addStyleClass('searchFacetLargeChartContainer');var A=new sap.ushell.renderers.fiori2.search.controls.SearchAdvancedCondition({type:d,odata2:(c.oModel.config.odataProvider||c.oModel.config.sinaProvider==='ODATA2')});var p;if(d==="string"||d==="text"){var j=new sap.m.ScrollContainer({horizontal:false,vertical:true,content:[A]});j.addStyleClass('sapUshellSearchFacetDialogDetailPageAdvancedContainer');var P=new sap.m.Button({icon:"sap-icon://add",type:sap.m.ButtonType.Transparent,press:function(E){t.onPlusButtonPress(E,d);}});j.addContent(P);j.data('dataType',d);j.data('initial',true);L.setHeight('calc(100% - 0.25rem)');j.setHeight('100%');var k=a.getDropDownButton(t);var m=new sap.m.Toolbar({content:[new sap.m.SearchField({placeholder:sap.ushell.resources.i18n.getText("filterPlaceholder"),liveChange:function(E){t.onSearchFieldLiveChange(E);}}),new sap.m.ToggleButton({icon:"sap-icon://sort",press:function(E){t.onSettingButtonPress(E);}}).addStyleClass('sapUshellSearchFacetDialogSortButton')]}).addStyleClass('sapUshellSearchFacetDialogSubheaderToolbar');m.addEventDelegate({onAfterRendering:function(E){$('.sapUshellSearchFacetDialogSubheaderToolbar').removeClass("sapContrastPlus");}});if(t.bShowCharts){m.addContent(k);}var T=new sap.m.Page({showHeader:false,subHeader:m,content:[o,L]}).addStyleClass('sapUshellSearchFacetDialogDetailPage');var I=new sap.m.IconTabBar({expandable:false,stretchContentHeight:true,backgroundDesign:sap.m.BackgroundDesign.Transparent,applyContentPadding:false,select:function(E){t.controlChartVisibility(t,t.chartOnDisplayIndex);},items:[new sap.m.IconTabFilter({text:sap.ushell.resources.i18n.getText("selectFromList"),content:[T]}),new sap.m.IconTabFilter({text:sap.ushell.resources.i18n.getText("defineCondition"),content:[j]})]});I.addStyleClass('sapUshellSearchFacetDialogIconTabBar');p=new sap.m.Page({showHeader:true,title:c.oModel.getProperty(c.sPath).title,content:[I]});p.addStyleClass('sapUshellSearchFacetDialogDetailPageString');}else{L.addContent(A);L.data('dataType',d);L.data('initial',true);if(t.bShowCharts){var n=c.oModel.getProperty(c.sPath).title;p=new sap.m.Page({title:n,showHeader:true,content:[o,L]});}else{p=new sap.m.Page({showHeader:true,title:c.oModel.getProperty(c.sPath).title,content:[o,L]});}p.addStyleClass('sapUshellSearchFacetDialogDetailPage');}return p;},onDetailPageSelectionChange:function(e){var t=this;var S=e.mParameters.listItem;var b=S.getBindingContext().getObject();if(S.getSelected()){b.listed=true;t.getModel().addFilter(b);}else{b.listed=false;t.getModel().removeFilter(b);}var l=e.oSource;var d;if(l.data('dataType')==="string"||l.data('dataType')==="text"){d=l.getParent().getParent().getParent().getParent().getParent().getParent();}else{d=l.getParent().getParent();}s.updateCountInfo(d);var o=l.getParent().getParent().getContent()[s.POS_SETTING_CONTAINER];var c=o.getItems()[s.POS_SHOWONTOP_CHECKBOX];var f=o.getItems()[s.POS_SORTING_SELECT].getItems()[0];if(c.getSelected()){c.setSelected(false);f.setSelectedKey("notSorted");}if(l.getSelectedContexts().length>0){c.setEnabled(true);}else{c.setEnabled(false);}},onSearchFieldLiveChange:function(e){var f=e.getSource().getValue();var S=s.getFacetList().getSelectedItem();s.updateDetailPage(S,f);},onSettingButtonPress:function(e){var p=e.oSource.getPressed();var S=e.oSource.getParent().getParent().getContent()[s.POS_SETTING_CONTAINER];var l=e.oSource.getParent().getParent().getContent()[s.POS_ATTRIBUTE_LIST_CONTAINER];if(p){S.setVisible(true);l.setHeight('calc(100% - 4.25rem)');}else{S.setVisible(false);l.setHeight('calc(100% - 0.25rem)');}},onSelectChange:function(e){s.sortingAttributeList(e.oSource.getParent().getParent().getParent());},onCheckBoxSelect:function(e){s.sortingAttributeList(e.oSource.getParent().getParent());},onPlusButtonPress:function(e,t){var A=e.getSource().getParent();var n=new sap.ushell.renderers.fiori2.search.controls.SearchAdvancedCondition({type:t});var i=A.getAggregation("content").length-1;A.insertAggregation("content",n,i);},onOkClick:function(e){var t=this;var M=t.getModel();var S=t.getModel('searchModel');S.resetFilterConditions(false);var d=t.oSplitContainer.getDetailPages();for(var m=0;m<M.aFilters.length;m++){var b=M.aFilters[m];if(!b.advanced||b.listed){S.addFilterCondition(b.filterCondition,false);}}for(var i=0;i<d.length;i++){if(s.getFacetList().getItems()[i]){s.applyAdvancedCondition(d[i],s.getFacetList().getItems()[i].getBindingContext().getObject(),S);}}S.filterChanged=true;S._firePerspectiveQuery();},setChartOnDisplayIndexForFacetListItem:function(f){var t=this;var r=0;try{r=t.chartOnDisplayIndexByFilterArray[f];}catch(e){r=0;}if(r===undefined){r=0;}t.chartOnDisplayIndex=r;},resetIcons:function(m,p,c){var t=this;var b=false;var d=m.getAttributeDataType(m.getProperty(p).dataType);if(t.bShowCharts&&(d==="string"||d==="text")){b=true;}var e=$('.sapUshellSearchFacetDialogTabBarButton');if(b){e.css("display","block");for(var i=0;i<e.length;i++){var f=e[i].id;var D=sap.ui.getCore().byId(f);var g=c.tabBarItems[c.chartOnDisplayIndex].getIcon();D.setIcon(g);var h=c.tabBarItems[c.chartOnDisplayIndex].getText();var j=sap.ushell.resources.i18n.getText('displayAs',[h]);D.setTooltip(j);}}else{e.css("display","none");}},onDetailPageSelectionChangeCharts:function(e){var t=this;var c=0;var b,m,d,f,g,S,h,B,p,M;var k,j,l,n,i,o;if(e.getSource&&e.sId==="press"){b=e.getSource().getBindingContext();m=b.getModel();d=b.getObject();f=d.selected;g=f?false:true;S=e.getSource();h=S.getBindingContext().sPath+"/selected";m.setProperty(h,g);B=S.getBindingContext().getObject();if(g){m.addFilter(B);}else{m.removeFilter(B);}p=h.replace(/\/items.+/,'');p+="/items";l=m.getProperty(p);c=0;for(i=0;i<l.length;i++){n=l[i];if(n.selected===true){c++;}}}else if(e.getSource&&(e.sId==="selectData"||e.sId==="deselectData")){b=e.getSource().getBindingContext();m=b.getModel();d=b.getObject();g=(e.sId==="selectData")?true:false;S=e.getSource();h=S.getBindingContext().sPath+"/items/";for(j=0;j<e.getParameters().data.length;j++){k=e.getParameters().data[j].data._context_row_number;h+=k+"/selected";m.setProperty(h,g);B=S.getBindingContext().getObject().items[k];if(g){m.addFilter(B);}else{m.removeFilter(B);}}p=h.replace(/\/items.+/,'');p+="/items";l=m.getProperty(p);c=0;for(i=0;i<l.length;i++){if(l[i].selected===true){c++;}}var q=e.mParameters.data.length;if(!g&&q>1){c=0;for(i=0;i<l.length;i++){l[i].selected=false;}}}else{d=e.dataObject;f=d.selected;g=f?false:true;c=e.cnt;m=e.model;B=new sap.ushell.renderers.fiori2.search.FacetItem();B.facetAttribute=d.dimension;B.filterCondition=d.filterCondition;B.label=d.label;B.selected=d.selected;B.listed=d.selected;B.value=d.value;B.valueLabel=d.valueLabel;for(j=0;j<t.aItemsForBarChart.length;j++){var r=t.aItemsForBarChart[j];if(r.label===d.label){r.selected=d.selected;}}if(f){t.getModel().addFilter(B);}else{t.getModel().removeFilter(B);}}M=s.getFacetList();o=M.getSelectedItem();if(!o){o=M.getItems()[0];}o.setCounter(c);this.resetEnabledForFilterResetButton();},updateDetailPageCharts:function(i,m){var t=this;if(t.bShowCharts===false){return;}t.aItemsForBarChart=i;var l=a.getListContainersForDetailPage();var L=l[1];var c=L.getContent();if(c&&t.chartOnDisplayIndex===2){var p=c[2];var e=l[5];var r=l[2];r=0.9*r;if(p.directUpdate){var b={};b.relevantContainerHeight=r;b.oSearchFacetDialog=t;var M=new sap.ui.model.json.JSONModel();M.setData(i);$("#"+e.id).empty();p.directUpdate(i,e,M,b);}}var d,f;if(c&&t.chartOnDisplayIndex===1){d=l[0].firstChild.children[2];if(d){f=$("#"+d.id);f.css("display","none");}}if(c&&t.chartOnDisplayIndex===2){d=l[0].firstChild.children[1];if(d){f=$("#"+d.id);f.css("display","none");}}},controlChartVisibility:function(c,b,f){var t=this;var e,d,g,h;if(t.bShowCharts===false){return;}var l=c.searchFacetDialogHelperCharts.getListContainersForDetailPage();var L=l[1];if(!L||!L.getContent){return;}var j=L.getContent();for(var i=0;i<j.length;i++){e=l[0].firstChild.children[i];if(!e){return;}g=e.className;h=false;if(g.indexOf("largeChart")>-1){h=true;}d=$("#"+e.id);if(h&&i!==b){d.css("display","none");}else{d.css("display","block");}}if(c.bOldPieChart){if(h&&b===2&&f){var I=t.aItemsForBarChart;var m=t.getModel();t.updateDetailPageCharts(I,m);}if(h&&b===2){L.setVertical(false);}else{L.setVertical(true);}}var S=l[6];var o=l[7];if(S){if(b===0){S.css("display","block");o.css('visibility','visible');}else{S.css("display","none");o.css('visibility','hidden');}}},hideSelectively:function(e,c,b){var d=$("#"+e.srcControl.sId);var f=c.chartOnDisplayIndex;var l=c.searchFacetDialogHelperCharts.getListContainersForDetailPage();var L=l[1];if(l[0].firstChild.children.length!=3){return;}if(f!==undefined){if(c.chartOnDisplayIndex!==b){d.css("display","none");}else{d.css("display","block");}}else{d.css("display","block");}if(f===2){if(!l[0].firstChild.children[2]||!l[0].firstChild.children[2].firstChild){c.controlChartVisibility(c,c.chartOnDisplayIndex,true);}if(c.bOldPieChart){L.setVertical(false);}}else{L.setVertical(true);}var S=l[6];if(S){var g=$("#"+S.sId);if(f===0){g.css("display","block");}else{g.css("display","none");}}}});});
