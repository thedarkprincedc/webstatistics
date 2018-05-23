/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/chart/ChartType'],function(C){"use strict";var _={chartTypes:[C.Bar,C.Column,C.Line,C.Combination,C.Pie,C.Donut,C.Scatter,C.Bubble,C.Heatmap,C.Bullet,C.VerticalBullet,C.StackedBar,C.StackedColumn,C.StackedCombination,C.HorizontalStackedCombination,C.DualBar,C.DualColumn,C.DualLine,C.DualStackedBar,C.DualStackedColumn,C.DualCombination,C.DualHorizontalCombination,C.DualStackedCombination,C.DualHorizontalStackedCombination,C.PercentageStackedBar,C.PercentageStackedColumn,C.PercentageDualStackedBar,C.PercentageDualStackedColumn,C.Waterfall,C.HorizontalWaterfall],pagingChartTypes:[C.Bar,C.Column,C.Line,C.Combination,C.Bullet,C.VerticalBullet,C.StackedBar,C.StackedColumn,C.StackedCombination,C.HorizontalStackedCombination,C.DualBar,C.DualColumn,C.DualLine,C.DualStackedBar,C.DualStackedColumn,C.DualCombination,C.DualHorizontalCombination,C.DualStackedCombination,C.DualHorizontalStackedCombination,C.PercentageStackedBar,C.PercentageStackedColumn,C.PercentageDualStackedBar,C.PercentageDualStackedColumn],timeChartTypes:["timeseries_line","timeseries_column","timeseries_bubble","timeseries_scatter","timeseries_combination","dual_timeseries_combination","timeseries_bullet","timeseries_stacked_column","timeseries_100_stacked_column","timeseries_waterfall"],oAdapteredChartTypes:{"line":"timeseries_line","column":"timeseries_column","scatter":"timeseries_scatter","bubble":"timeseries_bubble","combination":"timeseries_combination","dual_combination":"dual_timeseries_combination","vertical_bullet":"timeseries_bullet","stacked_column":"timeseries_stacked_column","100_stacked_column":"timeseries_100_stacked_column","waterfall":"timeseries_waterfall"},nonSemanticPatternChartType:[C.Combination,C.Pie,C.Donut,C.Scatter,C.Bubble,C.Heatmap,C.StackedBar,C.StackedColumn,C.StackedCombination,C.HorizontalStackedCombination,C.DualStackedBar,C.DualStackedColumn,C.DualCombination,C.DualHorizontalCombination,C.DualStackedCombination,C.DualHorizontalStackedCombination,C.PercentageStackedBar,C.PercentageStackedColumn,C.PercentageDualStackedBar,C.PercentageDualStackedColumn,C.Waterfall,C.HorizontalWaterfall,"timeseries_bubble","timeseries_scatter","timeseries_combination","dual_timeseries_combination","timeseries_stacked_column","timeseries_100_stacked_column","timeseries_waterfall"],lineChartType:[C.Line,C.DualLine,'timeseries_line']};return{CONFIG:_,makeNotifyParentProperty:function(p){return function(v,s){var o=this.mProperties[p];v=this.validateProperty(p,v);if(jQuery.sap.equal(o,v)){return this;}this.setProperty(p,v,s);if(s){return this;}var P=this.getParent();if(P&&typeof P._invalidateBy==="function"){P._invalidateBy({source:this,property:p,oldValue:o,newValue:v});}return this;};},isStackedLikeChart:function(c){return c.indexOf('stacked')>=0||c.indexOf('waterfall')>=0;},isBulletChart:function(c){return c.indexOf('bullet')>=0;}};});
