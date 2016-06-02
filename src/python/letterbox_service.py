# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-01 12:19:33

import logging

from camera.* import CameraControl, CardScanner, CameraCalibrator
from hardware.* import LetterboxControl
from comm.* import HttpRequestClient

# Debug options
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CHANGEABLE PARAMETERS
CAMERA_MATRIX_FILE = "camera/camera_matrix.json"
SUBMISSION_IMAGES_FOLDER = "images/"
API_HTTP_ADDRESS = "http://127.0.0.1/api"

# DO NOT CHANGE THESE PARAMETERS
DELAY_BETWEEN_READINGS = 0.3

# Global Vars
loopRunning = True
lbControl = None
camera = None
calibrator = None

##################
# MAIN FUNCTIONS #
##################

def init ():
	global lbControl, CameraControl, calibrator

	try:
		#init vars
		lbControl = LetterboxControl()
		
		# TODO: create pattern object

		# start camera
		camera = CameraControl()
		calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)

		# init hardware
		logger.info(" # initializing...")

	except Exception as err:
		logger.error(err)
		lbControl.flashFeedbackLed(20)
		stop()
		sys_exit(0)
	
	lbControl.flashFeedbackLed(2);
	logger.info("# finished initializing. starting loop...")
	return

def loop ():
	global lbControl, camera, calibrator

	if (lbControl.checkPhotocell()):
		lbControl.flashFeedbackLed(1)

		imageFolder = config.get("Main","Image_Save_Folder")

		#take first picture
		img1 = camera.captureImage()

		#turn postcard
		lbControl.setStepperPosition(StepperPosition.TURN)

		#take second picture
		img2 = camera.captureImage()

		# TODO: make this none blocking
		#eject postcard
		lbControl.setStepperPosition(StepperPosition.EJECT)

		# turn back to normal
		lbControl.setStepperPosition(StepperPosition.START)

		# TODO: compare both sides
		# extract image
		img1 = calibrator.undistortImage(img1)
		
		scanner = cardScanner(img1)
		scanner.threshold()
		scanner.maskRectangle()

		#save image
		# TODO: generate filename
		filename = "test.jpg"
		scanner.saveImage(img1,SUBMISSION_IMAGES_FOLDER + filename)
		logger.info("# saved image to: "+filename)

		#TODO: send picture
		
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

init()
try:
	while loopRunning:
		loop()
except KeyboardInterrupt:
	print("# program loop interrupted")
finally:
	stop()