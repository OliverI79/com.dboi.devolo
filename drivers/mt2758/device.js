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
        //this.enableDebug();
        //this.printNode();

        this.registerCapability('onoff', 'SWITCH_BINARY');

        this.registerCapability('alarm_tamper', 'NOTIFICATION');


        // ---------------------------------
        // triggers
        // ---------------------------------

        // siren on trigger
        let triggerMT2758_siren_on = new Homey.FlowCardTriggerDevice('mt2758_turned_siren_on');
        triggerMT2758_siren_on
        .register()
        .registerRunListener((args, state) => {
            return Promise.resolve(args.button === state.button && args.scene === state.scene);
        });

        // siren off trigger
        let triggerMT2758_siren_off = new Homey.FlowCardTriggerDevice('mt2758_turned_siren_off');
        triggerMT2758_siren_off
        .register()
        .registerRunListener((args, state) => {
            return Promise.resolve(args.button === state.button && args.scene === state.scene);
        });

        this.registerReportListener('SENSOR_BINARY', 'SENSOR_BINARY_REPORT', (rawReport, parsedReport) => {
            if (rawReport.hasOwnProperty('Sensor Value') &&
            rawReport.hasOwnProperty('Sensor Type')) {
                if (rawReport['Sensor Type'] == 'General') {
                    if (rawReport['Sensor Value'] == 'detected an event') {
                        this.setCapabilityValue('onoff', true);
                        triggerMT2758_siren_on.trigger(this);
                    } else {
                        if (rawReport['Sensor Value'] == 'idle') {
                            this.setCapabilityValue('onoff', false);
                            triggerMT2758_siren_off.trigger(this);
                        }
                    }
                }
            }
        });  
        
        // ---------------------------------
        // actions
        // ---------------------------------

        // siren on action        
        let actionMT2758_siren_on_listener = async (args) => {
            this.debugLog('siren on action');


            this.log("1");
            let result = await args.device.node.CommandClass.COMMAND_CLASS_NOTIFICATION.NOTIFICATION_REPORT({
                'V1 Alarm Type': 0,
                'V1 Alarm Level': 0, 
                'Reserved': 0,
                'Notification Status': 255,
                'Notification Type': 6,
                'Event': 3,
                'Sequence Number': 0
            });
    
            this.log(result);
            
            this.log("done");

            if (result !== 'TRANSMIT_COMPLETE_OK') throw new Error(result);
        };

        let actionMT2758_siren_on = new Homey.FlowCardAction('mt2758_turn_siren_on');
        actionMT2758_siren_on
            .register()
            .registerRunListener(actionMT2758_siren_on_listener);        

        // siren on (default) action        
        let actionMT2758_siren_on_default_listener = async (args) => {
            this.debugLog('siren on (default) action');
            
            let result = await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_BINARY.SWITCH_BINARY_SET({
                'Switch Value': 255
            });
    
            if (result !== 'TRANSMIT_COMPLETE_OK') throw new Error(result);
        };

        let actionMT2758_siren_default_on = new Homey.FlowCardAction('mt2758_turn_siren_on_default');
        actionMT2758_siren_default_on
            .register()
            .registerRunListener(actionMT2758_siren_on_default_listener);        

        // siren off action        
        let actionMT2758_siren_off_listener = async (args) => {

            this.debugLog('siren off action');
            
            let result = await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_BINARY.SWITCH_BINARY_SET({
                'Switch Value': 0
            });
    
            if (result !== 'TRANSMIT_COMPLETE_OK') throw new Error(result);
        };

        let actionMT2758_siren_off = new Homey.FlowCardAction('mt2758_turn_siren_off');
        actionMT2758_siren_off
            .register()
            .registerRunListener(actionMT2758_siren_off_listener);        


    }
	
}

module.exports = MyDevice;