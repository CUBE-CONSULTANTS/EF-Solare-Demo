sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"./FirmaDialog",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/ButtonType",
	"sap/m/Button",
	"sap/m/Text"
], function (BaseController, MessageBox, Utilities, History, FirmaDialog, Dialog, DialogType, ButtonType, Button, Text) {
	"use strict";

	return BaseController.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.OrdTrasf", {
		getBundleText: function (i18nID) {
			return this.getView().getModel("i18n").getResourceBundle().getText(i18nID);
		},

		onNext: function () {
			debugger
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetOrdMag");
		},

		onInit: function (evt) {

		},
		_onPageMenu: function () {
			window.history.go(-1)

		},
	});
}, /* bExport= */ true);