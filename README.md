# Hybrid Letterbox

## Installation

* For instructions how to setup the raspberry pi from scratch see file: [docs/pi-installation.md](docs/pi-installation.md)

### Setup Letterbox for the first time

* go to HybridLetterbox dir and update to the newest version: `git pull`
* modify two config files
  * go to src/server/node directory and copy config file: `cp config.defaultjs config.js` and modify file to your needs
  * go to src/letterbox/ and copy ini file: `cp letterbox.default.ini letterbox.ini `  and modify it to your needs


## Development

### Python Test Scripts

* go to src folder and call testscripts by sudo `python2 -m letterbox.tests`

### Node Testscripts

* install pm2 `npm install pm2 -g`

* go to `cd src/www`
  * start testscripts by calling `npm test`

### Configure Atmega Head Board

see  [atmega-installation.md](atmega-installation.md)`

