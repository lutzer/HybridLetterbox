# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-31 18:06:30

import unittest

class HardwareTests(unittest.TestCase):

	def test_cameraLed(self):
		import RPi.GPIO as GPIO
		from ..hardware.letterboxControl import LetterboxControl,CAMERA_LED_PIN
		lbControl = LetterboxControl()
		lbControl.toggleCameraLed(True)
		self.assertEqual(GPIO.input(CAMERA_LED_PIN),1)
		lbControl.toggleCameraLed(False)
		self.assertEqual(GPIO.input(CAMERA_LED_PIN),0)

	def test_cameraLed(self):
		import RPi.GPIO as GPIO
		from ..hardware.letterboxControl import LetterboxControl,FEEDBACK_LED_PIN
		lbControl = LetterboxControl()
		lbControl.toggleFeedbackLed(True)
		self.assertEqual(GPIO.input(FEEDBACK_LED_PIN),1)
		lbControl.toggleFeedbackLed(False)
		self.assertEqual(GPIO.input(FEEDBACK_LED_PIN),0)

	def test_photocell(self):
		from ..hardware.letterboxControl import LetterboxControl
		lbControl = LetterboxControl()
		response = lbControl.checkPhotocell();
		self.assertIn(response,["pr:0","pr:1"])

	def test_reset(self):
		from ..hardware.letterboxControl import LetterboxControl
		lbControl = LetterboxControl()
		response = lbControl.reset();
		self.assertEqual(response,"started")

	def test_stepperMovement(self):
		from ..hardware.letterboxControl import LetterboxControl
		lbControl = LetterboxControl()
		self.assertIsNot(lbControl.setStepperPosition(0),False)
		self.assertIsNot(lbControl.setStepperPosition(1),False)
		self.assertIsNot(lbControl.setStepperPosition(2),False)

	def test_stepperCalibration(self):
		from ..hardware.letterboxControl import LetterboxControl
		lbControl = LetterboxControl()
		self.assertIsNot(lbControl.calibrateStepper(),False)
