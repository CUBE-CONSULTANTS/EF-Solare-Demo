sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (
	Controller,
	JSONModel
) {
	"use strict";

	return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.Materiali", {
		_onPageMenu: function () {
			this.getOwnerComponent().getModel("dataSource").setProperty("/OrdineDDT", "")
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.navTo("Menu", true)
		},
		navToInfoUtente: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DettaglioMateriale");
		},
		/**
		 * @override
		 */
		onInit: function () {
			this.getOwnerComponent()
				.getRouter()
				.getRoute("Materiali")
				.attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: async function (oEvent) {
			debugger;
			var oEvent = { ...oEvent };
			var arr = [];
			this.initialModel()
		},
		initialModel: function () {
			// 
		}
	});
});