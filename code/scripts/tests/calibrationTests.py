# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-31 18:06:30

import unittest

IMAGE_FOLDER = "scripts/tests/camera_images"
TEST_IMAGE = "scripts/tests/camera_images/image1.jpg"
CAMERA_MATRIX_FILE = "matrix.json"

class CalibrationTests(unittest.TestCase):

	def test_createCalibrationMatrix(self):
		from ..camera.cameraCalibrator import CameraCalibrator
		calibrator = CameraCalibrator()
		createCalibrationMatrix(calibrator)
		self.assertIsNot(calibrator.calibrationData,False)

	def test_saveCalibrationMatrix(self):
		from ..camera.cameraCalibrator import CameraCalibrator
		calibrator = CameraCalibrator()
		createCalibrationMatrix(calibrator)

		calibrator.writeCalibrationMatrix(CAMERA_MATRIX_FILE)

		# check if file exists
		import os.path
		if os.path.isfile(CAMERA_MATRIX_FILE):
			os.remove(CAMERA_MATRIX_FILE)
		else:
			self.assertTrue(False)

	def test_loadCalibrationMatrix(self):
		from ..camera.cameraCalibrator import CameraCalibrator
		calibrator = CameraCalibrator()
		createCalibrationMatrix(calibrator)
		calibrator.writeCalibrationMatrix(CAMERA_MATRIX_FILE)
		calibrator.writeCalibrationMatrix(CAMERA_MATRIX_FILE)
		del calibrator

		calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)
		self.assertIsNot(calibrator.calibrationData,False)

	def test_undistortCameraImage(self):
		from ..camera.cameraCalibrator import CameraCalibrator
		import cv2
		calibrator = CameraCalibrator()
		createCalibrationMatrix(calibrator)

		# test calibration
		test_img = cv2.imread(TEST_IMAGE)
		img = calibrator.undistortImage(test_img)
		#showImage(img)
		import numpy as np
		self.assertNotEqual( np.sum(img.astype("float")), np.sum(test_img.astype("float")) )


def createCalibrationMatrix(calibrator):
	import glob,cv2

	imagePaths = glob.glob(IMAGE_FOLDER+"/*.jpg")
	input_images = []
	
	for fname in imagePaths:
		img = cv2.imread(fname)
		input_images.append(img)
	calibrator.createCalibrationMatrix(input_images)

def showImage(img,wait = 0):
	import cv2
	res_img = cv2.resize(img,(1024,768))
	cv2.imshow('img',res_img)
	cv2.waitKey(wait)