import RPi.GPIO as GPIO
import time
import logging

logger = logging.getLogger(__name__)

RC_TIMEOUT = 3000 # max cycles for photoresistor read
SERVO_DIRECTION = True # true = clockwise, false = counterclockwise

# Class Controls the Hardware of the Letterbox
class LbControl:
	def __init__(self,pinLed,pinServo,pinPhotoresistor,PRThreshold = 0.5):
		self.pinLed = pinLed
		self.pinServo = pinServo
		self.pinPhotoresistor = pinPhotoresistor
		self.PRThreshold = PRThreshold

        # init pins
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(pinLed, GPIO.OUT)
		GPIO.setup(pinServo, GPIO.OUT)
		GPIO.setup(pinPhotoresistor, GPIO.OUT)

		self.ledState = False

	def __del__(self):
		self.toggleLed(False)
		GPIO.cleanup()
		logger.info("cleaned up LbControl")

	def calibrate(self):
		logger.info("calibrating lbcontrol")
		self.toggleLed(True)
		self.setServoOpen(True)
		time.sleep(1)
		self.setServoOpen(False)
		if self.checkLightBarrier() == True:
			raise Exception("Photoresistor cant getting any readings. Maybe it is unplugged or blocked.")
		return

	def setPhotoResistorThreshold (self,val):
		self.PRThreshold = val

    #################### 
	# CONTROL HARDWARE FUNCTIONS #
	####################

	def setServoOpen (self,open):
		if (SERVO_DIRECTION):
			open = not open;
		if open:
			setServo(self.pinServo,0)
		else:
			setServo(self.pinServo,1)

	def flashLed (self,times):
		preLedState = self.ledState
		for x in range(0,times):
			self.toggleLed(True)
			time.sleep(0.5)
			self.toggleLed(False)
			time.sleep(0.5)
		if (preLedState): # reset led state
			self.toggleLed(True);

	def toggleLed (self,on):
		if (on == self.ledState):
			return
		if (on):
			GPIO.output(self.pinLed, GPIO.HIGH)
			self.ledState = True	
		else:
			GPIO.output(self.pinLed, GPIO.LOW)
			self.ledState = False	

	def checkLightBarrier(self):

		# turn on led
		if not(self.ledState):
			self.toggleLed(True);
			time.sleep(0.1)

		val = readRCPin(self.pinPhotoresistor,RC_TIMEOUT)
		logger.debug('PR Reading:'+str(val))
		if (val > self.PRThreshold):
			return True
		return False

################################
# LOW LEVEL HARDWARE FUNCTIONS #
################################

# pin, angle (From 0 to 1), duration (in s for pulse)
def setServo (pin, angle, duration = 0.7):
	angle = min(max(0,angle),1)
	dutycycle = 4 + angle * (19 - 4) 
	p = GPIO.PWM(pin,85)
	p.start(dutycycle)
	time.sleep(duration)
	p.stop();


def readRCPin (RCpin, maxCycles):
    reading = 0
    GPIO.setup(RCpin, GPIO.OUT)
    GPIO.output(RCpin, GPIO.LOW)
    time.sleep(0.1)
    GPIO.setup(RCpin, GPIO.IN)
    while ((GPIO.input(RCpin) == GPIO.LOW) and (reading < maxCycles)):
           reading += 1
    return reading * 1.0 / maxCycles
