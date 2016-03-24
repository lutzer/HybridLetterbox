# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-24 16:52:36

import RPi.GPIO as GPIO
import logging

# CONSTANTS
FEEDBACK_LED_PIN = 24
CAMERA_LED_PIN = 4

logger = logging.getLogger(__name__)

# Class Controls the Hardware of the Letterbox
class LetterboxControl:
	def __init__(self):

        # init pins
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(FEEDBACK_LED_PIN, GPIO.OUT)
		GPIO.setup(CAMERA_LED_PIN, GPIO.OUT)

		self.cameraLedState = False
		self.feedbackLedState = False

	def __del__(self):
		self.toggleLed(False)
		GPIO.cleanup()
		logger.info("cleaned up LetterboxControl")


    #################### 
	# CONTROL HARDWARE FUNCTIONS #
	####################

	def toggleFeedbackLed (self,on):
		if (on == self.feedbackLedState):
			return
		if (on):
			GPIO.output(FEEDBACK_LED_PIN, GPIO.HIGH)
			self.feedbackLedState = True	
		else:
			GPIO.output(FEEDBACK_LED_PIN, GPIO.LOW)
			self.feedbackLedState = False

	def toggleCameraLed(self,on):
		if (on == self.cameraLedState):
			return
		if (on):
			GPIO.output(CAMERA_LED_PIN, GPIO.HIGH)
			self.cameraLedState = True	
		else:
			GPIO.output(CAMERA_LED_PIN, GPIO.LOW)
			self.cameraLedState = False	

	def checkPhotocell(self):
		return false;
