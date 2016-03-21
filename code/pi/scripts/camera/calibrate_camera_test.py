import numpy as np
import cv2
import json

TEST_IMAGE = "test.jpg"
CALIBRATION_MATRIX_FILE ="calibration_matrix.json"

def loadCalibrationData(filepath):
    with open(filepath) as file:    
        data = json.load(file)
    return data;


def undistortImage(filename,camera_matrix,dist_coeff):

    img = cv2.imread(TEST_IMAGE)
    h,  w = img.shape[:2]
    img = cv2.undistort(img, camera_matrix, dist_coeff, None)
    return img

def showImage(img,wait = 0):
    res_img = cv2.resize(img,(1024,768))
    cv2.imshow('img',res_img)
    cv2.waitKey(wait)

# load calibration data from file
print "load matrix"
data = loadCalibrationData(CALIBRATION_MATRIX_FILE)

# undistort test image
print "undistort image"
img = undistortImage(TEST_IMAGE, np.asarray(data['camera_matrix']), np.asarray(data['dist_coeff']))
showImage(img)