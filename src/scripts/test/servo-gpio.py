# Servo Control
import RPi.GPIO as GPIO
import time

pin = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.OUT)


# pin, angle (From 0 to 1), duration (in s for pulse)
def setServo (pin, angle, duration = 0.7):
	angle = min(max(0,angle),1)
	dutycycle = 5 + angle * (23 - 5) 
	p = GPIO.PWM(pin,85)
	p.start(dutycycle)
	time.sleep(duration)
	p.stop();

while True:
		print("angle 0 : open")
		setServo(18, 0)
		print("stop")
		time.sleep(2)
		
		print("angle 90 : closed")
		setServo(18, 1)
		print("stop")
		time.sleep(2)

		#print("angle 180")
		#setServo(18, 1.0)
		#print("stop")
		#time.sleep(1)
