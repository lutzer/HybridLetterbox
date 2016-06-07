#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-01-26 17:02:11
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-07 11:19:19

import requests
import logging
import os.path

logger = logging.getLogger(__name__)

class HttpRequestClient():

	def __init__(self,address):
		self.address = address

	# submits new submission to server
	def postSubmission(self, submission, filepath):
		logger.info("# sending new submission")
		prc = Process(target=sendSubmission, args=(self.address, submission, filepath))
		prc.start()
		
def sendSubmission(address, submission, filepath):
	# upload data
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	try:
		request = requests.post(self.address, data=submission, headers=headers)
	except Exception as err:
		logger.error(err);
		return

	#upload file
	json = res.json()
	try:
		submissionId = json['_id']
		uploadUrl = json['uploadUrl']
	except Exception:
		logger.error('Could not get submissionId for uploading image file.')
		return

	try:
		res = requests.post(uploadUrl, files={ 'file' : open( filepath, 'rb') }, headers=headers)
	except Exception as err:
		logger.error(err);
		return

	
	# delete file
	if os.path.isfile(filepath):
		os.remove(filepath)


			