import ConfigParser

class ConfigReader:

	def __init__(self,file):

		self.parser = ConfigParser.SafeConfigParser(
			defaults = {
				"id" : "letterbox",
				"author" : "Letterbox",
				"api" : "http://127.0.0.1/api",

				"marker_threshold" : 0.3,

				"text0" : "cat0",
				"tag0" : "",
				"twitter0" : "",

				"text1" : "cat1",
				"tag1" : "",
				"twitter1" : "",

				"text2" : "cat2",
				"tag2" : "",
				"twitter2" : "",
				
				"text3" : "cat3",
				"tag3" : "",
				"twitter3" : "",

				"tweet_submissions" : False
			})

		self.parser.read(file)

	def get(self,section,name):
		return self.parser.get(section,name)

	def getboolean(self,section,name):
		return self.parser.getboolean(section,name)