# Hybrid Letterbox Node Server

Node Server for saving the submissions thrown into the letterbox

## Setup

* run `npm install`
* install pm2 globally : `npm install pm2 -g

## Testing

* start your mongodb server with `mongod --dbpath <path_to_your_db>`
* run `npm test`

## Deploying

*  start mongod `mongod --dbpath <path_to_your_db>` or better: put it in automatic startup.
*  `pm2 start app.js` and `pm2 save`

