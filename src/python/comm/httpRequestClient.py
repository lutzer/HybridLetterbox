#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-01-26 17:02:11
# @Last Modified by:   lutzer
# @Last Modified time: 2016-04-27 11:04:47

import requests
import logging

logger = logging.getLogger(__name__)

class HttpRequestClient():

	def __init__(self,address):
		self.address = address

	# submits new submission to server
	def newSubmission(self,submission):
		logger.info("# sending new submission")
		prc = Process(target=sendSubmission, self.address, submission)
		prc.start()
		
def sendSubmission(address, submission):
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	request = requests.post(self.address, data=submission, headers=headers)

			