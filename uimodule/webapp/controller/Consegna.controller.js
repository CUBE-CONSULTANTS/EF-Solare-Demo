sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.Consegna", {
		cercaOrdine:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetInvioMag");
		},
		_onPageMenu:function(){
            // this.getOwnerComponent().getModel("dataSource").setProperty("/OrdineDDT", "")
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			// oRouter.navTo("Menu", true)
			window.history.go(-1)

        }
	});
});