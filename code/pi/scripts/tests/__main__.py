# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 16:09:53
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-31 16:10:09

# call unit test from code/pi folder with python2 -m scripts.tests

import unittest
import logging

# debug options
logging.basicConfig(level=logging.INFO)

# call test functions
if __name__ == '__main__':
	from cameraTests import CameraTests
	from hardwareTests import HardwareTests
	from calibrationTests import CalibrationTests
	unittest.main()