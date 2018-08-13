'use strict';

// Smoke Detector MT2651

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }
	
}

module.exports = MyDevice;