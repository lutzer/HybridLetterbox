# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-21 11:06:17


from letterboxControl import LetterboxControl, MotorPosition
import logging

logger = logging.getLogger(__name__)

class LetterboxControlTest(LetterboxControl):

	""" 
	Test class for running the letterbox service on a test machine without 
	GPIO support 
	"""

	def init(self):
		self.reads = 0;
		logger.info("init lb control")

	def stop(self):
		logger.info("stoped lb control")

	def flashFeedbackLed(self,times=20,delay=0.25):
		logger.info("flash feedback led, times: "+str(times))

	def toggleFeedbackLed (self,on):
		logger.info("turn feedback led"+str(on))

	def toggleCameraLed(self,on):
		logger.info("turn camera led"+str(on))

	def checkPhotocell(self):
		self.reads += 1
		logger.info("check photocell")
		return self.reads % 10 == 0

	def setMotorPosition(self,pos):
		logger.info("set motor pos to"+str(pos))

	def calibrateMotor(self):
		logger.info("calibrate motor")

	def reset(self):
		logger.info("reset lb control")
