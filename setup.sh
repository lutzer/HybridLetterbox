# copy service file
cp install/letterbox.service /etc/systemd/system/letterbox.service;

# enable and start service
sudo systemctl enable letterbox.service;
sudo systemctl start letterbox.service;

# start server