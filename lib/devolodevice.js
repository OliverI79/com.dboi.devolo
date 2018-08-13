'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DevoloDevice extends ZwaveDevice {
    
	onInit() {
        super.onInit();

        this.debugLog('DevoloDevice has been inited');

		// enable debugging
        this.enableDebug();
        //this.printNode();
    }

    onMeshInit() {

	}

    debugLog(logMessage) {
        this.log(logMessage + ' - ', this.getName() + ' (' + this.getClass() + ')');
    }
    	
}

module.exports = DevoloDevice;