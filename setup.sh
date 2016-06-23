#!/bin/bash
set -x #echo on

REPO_DIR=~/HybridLetterbox

# copy ini file
cp $REPO_DIR/src/letterbox/letterbox.default.ini $REPO_DIR/src/letterbox/letterbox.ini

# copy service file
sudo cp $REPO_DIR/install/letterbox.service /etc/systemd/system/letterbox.service;

# enable letterbox service
sudo systemctl enable letterbox.service;

# install node modules
cd $REPO_DIR/src/server/node/;
npm install;

# copy config file
cp $REPO_DIR/src/server/node/config.default.js $REPO_DIR/src/server/node/config.js

# start server and save config
pm2 start $REPO_DIR/src/server/node/main.js --name hybrid-letterbox;
pm2 save;

# start letterbox service
sudo systemctl start letterbox.service;
