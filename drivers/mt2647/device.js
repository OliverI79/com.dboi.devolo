'use strict';

// Motion Sensor MT2647

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

        this.registerCapability('alarm_motion', 'SENSOR_BINARY');

        this.registerCapability('alarm_tamper', 'SENSOR_BINARY');

        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
              getOnOnline: true,
            }
          });
          
        this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL', {
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