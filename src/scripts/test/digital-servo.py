# Servo Control
import RPi.GPIO as GPIO
import time

pin = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.OUT)

SERVO_MIN = 23
SERVO_MAX = 52


# pin, angle (From 0 to 1), duration (in s for pulse)
def setServo (pin, angle, duration = 1.0):
	angle = min(max(0,angle),1)
	# dutycicle 100% = 4000 us, 50% = 2000ms, 1% = 40 us 
	dutycycle = SERVO_MIN + angle * (SERVO_MAX - SERVO_MIN)
	p = GPIO.PWM(pin,250)
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
