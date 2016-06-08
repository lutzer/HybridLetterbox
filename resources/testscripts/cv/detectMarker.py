import numpy as np
import cv2

PATTERN_MIN_SIZE = 10*10;

class MarkerPattern:

	def __init__(self,pattern):
		pattern = np.array(pattern)
		size = pattern.shape
		self.innerPattern = pattern
		self.pattern = np.zeros((size[0]+2,size[1]+2),np.uint8)
		cv2.rectangle(self.pattern,(1,1),(size[0]+1,size[1]+1),color=0)
		self.pattern[1 : 1+size[0], 1: 1+size[1]] = pattern
		self.pattern[self.pattern > 0] = 255

MARKERS = [
	MarkerPattern([[1, 0],
		   		   [0, 0]]),
	MarkerPattern([[1, 1],
		   		   [0, 0]]),
	MarkerPattern([[1, 1],
		   		   [1, 0]]),
	MarkerPattern([[1, 1],
		   		   [1, 1]])
]

def showImage(img,wait = 0,resize=True):
	import cv2
	if resize:
		img = cv2.resize(img,(1024,768), interpolation= cv2.INTER_NEAREST)
	cv2.imshow('img',img)
	cv2.waitKey(wait)

def invertImage(img):
	return 255 - img

#read
img = cv2.imread("images/pattern-scan.jpg");
#showImage(img)

#threshold
greyImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
threshImage = cv2.adaptiveThreshold(greyImage,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,45,+4)

# apply truncate threshold, not binary image
#greyImage[threshImage == 255] = 255
#threshImage = greyImage

# erode small pixels
kernel = np.ones((3,3),np.uint8)
threshImage = cv2.erode(threshImage,kernel,3)
threshImage = cv2.dilate(threshImage,kernel,3)
#showImage(threshImage)

#find squares as possible marker regions
# find contours
invertedImage = invertImage(threshImage);
showImage(invertedImage)
contours, hierarchy = cv2.findContours(invertedImage, cv2.RETR_EXTERNAL , cv2.CHAIN_APPROX_SIMPLE);


# create contour mask
height, width = threshImage.shape
contourMask = np.zeros((height,width), np.uint8)

# add square contours to it
markerCandidates = []
contourImg = np.zeros((height,width), np.uint8)
for contour in contours:
	epsilon = 0.1*cv2.arcLength(contour,True)
	approx = cv2.approxPolyDP(contour,epsilon,True)
	if len(approx) == 4 and cv2.contourArea(approx) > PATTERN_MIN_SIZE:
		cv2.drawContours(contourImg , [approx], 0, 255, thickness=-1)
		markerCandidates.append(approx);

showImage(contourImg)


# match template on contours
results = []
for candidate in markerCandidates:
	x,y,w,h = cv2.boundingRect(candidate)
	roi = threshImage[y:y+h, x:x+w]
	for i,marker in enumerate(MARKERS):
		resizedPattern = cv2.resize(marker.pattern, (w,h), interpolation= cv2.INTER_NEAREST)
		#showImage(roi, resize= False)
		#showImage(resizedPattern, resize= False)
		mat = cv2.matchTemplate(roi,resizedPattern,cv2.TM_CCOEFF_NORMED)
		results.append({ 'marker': i, 'value' : mat[0,0] })

print results





#resize pattern for matching
# for scale in np.linspace(1.0, 20.0, 20):
# 	resizedPattern = cv2.resize(pattern, (0,0), fx=scale, fy=scale, interpolation= cv2.INTER_NEAREST)
# 	patternHeight,patternWidth = resizedPattern.shape

# 	# match pattern
# 	mat = cv2.matchTemplate(threshImage,resizedPattern,cv2.TM_SQDIFF_NORMED)
# 	minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(mat)

# 	print (minVal)
# 	# if minVal < threshold:
# 	# 	return minVal, minLoc, maxLoc

