# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-30 17:41:12
# @Last Modified by:   lutz
# @Last Modified time: 2016-06-22 11:56:55

import cv2
import numpy as np

INNER_PATTERNS = [
	[[0, 1],
	 [1, 1]],

	[[1, 0],
	 [1, 1]],

	[[1, 1],
	 [1, 0]],

	[[1, 1],
	 [0, 1]]
]

OUTER_PATTERN = [
	[0 , 0 , 0 , 0 , 0],
	[0 , 1 , 1 , 1 , 0],
	[0 , 1 , 1 , 0 , 0],
	[0 , 1 , 0 , 1 , 0],
	[0 , 0 , 0 , 0 , 0]
]

class PostcardMarker:

	def __init__(self,id):
		self.id = id
		self.innerPattern = np.array(INNER_PATTERNS[id])
		self.pattern = np.array(OUTER_PATTERN, dtype = np.uint8)

		# put in inner pattern
		self.pattern[1:3, 1:3] = self.innerPattern

		# put in parity bit
		if id == 1:
			self.pattern[1,3] = 1
		elif id == 2:
			self.pattern[3,1] = 1
		elif id == 3:
			self.pattern[1,3] = 1
			self.pattern[3,1] = 1

		self.pattern[self.pattern > 0] = 255