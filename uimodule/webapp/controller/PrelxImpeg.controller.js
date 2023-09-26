sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"./FirmaDialog",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/ButtonType",
	"sap/m/Button",
	"sap/m/Text",
], function (Controller,
	MessageBox,
	utilities,
	History,
	FirmaDialog,
	Dialog,
	DialogType,
	ButtonType,
	Button,
	Text) {
	"use strict";

	return Controller.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.PrelxImpeg", {
		getBundleText: function (i18nID) {
			return this.getView().getModel("i18n").getResourceBundle().getText(i18nID);
		},

		onNext: function (oEvent) {
			debugger
			let titolo=this.getView().getModel("modellotitolo").getProperty("/")
			if(titolo=="Impegno"){
				debugger
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("DetOrdMagImpegn");
			}
			else if(titolo=="Ordine di Reso"){
				debugger
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RicReso");
			}
			else if(titolo=="Ordine di Acquisto"){
				debugger
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("InRipFGar");
			}
			else if(titolo=="Fornitore"){
				debugger
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("InRipFGar");
			}
			else if(titolo=="Documento Inventario"){
				debugger
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TrasfMagMater");
			}
			
		},
		_onPageMenu:function(){
			debugger
			window.history.go(-1)
		},
		onInit: function (evt) {
			this.getView().setModel(new sap.ui.model.json.JSONModel(),"modellotitolo")
			this.getOwnerComponent()
			  .getRouter()
			  .getRoute("PrelxImpeg")
			  .attachPatternMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched:function(oEvent){
			debugger
			const N = oEvent.mParameters.arguments.context;
			if(N=="prelievo"){
				this.getView().getModel("modellotitolo").setProperty("/","Impegno")

			}
			else if(N=="reso"){
				this.getView().getModel("modellotitolo").setProperty("/","Ordine di Reso")

			}
			else if(N=="fuorigaranzia"){
				this.getView().getModel("modellotitolo").setProperty("/","Ordine di Acquisto")

			}
			else if(N=="ingaranzia"){
				this.getView().getModel("modellotitolo").setProperty("/","Fornitore")

			}
			else if(N=="inventario"){
				this.getView().getModel("modellotitolo").setProperty("/","Documento Inventario")

			}
		}
	});
}, /* bExport= */ true);