var bleno = require('bleno');
var util = require('util');

var PressureCharacteristic = require('./characteristics/pressure');

function PressureService() {

  bleno.PrimaryService.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb07',
    characteristics: [
      new PressureCharacteristic()
    ]
  });
};

util.inherits(PressureService, bleno.PrimaryService);
module.exports = PressureService;
