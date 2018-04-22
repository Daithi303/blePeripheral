var bleno = require('bleno');
var os = require('os');
var fs = require('fs');
var util = require('util');
/*
This file is based on the temp.js file from a BLE tutorial which can be found here:
https://wit-computing.github.io/IoT-Standards-Protocols-2017/topic02/book-2/index.html#/Intro

The link to the source code used in the tutorial can be found here:
https://wit-computing.github.io/IoT-Standards-Protocols-2017/topic02/book-2/index.html#/Updated%20App
*/
var BlenoCharacteristic = bleno.Characteristic;

var PressureCharacteristic = function() {

 PressureCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb99',
    properties: ['read','notify'],
  });

 this._value = new Buffer(0);
};

PressureCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {
	var pressureData = fs.readFileSync('./pressureData.txt','utf8');
	pressureData = pressureData.trim();
    this._value = new Buffer(JSON.stringify({
      'pressure' : pressureData
    }));
  }

  console.log('PressureCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

PressureCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {				
                            console.log("Device subscribed");
                            this.intervalId = setInterval(function() {
				var pressureData = fs.readFileSync('./pressureData.txt','utf8');
				pressureData = pressureData.trim();
                                console.log("Sending pressure data: "+ pressureData);
                                updateValueCallback(new Buffer(pressureData));
                            }, 1000);
                        };
                        
                        // If the client unsubscribes, we stop broadcasting the message
PressureCharacteristic.prototype.onUnsubscribe = function() {
                            console.log("Device unsubscribed");
                            clearInterval(this.intervalId);
                        };


function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

util.inherits(PressureCharacteristic, BlenoCharacteristic);
module.exports = PressureCharacteristic;
