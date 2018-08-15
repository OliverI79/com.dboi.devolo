'use strict';

// Home Control Key MT2653

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

        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
             getOnOnline: true,
           }
        });
    

        // ---------------------------------
        // triggers
        // ---------------------------------

        let triggerMT2653_button_PreviousSequenceNo = 'empty';
        
        let triggerMT2653_button = new Homey.FlowCardTriggerDevice('mt2653_button');
        triggerMT2653_button
        .register();

        let triggerMT2653_button1_single = new Homey.FlowCardTriggerDevice('mt2653_button1_single');
        triggerMT2653_button1_single
        .register();

        let triggerMT2653_button2_single = new Homey.FlowCardTriggerDevice('mt2653_button2_single');
        triggerMT2653_button2_single
        .register();

        let triggerMT2653_button3_single = new Homey.FlowCardTriggerDevice('mt2653_button3_single');
        triggerMT2653_button3_single
        .register();

        let triggerMT2653_button4_single = new Homey.FlowCardTriggerDevice('mt2653_button4_single');
        triggerMT2653_button4_single
        .register();

        let triggerMT2653_button1_double = new Homey.FlowCardTriggerDevice('mt2653_button1_double');
        triggerMT2653_button1_double
        .register();

        let triggerMT2653_button2_double = new Homey.FlowCardTriggerDevice('mt2653_button2_double');
        triggerMT2653_button2_double
        .register();

        let triggerMT2653_button3_double = new Homey.FlowCardTriggerDevice('mt2653_button3_double');
        triggerMT2653_button3_double
        .register();

        let triggerMT2653_button4_double = new Homey.FlowCardTriggerDevice('mt2653_button4_double');
        triggerMT2653_button4_double
        .register();

        this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (rawReport, parsedReport) => {
            if (rawReport.hasOwnProperty('Properties1') &&
            rawReport.Properties1.hasOwnProperty('Key Attributes') &&
            rawReport.hasOwnProperty('Scene Number') &&
            rawReport.hasOwnProperty('Sequence Number')) {
                if (rawReport['Sequence Number'] !== triggerMT2653_button_PreviousSequenceNo) {
                    const remoteValue = {
                        button: rawReport['Scene Number'].toString(),
                        scene: rawReport.Properties1['Key Attributes'],
                    };
                    triggerMT2653_button_PreviousSequenceNo = rawReport['Sequence Number'];
                    const triggerId = rawReport['Scene Number'];

                    // Fix setting for changing buttons
                    const mySetting1 = this.getSetting('1');
                    const mySetting2 = this.getSetting('2');

                    var newTriggerId = triggerId;
                    if (mySetting1 != 0) {
                        switch (triggerId) {
                            case 3:
                                newTriggerId = 5;
                                break;
                            case 5:
                                newTriggerId = 3;
                                break;
                            default:
                                break;    
                        }
                    }
                    if (mySetting2 != 0) {
                        switch (triggerId) {
                            case 4:
                                newTriggerId = 6;
                                break;
                            case 6:
                                newTriggerId = 4;
                                break;
                            default:
                                break;    
                        }
                    }

                    var logText = 'Triggering sequence:';
                    switch (newTriggerId) {
                        case 1: 
                            triggerMT2653_button1_single.trigger(this, triggerMT2653_button1_single.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 2: 
                            triggerMT2653_button2_single.trigger(this, triggerMT2653_button2_single.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 3: 
                            triggerMT2653_button3_single.trigger(this, triggerMT2653_button3_single.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 4: 
                            triggerMT2653_button4_single.trigger(this, triggerMT2653_button4_single.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 5: 
                            triggerMT2653_button1_double.trigger(this, triggerMT2653_button1_double.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 6: 
                            triggerMT2653_button2_double.trigger(this, triggerMT2653_button2_double.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 7: 
                            triggerMT2653_button3_double.trigger(this, triggerMT2653_button3_double.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        case 8: 
                            triggerMT2653_button4_double.trigger(this, triggerMT2653_button4_double.getArgumentValues, remoteValue)
                                .catch( this.error )
                                .then();
                            break;
                        default: 
                            logText = 'Triggering unknown sequence:';
                            break;
                    }

                    this.log(logText, triggerMT2653_button_PreviousSequenceNo, 'remoteValue', remoteValue, 'button', newTriggerId, triggerId);

                    let tokens = {
                        'num': newTriggerId
                    }
                    triggerMT2653_button.trigger(this, tokens, remoteValue)
                        .catch( this.error )
                        .then();
                }
            }
        });        

    }
	
}

module.exports = MyDevice;