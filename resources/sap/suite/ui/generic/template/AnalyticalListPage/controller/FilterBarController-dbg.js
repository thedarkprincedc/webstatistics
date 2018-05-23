
sap.ui.define(["sap/m/SegmentedButtonItem", "sap/m/Button", "sap/m/ButtonType", "sap/m/Text", "sap/m/Dialog", "sap/m/SegmentedButton",
	"sap/suite/ui/generic/template/AnalyticalListPage/controller/VisualFilterDialogController",
	"sap/ui/core/mvc/Controller", "sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil"
	],
	function(
		SegmentedButtonItem, Button, ButtonType, Text,
		Dialog, SegmentedButton, VisualFilterDialogController,
		Controller, FilterUtil) {
		"use strict";

		var FILTER_MODE_VISUAL = "visual";

		var fbController = Controller.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.FilterBarController", {
			init: function(oState) {
				this.compactFilterData = {};
				var me = this;

				me.oState = oState;
				//Make bShowGoButtonOnFilter always true on launching the app in S Size devices. In other devices, take the value from manifest.
				var bShowGoButtonOnFilter;
				if (sap.ui.Device.system.phone) {
					bShowGoButtonOnFilter = true;
				} else {
					bShowGoButtonOnFilter = me.oState.oController.getOwnerComponent().getShowGoButtonOnFilterBar() ? true : false;
				}
				oState.oSmartFilterbar.setShowGoOnFB(bShowGoButtonOnFilter);
				//live mode on when go button is disabled
				//TODO: should be moved to view fragment
				oState.oSmartFilterbar.setLiveMode(!bShowGoButtonOnFilter);
				//Show messages only if GO button is enabled
				oState.oSmartFilterbar.setShowMessages(bShowGoButtonOnFilter);
				//load data on initial launch for live mode
				//TODO: should be moved to view fragment
				if (oState.oSmartTable) {
					oState.oSmartTable.setEnableAutoBinding(!bShowGoButtonOnFilter);
				}
				//Enable "AdaptFilter" beside the "Go" button
				if (!bShowGoButtonOnFilter) {
					//TODO:Hiding "AdaptFilter" button using private API , public API to be used when available
					me.oState.oSmartFilterbar._oFiltersButton.setVisible(false);
				}

				oState.oHeader = oState.oPage.getHeader();
				oState.oTitle = oState.oPage.getTitle();

				if (oState.oKpiTagContainer) {
					oState.alr_filterContainer.removeContent(oState.oKpiTagContainer);
					oState.oKpiTagContainer.addStyleClass("sapSmartTemplatesAnalyticalListPageKpiTagContainer");
				}

				if (oState.alr_visualFilterBar) {
					oState.alr_visualFilterBar.setSmartFilterContext(this.oState.oSmartFilterbar);
					oState.alr_visualFilterBar.attachFilterChange(this._onVisualFilterChange.bind(this));
				}
				oState.oSmartFilterbar.attachAfterVariantLoad(this._afterVariantLoad.bind(this));
			},
			_updateFilterLink: function () {
				 var oFilterData = this.oState.oSmartFilterbar.getFilterData(),
				 oTemplatePrivate = this.oState.oController.getOwnerComponent().getModel("_templPriv");
				 oTemplatePrivate.setProperty('/alp/filtersLink', oFilterData);
			},
			/**
			 * Filter bar callback after variant load
			 *
			 * @returns {void}
			 * @private
			 */
			_afterVariantLoad : function (oEvent) {
				if (this.oState.alr_visualFilterBar) {
					this.oState.alr_visualFilterBar.updateVisualFilterBindings(true);
				}
				//in live mode manually trigger search after setting filterData to the compactFilter
				if (this.oState.oSmartFilterbar.isLiveMode() && oEvent.mParameters.context != "INIT") {
					// call search
					this.oState.oSmartFilterbar.search();
				}
			},
			/**
			 * Callback for visual filter change event
			 *
			 * @param {object} oEvent - object generated by the visual filter filterChange event
			 * @returns {void}
			 * @private
			 */
			 _onVisualFilterChange : function (oEvent) {
				var oFilterModel = this.oState.oController.getOwnerComponent().getModel("_filter"),
				oFilterModelData = oFilterModel.getData();
				//check for added or removed filteritems in VFD
				if (oEvent.getParameter('propertyName') && oEvent.getParameter('bVisible') !== undefined) {
					var oFilterItem = this.oState.oSmartFilterbar.determineFilterItemByName(oEvent.getParameter('propertyName'));
					if (oEvent.getParameter('bVisible')) {
						//setting corresponding filterItem visible/hidden in compact filter bar and dialog
						if (!oFilterItem.getPartOfCurrentVariant()) {
							oFilterItem.setPartOfCurrentVariant(true);
							oFilterItem.setVisibleInFilterBar(true);
						}
					} else {
						oFilterItem.setPartOfCurrentVariant(false);
						oFilterItem.setVisibleInFilterBar(false);
					}
				}
				this.oState.oSmartFilterbar.setFilterData(oFilterModelData, true);
				//in live mode manually trigger search after setting filterData to the compactFilter
				if (this.oState.oSmartFilterbar.isLiveMode()) {
					this.oState.oSmartFilterbar.search();
				}
			},
			//go button search event handler
			onGoFilter: function(){
				this.oState.oSmartFilterbar.search();
			},
			setDefaultFilter:function(mode) {
				var oTemplatePrivate = this.oState.oController.getOwnerComponent().getModel("_templPriv");
				oTemplatePrivate.setProperty('/alp/filterMode', mode);
				this.handleFilterSwitch(mode); // Don't want to trigger a mode change event, this will cause the data to be reloaded too earlier, the reload will happen when variants are processed
			},
			/**
			 * press handler for filter switch button
			 *
			 * @param {string} mode - compact or visual
			 * @param {boolean} bApplyingVariant - true is variant is being applied
			 *
			 * @returns {void}
			 */
			handleFilterSwitch:function(mode, bApplyingVariant) {
				var oTemplatePrivate = this.oState.oController.getOwnerComponent().getModel("_templPriv");

				if (oTemplatePrivate.getProperty('/alp/filterMode') === FILTER_MODE_VISUAL) {
					this.fnCheckMandatory();
				}
			},
			// If filter mode is visual and if mandatory fields/params are not filled launch CompactFilter Dialog.
			fnCheckMandatory: function(){
				this.oState.oSmartFilterbar.checkSearchAllowed(this.oState);
				var oTemplatePrivate = this.oState.oController.getOwnerComponent().getModel("_templPriv");
				if (!oTemplatePrivate.getProperty('/alp/searchable')) {
					this.oState.oSmartFilterbar.showFilterDialog();
				}
			},
			//check the filter mode and then show the corresponding filter dialog
			showDialog: function(){
				this.oState.oSmartFilterbar.showFilterDialog();
			},
			clearFilters:function(){
				var oFilterData = this.oState.oSmartFilterbar.getFilterData();
				for (var prop in oFilterData) {
					if (oFilterData.hasOwnProperty( prop ) ) {
						delete oFilterData[prop];
					}
				}
				this.oState.oSmartFilterbar.setFilterData(oFilterData, true);
				//clear the table selections
				if (this.oState.chartController) {
					this.oState.chartController._updateTable();
				}
			},
			/*
			* @public
			* Function to update shownInFilterBar/shownInFilterDialog according to visibility of filteritems/checkbox selection in CFD
			* @param {object} oEvent - Event object that containes thee filterItem whose visibility has been changed and added/deleted object
			*/
			changeVisibility: function(oEvent) {
				var oFilterItem = oEvent.getParameters().filterItem.filterItem,
				bVisible = oEvent.getParameters().added ? true : false,
				aFilterItemList = this.oState.alr_visualFilterBar.getModel('_visualFilterConfigModel').getData().filterCompList,
				oVisualFilterDialogContainer = this.oState.visualFilterDialogContainer;
				for (var i = 0; i < aFilterItemList.length; i++) {
					if (oFilterItem && oFilterItem.getName() === aFilterItemList[i].component.properties.parentProperty) {
					//Updating the properties shownInFilterBar and shownInFilterDialog to be in sync with CompactFilter
					//Update in filterCompList and _visualFilterConfigModel
						//Update shownInFilterDialog
						oVisualFilterDialogContainer.oConfig.filterCompList[i].shownInFilterDialog = bVisible;
						oVisualFilterDialogContainer.oConfig.filterCompList[i].shownInFilterBar = bVisible;
						oVisualFilterDialogContainer._updateVisualFilterConfigModel(i, '/shownInFilterDialog', bVisible);
						//For the checkbox in the chart toolbar in VFD
						//Update shownInFilterBar
						oVisualFilterDialogContainer.selectCheckBox(i, bVisible);
						break;
					}
				}
				oVisualFilterDialogContainer._reloadForm();
			}
		});
		return fbController;
	});