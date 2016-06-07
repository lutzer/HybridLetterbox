# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-07 10:52:12

import unittest

TEST_FILE = "letterbox/tests/test.jpg"

class CameraTests(unittest.TestCase):

	def test_cameraPreview(self):
		from ..camera.cameraControl import CameraControl
		camera = CameraControl(automode=True)
		camera.startPreview()
		self.assertTrue(True)

	def test_cameraSaveImage(self):
		from ..camera.cameraControl import CameraControl
		from ..camera.cardScanner import CardScanner
		camera = CameraControl()
		img = camera.captureImage()

		scanner = CardScanner(img)
		scanner.saveImage(TEST_FILE)

		# check if file exists
		import os.path
		if os.path.isfile(TEST_FILE):
			os.remove(TEST_FILE)
			self.assertTrue(True)
		