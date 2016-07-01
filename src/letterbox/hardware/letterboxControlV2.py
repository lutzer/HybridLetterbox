# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-30 18:19:42

from serialThread import *
import RPi.GPIO as GPIO
import logging
from enum import Enum
from letterboxControl import LetterboxControl, MotorPosition

# CONSTANTS
FEEDBACK_LED_PIN = 24
CAMERA_LED_PIN = 4
SERIAL_BAUDRATE = 9600
SERIAL_ADDRESS = "/dev/ttyAMA0"

STEPPER_TIMEOUT = 8 #8 seconds for making a full turn

logger = logging.getLogger(__name__)

class LetterboxControlV2(LetterboxControl):

	"""
	Class controls the hardware of the third prototype of the letterbox 
	with atmega headboard and stepper motor.
	"""
	
	# start atmega on headboard
	def init(self):
		logger.info("init headboard")

		 # init pins
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(FEEDBACK_LED_PIN, GPIO.OUT)
		GPIO.setup(CAMERA_LED_PIN, GPIO.OUT)

		# open serial connection to headboard
		self.serial = SerialThread(SERIAL_ADDRESS, SERIAL_BAUDRATE)
		self.serial.start();
		
		# send headboard start command
		self.serial.clear()
		self.serial.sendMessage("start")
		response = self.serial.waitForResponse(text="started",timeout=STEPPER_TIMEOUT*2)
		if (response == False):
			logger.info("init headboard timed out")
			return response
		else:
			logger.info("init headboard done")
			return response

	def flashFeedbackLed(self,times=20,delay=0.25):
		for i in range(0,times):
			self.toggleFeedbackLed(True)
			time.sleep(delay)
			self.toggleFeedbackLed(False)
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

	def setMotorPosition(self,pos):
		self.serial.sendMessage("stp:"+str(pos))
		return self.serial.waitForResponse(text="stp:e",timeout=STEPPER_TIMEOUT)

	def calibrate(self):
		self.serial.sendMessage("stp:c")
		return self.serial.waitForResponse(text="stp:e",timeout=STEPPER_TIMEOUT)

	# resets and recalibrates the headboard
	def reset(self):
		logger.info("resetting headboard")
		self.serial.sendMessage('reset')
		time.sleep(2) # give the headboard 2 seconds to reset
		return self.init()

	def ejectCard(self):
		''' Asynchronous function for ejecting a postcard '''
		thread = Thread(target=self._ejectAsync)
		thread.start()

	### PRIVATE METHODS ###
	#
	def _ejectAsync(self):
		self.setMotorPosition(MotorPosition.EJECT)
		time.sleep(1)
		self.setMotorPosition(MotorPosition.START)
