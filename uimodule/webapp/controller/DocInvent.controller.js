sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (
	Controller
) {
	"use strict";

	return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.DocInvent", {
		navMatRic: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DettaglioMateriale");
		}
	});
});