#!/bin/bash
echo "### Running Tests for Hybrid Letterbox Node Server ###";
pm2 start app.js -s --name HybridLetterboxTest -- test; 
sleep 1;
./node_modules/.bin/mocha tests/main.js --reporter spec;
pm2 delete HybridLetterboxTest -s