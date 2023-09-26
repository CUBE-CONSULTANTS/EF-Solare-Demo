sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
], function(
	Controller,Fragment
) {
	"use strict";

	return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.TrasfMagMater", {
        _onPageMenu:function(){
            this.getOwnerComponent().getModel("dataSource").setProperty("/OrdineDDT", "")
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.navTo("Menu", true)
        },
		cercaOrdine: function (oEvent) {
			debugger
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
				debugger;
				self.getView().setModel(new sap.ui.model.json.JSONModel(),"modello")
			   self.getView().getModel("modello").setProperty("/visible",false)
				self.getView().addDependent(oDialog);
				oDialog.open();
			  }.bind(oEvent)
			);
		  },
		  onCloseButt: function (oEvent) {
			oEvent.getSource().getParent().close()
		  },
		  _onPageMenu:function(){
			window.history.go(-1)

		  }

	});
});