# Hybrid Letterbox Node Server

Node Server for saving the submissions thrown into the letterbox

## Setup

* run `npm install`
* install pm2 globally : `npm install pm2 -g
* `cp config.default.js config.js` and change database credentials and username and password in auth section

## Testing

* start your mongodb server with `mongod --dbpath <path_to_your_db>`

  * create two alias within your .bash_profile:

  ```shell
  alias stop-mongodb='mongo admin --eval "db.shutdownServer()"'
  alias start-mongodb='mongod --fork --logpath <your_db_dir>/mongodb.log  --dbpath <your_db_dir>'
  ```


* run `npm test`

## Deploying

*  create startup script for mongodb
*  `pm2 start app.js` and `pm2 save`

