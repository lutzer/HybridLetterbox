#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-07 11:27:13

# to make this script callable, first type chmod +x letterbox-setup.py in console 

import logging

CAMERA_MATRIX_FILE = "camera/camera_matrix.json"
CONFIG_FILE = "letterbox.ini"
SCAN_RESULT_FILE = "scan.jpg"

# debug options
logging.basicConfig(level=logging.INFO)

lbControl = False

def boxsize_commmand():
	"""Opens a camera window to setup the size of the textbox on the postcards"""
	return

def roi_command(turned=False):
	"""
		Opens a camera window to setup the region of interest for finding markers on the postcard
		
		--turned : setup the marker region, when the postcard is upside down.
	"""
	return

def camera_command(calibrate=False,n=5):
	"""Opens a camera window to focus the lens, to calibrate lens distortion"""

	from camera.cameraControl import CameraControl
	camera = CameraControl()

	if calibrate:
		from hardware.letterboxControl import LetterboxControl
		global lbControl
		lbControl = LetterboxControl()

		# capture images
		images = []
		for i in range(0,n):
			lbControl.setStepperPosition(0) 
			img = camera.captureImage()
			images.append(img)
			lbControl.setStepperPosition(1) 

		# start calibration
		from camera.cameraCalibrator import CameraCalibrator
		calibrator = CameraCalibrator()
		calibrator.createCalibrationMatrix(images)
		calibrator.writeCalibrationMatrix(CAMERA_MATRIX_FILE)

	else:
		camera.startPreview()
	del camera

def scan_command():
	"""Scans a postcard"""
	from camera.cameraControl import CameraControl
	from camera.cameraCalibrator import CameraCalibrator
	from camera.cardScanner import CardScanner
	camera = CameraControl()
	calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)

	img = camera.captureImage()
	img = calibrator.undistortImage(img)

	scanner = CardScanner(img)
	cat = scanner.extract();
	scanner.saveImage(SCAN_RESULT_FILE)

	if (cat != False)
		print "Found category: "+str(cat)+".";
	else
		print "Did not find category."

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
			lbControl.flashFeedbackLed(blink)
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
	"""Resets and restarts the headboard"""

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
        