'use strict';

// Metering Plug MT2646

const Homey = require('homey');
const DevoloDriver = require('../../lib/devolodriver');

class MyDriver extends DevoloDriver {
	
	onInit() {
		super.onInit();
	}
	
}

module.exports = MyDriver;