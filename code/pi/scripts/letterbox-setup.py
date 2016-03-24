# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutzer
# @Last Modified time: 2016-03-24 17:09:02

def hello_command(name, print_counter=False, repeat=10):
    """Print nice greetings."""
    for i in range(repeat):
        if print_counter:
            print i+1,
        print 'Hello, %s!' % name

def focus_command():
    """Opens a camera window to focus the lens"""
    from camera import CameraControl
    camera = CameraControl()
    del camera

def led_command(on=True,led='cam'):
	"""Turns on camera led, led can be 'cam' or 'feedback'"""
	from hardware import LetterboxControl
	lbControl = LetterboxControl()
	if (led == 'cam'):
		lbControl.toggleCameraLed(on)
	elif (led == 'feedback'):
		lbControl.toggleFeedbackLed(on)
	del lbControl


if __name__ == '__main__':
    import scriptine
    scriptine.run()