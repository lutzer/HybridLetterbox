#!/usr/bin/env python
 
# Example for RC timing reading for Raspberry Pi
# Must be used with GPIO 0.3.1a or later - earlier verions
# are not fast enough!
 
import RPi.GPIO as GPIO
import time    
 
DEBUG = 1
RC_TIMEOUT = 6000	# stop reading after x cycles

GPIO.setmode(GPIO.BCM)

def readRCPin (RCpin, maxCycles):
    reading = 0
    GPIO.setup(RCpin, GPIO.OUT)
    GPIO.output(RCpin, GPIO.LOW)
    time.sleep(0.1)
    GPIO.setup(RCpin, GPIO.IN)
    while (GPIO.input(RCpin) == GPIO.LOW):
	   if reading >= maxCycles:
		return 0
           reading += 1
    
    return reading*1.0 / maxCycles
	

while True:
    #print("bla")                                     
    print(readRCPin(17,RC_TIMEOUT))     # Read RC timing using pin #18
