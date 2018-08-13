'use strict';

// Metering Plug MT2646

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }

    async onMeshInit() {
        
        super.onMeshInit();

        this.enableDebug();
        //this.printNode();

        this.registerCapability('onoff', 'SWITCH_BINARY');

        this.registerCapability('measure_power', 'METER');

        this.registerCapability('meter_power', 'METER')        

    }

}

module.exports = MyDevice;