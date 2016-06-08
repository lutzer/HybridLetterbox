#!/usr/bin/env python

import json
import requests

base_url = 'http://nbp.xima-services.de/api/rest/v1'
username = 'brandis-letterbox'
password = 'ev*RE808'
mandant = 'stadt-brandis'
beteiligung = '1000180'
gegenstand = '1002700'

# login
resp = requests.get(
    '{base}/{mandant}/auth/login'.format(base=base_url, mandant=mandant),
    auth=(username, password)
    )
# Response 200 OK

# token fuer weitere authentifikation
token = resp.json()['token']

beitrag = {
    'betreff': 'Beitrag per REST API',
    'inhalt': 'Der Request Header <em>Content-Type: application/json</em> muss gesetzt werden.',
    'inhaltAnzeigen': True
    }
# beitrag erstellen
resp = requests.post(
    '{base}/{mandant}/beteiligung/{beteiligung}/gegenstand/{gegenstand}/beitrag'.format(
        base=base_url,
        mandant=mandant,
        beteiligung=beteiligung,
        gegenstand=gegenstand),
    headers={'Authorization': token, 'Content-Type': 'application/json'},
    data=json.dumps(beitrag)
    )
# Reseponse 201 Created

files = {'file': open('space-invader.jpg', 'rb')}
# datei als anhang an oben erstellten beitrag anfuegen
requests.post(
    resp.json()['_links']['upload']['href'],
    headers={'Authorization': token},
    files=files
    )
# Reseponse 201 Created
