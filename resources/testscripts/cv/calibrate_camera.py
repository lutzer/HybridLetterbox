import numpy as np
import cv2
import glob
import json

# constants
CHESSBOARD_ROWS = 8
CHESSBOARD_COLUMNS = 11
IMAGE_FOLDER = "images"
TEST_IMAGE = "test.jpg"
CALIBRATION_MATRIX_FILE = "calibration_matrix.json"
CALIBRATION_RESULT_IMAGE = "calibration_result.jpg"

def showImage(img,wait = 0):
    res_img = cv2.resize(img,(1024,768))
    cv2.imshow('img',res_img)
    cv2.waitKey(wait)

def saveDistortionMatrix(filepath, matrix, dist_coeff):
    data = {
        "camera_matrix" : matrix, 
        "dist_coeff" : dist_coeff
    }
    print data
    with open(filepath, "w") as file:
       json.dump(data, file)

# termination criteria
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

# prepare object points, like (0,0,0), (1,0,0), (2,0,0) ....,(6,5,0)
objp = np.zeros((CHESSBOARD_COLUMNS*CHESSBOARD_ROWS,3), np.float32)
objp[:,:2] = np.mgrid[0:CHESSBOARD_ROWS,0:CHESSBOARD_COLUMNS].T.reshape(-1,2)

# Arrays to store object points and image points from all the images.
objpoints = [] # 3d point in real world space
imgpoints = [] # 2d points in image plane.

images = glob.glob(IMAGE_FOLDER+"/*.jpg")
print "using images: " + str(images)

for fname in images:
    img = cv2.imread(fname)
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    # Find the chess board corners
    ret, corners = cv2.findChessboardCorners(gray, (CHESSBOARD_ROWS, CHESSBOARD_COLUMNS))

    #print corners;

    # If found, add object points, image points (after refining them)
    if ret == True:
        print "found chessboard in "+fname;
        objpoints.append(objp)

        cv2.cornerSubPix(gray,corners,(11,11),(-1,-1),criteria)
        imgpoints.append(corners)

        # Draw and display the corners
        cv2.drawChessboardCorners(img, (CHESSBOARD_ROWS,CHESSBOARD_COLUMNS), corners,ret)
        #showImage(img,500)

cv2.destroyAllWindows()

# create calibration matrix
print "creating calibration matrix";
ret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(objpoints, imgpoints, gray.shape[::-1],None,None)

# if successfull save calibration values
if (ret):
    saveDistortionMatrix(CALIBRATION_MATRIX_FILE,mtx.tolist(),dist.tolist())
    print "calibration succesfull."
else:
    print "calibration failed."

# test on new images
img = cv2.imread(TEST_IMAGE)
h,  w = img.shape[:2]
newcameramtx, roi = cv2.getOptimalNewCameraMatrix(mtx,dist,(w,h),1)

print "undistoring test image";
# undistort
dst = cv2.undistort(img, mtx, dist, None)

showImage(dst)
cv2.imwrite(CALIBRATION_RESULT_IMAGE,dst)