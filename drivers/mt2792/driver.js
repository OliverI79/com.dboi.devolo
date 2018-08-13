'use strict';

// Metering Plug MT2792

const Homey = require('homey');
const DevoloDriver = require('../../lib/devolodriver');

class MyDriver extends DevoloDriver {
	
	onInit() {
		super.onInit();
	}
	
}

module.exports = MyDriver;