# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-30 17:41:12
# @Last Modified by:   lutzer
# @Last Modified time: 2016-04-14 16:28:34

import cv2
import numpy as np
import logging

# CV PARAMETERS
RESIZE_FACTOR = 0.3
CONTOUR_MIN_SIZE = 900*500 #size of the sourunding box in pixels
ERODE_KERNEL_SIZE = 3
ERODE_ITERATIONS = 3
MARKER_PATTERN = [
	[ 0, 0, 0, 0 ],
	[ 0, 1, 1, 0 ],
	[ 0, 1, 0, 0 ],
	[ 0, 0, 0, 0 ]
]
MARKER_THRESHOLD = 0.2


logger = logging.getLogger(__name__)

class CardScanner:

	def __init__(self,image,roi=False):

		if (roi):
			image = image[roi[0] : roi[1], roi[2] : roi[3]]

		self.inputImage = image
		self.image = image.copy();
		self.binaryImage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

	def saveImage(self,path):
		logger.info("save Image")
		cv2.imwrite(path,self.image)

	def threshold(self):
		greyImage = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)

		# find threshold value
		#otsuVal,_ = cv2.threshold(greyImage,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

		threshImage = cv2.adaptiveThreshold(greyImage,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\
			cv2.THRESH_BINARY,45,+4)


		self.binaryImage = threshImage

		# apply truncate threshold, not binary image
		greyImage[threshImage == 255] = 255
		threshImage = greyImage

		# erode small pixels
		kernel = np.ones((ERODE_KERNEL_SIZE,ERODE_KERNEL_SIZE),np.uint8)
		threshImage = cv2.erode(threshImage,kernel,ERODE_ITERATIONS)
		threshImage = cv2.dilate(threshImage,kernel,ERODE_ITERATIONS)

		self.image = threshImage 

	# returns category of the postcard, if false no marker was found
	# apply function on thresholded image
	def findMarker(self):
		category = False

		#size down image for faster image processing
		small_image = cv2.resize(self.image, (0,0), fx=RESIZE_FACTOR, fy=RESIZE_FACTOR)

		showImage(small_image)
		
		#create pattern
		pattern = np.array(MARKER_PATTERN,np.uint8)
		pattern[pattern > 0] = 255

		#resize pattern for matching
		for scale in np.linspace(1.0, 20.0, 20):
			resizedPattern = cv2.resize(pattern, (0,0), fx=scale, fy=scale, interpolation= cv2.INTER_NEAREST)
			patternHeight,patternWidth = resizedPattern.shape

			# match pattern
			mat = cv2.matchTemplate(small_image,resizedPattern,cv2.TM_SQDIFF_NORMED);
			minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)

			if minVal < MARKER_THRESHOLD:
				foundImg = small_image.copy()
				cv2.rectangle(foundImg, (minLoc[0], minLoc[1]), (minLoc[0] + patternWidth, minLoc[1] + patternHeight), (100), 2)
				showImage(foundImg)
				break;

		return category


	# masks everything on the picture except for 
	# apply function on thresholded image
	def maskRectangle(self):
		image = self.image;
		
		invertedImage = invertImage(image.copy())
		
		# find contours
		contours, hierarchy = cv2.findContours(invertedImage, cv2.RETR_LIST , cv2.CHAIN_APPROX_SIMPLE);

		# create contour mask
		height, width = image.shape
		contourMask = np.zeros((height,width), np.uint8)

		# add only big contours to it
		n = 0
		for contour in contours:
			if cv2.contourArea(contour) > CONTOUR_MIN_SIZE:
				contourImg = np.zeros((height,width), np.uint8)
				cv2.drawContours(contourImg , [contour], 0, 255, thickness=-1)
				contourMask[contourImg > 0] += 1
				n += 1;

		# erode mask
		kernel = np.ones((ERODE_KERNEL_SIZE,ERODE_KERNEL_SIZE),np.uint8)
		contourMask = cv2.erode(contourMask,kernel,ERODE_ITERATIONS)

		# find overlapping contours and apply mask to image
		self.image[contourMask < n] = 255

	def crop(self):
		self.image = cropImage(self.image)


def showImage(img,wait = 0):
	import cv2
	#res_img = cv2.resize(img,(1024,768))
	res_img = img
	cv2.imshow('img',res_img)
	cv2.waitKey(wait)

def invertImage(img):
	return 255 - img

def cropImage(img):
	inverted = invertImage(img)
	points = cv2.findNonZero(inverted)
	x,y,w,h = cv2.boundingRect(points)
	return img[y:y+h,x:x+w]