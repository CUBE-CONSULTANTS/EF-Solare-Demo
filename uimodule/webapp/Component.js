sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/build/eeb1117ce-eu_2/untitledPrototype/model/models",
	"./model/errorHandling",
	"./controller/utilities",
], function (UIComponent, Device, models, errorHandling, Utilities) {
	"use strict";

	var navigationWithContext = {

	};

	return UIComponent.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.Component", {

		metadata: {
			manifest: "json"
		},
		configuration: {
			defaultWidth: "100%",
			maxOrdine: 25,
			maxCid: 8,
			maxFornitore: 10,
			maxMat: 18,
			logoHeight: "20px",
			logoWidth: "60.989585876464844px"
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			var self = this;
			// set the device model
			self.configModel = new sap.ui.model.json.JSONModel(self.configuration);
			self.setModel(self.configModel, "config");
			$(window).resize(function () {
				self.configModel.setProperty("/defaultWidth", $(window).width() + "px");
			});
			this.setModel(models.createDeviceModel(), "device");

			// set the FLP model
			this.setModel(models.createFLPModel(), "FLP");

			// set the dataSource model
			this.setModel(new sap.ui.model.json.JSONModel({}), "dataSource");
			/*		}
				});*/

			// set application model
			var oApplicationModel = new sap.ui.model.json.JSONModel({});
			this.setModel(oApplicationModel, "applicationModel");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// delegate error handling

			//errorHandling.register(this);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},
		readMenu: function () {
			var self = this;
			var modello = self.getModel();
			modello.read("/ListaMenuSet", {
				success: function (odata) {
					sap.ui.core.BusyIndicator.hide();
					var lista = odata.results;
					// var menu = {};
					// for (var i = 0; i < lista.length; i++) {
					// 	var m = lista[i];
					// 	menu[m.Id1 + "_" + m.Id2] = m;
					// }
					self.getModel("dataSource").setProperty("/Menu", lista);
				},
				error: function (error) {
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		/*	read: function () {
				var self = this;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("load", function () {
					var parser = new DOMParser();
					var doc = parser.parseFromString(xhr.responseText, "application/xml");
					var version = doc.getElementsByTagName("widget")[0].attributes.version.value;
					if (window.device.platform !== "Android") {
						self.getModel("dataSource").setProperty("/version", version);
					} else {
						self.getModel("dataSource").setProperty("/version", "1.1.32");
					}
				});

				xhr.open("get", "../config.xml", true);
				xhr.send();

			},*/
		createContent: function () {
			var app = new sap.m.App({
				id: "App"
			});
			var appType = "App";
			var appBackgroundColor = "#FFFFFF";
			if (appType === "App" && appBackgroundColor) {
				app.setBackgroundColor(appBackgroundColor);
			}

			return app;
		},

		getNavigationPropertyForNavigationWithContext: function (sEntityNameSet, targetPageName) {
			var entityNavigations = navigationWithContext[sEntityNameSet];
			return entityNavigations == null ? null : entityNavigations[targetPageName];
		},
		scannerMateriali: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {

						var obj = self.parseScannerMat(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
		},
		parseScannerMat: function (code) {
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					codiceMateriale: arrayCode[5],
					descrMateriale: arrayCode[6],
					tipoMateriale: arrayCode[1],
					UdM: arrayCode[22],
					div: arrayCode[0],
					mag: arrayCode[2],
					serialNumber: arrayCode[4],
					prezzoMediaMobile: arrayCode[12],
					splitValuation: arrayCode[3],
					fluxIntercompany: arrayCode[20],
					schedaSicurezza: arrayCode[7],
					anno: arrayCode[19],
					data: arrayCode[17]
				};
				console.log(obj);
				return obj;

			} else {
				return null;
			}
		},
		scannerBadge: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseScannerBadget(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
		},
		parseScannerBadget: function (code) {
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					cid: arrayCode[0],
					nome: arrayCode[2],
					cognome: arrayCode[1]
				};
				return obj;

			} else {
				return null;
			}
		},
		//scanner  per l'aggiunta dei materiali movimenti
		scannerBarcodeMatMov: function () {
			var self = this;
			var pageModel = self.getView().getModel("pageModel");
			var pageModelData = pageModel.getData();
			Utilities.scannerBarcodeInvioSenzaOrd(function (obj) {
				var codiceMaterialePre = pageModelData.codiceMateriale;
				var qtaPre = pageModelData.qta;
				var serialNumber = obj.serialNumber;
				if (serialNumber !== "") {
					pageModel.setProperty("/qta", "1");
					self.getView().byId("qta").setEnabled(false);
				} else {
					pageModel.setProperty("/qta", "1");
					self.getView().byId("qta").setEnabled(true);
				}
				if (codiceMaterialePre === obj.codiceMateriale & serialNumber === "") {
					var qtaSum = qtaPre++ + 1;
					var qtaAggiornata = qtaSum.toString();
					pageModel.setProperty("/qta", qtaAggiornata);
				}
				pageModel.setProperty("/codiceMateriale", obj.codiceMateriale);
				pageModel.setProperty("/uDm", obj.uDm);
				pageModel.setProperty("/div", obj.div);
				pageModel.setProperty("/mag", obj.mag);
				pageModel.setProperty("/serialNumber", obj.serialNumber);
				pageModel.setProperty("/split", obj.split);
				pageModel.setProperty("/scheda", obj.scheda);
				pageModel.setProperty("/descMateriale", obj.descMateriale);
				pageModel.setProperty("/anno", obj.anno);
				pageModel.setProperty("/orderId", obj.orderId);
			});
		},
		//aggiunta materiali movimenti
		pressAggiungiMatMov: function (successCB, errorCB) {
			var self = this;
			var pageModel = self.getView().getModel("pageModel");
			var obj = pageModel.getData();
			var oModel = self.getOwnerComponent().getModel();

			var listaMateriali = obj.listaMateriali;
			//recupero valori
			var split = obj.split;
			var serialNumber = obj.serialNumber;
			var scheda = obj.scheda;
			var anno = obj.anno;
			var orderId = obj.orderId;
			//controllo materiale,qta,udm
			var qta = obj.qta;
			var uDm = obj.uDm;
			var descMateriale = obj.descMateriale;
			var tipo = obj.tipo;
			var mag = obj.mag;
			var div = obj.div;
			var docMat = obj.docMat;
			var codiceMateriale = obj.codiceMateriale;
			if (qta === "") {
				return MessageBox.show("campo qta obbligatorio");
			}
			if (uDm === "") {
				return MessageBox.show("campo UdM obbligatorio");
			}
			if (codiceMateriale !== "") {
				self.getView().setBusy(true, 0);
				oModel.read("/ControlloMaterialeSet(Materiale='" + codiceMateriale + "',Quantita='" + qta +
					"',UoM='" + uDm + "',Divisione='" + div + "',Magazzino='" + mag + "',Seriale='" + serialNumber + "',Split='" + split +
					"',Scheda='" + scheda + "',Tipo='" + tipo + "',DocMateriale='" + docMat + "',Anno='" + anno + "',OrderID='" + orderId + "',)", {
						success: function (oData, response) {
							var objmat = {
								'codiceMateriale': codiceMateriale,
								'descMateriale': descMateriale,
								'qta': qta,
								'uDm': uDm,
								'split': split,
								'serialNumber': serialNumber,
								'scheda': scheda,
								'mag': mag,
								'div': div,
								'anno': anno,
								'orderId': orderId
							};
							listaMateriali.push(objmat);
							self.byId("codiceMateriale").setValue("");
							self.byId("qta").setValue("");
							self.byId("uDm").setValue("");
							self.getView().byId("qta").setEnabled(true);
							pageModel.updateBindings(true);
							self.getView().setBusy(false, 0);
							if (successCB)
								successCB(oData, response);
						},
						error: function (error) {
							showServiceError.call(self || this, error);
							/*							
							self.getView().setBusy(false, 0);
							var errorObj = JSON.parse(error.responseText);
							var sMsg = errorObj.error.message.value;
							MessageBox.error(sMsg);*/
							if (errorCB)
								errorCB(error);
						}
					});
			} else {
				MessageBox.show("codice materiale non presente");
			}
		},
		getResourceBundle: function () {
			if (!this.bundle)
				this.bundle = this.getModel("i18n").getResourceBundle();
			return window.bundle;
		},
		getBundleText: function (i18nID) {
			var bundle = this.getResourceBundle();
			return bundle.getText(i18nID);
		},

	});

});