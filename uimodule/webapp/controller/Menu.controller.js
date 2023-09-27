sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"./FirmaDialog",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/ButtonType",
	"sap/m/Button",
	"sap/m/Text"
], function (BaseController, MessageBox, Utilities, History, FirmaDialog, Dialog, DialogType, ButtonType, Button, Text) {
	"use strict";

	return BaseController.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.Menu", {
		getBundleText: function (i18nID) {
			return this.getView().getModel("i18n").getResourceBundle().getText(i18nID);
		},

		_onImageTap: function (oEvent) {
			debugger
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			let alt = oEvent.getSource().getAlt();
			switch (alt) {
				case "IM":
					oRouter.navTo("DDT");
					break;
				case "SK":
					oRouter.navTo("Materiali");
					break;
				case "TM":
					// oRouter.navTo("TrasfMagMater");
					oRouter.navTo("TrasferimentoMat");

					break;
				case "INM":
					oRouter.navTo("Consegna");
					break;
				// 
				case "RECMAG":
					oRouter.navTo("OrdTrasf");
					break;
				case "PREIMP":
					oRouter.navTo("PrelxImpeg", { "context": "prelievo" });
					break;
				case "RICRESO":
					oRouter.navTo("PrelxImpeg", { "context": "reso" });//
					break;
				case "INVRIENTR":
					oRouter.navTo("PrelxImpeg", { "context": "fuorigaranzia" });
					break;
				case "INVRIPG":
					oRouter.navTo("PrelxImpeg", { "context": "ingaranzia" })
					break;
				case "RIENTRIPG":
					oRouter.navTo("RientroRiparo");
					break;
				case "INVETN":
					oRouter.navTo("PrelxImpeg", { "context": "inventario" });

					break;

			}


		},

		onInit: function (evt) {
			this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "modelloDati")

			this.getOwnerComponent().getModel("modelloDati").setProperty("/", {
				"Dati": [
					{
						"Materiale": "1000234",
						"Descrizione": "Materiale prova",
						"Magazzino": "xxxx",
						"Divisione": "xxxx",
						"Tipo": "xxxx",
						"Numero_Serie": "A123456789",
						"Quantità": "12",
						"Misura": "PZ",
						"prelevata":0,
						"Q.tà Prelievo":1,
						"Q.tà Impegnata":12
					},
					{
						"Materiale": "1006324",
						"Descrizione": "Materiale prova2",
						"Magazzino": "yyyy",
						"Divisione": "yyyy",
						"Tipo": "zzzzzz",
						"Numero_Serie": "9845",
						"Quantità": "1",
						"Misura": "PZ",
						"prelevata":0,
						"Q.tà Prelievo":4,
						"Q.tà Impegnata":5
					}
				],
				"Dato": [
					{
						"Materiale": "1000234",
						"Descrizione": "Materiale prova",
						"Magazzino": "xxxx",
						"Divisione": "xxxx",
						"Tipo": "xxxx",
						"Numero_Serie": "A123456789",
						"Ubdicazione":"xxxxx",
						"Quantità": "12",
						"Misura": "PZ"
					}
				]
			})
		},

	});
}, /* bExport= */ true);