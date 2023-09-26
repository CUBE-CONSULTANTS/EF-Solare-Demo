sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/m/MessageBox",
  "./FirmaDialog",
  
], function (
  Controller, Fragment, MessageBox, FirmaDialog
) {
  "use strict";

  return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.DetInvioMag", {

    onInit: function () {
      debugger
      this.getOwnerComponent()
        .getRouter()
        .getRoute("DetInvioMag")
        .attachPatternMatched(this._onRouteMatched, this);
    },
    _onRouteMatched: function (oEvent) {
      const N = oEvent.mParameters.arguments.context;

      this.getView().setModel(new sap.ui.model.json.JSONModel(), "modellochange")
      this.getView().setModel(new sap.ui.model.json.JSONModel(), "parameters")
      this.getView().getModel("parameters").setProperty("/", N)

      switch (N) {
        case "ordTtrasf":
          this.getView().getModel("modellochange").setProperty("/titolo", "Ordine di Trasferimento")
          break;
        case "impegno":
          this.getView().getModel("modellochange").setProperty("/titolo", "Impegno")
          break;
        case "riconreso":
          this.getView().getModel("modellochange").setProperty("/titolo", "Ordine di Reso")
          break;

      }
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
         
          self.getView().addDependent(oDialog);
          oDialog.open();
        }.bind(oEvent)
      );
    },
    onAcceptButt: function (oEvent) {
      //    apertura dialog firma
      this.onCloseButt(oEvent)
    },
    _onPageMenu: function () {
      window.history.go(-1)

    },
    onCloseButt: function (oEvent) {
      oEvent.getSource().getParent().close()
    },
    ////
    

	
		onAcceptButt: function (evt) {
		 
				
				
							var count = 0
							var sDialogName = "";
							this.mDialogs = this.mDialogs || {};
							var oDialog = this.mDialogs[sDialogName];
							if (!oDialog) {
								oDialog = new FirmaDialog(this.getView());
								this.mDialogs[sDialogName] = oDialog;
								// For navigation.
								oDialog.setRouter(this.oRouter);
							}
							var context = evt.getSource().getBindingContext();
							oDialog._oControl.setBindingContext(context);
							var firma = []
							oDialog.open();
							// oDialog._oDialog.setTitle("firma") 
							// oDialog.attachSaveFirma(function () {

							// 	firma.push(oDialog.getFirma())
							// 	oDialog.close();
							// 	self.conferma(firma) //problema dialog
							// 		// 	//firma tecnico
							// 		// oDialog._oDialog.setTitle(self.getBundleText("firmaTec"))
							// 		// oDialog.open()
							// 		// count++
							// 	count++
							// 	if (count == 2) {
							// 		self.onCheckFirma(firma)
							// 	} else {
							// 		//firma tecnico
							// 		oDialog._oDialog.setTitle(self.getBundleText("firmaTec"))
							// 		oDialog.open()

							// 	}


						

				
				console.log(this.getOwnerComponent().getModel("dataSource").getProperty("/InfoMagazzino"))
			

		},
  });
});