/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.require('sap.apf.modeler.ui.controller.cornerTexts');(function(){"use strict";function _(c,C){var o=C&&c.oTextPool.get(C);return o&&o.TextElementDescription;}sap.apf.modeler.ui.controller.cornerTexts.extend("sap.apf.modeler.ui.controller.stepCornerTexts",{setChartIcon:function(){var c=this;c.byId("idChartIcon").setSrc("sap-icon://line-chart");c.byId("idChartIcon").addStyleClass("stepChartIcon");},addStyleClasses:function(){var c=this;c.byId("idLeftUpper").addStyleClass("stepLeftCornerText");c.byId("idRightUpper").addStyleClass("stepRightCornerText");c.byId("idLeftLower").addStyleClass("stepLeftCornerText");c.byId("idRightLower").addStyleClass("stepRightCornerText");},getTranslationFormatMap:function(){return sap.apf.modeler.ui.utils.TranslationFormatMap.STEP_CORNER_TEXT;},getLeftUpperCornerText:function(m){var c=this;var s=c.getView().getViewData().oParentObject[m]();var S=_(c,s);return S;},getRightUpperCornerText:function(m){var c=this;var s=c.getView().getViewData().oParentObject[m]();var S=_(c,s);return S;},getLeftLowerCornerText:function(m){var c=this;var s=c.getView().getViewData().oParentObject[m]();var S=_(c,s);return S;},getRightLowerCornerText:function(m){var c=this;var s=c.getView().getViewData().oParentObject[m]();var S=_(c,s);return S;}});}());