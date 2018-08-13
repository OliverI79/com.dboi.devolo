'use strict';

// Room Thermostat MT2649

const Homey = require('homey');
const DevoloDevice = require('../../lib/devolodevice');

class MyDevice extends DevoloDevice {
	
	onInit() {
        super.onInit();
    }
    
    async onMeshInit() {

        super.onMeshInit();
        //this.enableDebug();

        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
             getOnOnline: true,
           }
        });

        this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
            getOpts: {
              getOnOnline: true,
            }
        });
        
        this.registerCapability('target_temperature', 'THERMOSTAT_SETPOINT', {
            getOpts: {
                getOnOnline: true,
            }
        });

        // ---------------------------------
        // triggers
        // ---------------------------------

        // button trigger
        let triggerMT2649_button_PreviousSequenceNo = 'empty';
        
        let triggerMT2649_button = new Homey.FlowCardTriggerDevice('mt2649_button');
        triggerMT2649_button
        .register()
        .registerRunListener((args, state) => {
            return Promise.resolve(args.button === state.button && args.scene === state.scene);
        });

        this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (rawReport, parsedReport) => {
            if (rawReport.hasOwnProperty('Properties1') &&
            rawReport.Properties1.hasOwnProperty('Key Attributes') &&
            rawReport.hasOwnProperty('Scene Number') &&
            rawReport.hasOwnProperty('Sequence Number')) {
                if (rawReport['Sequence Number'] !== triggerMT2649_button_PreviousSequenceNo) {
                    const remoteValue = {
                        button: rawReport['Scene Number'].toString(),
                        scene: rawReport.Properties1['Key Attributes'],
                    };
                    triggerMT2649_button_PreviousSequenceNo = rawReport['Sequence Number'];
                    this.log('Triggering sequence:', triggerMT2649_button_PreviousSequenceNo, 'remoteValue', remoteValue);
                    triggerMT2649_button.trigger(this, triggerMT2649_button.getArgumentValues, remoteValue);
                }
            }
        });

    }
    
}

module.exports = MyDevice;