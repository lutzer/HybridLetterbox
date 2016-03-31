# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-30 17:41:12
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-31 11:19:45


# CV PARAMETERS
RESIZE_FACTOR = 0.5

class ImageExtractor:

	def __init__(self,image):
		self.image = image

	def saveImage(self,path):
		logger.info("save Image")
		cv2.imwrite(path,self.image)