# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-31 11:22:00

import picamera
import cv2
import io
import logging
import numpy
import time

logger = logging.getLogger(__name__)


# CAMERA PARAMETERS
CAMERA_WHITE_BALANCE = 3000
CAMERA_SHUTTER_SPEED = 0.01
CAMERA_ISO = 800
CAMERA_RESOLUTION = (1600, 1200)

# Class Controls the Camera
class CameraControl:
	def __init__(self):
		logger.info('init PiCamera')
		self.camera = None

		logger.info('starting  camera...')
		self.startCamera()

	def __del__(self):
		self.stopCamera()
		logger.info("cleaned up CameraControl")

	def startCamera (self):
		self.camera = picamera.PiCamera()
		self.camera.framerate = 5
		self.camera.exposure_mode = 'off'
		self.camera.shutter_speed = CAMERA_SHUTTER_SPEED
		self.camera.awb_mode = 'off'
		self.camera.awb_gains = CAMERA_WHITE_BALANCE
		self.camera.ISO = CAMERA_ISO
		self.camera.resolution = CAMERA_RESOLUTION
		time.sleep(1) # warmup time

	def stopCamera(self):
		if self.camera != None:
			self.camera.close()
			self.camera = None

	def captureImage(self):
		logger.info('taking image')
		stream = io.BytesIO()
		self.camera.capture(stream, format='jpeg')
		data = numpy.fromstring(stream.getvalue(), dtype=numpy.uint8)
		image = cv2.imdecode(data, 1)
		logger.info('image taken')
		return image

	def startPreview(self):
		logger.info("started camera preview")
		camera.start_preview()
		while True:
			time.sleep(1)