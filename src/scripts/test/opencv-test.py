import cv2

image = cv2.imread("test.png");
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imwrite("result.png",image)
