#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-08-18 15:46:50

# to make this script callable, first type chmod +x letterbox-setup.py in console 


import time

from camera.cardScanner import CardScanner
from camera.cameraCalibrator import CameraCalibrator
from hardware.letterboxControl import MotorPosition
from comm.httpRequestClient import HttpRequestClient
from utils.configReader import ConfigReader

CAMERA_MATRIX_FILE = "camera/camera_matrix.json"
CONFIG_FILE = "letterbox.ini"
SCAN_RESULT_FILE = "scan.jpg"

# debug options
import logging
logging.basicConfig(level=logging.DEBUG)

lbControl = False
config = None
camera = None
lbVersion = 0

def init (initCamera=True):
	global lbControl, camera, config, lbVersion

	# read config
	config = ConfigReader(CONFIG_FILE)
	lbVersion = int(config.get("MAIN","version"))

	try:
		#init vars
		if lbVersion == 0:
			from hardware.letterboxControlTest import LetterboxControlTest
			lbControl = LetterboxControlTest()
		elif lbVersion == 1:
			from hardware.letterboxControlV1 import LetterboxControlV1
			lbControl = LetterboxControlV1()
		else:
			from hardware.letterboxControlV2 import LetterboxControlV2
			lbControl = LetterboxControlV2()

		# start camera
		if initCamera:
			if lbVersion == 0:
				from camera.cameraControlTest import CameraControlTest
				camera = CameraControlTest()
			else:
				from camera.cameraControl import CameraControl
				camera = CameraControl()

	except Exception as err:
		print(err)
		lbControl.flashFeedbackLed(10)
		stop()
		return False
	
	lbControl.flashFeedbackLed(2);
	print("# finished initializing")
	return True

def stop():
	global lbControl, camera
	
	print("# program stopped. cleaning up...")
	del lbControl
	del camera
	return

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

	global lbControl, camera, calibrator

	init();

	if calibrate:
		from hardware.letterboxControl import LetterboxControl
		global lbControl

		lbControl.toggleCameraLed(True)

		# capture images
		images = []
		for i in range(0,n):
			print "Throw in card "+str(i)
			time.sleep(5)
			img = camera.captureImage()
			images.append(img)
			print "done"

		# start calibration
		from camera.cameraCalibrator import CameraCalibrator
		calibrator = CameraCalibrator()
		calibrator.createCalibrationMatrix(images)
		calibrator.writeCalibrationMatrix(CAMERA_MATRIX_FILE)

	else:
		camera.startPreview()

def scan_command():
	"""Scans a postcard"""
	global camera,lbControl

	init()

	lbControl.toggleCameraLed(True)

	calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)

	img = camera.captureImage()
	img = calibrator.undistortImage(img)

	scanner = CardScanner(img)
	#scanner.threshold();
	scanner.saveImage(SCAN_RESULT_FILE)

	#if (cat != False):
	#	print "Found category: "+str(cat)+".";
	#else:
	#	print "Did not find category."

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

	init()

	for n in range(0,repeat):
		response = lbControl.checkPhotocell();
		print response

def reset_command():
	"""Resets and restarts the headboard"""

	global lbControl
	from hardware.letterboxControl import LetterboxControl
	lbControl = LetterboxControl()

	lbControl.reset();

def motor_command(pos=0,calibrate=False):
	'''Turns or calibrates the stepper motor'''
	global lbControl

	init(initCamera=False)

	if (calibrate):
		if lbControl.calibrateMotor() == False:
			print "Error: Stepper could not calibrate"
		else:
			print "Stepper calibrated succesfully."
	else:
		lbControl.setMotorPosition(pos)

def signal_term_handler(signal, frame):
	logger.info("got SIGTERM")
	stop()
	sys_exit(0)

if __name__ == '__main__':
	import scriptine

	try:
		scriptine.run()
	except KeyboardInterrupt:
	    print("interrupted")
	finally:
		stop()
        