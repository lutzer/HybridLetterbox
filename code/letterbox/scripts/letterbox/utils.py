from random import randrange

def generateImageName(time,letterboxId):
	#print(time);
	timestring = time.strftime('%Y-%m-%d_%H-%M-%S')
	return letterboxId+'_'+timestring+'_'+str(randrange(1000))