#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-04-26 15:14:43

# to make this script callable, first type chmod +x letterbox-setup.py in console 

import logging

SAVE_IMAGE_PATH = "undistored.jpg"

# debug options
logging.basicConfig(level=logging.INFO)

lbControl = False

def camera_command(calibrate=False,undistort=False,n=5):
	"""Opens a camera window to focus the lens, to calibrate lens distortion"""
	from camera.cameraControl import CameraControl
	camera = CameraControl()

	if calibrate:

		# capture images
		images = []
		for i in range(0,n):
			print "capturing image " + str(i) + "."
			img = camera.captureImage()
			images.append(img)
			print "done"

		# start calibration
		from camera.cameraCalibrator import CameraCalibrator
		calibrator = CameraCalibrator()
		calibrator.createCalibrationMatrix(images)
		calibrator.writeCalibrationMatrix()

	elif undistort:
		from camera.cameraControl import CameraControl
		from camera.cameraCalibrator import CameraCalibrator
		from camera.cardScanner import CardScanner

		calibrator = CameraCalibrator()
		img = camera.captureImage()
		img = calibrator.undistortImage(img)

		scanner = CardScanner(img)
		scanner.saveImage(SAVE_IMAGE_PATH)

	else:
		camera.startPreview()
	del camera

def showImage(img,wait = 0,resize=True):
	import cv2
	if resize:
		img = cv2.resize(img,(1024,768))
	cv2.imshow('img',img)
	cv2.waitKey(wait)


if __name__ == '__main__':
	import scriptine

	try:
		scriptine.run()
	except KeyboardInterrupt:
	    print("interrupted")
	finally:
		if (lbControl != False):
			del lbControl
        