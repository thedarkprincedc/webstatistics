/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare('sap.apf.modeler.ui.utils.stepPropertyMetadataHandler');jQuery.sap.require('sap.apf.modeler.ui.utils.constants');(function(){'use strict';var c=sap.apf.modeler.ui.utils.CONSTANTS;sap.apf.modeler.ui.utils.StepPropertyMetadataHandler=function(C,s){this.oCoreApi=C;this.oStep=s;};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.constructor=sap.apf.modeler.ui.utils.StepPropertyMetadataHandler;function _(e,s,a){var p=[],A;var S=s.oStep.getSelectProperties();S.forEach(function(P){if(s.getPropertyMetadata(e,P)){A=s.getPropertyMetadata(e,P)["aggregation-role"];if(A===a){p.push(P);}}});return p;}sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getEntityTypeMetadataAsPromise=function(){var a=this.oStep.getService();var e=this.oStep.getEntitySet();return this.oCoreApi.getEntityTypeMetadataAsPromise(a,e);};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getFilterMappingEntityTypeMetadataAsPromise=function(a,e){return this.oCoreApi.getEntityTypeMetadataAsPromise(a,e);};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getDimensionsProperties=function(e){return _(e,this,c.aggregationRoles.DIMENSION);};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getMeasures=function(e){return _(e,this,c.aggregationRoles.MEASURE);};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getProperties=function(){return this.oStep.getSelectProperties();};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getHierarchicalProperty=function(){return this.oStep.getHierarchyProperty();};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getPropertyMetadata=function(e,p){if(!e){return undefined;}return e.getPropertyMetadata(p);};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getDefaultLabel=function(e,p){var s=this;var P=s.getPropertyMetadata(e,p);if(!P){return"";}return P.label||P.name;};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.hasTextPropertyOfDimension=function(e,d){var i=false,s,S=this;var D=S.getPropertyMetadata(e,d);if(!D){return i;}if(D.text){s=this.oStep.getSelectProperties();i=s.indexOf(D.text)===-1?false:true;}return i;};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getRepresentationTypesArray=function(){var v=[],s=this;if(s.oStep.getType()==="hierarchicalStep"){v.push({key:"TreeTableRepresentation",name:s.oCoreApi.getText("TreeTableRepresentation")});}else{s.oCoreApi.getRepresentationTypes().forEach(function(r){if(r.metadata){if(r.id!=="TreeTableRepresentation"){v.push({key:r.id,name:s.oCoreApi.getText(r.id)});}}});}return v;};sap.apf.modeler.ui.utils.StepPropertyMetadataHandler.prototype.getStepType=function(){return this.oStep.getType();};})();
