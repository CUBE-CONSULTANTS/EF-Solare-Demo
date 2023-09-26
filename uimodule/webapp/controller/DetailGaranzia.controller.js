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

	return BaseController.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.DetailGaranzia", {
		onInit: function () {
			debugger
			this.getOwnerComponent()
				.getRouter()
				.getRoute("Garanzia")
				.attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "modellotitolo")
			const N = oEvent.mParameters.arguments.context;
			switch (N) {
				case "rientro":
					this.getView().getModel("modellotitolo").setProperty("/titolo", "Ordine di Acquisto")
					break;
				case "riparo":
					this.getView().getModel("modellotitolo").setProperty("/titolo", "Fornitore")
					break;
				

			}
		},
        navToInfoUtente:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("DettaglioMateriale");
        }
		
	})
}, /* bExport= */ true);