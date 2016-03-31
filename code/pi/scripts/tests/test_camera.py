# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-31 18:06:30

from ..camera.CameraControl import *

def cameraPreview():
	camera = CameraControl(automode=True)
	camera.startPreview(duration=5)

def cameraSaveImage():
	camera = CameraControl(automode=True)
	camera.captureImage()
	camera.cameraSaveImage()