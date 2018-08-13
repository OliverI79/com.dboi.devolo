'use strict';

// Humidity Sensor MT2755

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }
    
    async onMeshInit() {

        super.onMeshInit();
        //this.enableDebug();

        this.registerCapability('alarm_tamper', 'SENSOR_BINARY');
        
        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
             getOnOnline: true,
           }
        });

        this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL', {
            getOpts: {
              getOnOnline: true,
            }
        });

        this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
            getOpts: {
              getOnOnline: true,
            }
        });

    }

}

module.exports = MyDevice;