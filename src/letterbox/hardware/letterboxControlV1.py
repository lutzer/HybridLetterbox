# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-20 17:16:26
from letterboxControl import LetterboxControl, MotorPosition
import logging
import time
import RPi.GPIO as GPIO

logger = logging.getLogger(__name__)

# Define pins
PIN_LED = 22
PIN_SERVO = 18
PIN_PHOTORESISTOR = 17
PHOTORESISTOR_THRESHOLD = 0.5
SERVO_INVERSE = False


# Class Controls the Hardware of the Letterbox
class LetterboxControlV1(LetterboxControl):

	def init(self):
		self.pinLed = pinLed
		self.pinServo = pinServo
		self.pinPhotoresistor = pinPhotoresistor
		self.PRThreshold = PHOTORESISTOR_THRESHOLD

		GPIO.setmode(GPIO.BCM)
		GPIO.setup(pinLed, GPIO.OUT)
		GPIO.setup(pinServo, GPIO.OUT)
		GPIO.setup(pinPhotoresistor, GPIO.OUT)

		self.ledState = False

	def stop(self):
		self.toggleLed(False)
		GPIO.cleanup()
		logger.info("cleaned up LbControl")

	def flashFeedbackLed(self,times=20,delay=0.25):
		preLedState = self.ledState
		for x in range(0,times):
			self.toggleCameraLed(True)
			time.sleep(0.5)
			self.toggleCameraLed(False)
			time.sleep(0.5)
		if (preLedState): # reset led state
			self.toggleCameraLed(True);

	def toggleFeedbackLed (self,on):
		self.toggleCameraLed(on)

	def toggleCameraLed(self,on):
		if (on == self.ledState):
			return

		if (on):
			GPIO.output(self.pinLed, GPIO.HIGH)
			self.ledState = True	
		else:
			GPIO.output(self.pinLed, GPIO.LOW)
			self.ledState = False	

	def checkPhotocell(self):
		# turn on led
		if not(self.ledState):
			self.toggleLed(True);
			time.sleep(0.1)

		val = readRCPin(self.pinPhotoresistor,RC_TIMEOUT)
		logger.debug('PR Reading:'+str(val))
		if (val > self.PRThreshold):
			return True
		return False

	def setMotorPosition(self,pos):
		if (SERVO_INVERSE):
			if (pos == MotorPosition.START):
				pos = MotorPosition.EJECT 
			elif pos == MotorPosition.EJECT:
				pos = MotorPosition.START 

		if pos == MotorPosition.EJECT:
			setServo(self.pinServo,0)
		elif pos == MotorPosition.START:
			setServo(self.pinServo,1)

	def calibrateMotor(self):
		def calibrate(self):
		logger.info("calibrating lbcontrol")
		self.toggleLed(True)
		self.setMotorPosition(MotorPosition.EJECT)
		time.sleep(1)
		self.setMotorPosition(MotorPosition.START)
		if self.checkPhotocell() == True:
			raise Exception("Photoresistor cant getting any readings. Maybe it is unplugged or blocked.")

	def reset(self):
		logger.info("reset lb control")

################################
# LOW LEVEL HARDWARE FUNCTIONS #
################################

# pin, angle (From 0 to 1), duration (in s for pulse)
def setServo (pin, angle, duration = 0.7):
	angle = min(max(0,angle),1)
	dutycycle = 4 + angle * (19 - 4) 
	p = GPIO.PWM(pin,85)
	p.start(dutycycle)
	time.sleep(duration)
	p.stop();


def readRCPin (RCpin, maxCycles):
    reading = 0
    GPIO.setup(RCpin, GPIO.OUT)
    GPIO.output(RCpin, GPIO.LOW)
    time.sleep(0.1)
    GPIO.setup(RCpin, GPIO.IN)
    while ((GPIO.input(RCpin) == GPIO.LOW) and (reading < maxCycles)):
           reading += 1
    return reading * 1.0 / maxCycles
