# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-30 17:41:12
# @Last Modified by:   lutz
# @Last Modified time: 2016-04-04 10:43:14

import cv2
import numpy as np
import logging

# CV PARAMETERS
RESIZE_FACTOR = 0.5

logger = logging.getLogger(__name__)

class CardScanner:

	def __init__(self,image):
		self.image = image

	def saveImage(self,path):
		logger.info("save Image")
		cv2.imwrite(path,self.image)