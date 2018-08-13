'use strict';

// Radiator Control MT2650

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }
    
    async onMeshInit() {

        super.onMeshInit();
        this.enableDebug();
        this.printNode();

        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
             getOnOnline: true,
           }
        });

        this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
            getOpts: {
              getOnOnline: true,
              optional: true
            }
          });

        this.registerCapability('target_temperature', 'THERMOSTAT_SETPOINT', {
            getOpts: {
             getOnOnline: true,
           }
        });
    }
	
}

module.exports = MyDevice;