#!/usr/bin/env python
 
# Example for RC timing reading for Raspberry Pi
# Must be used with GPIO 0.3.1a or later - earlier verions
# are not fast enough!
 
import RPi.GPIO as GPIO
import time    

ledPin = 22

GPIO.setmode(GPIO.BCM)
GPIO.setup(ledPin, GPIO.OUT)

while True:
    print("on")
    GPIO.output(ledPin, GPIO.HIGH)
    time.sleep(2)
    print('off')
    GPIO.output(ledPin, GPIO.LOW)
    time.sleep(2)
                                     
    
