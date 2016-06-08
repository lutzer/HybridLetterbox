import requests
from json import dumps as json_dumps

def postImage():

	baseUrl = "http://nbp.xima-services.de/api/rest/v1"
	mandant = "/stadt-brandis"
	beteiligung = '1000180'
	gegenstand = '1002700'
	auth = requests.auth.HTTPBasicAuth("brandis-letterbox","ev*RE808")
	filename = "test123.jpg"
	headers = {}

	#authenticate
	res = requests.get(baseUrl + mandant + "/auth/login", auth=auth)
	json = res.json()

	try:
		token = json['token']
	except Exception:
		print "Could not get token."
		return

	#create submission
	data = { 
		'betreff' : 'briefkastentest', 
		'inhalt' : 'nt', 
		'inhaltAnzeigen' : False
	}
	headers = {
		'Authorization': token, 
		'Content-Type': 'application/json'
	}
	res = requests.post( 
		baseUrl + mandant + "/beteiligung/" + beteiligung + "/gegenstand/" + gegenstand + "/beitrag",
		json = data,
		headers = headers
	);
	json = res.json()

	try:
		uploadUrl = json['_links']['upload']['href']
	except Exception:
		print json
		print "Couln not get upload url."
		return
	
	#add picture
	headers = { 
		'Authorization': token,
		'X-File-Name' : filename.encode('ascii') 
	}
	res = requests.post(uploadUrl, files={ 'file' : open( filename, 'rb') }, headers=headers)

	# print result
	print res

postImage()