#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
# @Date:   2016-03-21 17:27:32
# @Last Modified by:   lutz
# @Last Modified time: 2016-03-29 17:53:43

# to make this script callable, first type chmod +x letterbox-setup.py in console 

import logging

# debug options
logging.basicConfig(level=logging.INFO)

def hello_command(name, print_counter=False, repeat=10):
    """Print nice greetings."""
    for i in range(repeat):
        if print_counter:
            print i+1,
        print 'Hello, %s!' % name

# def focus_command():
#     """Opens a camera window to focus the lens"""
#     from camera.CameraControl import CameraControl
#     camera = CameraControl()
#     del camera

def toggleLed_command(off=False,led='cam'):
    """Turns on camera led, led can be 'cam' or 'feedback'"""

    from hardware.LetterboxControl import LetterboxControl
    lbControl = LetterboxControl(cleanup=False)

    print "Turning "+ led + " led " + ("off" if off else "on")

    if (led == 'cam'):
        lbControl.toggleCameraLed(not off)
    elif (led == 'feedback'):
        lbControl.toggleFeedbackLed(not off)
    else:
        print "led can either be 'cam' or 'feedback'"

def photocell_command(times=100):
    """Gets a reading from the photocell"""

    from hardware.LetterboxControl import LetterboxControl

    try:

        lbControl = LetterboxControl(cleanup=False)
        for n in range(0,times):
            response = lbControl.checkPhotocell();
            if response:
                print response
            else:
                print "Timed out"

    except KeyboardInterrupt:
        print("interrupted")
    finally:
        del lbControl
        

if __name__ == '__main__':
    import scriptine
    scriptine.run()