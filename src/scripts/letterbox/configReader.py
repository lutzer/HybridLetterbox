import ConfigParser

class ConfigReader:

	def __init__(self,file):

		self.parser = ConfigParser.SafeConfigParser(
			defaults = {
				"Letterbox_Id" : "box1",
				"Post_Url_Box" : "http://127.0.0.1/api/submissions/",
				"Post_Url_Web" : False,
				"Image_Save_Folder" : "/home/letterbox/http/data/submissions",
				"Photoresistor_Threshold" : 0.3,
				"Threshold_Low" : 10,
				"Threshold_High" : 50,
				"Dilate_Iterations" : 1,
				"Offset_X" : -550,
				"Offset_Y" : -40,
				"Roi_Width" : 1440,
				"Roi_Height" : 870,
				"Image_Rotation" : 0,
				"Pattern_File" : "/home/letterbox/scripts/letterbox/images/pattern.jpg",
				"Pattern_Match_Value" : 0.15,
				"Shutter_Speed" : 0.5,
				"White_Balance_Red" : 0.7,
				"White_Balance_Blue" : 1.7,
				"Flip_Image" : True

			})

		self.parser.read(file)

	def get(self,section,name):
		return self.parser.get(section,name)
