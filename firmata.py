# A simple loop that reads values from the analog inputs of an Arduino port.
# No Arduino code is necessary - just upload the standard-firmata sketch from the examples.


#This file is heavily based on code found online which can be found here:
#https://github.com/rolanddb/sensor-experiments/blob/master/firmata-read-analog.py


import pyfirmata
import signal
import sys

# Definition of the analog pins you want to monitor e.g. (1,2,4)
PINS = [0]

# Do a graceful shutdown, otherwise the program will hang if you kill it.
def signal_handler(signal, frame):
    board.exit()
    sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)

# Connect to the board
print "Setting up the connection to the board ..."
board = pyfirmata.Arduino('/dev/ttyACM0')

# Iterator thread is needed for correctly reading analog input
it = pyfirmata.util.Iterator(board)
it.start()
 
# Start reporting for defined pins
for pin in PINS:
    board.analog[pin].enable_reporting()
 
# Loop that keeps printing values
while 1:
    for pin in PINS:
        print "%s" % (board.analog[pin].read())
    	fh = open("pressureData.txt","w")
	fh.write("%s" % (board.analog[pin].read()))
	fh.close()
	board.pass_time(1)  
