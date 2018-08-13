'use strict';

// Metering Plug MT2792

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }
	
}

module.exports = MyDevice;