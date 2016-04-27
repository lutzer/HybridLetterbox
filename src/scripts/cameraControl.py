import picamera
import cv2
import io
import logging
import numpy
import time
from camera.cameraCalibrator import CameraCalibrator

logger = logging.getLogger(__name__)

# PARAMETERS
RESIZE_FACTOR = 0.5
#CAT_MARKERS = []
CAT_MARKERS = [
	"/home/letterbox/HybridLetterbox/src/scripts/images/marker0.jpg",
	"/home/letterbox/HybridLetterbox/src/scripts/images/marker1.jpg",
	"/home/letterbox/HybridLetterbox/src/scripts/images/marker2.jpg",
	"/home/letterbox/HybridLetterbox/src/scripts/images/marker3.jpg",
]

# Class Controls the Hardware of the Letterbox
class CameraControl:
	def __init__(self, Image_Threshold_Low, Image_Threshold_High, Shutter_Speed, White_Balance_Red, White_Balance_Blue, Image_Rotation = 0, Pattern = False , Flip_Image = True, Dilate_Iterations = 2):
		logger.info('init PiCamera')
		self.image = None
		self.camera = None

		self.param = {}
		self.param["Image_Threshold_Low"] = int(Image_Threshold_Low)
		self.param["Image_Threshold_High"] = int(Image_Threshold_High)
		self.param["Dilate_Iterations"] = int(Dilate_Iterations)
		self.param["Shutter_Speed"] = int(float(Shutter_Speed) * 1000000)
		self.param["White_Balance"] = (float(White_Balance_Red),float(White_Balance_Blue))
		self.param["Flip_Image"] = Flip_Image
		self.param["Image_Rotation"] = Image_Rotation

		# pattern vals
		self.param["Pattern"] = Pattern

		# init calibrator for undistoring images
		self.calibrator = CameraCalibrator()

		logger.info('starting  camera...')
		self.startCamera()

	def __del__(self):
		self.stopCamera()
		logger.info("cleaned up CameraControl")

	def startCamera (self):
		self.camera = picamera.PiCamera()
		self.camera.framerate = 1
		self.camera.exposure_mode = 'off'
		self.camera.shutter_speed = self.param["Shutter_Speed"]
		self.camera.awb_mode = 'off'
		self.camera.awb_gains = self.param["White_Balance"]
		self.camera.ISO = 800
		self.camera.resolution = (1600, 1200)
		time.sleep(1) # warmup time

	def stopCamera (self):
		if self.camera != None:
			self.camera.close()
			self.camera = None

	def calibrate(self):
		logger.info("calibrating camera")
		logger.info("taking bg image")
		self.bgImage = self.captureImage()

		if (self.param["Pattern"] != False):
			self.patternImage = cv2.imread(self.param["Pattern"]["File"],cv2.CV_LOAD_IMAGE_GRAYSCALE);
			self.patternImage = cv2.resize(self.patternImage, (0,0), fx=RESIZE_FACTOR, fy=RESIZE_FACTOR) #resize image by half

		self.catMarkers = []
		for file in CAT_MARKERS:
			self.catMarkers.append(cv2.imread(file,cv2.CV_LOAD_IMAGE_GRAYSCALE))

		return

 	# step 1
	def captureSubmission (self,path):
		logger.info('capturing image')
		image = self.captureImage()
		return image;

	# step 2
	def extractSubmission (self,image):
		logger.debug("thresholding image")
		image = self.thresholdImage(image)

		logger.debug("undistort image")
		image = calibrator.undistortImage(image)

		logger.debug("extrct roi")
		image,found, minVal,cat = self.extractRoiAndMaskPattern(image)

		logger.debug("done, flip image")
		if (self.param["Flip_Image"]):
			image = cv2.flip(image,-1)
		return image,cat;

	# step 3
	def saveImage (self,image,path):
		logger.info("save Image")
		cv2.imwrite(path,image)


	def captureImage (self):
		logger.info('taking image...')
		stream = io.BytesIO()
		self.camera.capture(stream, format='jpeg')
		data = numpy.fromstring(stream.getvalue(), dtype=numpy.uint8)
		image = cv2.imdecode(data, 1)

		#rotate image
		if (self.param["Image_Rotation"] != 0):
			rows,cols,ch = image.shape
			rotMat = cv2.getRotationMatrix2D((cols/2,rows/2),self.param["Image_Rotation"],1)
			image = cv2.warpAffine(image,rotMat,(cols,rows))

		logger.info('image taken')
		return image

	def thresholdImage(self,image):

		bgImage = cv2.cvtColor(self.bgImage, cv2.COLOR_BGR2GRAY)
		
		# background substraction to equalite light
		image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		substractImage = cv2.scaleAdd(image,-1.0,bgImage)

		# apply threshold
		retval,threshImage = cv2.threshold(substractImage,self.param["Image_Threshold_Low"],0,cv2.THRESH_TOZERO)
		retval,threshImage = cv2.threshold(threshImage,self.param["Image_Threshold_High"],0,cv2.THRESH_TRUNC)
		kernel = numpy.ones((3,3),numpy.uint8)
		#threshImage = cv2.erode(threshImage,kernel,self.param['Dilate_Iterations'])
		#threshImage = cv2.dilate(threshImage,kernel,self.param['Dilate_Iterations'])

		# invert image
		threshImage = 255 - (threshImage * (255 / self.param["Image_Threshold_High"]))

		return threshImage

		# draw Rectangles is only for debugging
	def extractRoiAndMaskPattern(self,image,drawRectangles = False):

		small_image = cv2.resize(image, (0,0), fx=RESIZE_FACTOR, fy=RESIZE_FACTOR)

		if (self.param["Pattern"] == False):
			logger.info(" # no pattern defined!")
			return (small_image, False, -1)

		#match pattern image
		mat = cv2.matchTemplate(small_image,self.patternImage,cv2.TM_SQDIFF_NORMED);
		minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)
		
		if (minVal > self.param["Pattern"]["Match_Value"]):
			logger.info(" # pattern not found!")
			return (image, False, minVal, -1)

		# add scale factor
		minLoc = ((int)(minLoc[0] / RESIZE_FACTOR), (int)(minLoc[1] / RESIZE_FACTOR))
		#logger.debug("minLoc: "+str(minLoc[0])+":"+str(minLoc[1]))

		height, width = image.shape
		p1 = (max(0,minLoc[0] + self.param["Pattern"]["Offset"][0]),max(0,minLoc[1] + self.param["Pattern"]["Offset"][1]))
		p2 = (min(p1[0] + self.param["Pattern"]["Roi_Size"][0],width),min(p1[1] + self.param["Pattern"]["Roi_Size"][1],height))

		height_marker, width_marker = self.patternImage.shape

		# add scale factor
		height_marker = int(height_marker / RESIZE_FACTOR)
		width_marker = int(width_marker / RESIZE_FACTOR)

		# check for category Marker
		category = -1
		if (len(self.catMarkers) > 0):
			c1 = [minLoc[0] - width_marker*0.2, minLoc[1] + height_marker*0.9]
			c2 = [minLoc[0] + width_marker*1.2, minLoc[1] + height_marker*2]
			markerRegion = image[c1[1] : c2[1], c1[0] : c2[0]]
			category = findCategoryMarker(markerRegion,self.catMarkers)

		# mask pattern
		if (drawRectangles):
			cv2.rectangle(image, minLoc, (minLoc[0] + width_marker , minLoc[1] + height_marker), 0, 1)
			cv2.rectangle(image, p1, p2, 0, 1)
		else:
			cv2.rectangle(image, minLoc, (minLoc[0] + width_marker , minLoc[1] + height_marker), 255, -1)
			image = image[p1[1] : p2[1], p1[0] : p2[0]]

		return (image, True, minVal, category)
		

def findCategoryMarker(roi,markers):
	values = []
	for marker in markers:
		mat = cv2.matchTemplate(roi,marker,cv2.TM_SQDIFF_NORMED);
		minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)
		values.append(minVal)
		print(minVal)
	return values.index(min(values))

def getRoi (image,roi):
	return image[roi[1]:roi[3],roi[0]:roi[2]]

def createColorMask (rgbImage,lowerBound,upperBound):
	hsvImage =  cv2.cvtColor(rgbImage, cv2.COLOR_BGR2HSV)
	return cv2.inRange(hsvImage,lowerBound,upperBound)


