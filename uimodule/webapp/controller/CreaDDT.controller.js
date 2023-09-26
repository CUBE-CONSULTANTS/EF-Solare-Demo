sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"./FirmaDialog",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/ButtonType",
	"sap/m/Button",
	"sap/m/Text",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, Utilities, History, FirmaDialog, Dialog, DialogType, ButtonType, Button, Text, JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.CreaDDT", {
		onInit: function () {
			var dataSource = this.getOwnerComponent().getModel("dataSource");
			dataSource.setProperty("/OrdineDDT", '');
		},
		onAfterRendering: function (oEvent) {
			var self = this
				// this.byId("ordineddt").onfocusin()
			this.getView().addEventDelegate({
				onAfterShow: function () {
					self.focus()
				}
			})

		},
		cercaOrdine:function(){
			debugger
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DettaglioMateriale");
		},
		_onPageMenu: function () {
			// this.getOwnerComponent().getModel("dataSource").setProperty("/OrdineDDT", "")
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			// oRouter.navTo("Menu", true)
			window.history.go(-1)


		}
	})
}, /* bExport= */ true);