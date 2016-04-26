import time
import logging
import utils
import requests
import signal
from sys import exit as sys_exit
from json import dumps as json_dumps
from datetime import datetime
from lbControl import LbControl
from cameraControl import CameraControl
from configReader import ConfigReader
from multiprocessing import Process

# Debug options
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define pins
PIN_LED = 22
PIN_SERVO = 18
PIN_PHOTORESISTOR = 17

# # Parameters
CONFIG_FILE = "/home/letterbox/scripts/letterbox/letterbox.ini"
DELAY_BETWEEN_READINGS = 0.3 # 300 ms

# Global Vars
loopRunning = True
isLedOn = False
lbControl = None
camera = None
config = None
twitter = None

##################
# MAIN FUNCTIONS #
##################

def init ():
	global lbControl, camera, config, twitter

	#setup logger
	#hdlr = logging.FileHandler('/home/letterbox/scripts/log/letterbox.log')
	#formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
	#hdlr.setFormatter(formatter)
	#logger.addHandler(hdlr)

	# handle kill msg
	signal.signal(signal.SIGTERM, signal_term_handler)

	# load config values
	config = ConfigReader(CONFIG_FILE)

	try:
		#init vars
		lbControl = LbControl(PIN_LED,PIN_SERVO,PIN_PHOTORESISTOR,float(config.get("Hardware","Photoresistor_Threshold")))
		
		# create pattern object
		pattern = {
			"File" : config.get("Image","Pattern_File"),
			"Match_Value" : float(config.get("Image","Pattern_Match_Value")),
			"Offset" : (int(config.get("Image","Offset_X")), int(config.get("Image","Offset_Y"))),
			"Roi_Size" : (int(config.get("Image","Roi_Width")),int(config.get("Image","Roi_Height")))
		}

		# start camera
		camera = CameraControl(
			config.get("Image","Threshold_Low"),
			config.get("Image","Threshold_High"),
			config.get("Camera","Shutter_Speed"),
			config.get("Camera","White_Balance_Red"),
			config.get("Camera","White_Balance_Blue"),
			float(config.get("Image","Image_Rotation")),
			Pattern = pattern,
			Flip_Image = config.get("Image","Flip_Image") == 'True',
			Dilate_Iterations = config.get("Image","Dilate_Iterations")
		)

		# init hardware
		logger.info(" # initializing...")
		lbControl.calibrate();

		# init camera
		camera.calibrate();
	except Exception as err:
		logger.error(err)
		lbControl.flashLed(10)
		stop()
		sys_exit(0)
	
	lbControl.flashLed(2);
	logger.info("# finished initializing. starting loop...")
	return

def loop ():
	global lbControl,camera, twitter

	if (lbControl.checkLightBarrier()):
		lbControl.flashLed(1)
		# try:

		imageFolder = config.get("Main","Image_Save_Folder")

		# generate filename
		filename = utils.generateImageName(datetime.now(),config.get("Main","Letterbox_Id"))+'.jpg'

		#take picture
		image = camera.captureSubmission(imageFolder+"/"+filename)

		# eject card
		lbControl.setServoOpen(True)
		time.sleep(0.5)
		lbControl.setServoOpen(False)

		#extract writing
		image,category = camera.extractSubmission(image);

		#save image
		camera.saveImage(image,imageFolder+"/"+filename)
		logger.info("# saved image to: "+filename)

		#send picture
		logger.info("# sending notifications... ")
		prc = Process(target=sendNotification, args=[config.get("Main","Post_Url_Box"),config.get("Main","Post_Url_Web"),{'file' : filename, 'path' : imageFolder},category])
		prc.start()
		logger.info("# done... loopig again.")
		
	time.sleep(DELAY_BETWEEN_READINGS)
	return

def stop ():
	global lbControl, camera
	
	logger.info("# program stoped. cleaning up...")
	del lbControl
	del camera
	return

##############################
# MISC FUNCTIONS #
##############################

def notification_exception_handler(request, exception):
	print "Request failed"

def sendNotification(boxUrl,webUrl,data,category):

	message = ""
	submissionCategory = "none"
	if category == 0:
		message = "WAS MACHT IHRER MEINUNG NACH LEBENSQUALITAET IN DEUTSCHLAND AUS?"
	elif category == 1:
		message = ""
	elif category == 2:
		message = "WAS IST IHNEN PERSOENLICH WICHTIG IM LEBEN?"
	elif category == 3:
		message = ""

	data['message'] = message
	data['category'] = submissionCategory

	if (bool(boxUrl) != False):
		# first send box notification
		logger.debug("sending file to box")
		headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
		r1 = requests.post(boxUrl, data=json_dumps(data), headers=headers)

	if (bool(webUrl) != False):
		# send web notification
		logger.debug("sending file to web url: "+webUrl)
		r2 = requests.post(webUrl, files={ 'file' : open(data['path']+"/"+data['file'], 'rb')}, data=data)

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
