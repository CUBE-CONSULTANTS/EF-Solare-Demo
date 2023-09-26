sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.InRipFGar", {
        onConferma:function(){
            debugger
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            oRouter.navTo("DettaglioMateriale")
        },
        _onPageMenu:function(){
            window.history.go(-1)

        }

	});
});