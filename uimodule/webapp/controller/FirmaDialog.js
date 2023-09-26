sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"./utilities"
], function (ManagedObject, MessageBox, History, Utilities) {

	return ManagedObject.extend("com.sap.build.eeb1117ce-eu_2.untitledPrototype.controller.FirmaDialog", {
		constructor: function (oView) {
			this._oView = oView;
			this.customSave = false;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "com.sap.build.eeb1117ce-eu_2.untitledPrototype.view.Fragment.FirmaDialog", this);
			this._bInit = false;
			this._canvas = null; //document.querySelector("canvas");
			this._signaturePad = null; // = new SignaturePad(canvas);
		},

		exit: function () {
			delete this._oView;
		},

		getView: function () {
			return this._oView;
		},

		getControl: function () {
			return this._oControl;
		},
		open: function (firmaGet) {
			var self = this;
			var oView = this._oView;
			var oControl = this._oControl;
			this.img = firmaGet ? "data:image/png;base64," + firmaGet : false;
			if (!this._bInit) {
				// Initialize our fragment
				this.onInit();
				this._bInit = true;
				// connect fragment to the root view of this component (models, lifecycle)
				oView.addDependent(oControl);
			}

			var args = Array.prototype.slice.call(arguments);
			if (oControl.open) {
				oControl.open.apply(oControl, args);
			} else if (oControl.openBy) {
				oControl.openBy.apply(oControl, args);
			}
			//abilito il plugin della firma
			if (!this._canvas) {
				this._canvas = document.querySelector("canvas");
				window.addEventListener("resize", function () {
					self.resizeCanvas();
					if (self.img)
						self._signaturePad.fromDataURL(self.img);
				});
			}
			if (!this._signaturePad)
				this._signaturePad = new SignaturePad(this._canvas);

			var c = $(this._canvas);
			this._signaturePad.width = c.width();
			this._signaturePad.height = c.height();
			this.resizeCanvas();
			if (this.img)
				this._signaturePad.fromDataURL(this.img);

		},
		getFirma: function () {
			// rimuove lo spazio bianco intorno alla firma... ma riduce le dimensioni del canvas 
			//fix ora le dimensioni tornano come prima ma mi perdo la posizione della firma,// ora removeBlanks esegue toDataURL
			return Utilities.removeBlanksSignature(this._signaturePad);
			//this._signaturePad.toDataURL(); // save image as PNG
			// this._signaturePad.toDataURL("image/jpeg"); // save image as JPEG
			// this._signaturePad.toDataURL("image/svg+xml"); // save image as SVG
		},
		onCloseFirma: function () {
			debugger
			this.close();
		},
		onSaveFirma: function () {
			if (this._signaturePad.isEmpty())
				return;
			if (this.customSave)
				this.customSave();
			this.onCloseFirma()
		},
		attachSaveFirma: function (cb) {
			if (cb)
				this.customSave = cb;
		},
		close: function () {
			this._oControl.close();
			this._signaturePad.clear();
		},
		onClearFirma: function () {
			this._signaturePad.clear();
		},

		setRouter: function (oRouter) {
			this.oRouter = oRouter;

		},
		getBindingParameters: function () {
			return {};

		},
		onInit: function () {
			this._oDialog = this.getControl();
		},
		onExit: function () {
			this._oDialog.destroy();

		},

		resizeCanvas: function () {
			var canvas = this._canvas;
			var ratio = Math.max(window.devicePixelRatio || 1, 1);
			canvas.width = canvas.offsetWidth * ratio;
			canvas.height = canvas.offsetHeight * ratio;
			canvas.getContext("2d").scale(ratio, ratio);
			this.onClearFirma();
			// otherwise isEmpty() might return incorrect value
			/*window.addEventListener("resize", resizeCanvas);
			resizeCanvas();*/
		}

	});
}, /* bExport= */ true);