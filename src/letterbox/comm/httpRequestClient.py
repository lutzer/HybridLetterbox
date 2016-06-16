#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-01-26 17:02:11
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-16 19:57:04

import requests
import logging
import os.path
from multiprocessing import Process

logger = logging.getLogger(__name__)

class HttpRequestClient():

	def __init__(self,address):
		self.address = address

	# submits new submission to server
	def postSubmission(self, submission, filepath):
		logger.info("# sending new submission")
		sendSubmission(self.address, submission, filepath)
		#prc = Process(target=sendSubmission, args=[self.address, submission, filepath])
		#prc.start()
		
def sendSubmission(address, submission, filepath):
	# send data
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	try:
	 	request = requests.post(address, data=submission, headers=headers)
	except Exception as err:
	 	print(err)
	 	return
	print ("# submission data sent")

	# #upload file
	# json = res.json()
	# try:
	# 	submissionId = json['_id']
	# 	uploadUrl = json['uploadUrl']
	# except Exception:
	# 	logger.error('Could not get submissionId for uploading image file.')
	# 	return
	# try:
	# 	res = requests.post(uploadUrl, files={ 'file' : open( filepath, 'rb') }, headers=headers)
	# except Exception as err:
	# 	logger.error(err);
	# 	return
	# print("# submission data sent")
	
	# # delete file
	# if os.path.isfile(filepath):
	# 	os.remove(filepath)


			