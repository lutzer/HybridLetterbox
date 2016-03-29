# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-29 16:36:22
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-29 17:53:26

from __future__ import with_statement
from serial import Serial
import time
from threading import Thread,Lock
import logging

SERIAL_MESSAGE_TERMINATOR = '\n'
DELAY_BETWEEN_READINGS = 0.005 

logger = logging.getLogger(__name__)

class SerialThread(Thread):

	def __init__(self,address,baudrate):
		self.serial = Serial(address, baudrate=baudrate)

		self.lock = Lock()
		self.messageQueue = []

		self.running = True
		Thread.__init__(self)

	def run(self):
		logger.info("startet SerialThread")
		while (self.running):
			if (self.serial.in_waiting > 0):
				self.onMessageReceived(self.serial.readline())
			time.sleep(DELAY_BETWEEN_READINGS)

		self.serial.close()
		logger.info("stopped Serial Thread")

	def stop(self):
		self.running = False

	def onMessageReceived(self,message):
		logger.debug("received new message: "+message)

		# add submission to queue
		with self.lock:
			self.messageQueue.append(message)

	# returns copy of queue and clears it
	def getQueue(self):
		if len(self.messageQueue) < 1:
			return False

		with self.lock:
			messages = list(self.messageQueue)
			self.messageQueue[:] = [] #clear queue
			return messages

	# waits for a number of seconds for the first serial response
	def waitForResponse(self,timeout = 1.0):
		startTime = time.clock()

		while (time.clock() < startTime + timeout):
			queue = self.getQueue()
			if queue != False:
				return queue;
			time.sleep(DELAY_BETWEEN_READINGS)

		# timed out
		return False

	def sendMessage(self,message):
		self.serial.write(message+SERIAL_MESSAGE_TERMINATOR)
