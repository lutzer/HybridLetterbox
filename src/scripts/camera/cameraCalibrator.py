# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 11:22:18
# @Last Modified by:   lutz
# @Last Modified time: 2016-06-09 20:15:38

import numpy as np
import cv2
import json
import logging

CHESSBOARD_ROWS = 8
CHESSBOARD_COLUMNS = 11

CAMERA_MATRIX_FILE = "/home/letterbox/HybridLetterbox/src/scripts/camera/camera_matrix.json"

logger = logging.getLogger(__name__)

class CameraCalibrator:

	def __init__(self):
		self.calibrationData = False
		self.loadCalibrationMatrix(CAMERA_MATRIX_FILE)

	def createCalibrationMatrix(self,input_images):

		# termination criteria
		criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

		# prepare object points, like (0,0,0), (1,0,0), (2,0,0) ....,(6,5,0)
		objp = np.zeros((CHESSBOARD_COLUMNS*CHESSBOARD_ROWS,3), np.float32)
		objp[:,:2] = np.mgrid[0:CHESSBOARD_ROWS,0:CHESSBOARD_COLUMNS].T.reshape(-1,2)

		# Arrays to store object points and image points from all the images.
		objpoints = [] # 3d point in real world space
		imgpoints = [] # 2d points in image plane.

		if (len(input_images) < 1):
			logger.info("Could not calibrate, no pictures taken")
			return

		logger.info("Calibrate Camera using " + str(len(input_images)) + " images.")

		for img in input_images:
		    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

		    # Find the chess board corners
		    ret, corners = cv2.findChessboardCorners(gray, (CHESSBOARD_ROWS, CHESSBOARD_COLUMNS))

		    # If found, add object points, image points (after refining them)
		    if ret == True:
		        logger.debug("found chessboard")
		        objpoints.append(objp)

		        cv2.cornerSubPix(gray,corners,(11,11),(-1,-1),criteria)
		        imgpoints.append(corners)

		        # Draw and display the corners
		        cv2.drawChessboardCorners(img, (CHESSBOARD_ROWS,CHESSBOARD_COLUMNS), corners,ret)
		    else:
		    	logger.debug("didnt find chessboard")
		
		# create calibration matrix
		logger.info("Creating calibration matrix")
		ret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(objpoints, imgpoints, gray.shape[::-1],None,None)

		# if successfull save calibration values
		if (ret):
			self.calibrationData = {
			"camera_matrix" : mtx.tolist(), 
			"dist_coeff" : dist.tolist()
			}
			logger.info("calibration succesfull.")
		else:
			logger.info("calibration failed.")

	def writeCalibrationMatrix(self):
		with open(CAMERA_MATRIX_FILE, "w") as file:
			json.dump(self.calibrationData, file)

	def loadCalibrationMatrix(self,path):
		with open(path) as file:    
			self.calibrationData = json.load(file)
		return self.calibrationData;
	
	def undistortImage(self,img):
		if (self.calibrationData == False):
			return img
		h,  w = img.shape[:2]
		#newcameramtx, roi=cv2.getOptimalNewCameraMatrix( self.calibrationData['camera_matrix'], np.asarray(self.calibrationData['dist_coeff']), (w,h), 1,(w,h) )
		img = cv2.undistort(img, np.asarray(self.calibrationData['camera_matrix']), np.asarray(self.calibrationData['dist_coeff']), None)
		return img
