var bleno = require('bleno');
var os = require('os');
var fs = require('fs');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var TempCharacteristic = function() {

 TempCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb99',
    properties: ['read','notify'],
  });

 this._value = new Buffer(0);
};

TempCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {

    this._value = new Buffer(JSON.stringify({
      'temp' : randomInt(15,25)
    }));
  }

  console.log('TempCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

TempCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {				
                            console.log("Device subscribed");
                            this.intervalId = setInterval(function() {
				var pressureData = fs.readFileSync('./pressureData.txt','utf8');
				pressureData = pressureData.trim();
                                console.log("Sending pressure data: "+ pressureData);
                                updateValueCallback(new Buffer(pressureData));
                            }, 1000);
                        };
                        
                        // If the client unsubscribes, we stop broadcasting the message
TempCharacteristic.prototype.onUnsubscribe = function() {
                            console.log("Device unsubscribed");
                            clearInterval(this.intervalId);
                        };


function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

util.inherits(TempCharacteristic, BlenoCharacteristic);
module.exports = TempCharacteristic;
