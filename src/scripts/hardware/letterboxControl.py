# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-31 14:43:57

from serialThread import *
import RPi.GPIO as GPIO
import logging
from enum import Enum

# CONSTANTS
FEEDBACK_LED_PIN = 24
CAMERA_LED_PIN = 4
SERIAL_BAUDRATE = 9600
SERIAL_ADDRESS = "/dev/ttyAMA0"

STEPPER_TIMEOUT = 8 #8 seconds for making a full turn

logger = logging.getLogger(__name__)

class StepperPosition(Enum):
	START = 0
	TURN = 1
	EJECT = 2

# Class Controls the Hardware of the Letterbox
class LetterboxControl:
	def __init__(self,cleanup=False):

		if (cleanup == False):
			GPIO.setwarnings(False)

		self.cleanup = cleanup

        # init pins
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(FEEDBACK_LED_PIN, GPIO.OUT)
		GPIO.setup(CAMERA_LED_PIN, GPIO.OUT)

		# open serial connection to headboard
		self.serial = SerialThread(SERIAL_ADDRESS, SERIAL_BAUDRATE)
		self.serial.start();

		self.init();

	def __del__(self):
		if (self.cleanup):
			GPIO.cleanup()
		self.serial.stop();
		logger.info("cleaned up LetterboxControl")


    #################### 
	# CONTROL HARDWARE FUNCTIONS #
	####################
	
	# start atmega on headboard
	def init(self):
		logger.info("init headboard")
		
		self.serial.clear()
		self.serial.sendMessage("start")
		response = self.serial.waitForResponse(text="started",timeout=STEPPER_TIMEOUT*2)
		if (response == False):
			logger.info("init headboard timed out")
			return response
		else:
			logger.info("init headboard done")
			return response

	def blinkFeedbackLed(self,times=20,delay=0.1):
		for i in range(0,times):
			self.toggleCameraLed(True)
			time.sleep(delay)
			self.toggleCameraLed(False)
			time.sleep(delay)

	def toggleFeedbackLed (self,on):
		if (on):
			GPIO.output(FEEDBACK_LED_PIN, GPIO.HIGH)
		else:
			GPIO.output(FEEDBACK_LED_PIN, GPIO.LOW)

	def toggleCameraLed(self,on):
		if (on):
			GPIO.output(CAMERA_LED_PIN, GPIO.HIGH)
		else:
			GPIO.output(CAMERA_LED_PIN, GPIO.LOW)

	def checkPhotocell(self):
		self.serial.sendMessage("pr:?")
		return self.serial.waitForResponse()

	def setStepperPosition(self,pos):
		self.serial.sendMessage("stp:"+str(pos))
		return self.serial.waitForResponse(text="stp:e",timeout=STEPPER_TIMEOUT)

	def calibrateStepper(self):
		self.serial.sendMessage("stp:c")
		return self.serial.waitForResponse(text="stp:e",timeout=STEPPER_TIMEOUT)

		# resets and recalibrates the headboard
	def reset(self):
		logger.info("resetting headboard")
		self.serial.sendMessage('reset')
		time.sleep(2) # give the headboard 2 seconds to reset
		return self.init()
