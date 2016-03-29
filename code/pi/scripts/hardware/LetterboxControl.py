# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-29 17:10:16

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

        # init pins
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(FEEDBACK_LED_PIN, GPIO.OUT)
		GPIO.setup(CAMERA_LED_PIN, GPIO.OUT)

		# opern serial connection
		self.serial = SerialThread(SERIAL_ADDRESS, SERIAL_BAUDRATE)
		self.serial.start();

		self.cleanup = cleanup


	def __del__(self):
		if (self.cleanup):
			GPIO.cleanup()
		self.serial.stop();
		logger.info("cleaned up LetterboxControl")


    #################### 
	# CONTROL HARDWARE FUNCTIONS #
	####################

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
		response = self.serial.waitForResponse()
		return response
