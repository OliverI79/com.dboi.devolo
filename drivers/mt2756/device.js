'use strict';

// Flood Sensor MT2756

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }
    
    async onMeshInit() {

        super.onMeshInit();
        //this.enableDebug();
        //this.printNode();

        this.registerCapability('alarm_tamper', 'NOTIFICATION');
        this.registerCapability('alarm_water', 'NOTIFICATION');
        
        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
             getOnOnline: true,
           }
        });

    }

}

module.exports = MyDevice;