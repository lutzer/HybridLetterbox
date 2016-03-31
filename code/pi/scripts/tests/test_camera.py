# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-31 15:55:35
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-31 15:59:15

from ..camera.CameraControl import *

def cameraPreview():
	camera = CameraControl()
	camera.startPreview()