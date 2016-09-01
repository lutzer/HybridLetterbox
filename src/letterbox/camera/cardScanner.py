# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-30 17:41:12
# @Last Modified by:   lutz
# @Last Modified time: 2016-08-24 23:22:19

import cv2
import numpy as np
import logging
from postcardMarker import PostcardMarker

logger = logging.getLogger(__name__)

# CV PARAMETERS
RESIZE_FACTOR = 0.3
CONTOUR_MIN_SIZE = 750*450 # minimal size of the surounding box in pixels
ERODE_KERNEL_SIZE = 1
ERODE_ITERATIONS = 1

NUMBER_OF_MARKERS = 4

PATTERN_MIN_SIZE = 15*15;
PATTERN_MAX_SIZE = 50*50;


class CardScanner:

	"""
	thresholds postcard, extracts Text Box, checks for markers
	"""

	def __init__(self,image,image_turned=None,roi=False):

		if (roi):
			image = image[roi[0] : roi[1], roi[2] : roi[3]]

		self.inputImage = image
		self.image = image.copy();
		self.binaryImage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

		# init markers
		self.markers = [PostcardMarker(i) for i in range(NUMBER_OF_MARKERS)]

		#showImage(PostcardMarker(0).pattern)
		#showImage(PostcardMarker(1).pattern)
		#showImage(PostcardMarker(2).pattern)
		#showImage(PostcardMarker(3).pattern)

	def saveImage(self,path,rotate=False):

		if rotate:
			self.image = cv2.flip(self.image, -1)

		logger.info("save Image")
		cv2.imwrite(path,self.image)
		return path


	def threshold(self):
		greyImage = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)

		# find threshold value
		#otsuVal,_ = cv2.threshold(greyImage,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

		threshImage = cv2.adaptiveThreshold(greyImage, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\
			cv2.THRESH_BINARY, 45, +4)

		# erode small pixels
		kernel = np.ones((ERODE_KERNEL_SIZE,ERODE_KERNEL_SIZE),np.uint8)
		threshImage = cv2.dilate(threshImage,kernel,iterations=ERODE_ITERATIONS)
		threshImage = cv2.erode(threshImage,kernel,iterations=ERODE_ITERATIONS)

		self.binaryImage = threshImage

		# apply truncate threshold, not binary image
		greyImage[threshImage == 255] = 255
		threshImage = greyImage

		self.image = threshImage 


	def findMarker(self):
		"""	
		returns category of the postcard, if false no marker was found
		apply function on binaryImage image
		"""

		#find squares as possible marker regions
		invertedImage = invertImage(self.binaryImage);
		height, width = invertedImage.shape

		if cv2.__version__[0] == '3':
			_, contours, _ = cv2.findContours(invertedImage, cv2.RETR_EXTERNAL , cv2.CHAIN_APPROX_SIMPLE);
		else:
			contours, _ = cv2.findContours(invertedImage, cv2.RETR_EXTERNAL , cv2.CHAIN_APPROX_SIMPLE);

		# find possible candidate Regions
		markerCandidates = []
		#contourImg = np.zeros((height,width), np.uint8)
		for contour in contours:
			epsilon = 0.1*cv2.arcLength(contour,True)
			approx = cv2.approxPolyDP(contour,epsilon,True)
			area = cv2.contourArea(approx)
			if len(approx) == 4 and area > PATTERN_MIN_SIZE and area < PATTERN_MAX_SIZE:
				#cv2.drawContours(contourImg , [approx], 0, 255, thickness=-1)
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
		if (len(results) < 1):
			return (-1,False,1.0)

		minResult = min(results, key=lambda x: x['value'])
		return (minResult['marker'], minResult['flipped'], minResult['value'])


	def maskRectangle(self):
		""" extracts TextBox from postcard (apply function on thresholded image) """

		invertedImage = invertImage(self.binaryImage)
		
		# find contours
		if cv2.__version__[0] == '3':
			_, contours, _ = cv2.findContours(invertedImage, cv2.RETR_LIST , cv2.CHAIN_APPROX_SIMPLE)
		else:
			contours, _ = cv2.findContours(invertedImage, cv2.RETR_LIST , cv2.CHAIN_APPROX_SIMPLE)

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
		kernel = np.ones((3,3),np.uint8)
		contourMask = cv2.erode(contourMask,kernel)

		# delete all pixels, that didnt had overlappying contours
		contourMask[contourMask < n] = 0

		# find overlapping contours and apply mask to image
		self.image[contourMask == 0] = 255

		# create bounding box and crop image
		if cv2.__version__[0] == '3':
			_, contours, _ = cv2.findContours(contourMask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
		else:
			contours, _ = cv2.findContours(contourMask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

		if len(contours) > 0:
			x,y,w,h = cv2.boundingRect(contours[0])
			self.image = self.image[y:y+h,x:x+w]

		#increase contrast
		self.image = increaseContrast(self.image)


def showImage(img,wait = 0,resize=True):
	import cv2
	if resize:
		img = cv2.resize(img,(1024,768),interpolation= cv2.INTER_NEAREST)
	cv2.imshow('img',img)
	cv2.waitKey(wait)


def invertImage(img):
	return 255 - img

def increaseContrast(img):
	minVal = img.min()
	img[img < 255] = img[img < 255] - minVal
	return img
