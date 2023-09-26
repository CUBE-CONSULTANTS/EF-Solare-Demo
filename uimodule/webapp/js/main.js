function showServiceError(error, opt) {
	var sMsg = "";
	try {
		sap.ui.core.BusyIndicator.hide(0);
		this.getView().setBusy(false, 0);
		var errorObj = JSON.parse(error.responseText);
		sMsg = errorObj.error.message.value;
		sap.m.MessageBox.error(sMsg, opt);
	} catch (e) {
		if (!opt) {
			opt = {};
		};
		opt.details = error.responseText.replaceAll("h1", "h5");

		sap.m.MessageBox.error(error.message, opt);
	}

}