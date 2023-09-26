sap.ui.define([
	"./utilities"
], function () {
	"use strict";

	// class providing static utility methods to retrieve entity default values.

	return {

		base64ToHex: function (str) {
			var raw = atob(str);
			var result = '';
			for (var i = 0; i < raw.length; i++) {
				var hex = raw.charCodeAt(i).toString(16);
				result += (hex.length === 2 ? hex : '0' + hex);
			}
			return result.toUpperCase();
		},
		findObject: function (array, whatObj, noSearch) {
			if (!array || !whatObj || array === null || whatObj === null)
				return false;
			var difference;
			var l = array.length;
			return array.find(function (el, index) {
				difference = 0;
				Object.keys(whatObj).forEach(function (key) {
					if (!noSearch || !noSearch.includes(key))
						if (el[key] !== whatObj[key]) {
							difference++;
						}
				});
				if (difference === 0) return el;
				else if (index + 1 >= l) return false;
			});
		},
		fill: function (txt, maxLength, filler) {
			while (txt.length < maxLength) {
				txt = (filler || "0") + txt;
			}
			return txt;
		},
		jsonCopy: function (src) {
			return JSON.parse(JSON.stringify(src));
		},
		copyObj: function (obj) {
			return $.extend({}, obj, true);
		},
		cloneObj: function (obj, noCopyArray) {
			var _obj = {};
			Object.keys(obj).forEach(function (key) {
				if (!noCopyArray || !noCopyArray.includes(key)) {
					_obj[key] = obj[key];
				}
			});
			return _obj;
		},
		/*sls*/
		parseBarcode: function (code) {
			console.log(code);
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					Mtart: arrayCode[1],
					Lgort: arrayCode[2],
					SplitValuation: arrayCode[3],
					Sernr: encodeURIComponent(arrayCode[4]),
					Matnr: arrayCode[5],
					Maktx: arrayCode[6],
					Lgpbe: encodeURIComponent(arrayCode[8]),
					SchedaSicur: arrayCode[9],
					PrMediaMobile: arrayCode[12],
					Mblnr: arrayCode[18],
					Mrp: arrayCode[20],
					Werks: arrayCode[21],
					Bldat: "",
					Charg: "",
					Labst: "",
					LgortOut: "",
					MatnrOut: "",
					Meins: arrayCode[22],
					WerksOut: "",
					Tplnr: ""
				};
				console.log(obj);
				return obj;

			} else {
				return null;
			}

		},

		/*sls*/
		parseBarcode315: function (code) {
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					docMatSped: arrayCode[0],
					esercizio: arrayCode[1],
				};
				return obj;

			} else {
				return null;
			}
		},
		parseBarcodeSenzaOrd: function (code) {
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					div: arrayCode[0],
					tipoMateriale: arrayCode[1],
					mag: arrayCode[2],
					split: arrayCode[3],
					serialNumber: encodeURIComponent(arrayCode[4]),
					codiceMateriale: arrayCode[5],
					descMateriale: arrayCode[6],
					ubicazione: encodeURIComponent(arrayCode[8]),
					scheda: arrayCode[9],
					utilizzoLibero: arrayCode[11],
					prezzoMediaMobile: arrayCode[12],
					orderId: arrayCode[18],
					anno: arrayCode[19],
					MRP: arrayCode[20],
					uDm: arrayCode[22]
				};
				console.log(obj);
				return obj;

			} else {
				return null;
			}

		},

		parseBarcodeConOrd: function (code) {
			console.log(code);
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					div: arrayCode[0],
					tipoMateriale: arrayCode[1],
					mag: arrayCode[2],
					split: arrayCode[3],
					serialNumber: encodeURIComponent(arrayCode[4]),
					codiceMateriale: arrayCode[5],
					descMateriale: arrayCode[6],
					scheda: arrayCode[9],
					utilizzoLibero: arrayCode[11],
					prezzoMediaMobile: arrayCode[12],
					orderId: arrayCode[18],
					anno: arrayCode[19],
					MRP: arrayCode[20],
					uDm: arrayCode[22]
				};
				console.log(obj);
				return obj;

			} else {
				return null;
			}

		},

		parseBarcodeUmRottamazione: function (code) {
			console.log(code);
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					div: arrayCode[0],
					tipoMateriale: arrayCode[1],
					mag: arrayCode[2],
					split: arrayCode[3],
					serialNumber: encodeURIComponent(arrayCode[4]),
					codiceMateriale: arrayCode[5],
					descMateriale: arrayCode[6],
					scheda: arrayCode[9],
					utilizzoLibero: arrayCode[11],
					prezzoMediaMobile: arrayCode[12],
					orderId: arrayCode[18],
					anno: arrayCode[19],
					MRP: arrayCode[20],
					uDm: arrayCode[22]
				};
				console.log(obj);
				return obj;

			} else {
				return null;
			}

		},

		parseBarcodeTK: function (code) {
			console.log(code);
			var arrayCode = code.split(";");
			if (arrayCode.length > 0) {
				var obj = {
					tkFornitore: arrayCode[0],
				};
				console.log(obj);
				return obj;

			} else {
				return null;
			}

		},

		scannerBarcode: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseBarcode(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
		},

		scannerBarcodeTK: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseBarcodeTK(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
		},

		scannerBarcodeInvioSenzaOrd: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseBarcodeSenzaOrd(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
			/*sls*/
		},
		scannerBarcode315: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseBarcode315(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
			/*sls*/
		},

		scannerBarcodeInvioConOrd: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseBarcodeConOrd(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
			/*sls*/
		},
		scannerBarcodeUmRottamazione: function (callback) {
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) {
						return null;
					} else {
						var obj = self.parseBarcodeUmRottamazione(result.text);
						callback(obj);
						return obj;
					}
				},
				function (error) {
					return null;
				}
			);
			/*sls*/
		},
		removeBlanksSignature: function (_signaturePad, returnType) {

			var imgWidth = _signaturePad._ctx.canvas.width;
			var imgHeight = _signaturePad._ctx.canvas.height;
			var imageData = _signaturePad._ctx.getImageData(0, 0, imgWidth, imgHeight),
				data = imageData.data,
				getAlpha = function (x, y) {
					return data[(imgWidth * y + x) * 4 + 3]
				},
				scanY = function (fromTop) {
					var offset = fromTop ? 1 : -1;

					// loop through each row
					for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

						// loop through each column
						for (var x = 0; x < imgWidth; x++) {
							if (getAlpha(x, y)) {
								return y;
							}
						}
					}
					return null; // all image is white
				},
				scanX = function (fromLeft) {
					var offset = fromLeft ? 1 : -1;

					// loop through each column
					for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

						// loop through each row
						for (var y = 0; y < imgHeight; y++) {
							if (getAlpha(x, y)) {
								return x;
							}
						}
					}
					return null; // all image is white
				};

			var cropTop = scanY(true),
				cropBottom = scanY(false),
				cropLeft = scanX(true),
				cropRight = scanX(false);

			var relevantData = _signaturePad._ctx.getImageData(cropLeft, cropTop, cropRight - cropLeft, cropBottom - cropTop);
			_signaturePad._canvas.width = cropRight - cropLeft;
			_signaturePad._canvas.height = cropBottom - cropTop;
			_signaturePad._ctx.clearRect(0, 0, cropRight - cropLeft, cropBottom - cropTop);
			_signaturePad._ctx.putImageData(relevantData, 0, 0);
			var img = _signaturePad.toDataURL(returnType);
			_signaturePad._canvas.width = imgWidth;
			_signaturePad._canvas.height = imgHeight;
			return img;
		},
	};
});