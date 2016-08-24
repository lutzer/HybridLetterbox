# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-08-18 18:02:59
# @Last Modified by:   lutzer
# @Last Modified time: 2016-08-18 18:03:40


	from camera.cameraControl import CameraControl
	from camera.cameraCalibrator import CameraCalibrator
	from camera.cardScanner import CardScanner
	camera = CameraControl()
	calibrator = CameraCalibrator(CAMERA_MATRIX_FILE)

	img = camera.captureImage()
	img = calibrator.undistortImage(img)

	scanner = CardScanner(img)
	cat = scanner.extract();
	scanner.saveImage(SCAN_RESULT_FILE)

	if (cat != False):
		print "Found category: "+str(cat)+".";
	else:
		print "Did not find category."

	del camera