import picamera
import time
import RPi.GPIO as GPIO
import cv2
import io
import numpy as np

# turn on led
ledPin = 22
GPIO.setmode(GPIO.BCM)
GPIO.setup(ledPin, GPIO.OUT)
GPIO.output(ledPin,GPIO.HIGH)

# PARAMETERS
IMAGE_THRESHOLD_LOW = 10
IMAGE_THRESHOLD_HIGH = 50
IMAGE_DILATE_ITERATIONS = 3

# CAMERA PARAMETERS
CAMERA_SHUTTER_SPEED = 1000000 / 2 # microseconds
CAMERA_WHITE_BALANCE = (0.7,1.7)

# start camera
camera = picamera.PiCamera()

# apply camera settings
camera.framerate = 1
camera.exposure_mode = 'off'
camera.shutter_speed = CAMERA_SHUTTER_SPEED
camera.awb_mode = 'off'
camera.awb_gains = CAMERA_WHITE_BALANCE
camera.ISO = 800
#self.camera.resolution = (1296,972)
camera.resolution = (1600,1200)
time.sleep(1) # warmup time

def captureImage ():
	global camera
	print('taking image...')
	stream = io.BytesIO()
	camera.capture(stream, format='jpeg')
	data = np.fromstring(stream.getvalue(), dtype=np.uint8)
	image = cv2.imdecode(data, 1)
	print('image taken')
	return image

#take bg picture
print("taking bg picture")
bgImage = captureImage()
print("done. put in postcard.")
time.sleep(5)

# take postcard image
print("taking  postcard image")
image = captureImage()

print("convert to grayscale...")
bgImage = cv2.cvtColor(bgImage, cv2.COLOR_BGR2GRAY)
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

height, width = image.shape

print("substract bg")
substractImage = cv2.scaleAdd(image,-1.0,bgImage);

print("threshold image")
retval,threshImage = cv2.threshold(substractImage,IMAGE_THRESHOLD_LOW,255,cv2.THRESH_TOZERO)
retval,threshImage = cv2.threshold(threshImage,IMAGE_THRESHOLD_HIGH,0,cv2.THRESH_TRUNC)
threshImage = 255 - (threshImage * (255 / IMAGE_THRESHOLD_HIGH))

print("erase small areas")
kernel = np.ones((3,3),np.uint8)
threshImage = cv2.dilate(threshImage,kernel,IMAGE_DILATE_ITERATIONS)
threshImage = cv2.erode(threshImage,kernel,IMAGE_DILATE_ITERATIONS)

print("saving image")
cv2.imwrite("calibrateImage.jpg",threshImage)

print("find marker")
marker = cv2.imread("images/pattern.jpg",cv2.CV_LOAD_IMAGE_GRAYSCALE);
height_marker, width_marker = marker.shape

mat = cv2.matchTemplate(threshImage,marker,cv2.TM_SQDIFF_NORMED);
minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)
if (minVal < 0.1):
	print("# pattern found!")
else:
	print(" # pattern not found!")

print("loc:")
print(minLoc)	
print("val:")
print(minVal)

print("show pattern region")
cv2.rectangle(threshImage, minLoc, (minLoc[0] + width_marker , minLoc[1] + height_marker), 0, 1)
#mask = np.ones((height,width),np.uint8)
#cv2.rectangle(mask, minLoc, (minLoc[0] + width_marker , minLoc[1] + height_marker), 0, -1)

print("extract roi")
p1 = (max(0,minLoc[0] - 550),max(0,minLoc[1] - 40))
p2 = (min(p1[0] + 1450,width),min(p1[1] + 870,height))

print("paint extract rectangle")
cv2.rectangle(threshImage, p1, p2, 0, 1)
#extractedImage = threshImage[p1[1] : p2[1], p1[0] : p2[0]]
#cv2.rectangle(threshImage, p1, p2, 0, 1)
#threshImage = cv2.bitwise_and(threshImage,threshImage, mask = mask)

print("saving calibration image")
result = threshImage
cv2.imwrite("calibrateResult.jpg",result)

# result = cv2.resize(result,(800,600))
# cv2.imshow('image',result)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

#cleanup
print("cleanup camera and GPIO")
camera.close()
GPIO.cleanup()


