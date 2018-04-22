var bleno = require('bleno');
var util = require('util');
/*
This file is based on the tempservice.js file from a BLE tutorial which can be found here:
https://wit-computing.github.io/IoT-Standards-Protocols-2017/topic02/book-2/index.html#/Intro

The link to the source code used in the tutorial can be found here:
https://wit-computing.github.io/IoT-Standards-Protocols-2017/topic02/book-2/index.html#/Updated%20App
*/
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
