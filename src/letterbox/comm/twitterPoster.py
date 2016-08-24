import tweepy
from subprocess import call
from multiprocessing import Process
import logging

logger = logging.getLogger(__name__)

class TwitterPoster:

	def __init__(self,consumer_key,consumer_secret,access_token,access_token_secret):

		# setup authentication
		self.auth = tweepy.OAuthHandler(consumer_key, consumer_secret);
		self.auth.set_access_token(access_token, access_token_secret)

	def tweet(self,photo_path,status):
		tweetThread(self.auth,photo_path,status)
		#prc = Process(target=tweetThread, args=[self.auth,photo_path,status])
		#prc.start()
	
def tweetThread(auth,photo_path,status):
	logger.info("process: sending file to twitter...")
	api = tweepy.API(auth)
	api.update_with_media(photo_path, status=status)
	logger.info("process: file sent to twitter.")

def finishedTweetThread(args):
	logger.info("file sent to twitter")