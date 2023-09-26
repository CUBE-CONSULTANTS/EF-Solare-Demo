sap.ui.define(["sap/ui/core/mvc/Controller",
"sap/ui/core/Fragment"

], function (BaseController,Fragment) {
    "use strict";

    return BaseController.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.DettaglioMaterialeOrdine", {
        getBundleText: function (i18nID) {
            return this.getView().getModel("i18n").getResourceBundle().getText(i18nID);
        },
        _onPageMenu: function () {
            this.getOwnerComponent().getModel("dataSource").setProperty("/OrdineDDT", "")
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            oRouter.navTo("Menu", true)
        },
        onNext: function () {
            debugger
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("DettaglioMaterialeOrdine");
        },
        openDialog: function (oEvent) {
            if (!this.pDialog) {
                // debugger
                this.pDialog = sap.ui.core.Fragment.load({
                    name: "com.sap.build.eeb1117ce-eu_2.untitledPrototype.view.Fragment.SezionTipoVal",
                    controller: this,
                });
            }
            var self = this;
            this.pDialog.then(
                function (oDialog) {
                    oDialog.setModel(new sap.ui.model.json.JSONModel(),"modello")
                    oDialog.getModel("modello").setProperty("/visible",false)
                    debugger;
                    self.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(oEvent)
            );
        },
        onCloseButt:function(oEvent){
            oEvent.getSource().getParent().close()
        },
        onInit: function (evt) {

        },

    });
}, /* bExport= */ true);