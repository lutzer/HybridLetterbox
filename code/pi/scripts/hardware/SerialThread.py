# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-29 16:36:22
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-30 15:49:23

from __future__ import with_statement
from serial import Serial
import time
from threading import Thread,Lock
import logging

SERIAL_MESSAGE_TERMINATOR = '\n'
DELAY_BETWEEN_READINGS = 0.005 # 5 miliseconds
RESPONSE_TIMEOUT = 5.0 # 1 second

logger = logging.getLogger(__name__)

class SerialThread(Thread):

	def __init__(self,address,baudrate):
		self.serial = Serial(address, baudrate=baudrate)

		self.queueLock = Lock()
		self.messageQueue = []

		self.sendLock = Lock()

		self.running = True
		Thread.__init__(self)

	def run(self):
		logger.info("startet SerialThread")
		while (self.running):
			if (self.serial.in_waiting > 0):
				self.onMessageReceived()
			time.sleep(DELAY_BETWEEN_READINGS)

		self.serial.close()
		logger.info("stopped Serial Thread")

	def stop(self):
		self.running = False

	def onMessageReceived(self):

		# add submission to queue
		while (self.serial.in_waiting > 0):
			line = self.serial.readline().replace("\n", "") # remove newline char
			logger.debug("received new message: "+line)
			with self.queueLock:
				self.messageQueue.append(line)

	# returns copy of queue and clears it
	def getMessages(self):
		if len(self.messageQueue) < 1:
			return False

		with self.queueLock:
			messages = list(self.messageQueue)
			self.messageQueue[:] = [] #clear queue
			return messages

	def clear(self):
		self.sendMessage('flush')
		time.sleep(RESPONSE_TIMEOUT)
		with self.queueLock:
			self.messageQueue[:] = [] #clear queue
		logger.info("cleared message queue")


	def popMessage(self):
		if len(self.messageQueue) < 1:
			return False

		with self.queueLock:
			return self.messageQueue.pop(); 

	# waits for a number of seconds for the first serial response
	def waitForResponse(self,text=False,timeout = RESPONSE_TIMEOUT):
		startTime = time.time()

		while (time.time() < startTime + timeout):
			message = self.popMessage()
			if message != False:
				if (text == False or message == text):
					return message
			time.sleep(DELAY_BETWEEN_READINGS)

		return False

	def sendMessage(self,message):
		logger.debug("sending message: "+message)
		with self.sendLock:
			self.serial.write(message+SERIAL_MESSAGE_TERMINATOR)
