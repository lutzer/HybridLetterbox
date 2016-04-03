#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-31 14:40:43

# to make this script callable, first type chmod +x letterbox-setup.py in console 

import logging

# debug options
logging.basicConfig(level=logging.INFO)

lbControl = False

def camera_command(focus=True,calibrate=False,extract=False):
	"""Opens a camera window to focus the lens"""
	from camera.cameraControl import CameraControl
	camera = CameraControl()
	camera.startPreview()
	del camera

def led_command(off=False,name='cam',blink=0):
	"""Turns on camera led, led name can be 'cam' or 'feedback'"""
	
	global lbControl
	from hardware.letterboxControl import LetterboxControl
	lbControl = LetterboxControl(cleanup=False)

	print "Turning "+ name + " led " + ("off" if off else "on")

	if (name == 'cam'):
		lbControl.toggleCameraLed(not off)
	elif (name == 'feedback'):
		if blink > 0:
			lbControl.blinkFeedbackLed(blink)
		else:
			lbControl.toggleFeedbackLed(not off)
	else:
		print "led can either be 'cam' or 'feedback'"

def photocell_command(repeat=1):
	"""Gets a reading from the photocell"""
	
	global lbControl
	from hardware.letterboxControl import LetterboxControl
	lbControl = LetterboxControl()

	for n in range(0,repeat):
		response = lbControl.checkPhotocell();
		if response:
			print response
		else:
			print "Timed out"

def reset_command():
	'''Resets the headboard'''

	global lbControl
	from hardware.letterboxControl import LetterboxControl
	lbControl = LetterboxControl()

	lbControl.reset();

def stepper_command(pos=0,calibrate=False):
	'''Turns or calibrates the stepper motor'''
	global lbControl
	from hardware.letterboxControl import LetterboxControl
	lbControl = LetterboxControl()

	if (calibrate):
		if lbControl.calibrateStepper() == False:
			print "Error: Stepper could not calibrate"
		else:
			print "Stepper calibrated succesfully."
	else:
		if lbControl.setStepperPosition(pos) == False:
			print "Error: Stepper did not reach position."
		else:
			print "Stepper reached position."


if __name__ == '__main__':
	import scriptine

	try:
		scriptine.run()
	except KeyboardInterrupt:
	    print("interrupted")
	finally:
		if (lbControl != False):
			del lbControl
        