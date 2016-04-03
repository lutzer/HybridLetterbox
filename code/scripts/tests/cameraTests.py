# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-31 18:06:30

import unittest

TEST_FILE = "test.jpg"

class CameraTests(unittest.TestCase):

	def test_cameraPreview(self):
		from ..camera.cameraControl import CameraControl
		camera = CameraControl(automode=True)
		cameraPreview()
		self.assertTrue(True)

	def test_cameraSaveImage(self):
		from ..camera.cameraControl import CameraControl
		camera = CameraControl()
		camera.captureImage()
		camera.cameraSaveImage(TEST_FILE)

		# check if file exists
		import os.path
		if os.path.isfile(TEST_FILE):
			os.remove(TEST_FILE)
			self.assertTrue(True)
		