'use strict';

const ZigBeeXYLightDevice = require('homey-meshdriver').ZigBeeXYLightDevice;

const util = require('./../../node_modules/homey-meshdriver/lib/util');

const CIEMultiplier = 65279;

class RGBOSL extends ZigBeeXYLightDevice {

  async onMeshInit() {

   		await super.onMeshInit();
   		// enable debugging
   		this.enableDebug();

   		// print the node's info to the console
   		this.printNode();

      this.log('GreenPowerProxy endpoint: ', this.getClusterEndpoint('genGreenPowerProxy'));

      if (this.getClusterEndpoint('genGreenPowerProxy') !== 0) {
        this.registerAttrReportListener('genOnOff', 'onOff', 1, 300, 1, value => {
          this.log('onoff', value);
          this.setCapabilityValue('onoff', value === 1);
        }, 0);

        this.registerAttrReportListener('genLevelCtrl', 'currentLevel', 1, 300, 1, value => {
          this.log('dim report', value);
          this.setCapabilityValue('dim', value / 254);
        }, 0);

        this.registerAttrReportListener('lightingColorCtrl', 'currentHue', 1, 300, 1, value => {
          this.log('HUE report', value);
          this.setCapabilityValue('light_hue', value / 254);
        }, 0);

        this.registerAttrReportListener('lightingColorCtrl', 'currentSaturation', 1, 300, 1, value => {
          this.log('Saturation report', value);
          this.setCapabilityValue('light_saturation', value / 254);
        }, 0);

        this.registerAttrReportListener('lightingColorCtrl', 'currentX', 1, 300, 10, value => {
          this.log('currentX report', value);
          this.node.endpoints[0].clusters.lightingColorCtrl.read('currentY')
          .then(result => {
            this.log('currentY report ', result);
            if (result === value) {
              this.log('currentX === currentY');
              this.log('Setting capability light_temperature ->', Math.round((value / CIEMultiplier - 0.2) * 4 *100) / 100);
              this.setCapabilityValue('light_temperature', Math.round((value / CIEMultiplier - 0.2) * 4 *100) / 100);
            }
          })
          .catch(err => {
            this.log('could not read currentY');
            this.log(err);
          });
        }, 0);

      }

  }

}

//[log] [ManagerDrivers] [rgbw_osl] [0] ------------------------------------------
//[log] [ManagerDrivers] [rgbw_osl] [0] Node: 0696f5a8-122d-4a91-a580-0099defd34bc
//[log] [ManagerDrivers] [rgbw_osl] [0] - Battery: false
//[log] [ManagerDrivers] [rgbw_osl] [0] - Endpoints: 0
//[log] [ManagerDrivers] [rgbw_osl] [0] -- Clusters:
//[log] [ManagerDrivers] [rgbw_osl] [0] --- zapp
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genBasic
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genBasic
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genIdentify
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genIdentify
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genGroups
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genGroups
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genScenes
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genScenes
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genOnOff
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genOnOff
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genLevelCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genLevelCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genOta
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genOta
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- lightingColorCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : lightingColorCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] - Endpoints: 1
//[log] [ManagerDrivers] [rgbw_osl] [0] -- Clusters:
//[log] [ManagerDrivers] [rgbw_osl] [0] --- zapp
//[log] [ManagerDrivers] [rgbw_osl] [0] --- lightLink
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : lightLink
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] ------------------------------------------
//[log] [ManagerDrivers] [rgbw_osl] [0] ------------------------------------------
//[log] [ManagerDrivers] [rgbw_osl] [0] Node: 0696f5a8-122d-4a91-a580-0099defd34bc
//[log] [ManagerDrivers] [rgbw_osl] [0] - Battery: false
//[log] [ManagerDrivers] [rgbw_osl] [0] - Endpoints: 0
//[log] [ManagerDrivers] [rgbw_osl] [0] -- Clusters:
//[log] [ManagerDrivers] [rgbw_osl] [0] --- zapp
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genBasic
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genBasic
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genIdentify
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genIdentify
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genGroups
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genGroups
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genScenes
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genScenes
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genOnOff
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genOnOff
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genLevelCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genLevelCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- genOta
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : genOta
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] --- lightingColorCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : lightingColorCtrl
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] - Endpoints: 1
//[log] [ManagerDrivers] [rgbw_osl] [0] -- Clusters:
//[log] [ManagerDrivers] [rgbw_osl] [0] --- zapp
//[log] [ManagerDrivers] [rgbw_osl] [0] --- lightLink
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- cid : lightLink
//[log] [ManagerDrivers] [rgbw_osl] [0] ---- sid : attrs
//[log] [ManagerDrivers] [rgbw_osl] [0] ------------------------------------------
//[log] [ManagerDrivers] [rgbw_osl] [0] GreenPowerProxy endpoint:  0

module.exports = RGBOSL;
