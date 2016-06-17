# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-17 00:57:14

import logging
import time

from camera.cameraControlTest import CameraControlTest
from camera.cardScanner import CardScanner
from camera.cameraCalibrator import CameraCalibrator
from hardware.letterboxControlTest import LetterboxControlTest
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
LETTERBOX_VERSION = 2 # 0 = DEBUG, < 3 (OLD VERSION), >= 3
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

	try:
		#init vars
		lbControl = LetterboxControlTest()
		print lbControl;

		# start camera
		camera = CameraControlTest()
		calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)

		# init hardware
		logger.info(" # initializing...")

	except Exception as err:
		logger.error(err)
		lbControl.flashFeedbackLed(20)
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
		lbControl.setMotorPosition(MotorPosition.TURN)

		#take second picture
		img2 = camera.captureImage()

		# TODO: make this none blocking
		#eject postcard
		lbControl.setMotorPosition(MotorPosition.EJECT)

		# turn back to normal
		lbControl.setMotorPosition(MotorPosition.START)

		# TODO: compare both sides
		# extract image
		img1 = calibrator.undistortImage(img1)
		
		scanner = CardScanner(img1)
		scanner.threshold()
		scanner.maskRectangle()

		#save image
		filename = generateImageName(config.get("Main","id")) + '.jpg'
		filepath = scanner.saveImage(IMAGE_SAVE_FOLDER + filename)
		logger.info("# saved image to: "+filepath)

		#TODO: send picture
		requestClient = HttpRequestClient(config.get("Main","api")+'/submissions/',config.get("Main","api")+'/file/attach/')
		submission = {
			'device' : DEVICE_NAME,
			'author' : config.get("Main","author"),
			'tag' : 'lbtesttag',
			'text' : 'lbtesttext'
		}
		requestClient.postSubmission(submission,filepath);
		
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
	#sys_exit(0)

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