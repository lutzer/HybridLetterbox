# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-30 14:57:40

from SerialThread import *
import RPi.GPIO as GPIO
import logging

# CONSTANTS
FEEDBACK_LED_PIN = 24
CAMERA_LED_PIN = 4
SERIAL_BAUDRATE = 9600
SERIAL_ADDRESS = "/dev/ttyAMA0"

logger = logging.getLogger(__name__)

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
		while (True):
			response = self.serial.waitForResponse()
			if (response == "started"):
				break;

		logger.info("init headboard done")


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
