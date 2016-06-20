#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-01-26 17:02:11
# @Last Modified by:   lutzer
# @Last Modified time: 2016-06-17 11:42:05

import requests
import logging
import os.path
from threading import Thread
from json import dumps as json_dumps

logger = logging.getLogger(__name__)

POST_SUBMISSIONS_ROUTE = "/submissions/"
POST_FILE_ROUTE = "/file/attach/"

class HttpRequestClient():

	def __init__(self,address):
		self.address = address

	# submits new submission to server
	def postSubmission(self, submission, filepath, filename):
		thread = Thread(target=sendSubmission, args=(self.address, submission, filepath, filename))
		thread.start()
		
def sendSubmission(address, submission, filepath, filename):

	logger.info("# sending new submission")

	# send data
	try:
		headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
		res = requests.post(address + POST_SUBMISSIONS_ROUTE, data=json_dumps(submission), headers=headers)
	except Exception as err:
		logger.error(err)
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
		res = requests.post(address + POST_FILE_ROUTE + submissionId, files={ 'file' : (filename, open( filepath, 'rb'), "image/jpeg" ) })
	except Exception as err:
		logger.error(err)
		return

	logger.info("# submission uploaded")
	
	# delete file
	if os.path.isfile(filepath):
		os.remove(filepath)


			