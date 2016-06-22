# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-06-22 15:40:58

from enum import Enum

class MotorPosition(Enum):
	START = 0
	TURN = 1
	EJECT = 2

# Class Controls the Hardware of the Letterbox
class LetterboxControl:

	def __init__(self,cleanup=True):

		self.cleanup = cleanup
		self.init();

	def __del__(self):
		if (self.cleanup):
			self.stop()


    #################### 
	# CONTROL HARDWARE FUNCTIONS #
	####################
	
	def init(self):
		raise NotImplementedError('method not implemented')

	def stop(self):
		raise NotImplementedError('method not implemented')

	def flashFeedbackLed(self,times=20,delay=0.25):
		raise NotImplementedError('method not implemented')

	def toggleFeedbackLed (self,on):
		raise NotImplementedError('method not implemented')

	def toggleCameraLed(self,on):
		raise NotImplementedError('method not implemented')

	def checkPhotocell(self):
		raise NotImplementedError('method not implemented')

	def ejectCard(self):
		raise NotImplementedError('method not implemented')

	def setMotorPosition(self,pos):
		raise NotImplementedError('method not implemented')

	def calibrateMotor(self):
		raise NotImplementedError('method not implemented')

	def reset(self):
		raise NotImplementedError('method not implemented')
