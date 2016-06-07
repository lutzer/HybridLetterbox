import ConfigParser

class ConfigReader:

	def __init__(self,file):

		self.parser = ConfigParser.SafeConfigParser(
			defaults = {
				"id" : "letterbox",
				"author" : "Letterbox",
				"api" : "http://127.0.0.1/api",
			})

		self.parser.read(file)

	def get(self,section,name):
		return self.parser.get(section,name)