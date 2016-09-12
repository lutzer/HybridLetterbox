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



## Update



### 10.9.2016

* edit  `sudo nano /etc/systemd/system/letterbox.service` and change value:

  ```
  RemainAfterExit=false
  ```

* `git pull`

* start admin node script on port 9000

  * `cd src/server/admin/ `

  * `npm install`

  * `cp config.default.js  config.js` and adjust parameters in editor `nano config.js` , these 3 parameters have to be changed:

      ```
      /* AUTH DATA */
      authName: 'admin',
      authPassword: 'password',
      sudoPassword: 'password'
      ```

  * create startup script for admin server: `pm2 start main.js --name LetterboxBackend` and save `pms2 save`

* reboot with `sudo reboot`

* access admin backend by going to `192.168.72.2:9000` within your browser