# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-06 15:05:49

import unittest

TEST_FILE = "letterbox/tests/images/scan3.jpg"
TEST_PATTERN_FILE = "letterbox/tests/images/pattern-scan.jpg"
OUTPUT_FILE = "test.jpg"

class ScannerTests(unittest.TestCase):

	# def test_extractImage(self):
	# 	from ..camera.cardScanner import CardScanner
	# 	import cv2
	# 	test_img = cv2.imread(TEST_FILE)
	# 	scanner = CardScanner(test_img)
	# 	scanner.threshold()
	# 	scanner.maskRectangle()
	# 	scanner.saveImage(OUTPUT_FILE)
	# 	self.assertTrue(True)

	def test_findMarker(self):
		from ..camera.cardScanner import CardScanner
		import cv2
		test_img = cv2.imread(TEST_PATTERN_FILE)
		scanner = CardScanner(test_img)
		scanner.threshold()
		result = scanner.findMarker()
		print result;
		scanner.saveImage(OUTPUT_FILE)
		self.assertTrue(True)