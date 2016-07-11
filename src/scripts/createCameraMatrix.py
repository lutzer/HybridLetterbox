# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-06-09 18:02:08
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-09 18:11:23

CAMERA_MATRIX_FILE = "camera/camera_matrix.json"

PIN_LED = 22
PIN_SERVO = 18
PIN_PHOTORESISTOR = 17


from lbControl import LbControl
from cameraControl import CameraControl
from camera.cameraControl import CameraControl
from camera.cameraCalibrator import CameraCalibrator

lbControl = LbControl(PIN_LED,PIN_SERVO,PIN_PHOTORESISTOR,0.3)
		
camera = CameraControl()

print "throw in first card"
time.sleep(5000)

# capture images
images = []
for i in range(0,5):
	print "Reading card"
	lbControl.setServoOpen(False)
	img = camera.captureImage()
	images.append(img)
	lbControl.setServoOpen(True)
	print "done. throw in next card"
	time.sleep(5000)

# start calibration
calibrator = CameraCalibrator()
calibrator.createCalibrationMatrix(images)
calibrator.writeCalibrationMatrix(CAMERA_MATRIX_FILE)

