# Hybrid Letterbox

## Installation Guide for Raspberry Pi

### Prepare SD Card

1. Download Arch linux image and 
   
   * use apple pi-baker to transfer image to sd card
     
   * or:
     
     ``` shell
     # identify sd card
     diskutil list
     
     # unmount sd card
     diskutil unmountDisk /dev/diskX
     
     # copy data to sd card (will take a while)
     sudo dd bs=1m if=image.img of=/dev/rdiskX
     ```
     
     ​
   
2. Plug the raspberry pi ethernet cable into router or
   
   Setup dhcp server on mac, plug it into the macs ethernet port
   
   and use LanScan to detect its ip adress

### Resize partition

http://gleenders.blogspot.de/2014/03/raspberry-pi-resizing-sd-card-root.html

### Setup ip adress of pi or skip or use dhcp server

* setup rasp pi ip adress
  1. `sudo ip addr add 192.168.72.2/24 broadcast 192.168.72.255 dev eth0`
  2. `sudo ip route add default via 192.168.72.1`
  3. persistent config see: https://wiki.archlinux.org/index.php/
  4. Network_configuration#Configure_the_IP_address


* or see below (assign ip address by dhcp)

### Login into PI and create user accounts

1. type ssh root@ip password is root
2. change root password (to <rootpasswd>): `passwd`
3. create new user account: `useradd -m letterbox` -> `passwd letterbox`
4. change hostname: `nano /etc/hostname`

### Change keyboard and timezone Settings

1. set berlin timezone: `nano ~/.bashrc: TZ='Europe/Berlin'; export TZ` 
2. set german keyboard: `localectl set-keymap --no-convert de`

### Update Pacman Packaging System and configure sudo

1. update pacman: `pacman -Syy`
   
2. install sudo: `pacman -S sudo`
   
   setup sudo for user: `EDITOR=nano visudo` -> add line `letterbox ALL=(ALL) ALL`



### Install Packages

1. install time deamon ntpd: `pacman -S ntp`
   
2. enable ntpd: `systemctl enable ntpd`
   
   ​

### Install and Setup Nodejs Webserver

1. install node: `pacman -S nodejs npm`
   
2. install pm2 node process manager: `pacman -S pm2`
   
3. redirect port 80 requests to port 8080
   
   ``` shell
    # add this line to /etc/rc.local
    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
   ```

### Setup Camera

1. nano /boot/config.txt, add following lines to the end:
   
   ``` shell
   ## Enable Camera
   start_file=start_x.elf
   fixup_file=fixup_x.dat
   ```
   
2. nano ~/.bashrc:
   
   ``` shell
   # add camera commands to path
   export PATH=$PATH:/opt/vc/bin
   ```
   
3. to test camera: raspistill -o image.jpg 
   
4. install python lib: pip install picamera
   
5. install: sudo pacman -S python-pillow (PIL image lib)

### Connect Servo

1. Signal pin to gpio pin 18
2. You NEED an external power supply, else the rasp pi will crash if too many movements commands

### Install Python 2

1. sudo pacman -S python2 gcc
2. pacman -S python2-pip
3. pip2 install picamera
4. pip2 install requests & pip2 install gerequests
5. pip2 install RPi.GPIO
6. pacman -S python2-pygame
7. pacman -S python2-scipy

### Install opencv

1. pacman -S pkg-config
   
2. pacman -S opencv (also includes python cv2 wrapper)
   
3. (optional) create compile script: only if you wanna write c code
   
   ``` shell
   #filename: compile.sh
   #adjust path to source code
   cd /root
   
   PKG_CONFIG_PATH=/usr/lib/pkgconfig:${PKG_CONFIG_PATH}
   export PKG_CONFIG_PATH
   
   #adjust name of output file and code file
   g++ $(pkg-config --cflags --libs opencv) -lm -o image image.c
   ```

## After Copying Scripts

### Autostart Python Scripts

#### Letterbox

1. create a file in folder /etc/systemd/system : letterbox.service
   
2. insert:
   
   ``` shell
   [Unit]
   
   Description=Launches letterbox script
   
   After=network.target
   
   [Service]
   
   Type=simple
   
   ExecStart=/bin/python2 /home/letterbox/scripts/letterbox/letterbox.py
   
   RemainAfterExit=true
   
   [Install]
   
   WantedBy=multi-user.target
   ```


1. sudo systemctl daemon-reload
   
2. sudo systemctl enable letterbox.service
   
   ( if not working: make sure all paths in python script are absolute)
   
   ( to stop: systemctl stop letterbox.service or systemctl disable letterbox.service

#### Powerswitch

1. create another service: powerswitch.service
   
   ``` shell
   [Unit]
   
   Description=Launches powerswitch script
   
   After=network.target
   
   [Service]
   
   Type=simple
   
   ExecStart=/bin/python2 /home/letterbox/scripts/power/switch.py
   
   RemainAfterExit=true
   
   [Install]
   
   WantedBy=multi-user.target
   ```


1. sudo systemctl daemon-reload
2. sudo systemctl enable powerswitch.service

### Autostart pm2 manager

TODO



## Configure Tp-Link Router

* first **upgarde firmware**! Then install configuration image or configure it manually.
* setup dhcp reservation of rasp pi to always assign it to 192.168.72.2
* change admin pw!

## Configure Attiny Head Board

see  [attiny-installation.md](attiny-installation.md)

