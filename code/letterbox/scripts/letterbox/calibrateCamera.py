import picamera
import time
import RPi.GPIO as GPIO
import cv2
import io
import numpy as np
import logging
from configReader import ConfigReader
from cameraControl import CameraControl

# turn on led
ledPin = 22
GPIO.setmode(GPIO.BCM)
GPIO.setup(ledPin, GPIO.OUT)
GPIO.output(ledPin,GPIO.HIGH)

# Debug options
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Read config PARAMETERS
CONFIG_FILE = "/home/letterbox/scripts/letterbox/letterbox.ini"
config = ConfigReader(CONFIG_FILE)

# create pattern object
pattern = {
	"File" : config.get("Image","Pattern_File"),
	"Match_Value" : float(config.get("Image","Pattern_Match_Value")),
	"Offset" : (int(config.get("Image","Offset_X")), int(config.get("Image","Offset_Y"))),
	"Roi_Size" : (int(config.get("Image","Roi_Width")),int(config.get("Image","Roi_Height")))
}

# start camera
camera = CameraControl(
	config.get("Image","Threshold_Low"),
	config.get("Image","Threshold_High"),
	config.get("Camera","Shutter_Speed"),
	config.get("Camera","White_Balance_Red"),
	config.get("Camera","White_Balance_Blue"),
	float(config.get("Image","Image_Rotation")),
	pattern,
	config.get("Image","Dilate_Iterations")
)

#take bg picture
print("taking bg picture")
camera.calibrate()

print("done. put in postcard.")
time.sleep(5)

# take postcard image
print("taking  postcard image")
image = camera.captureImage()

# write image
cv2.imwrite("images/calibrateInput.jpg",image)

# thresholdImage
print("threshold image")
threshImage = camera.thresholdImage(image)

# write image
cv2.imwrite("images/calibrateThresholded.jpg",threshImage)

# extract roi and mask pattern
print("find pattern")
extractImage, found, val, cat = camera.extractRoiAndMaskPattern(threshImage,True)
if (found):
	print("found pattern with val:")
	print(val)
else:
	print("did not find pattern. val:")
	print(val)
print("/ category:")
print(cat)

# write image
print("writing images...")
cv2.imwrite("images/calibrateResult.jpg",extractImage)


#clean up
del camera
GPIO.cleanup()


# print("convert to grayscale...")
# bgImage = cv2.cvtColor(bgImage, cv2.COLOR_BGR2GRAY)
# image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# height, width = image.shape

# print("substract bg")
# substractImage = cv2.scaleAdd(image,-1.0,bgImage);

# print("threshold image")
# retval,threshImage = cv2.threshold(substractImage,IMAGE_THRESHOLD_LOW,255,cv2.THRESH_TOZERO)
# retval,threshImage = cv2.threshold(threshImage,IMAGE_THRESHOLD_HIGH,0,cv2.THRESH_TRUNC)
# threshImage = 255 - (threshImage * (255 / IMAGE_THRESHOLD_HIGH))

# print("erase small areas")
# kernel = np.ones((3,3),np.uint8)
# threshImage = cv2.dilate(threshImage,kernel,IMAGE_DILATE_ITERATIONS)
# threshImage = cv2.erode(threshImage,kernel,IMAGE_DILATE_ITERATIONS)

# print("saving image")
# cv2.imwrite("images/calibrateImage.jpg",threshImage)

# print("find marker")
# marker = cv2.imread("images/pattern.jpg",cv2.CV_LOAD_IMAGE_GRAYSCALE);
# height_marker, width_marker = marker.shape

# mat = cv2.matchTemplate(threshImage,marker,cv2.TM_SQDIFF_NORMED);
# minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)
# if (minVal < 0.1):
# 	print("# pattern found!")
# else:
# 	print(" # pattern not found!")

# print("loc:")
# print(minLoc)	
# print("val:")
# print(minVal)

# print("show pattern region")
# cv2.rectangle(threshImage, minLoc, (minLoc[0] + width_marker , minLoc[1] + height_marker), 0, 1)
# #mask = np.ones((height,width),np.uint8)
# #cv2.rectangle(mask, minLoc, (minLoc[0] + width_marker , minLoc[1] + height_marker), 0, -1)

# offset_x = int(config.get("Image","Offset_X"))
# offset_y = int(config.get("Image","Offset_Y"))
# roi_width = int(config.get("Image","Roi_Width"))
# roi_height = int(config.get("Image","Roi_Height"))

# print("extract roi")
# p1 = (max(0,minLoc[0] + offset_x),max(0,minLoc[1] + offset_y))
# p2 = (min(p1[0] + roi_width,width),min(p1[1] + roi_height,height))

# print("paint extract rectangle")
# cv2.rectangle(threshImage, p1, p2, 0, 1)
# #extractedImage = threshImage[p1[1] : p2[1], p1[0] : p2[0]]
# #cv2.rectangle(threshImage, p1, p2, 0, 1)
# #threshImage = cv2.bitwise_and(threshImage,threshImage, mask = mask)

# print("saving calibration image")
# result = threshImage
# cv2.imwrite("images/calibrateResult.jpg",result)

# # result = cv2.resize(result,(800,600))
# # cv2.imshow('image',result)
# # cv2.waitKey(0)
# # cv2.destroyAllWindows()

# #cleanup
# print("cleanup camera and GPIO")
# camera.close()
# GPIO.cleanup()


