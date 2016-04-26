# Test Camera
import picamera
import time
import RPi.GPIO as GPIO

# turn on led
ledPin = 22
GPIO.setmode(GPIO.BCM)
GPIO.setup(ledPin, GPIO.OUT)
GPIO.output(ledPin,GPIO.HIGH)

camera = picamera.PiCamera()

# apply settings
#camera.exposure_mode = 'off'
#camera.framerate = 1
#camera.shutter_speed = 1000000 / 10 # microseconds
camera.awb_mode = 'off'
camera.awb_gains = (0.95,1.5)
#camera.ISO = 800
#camera.resolution = (2500, 1900)
camera.resolution = (1296, 972)
#camera.crop = (0.0, 0.0, 1.0, 1.0)

try:
	print("# running auto exposure...")
	camera.start_preview()
	#print(camera.awb_gains)
	#time.sleep(2)
	#camera.close()
	#time.sleep(2)
	#print(camera.awb_gains)
	#print("# running manual exposure..")
	#camera = picamera.PiCamera()
	#setSettings()
	#camera.start_preview()
	while True:
		time.sleep(1)
		#print(camera._get_settings())
except KeyboardInterrupt:
	print("# stoping")
	camera.stop_preview()
finally:
	print("# cleanup")
	camera.close()
	GPIO.output(ledPin,GPIO.LOW)
	GPIO.cleanup()


