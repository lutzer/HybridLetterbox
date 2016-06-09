import picamera
import time
import RPi.GPIO as GPIO
import cv2
import io
import numpy as np
import logging
from configReader import ConfigReader
from cameraControl import CameraControl
from camera.cameraCalibrator import CameraCalibrator
from lbControl import LbControl

# Define pins
PIN_LED = 22
PIN_SERVO = 18
PIN_PHOTORESISTOR = 17

# Debug options
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Read config PARAMETERS
CONFIG_FILE = "/home/letterbox/HybridLetterbox/src/scripts/letterbox.ini"
config = ConfigReader(CONFIG_FILE)

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
	pattern,
	config.get("Image","Dilate_Iterations")
)

lbControl = LbControl(PIN_LED,PIN_SERVO,PIN_PHOTORESISTOR,float(config.get("Hardware","Photoresistor_Threshold")))

# turn on led
lbControl.toggleLed(True)

#take bg picture
print("taking bg picture")
camera.calibrate()

print("done. put in postcard.")
lbControl.flashLed(2)
time.sleep(4)

# take postcard image
print("taking  postcard image")
image = camera.captureImage()

# write image
cv2.imwrite("images/calibrateInput.jpg",image)

calibrator = CameraCalibrator()
undisorted = calibrator.undistortImage(image)
cv2.imwrite("images/calibrateUndistorted.jpg",undisorted)

# thresholdImage
print("threshold image")
threshImage = camera.thresholdImage(image)

#undisort image
threshImage = calibrator.undistortImage(threshImage)

# write image
cv2.imwrite("images/calibrateThresholded.jpg",threshImage)

# extract roi and mask pattern
print("find pattern")
extractImage, found, val, cat = camera.extractRoiAndMaskPattern(threshImage,True)
if (found):
	print("found pattern with val:")
	print(val)
else:
	print("did not find pattern. val:")
	print(val)
print("/ category:")
print(cat)

# write image
print("writing images...")
cv2.imwrite("images/calibrateResult.jpg",extractImage)

# eject card
lbControl.setServoOpen(True)
time.sleep(0.5)
lbControl.setServoOpen(False)

#clean up
del camera
del lbControl


# #cleanup
# print("cleanup camera and GPIO")
# camera.close()
# GPIO.cleanup()


