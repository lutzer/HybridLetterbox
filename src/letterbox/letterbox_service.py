# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-06-23 15:12:06

import logging
import time

from camera.cardScanner import CardScanner
from camera.cameraCalibrator import CameraCalibrator
from hardware.letterboxControl import MotorPosition
from comm.httpRequestClient import HttpRequestClient
from utils.configReader import ConfigReader
from utils.utils import generateImageName

# Debug options
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CHANGEABLE PARAMETERS
CAMERA_MATRIX_FILE = "camera/camera_matrix.json"
IMAGE_SAVE_FOLDER = "_tmp/"
DEVICE_NAME = "letterbox"
CONFIG_FILE = "letterbox.ini"

# DO NOT CHANGE THESE PARAMETERS
DELAY_BETWEEN_READINGS = 0.3

# Global Vars
loopRunning = True
lbControl = None
camera = None
calibrator = None
config = None

##################
# MAIN FUNCTIONS #
##################

def init ():
	global lbControl, camera, calibrator, config

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
		if lbVersion == 0:
			from camera.cameraControlTest import CameraControlTest
			camera = CameraControlTest()
		else:
			from camera.cameraControl import CameraControl
			camera = CameraControl()

		calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)

		# init hardware
		lbControl.calibrate()
		logger.info(" # initializing...")

	except Exception as err:
		logger.error(err)
		lbControl.flashFeedbackLed(10)
		stop()
		return False
	
	lbControl.flashFeedbackLed(2);
	logger.info("# finished initializing. starting loop...")
	return True

def loop ():
	global lbControl, camera, calibrator, config

	if (lbControl.checkPhotocell()):
		lbControl.flashFeedbackLed(1)

		imageFolder = IMAGE_SAVE_FOLDER

		#take first picture
		img1 = camera.captureImage()

		#turn postcard
		#lbControl.setMotorPosition(MotorPosition.TURN)

		#take second picture
		#img2 = camera.captureImage()

		#eject postcard
		lbControl.ejectCard();

		# TODO: compare both sides
		# extract image
		img1 = calibrator.undistortImage(img1)
		
		scanner = CardScanner(img1)
		scanner.threshold()

		# find marker
		marker, flipped, val = scanner.findMarker()
		logger.info("Found marker: "+str(marker)+" (value: "+str(val)+"). Flipped: "+str(flipped))

		# extract text box
		scanner.maskRectangle()

		# save image
		filename = generateImageName(config.get("MAIN","id")) + '.jpg'
		filepath = scanner.saveImage(IMAGE_SAVE_FOLDER + filename, rotate=flipped)
		logger.info("# saved image to: "+filepath)

		# create submission
		category = -1;
		tags = None
		text = " "
		if val < float(config.get("MARKER","marker_threshold")):
			category = marker
			tags = config.get("CATEGORIES","tags"+str(category))
			text = config.get("CATEGORIES","text"+str(category))

		submission = {
			'device' : DEVICE_NAME,
			'author' : config.get("MAIN","author"),
			'category' : marker,
			'tags' : tags,
			'text' : text,
			'dataset' : config.get("MAIN","dataset")
		}

		# send data and picture
		requestClient = HttpRequestClient(config.get("MAIN","api"))
		requestClient.postSubmission(submission,filepath,filename);
		
	time.sleep(DELAY_BETWEEN_READINGS)
	return

def stop ():
	global lbControl, camera
	
	logger.info("# program stopped. cleaning up...")
	del lbControl
	del camera
	return

def signal_term_handler(signal, frame):
	logger.info("got SIGTERM")
	stop()
	sys_exit(0)

#################
# START PROGRAM #
#################

if init():
	try:
		while loopRunning:
			loop()
	except KeyboardInterrupt:
		print("# program loop interrupted")
	finally:
		stop()
