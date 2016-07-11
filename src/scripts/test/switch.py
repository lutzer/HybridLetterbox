import RPi.GPIO as GPIO
import time
import os

switchPin = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(switchPin, GPIO.IN)


def buttonPress(channel):
	print("Shutdown Button pressed.")
	os.system("sudo /sbin/shutdown -h now")
	sys_exit(0)


GPIO.add_event_detect(switchPin, GPIO.RISING, callback=buttonPress, bouncetime=1000)

try:
	while True:
		time.sleep(10)
		print("listening...")
finally:
	print("Shutdown Switch listener stopped.")
	GPIO.cleanup()