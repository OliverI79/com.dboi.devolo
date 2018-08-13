'use strict';

// Siren Indoor MT2758

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }

    async onMeshInit() {

        super.onMeshInit();
        this.enableDebug();

        this.registerCapability('alarm_tamper', 'SENSOR_BINARY');

        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
             getOnOnline: true,
           }
        });

        this.registerCapability('onoff', 'SWITCH_BINARY');

    }
	
}

module.exports = MyDevice;