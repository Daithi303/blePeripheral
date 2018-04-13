var bleno = require('bleno');
var cmd = require('node-cmd');
var name = 'Car Seat Monitor';
var PressureService = require('./pressureservice');

var pressureService = new PressureService();

var pyProcess = cmd.get('python firmata.py',
function(data, err,stderr){
	if(!err) {
		console.log("data from python script: " + data)
}else {
		console.log("python script cmd error: " + data)
}
}
);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {

    bleno.startAdvertising(name, [pressureService.uuid]);
  }
  else {

    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {

  console.log('on -> advertisingStart: ' +
    (error ? 'error ' + error : 'success')
  );

  if (!error) {

    bleno.setServices([
      pressureService
    ]);
  }
});
