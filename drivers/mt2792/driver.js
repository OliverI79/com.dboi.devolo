'use strict';

// Metering Plug V2 MT2792

const Homey = require('homey');
const DevoloDriver = require('../../lib/devolodriver');

class MyDriver extends DevoloDriver {
	
	onInit() {
		super.onInit();
	}
	
}

module.exports = MyDriver;