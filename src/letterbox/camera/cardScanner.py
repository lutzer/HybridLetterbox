# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-30 17:41:12
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-20 15:18:16

import cv2
import numpy as np
import logging
from postcardMarker import PostcardMarker

logger = logging.getLogger(__name__)

# CV PARAMETERS
RESIZE_FACTOR = 0.3
CONTOUR_MIN_SIZE = 900*500 #size of the sourounding box in pixels
ERODE_KERNEL_SIZE = 3
ERODE_ITERATIONS = 3

MARKER_THRESHOLD = 0.1

PATTERN_MIN_SIZE = 10*10;
PATTERN_MAX_SIZE = 100*100;


class CardScanner:

	def __init__(self,image,image_turned=None,roi=False):

		if (roi):
			image = image[roi[0] : roi[1], roi[2] : roi[3]]

		self.inputImage = image
		self.image = image.copy();
		self.binaryImage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

		# init markers
		self.markers = [PostcardMarker(0),PostcardMarker(1),PostcardMarker(2),PostcardMarker(3)]

	def saveImage(self,path):
		logger.info("save Image")
		cv2.imwrite(path,self.image)
		return path

	def extract():

		self.threshold()
		cat = self.findMarker()
		self.maskRectangle()

		return cat;

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
	# apply function on binaryImage image
	def findMarker(self):

		#find squares as possible marker regions
		invertedImage = invertImage(self.binaryImage);
		height, width = invertedImage.shape

		contours, _ = cv2.findContours(invertedImage, cv2.RETR_EXTERNAL , cv2.CHAIN_APPROX_SIMPLE);

		# find possible candidate Regions
		markerCandidates = []
		contourImg = np.zeros((height,width), np.uint8)
		for contour in contours:
			epsilon = 0.1*cv2.arcLength(contour,True)
			approx = cv2.approxPolyDP(contour,epsilon,True)
			area = cv2.contourArea(approx)
			if len(approx) == 4 and area > PATTERN_MIN_SIZE and area < PATTERN_MAX_SIZE:
				cv2.drawContours(contourImg , [approx], 0, 255, thickness=-1)
				markerCandidates.append(approx);

		# match marker patterns on each candidate region
		results = []
		for candidate in markerCandidates:
			x,y,w,h = cv2.boundingRect(candidate)
			roi = self.binaryImage[y:y+h, x:x+w]
			vals = []
			for i,marker in enumerate(self.markers):
				resizedPattern = cv2.resize(marker.pattern, (w,h), interpolation= cv2.INTER_NEAREST)
				flippedPattern = cv2.flip(resizedPattern, -1)
				mat = cv2.matchTemplate(roi,resizedPattern,cv2.TM_SQDIFF_NORMED)
				vals.append({ 'marker': i, 'flipped' : False, 'value' : mat[0,0] })
				mat = cv2.matchTemplate(roi,flippedPattern,cv2.TM_SQDIFF_NORMED)
				vals.append({ 'marker': i, 'flipped' : True, 'value' : mat[0,0] })

			# find minimum
			minVal = min(vals, key=lambda x: x['value'])
			results.append(minVal)

		#return minimum
		minResult = min(results, key=lambda x: x['value'])
		return (minResult['marker'], minResult['flipped'], minResult['value'])



	# masks everything on the picture except for 
	# apply function on thresholded image
	def maskRectangle(self):
		
		invertedImage = invertImage(self.binaryImage)
		
		# find contours
		contours, _ = cv2.findContours(invertedImage, cv2.RETR_LIST , cv2.CHAIN_APPROX_SIMPLE);

		# create contour mask
		height, width = invertedImage.shape
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

		# delete all pixels, that didnt had overlappying contours
		contourMask[contourMask < n] = 0

		# find overlapping contours and apply mask to image
		self.image[contourMask == 0] = 255

		# create bounding box and crop image
		contours, _ = cv2.findContours(contourMask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
		if len(contours) > 0:
			x,y,w,h = cv2.boundingRect(contours[0])
			self.image = self.image[y:y+h,x:x+w]


# matches a pattern to different scales
def checkPattern(img,pattern,threshold):
	#create pattern
	pattern = pattern.copy()
	pattern[pattern > 0] = 255

	#resize pattern for matching
	for scale in np.linspace(1.0, 20.0, 20):
		resizedPattern = cv2.resize(pattern, (0,0), fx=scale, fy=scale, interpolation= cv2.INTER_NEAREST)
		patternHeight,patternWidth = resizedPattern.shape

		# match pattern
		mat = cv2.matchTemplate(img,resizedPattern,cv2.TM_SQDIFF_NORMED)
		minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)

		if minVal < threshold:
			return minVal, minLoc, maxLoc


def showImage(img,wait = 0,resize=True):
	import cv2
	if resize:
		img = cv2.resize(img,(1024,768))
	cv2.imshow('img',img)
	cv2.waitKey(wait)

def invertImage(img):
	return 255 - img
