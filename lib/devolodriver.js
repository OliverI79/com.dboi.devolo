'use strict';

const Homey = require('homey');

class DevoloDriver extends Homey.Driver {
	
	onInit() {
		this.debugLog('Devolo Driver has been inited');
    }

    debugLog(logMessage) {
        this.log(logMessage);
    }
	
}

module.exports = DevoloDriver;