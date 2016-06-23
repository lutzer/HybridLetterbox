from random import randrange
import time
from datetime import datetime

def generateImageName(letterboxId):
	time = datetime.now()
	timestring = time.strftime('%Y-%m-%d_%H-%M-%S')
	return letterboxId+'_'+timestring+'_'+str(randrange(1000))