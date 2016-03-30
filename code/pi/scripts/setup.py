#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-30 14:58:07

# to make this script callable, first type chmod +x letterbox-setup.py in console 

import logging

# debug options
logging.basicConfig(level=logging.INFO)

lbControl = False

# def camera_command(focus=True):
#     """Opens a camera window to focus the lens"""
#     from camera.CameraControl import CameraControl
#     camera = CameraControl()
#     del camera

def led_command(off=False,name='cam'):
	"""Turns on camera led, led name can be 'cam' or 'feedback'"""

	global lbControl

	from hardware.LetterboxControl import LetterboxControl
	lbControl = LetterboxControl(cleanup=False)

	print "Turning "+ name + " led " + ("off" if off else "on")

	if (name == 'cam'):
		lbControl.toggleCameraLed(not off)
	elif (name == 'feedback'):
		lbControl.toggleFeedbackLed(not off)
	else:
		print "led can either be 'cam' or 'feedback'"

def photocell_command(repeat=1):
	"""Gets a reading from the photocell"""
	#global lbControl

	from hardware.LetterboxControl import LetterboxControl

	lbControl = LetterboxControl(cleanup=False)

	for n in range(0,repeat):
		response = lbControl.checkPhotocell();
		if response:
			print response
		else:
			print "Timed out"

if __name__ == '__main__':
	import scriptine

	try:
		scriptine.run()
	except KeyboardInterrupt:
	    print("interrupted")
	finally:
		if (lbControl != False):
			del lbControl
        