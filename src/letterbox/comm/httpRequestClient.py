#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-01-26 17:02:11
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-17 09:35:42

import requests
import logging
import os.path
from multiprocessing import Process
from json import dumps as json_dumps

logger = logging.getLogger(__name__)

class HttpRequestClient():

	def __init__(self,address,uploadAddress):
		self.address = address
		self.uploadAddress = uploadAddress

	# submits new submission to server
	def postSubmission(self, submission, filepath):
		logger.info("# sending new submission")
		sendSubmission(self.address, self.uploadAddress, submission, filepath)
		#prc = Process(target=sendSubmission, args=[self.address, submission, filepath])
		#prc.start()
		
def sendSubmission(address, uploadAddress, submission, filepath):
	# send data
	try:
		headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
		res = requests.post(address, data=json_dumps(submission), headers=headers)
	except Exception as err:
		logger.error(err);
		return

	#upload file
	try:
		json = res.json()
		submissionId = json['_id']
	except Exception:
		logger.error('Could not get submissionId for uploading image file.')
		return
	try:
		#headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
		res = requests.post(uploadAddress + submissionId, files={ 'file' : ("image.jpg", open( filepath, 'rb'), "image/jpeg" ) })
	except Exception as err:
		logger.error(err);
		return
	print res.text
	
	# delete file
	if os.path.isfile(filepath):
		os.remove(filepath)


			