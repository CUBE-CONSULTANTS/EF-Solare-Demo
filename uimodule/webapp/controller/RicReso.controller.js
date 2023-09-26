sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (
    Controller
) {
    "use strict";

    return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.RicReso", {
        onInit: function () {
            debugger
            // this.getOwnerComponent()
            //     .getRouter()
            //     .getRoute("DetInvioMag")
            //     .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            const N = oEvent.mParameters.arguments.context;

        },
        
        onConferma: function (oEvent) {
            //    apertura dialog firma
            debugger
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            oRouter.navTo("DettaglioMateriale")
        },
        _onPageMenu: function () {
            window.history.go(-1)

        },
    });
});