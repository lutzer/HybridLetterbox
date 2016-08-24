# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-08-18 15:50:01

from letterboxControl import LetterboxControl, MotorPosition
import logging
import time
import RPi.GPIO as GPIO
from threading import Thread

logger = logging.getLogger(__name__)

# Define pins
PIN_LED = 22
PIN_SERVO = 18
PIN_PHOTORESISTOR = 17
PHOTORESISTOR_THRESHOLD = 0.2
RC_TIMEOUT = 10000


SERVO_INVERSE = False
SERVO_DUTYCYCLE_LOW = 5
SERVO_DUTYCYCLE_HIGH = 18




# Class Controls the Hardware of the Letterbox
class LetterboxControlV1(LetterboxControl):

	"""
	Class controls the hardware of the second prototype of the letterbox 
	(with servo mechanism).
	"""

	def init(self):
		self.pinLed = PIN_LED
		self.pinServo = PIN_SERVO
		self.pinPhotoresistor = PIN_PHOTORESISTOR
		self.PRThreshold = PHOTORESISTOR_THRESHOLD

		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.pinLed, GPIO.OUT)
		GPIO.setup(self.pinServo, GPIO.OUT)
		GPIO.setup(self.pinPhotoresistor, GPIO.OUT)

		self.ledState = False

	def stop(self):
		self.toggleFeedbackLed(False)
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

	def toggleFeedbackLed(self,on):
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
			self.toggleFeedbackLed(True);
			time.sleep(0.1)

		val = readRCPin(self.pinPhotoresistor,RC_TIMEOUT)
		logger.debug('PR Reading:'+str(val))
		if (val > self.PRThreshold):
			return True
		return False

	def ejectCard(self):
		''' Asynchronous function for ejecting a postcard '''
		thread = Thread(target=self._ejectAsync)
		thread.start()

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

	def calibrate(self):
		logger.info("calibrating lbcontrol")
		self.toggleFeedbackLed(True)
		self.setMotorPosition(MotorPosition.EJECT)
		time.sleep(1)
		self.setMotorPosition(MotorPosition.START)
		if self.checkPhotocell() == True:
			raise Exception("Photoresistor cant getting any readings. Maybe it is unplugged or blocked.")

	def reset(self):
		logger.info("reset lb control")

	### PRIVATE METHODS ###
	#
	def _ejectAsync(self):
		self.setMotorPosition(MotorPosition.EJECT)
		time.sleep(1)
		self.setMotorPosition(MotorPosition.START)

################################
# LOW LEVEL HARDWARE FUNCTIONS #
################################

# pin, angle (From 0 to 1), duration (in s for pulse)
def setServo (pin, angle, duration = 0.7):
	angle = min(max(0,angle),1)
	dutycycle = SERVO_DUTYCYCLE_LOW + angle * (SERVO_DUTYCYCLE_HIGH - SERVO_DUTYCYCLE_LOW) 
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
