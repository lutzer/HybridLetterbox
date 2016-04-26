HYBRID LETTERBOX
================


INSTALLATION GUIDE FOR RASPBERRY PI
-----------------------------------

### Prepare SD Card

1. Download Arch linux image and use apple pi-baker to transfer image to sd card
2. Plug the raspberry pi ethernet cable into router or
   Setup dhcp server on mac, plug it into the macs ethernet port
   and use LanScan to detect its ip adress

### Resize partition

http://gleenders.blogspot.de/2014/03/raspberry-pi-resizing-sd-card-root.html

### (Setup ip adress of pi or skip and use dhcp server)

1. sudo ip addr add 192.168.2.2/24 broadcast 192.168.2.255 dev eth0
2. sudo ip route add default via 192.168.2.1
3. persistent config see: https://wiki.archlinux.org/index.php/
4. Network_configuration#Configure_the_IP_address

OR SEE BELOW (ASSIGN ip address BY ROUTER)

### Login into PI and create user accounts

1. type ssh root@ip password is root
2. change root password (to <rootpasswd>): passwd
3. create new user account: useradd -m letterbox -> passwd letterbox <userpasswd>
4. change hostname: sudo nano /etc/hostname

### Change keyboard and timezone Settings

1. set berlin timezone: nano ~/.bashrc: TZ='Europe/Berlin'; export TZ 
2. set german keyboard: localectl set-keymap --no-convert de 

### Install Pacman Packaging System

1. update pacman: pacman -Syy
2. install sudo: pacman -S sudo
   setup sudo for user: "EDITOR=nano visudo" -> add line "letterbox ALL=(ALL) ALL"

### Install Samba

1. pacman -S samba
2. cp /etc/samba/smb.conf.default /etc/samba/smb.conf
3. sudo smbpasswd -a letterbox (password: <userpasswd>
4. start service: sudo systemctl start smbd.service
5. connect through mac with address smb://rasp.pis.ip/homes

### Install and Setup Webserver

1. enable ntpd: systemctl enable ntpd
2. installl ngix webserver: pacman -S nginx
   enable automatic startup: systemctl enable nginx
3. configure nano /etc/nginx/nginx.conf:
   add to server "root   /home/letterbox/http;”
   remove root directive from all locations
   and change code inside server to this:

   ```
   server {
        listen       80;
        server_name  localhost;
        root    /home/letterbox/http;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            index  index.html index.htm;
            try_files   $uri $uri/ @tinyurl;
        }

        location @tinyurl {
            rewrite ^/(.*)$ /api/index.php?q=$1 last;
        }

        location ~ \.php$ {
            fastcgi_pass   unix:/run/php-fpm/php-fpm.sock;
            fastcgi_index  index.php;
            include        fastcgi.conf;
        }
   }
   ```

4. install php: pacman -S php and pacman -S php-fpm
   enable autoamtic startup: systemctl enable php-fpm
   configure /etc/php/php.ini: "nano /etc/php/php.ini"
   -> add "/home/letterbox/http” to open_basedir and 
      uncomment "extension=pdo_mysql.so"
5. install mariadb: pacman -S mariadb
6. systemctl start mysqld
   mysql_secure_installation -> mariadb root password: <mysqlpassword>
   systemctl restart mysqld
   systemctl enable mysqld
7. login to mariadb: mysql -u root -p
   -> GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.72.%' IDENTIFIED BY '<rootpassword>' WITH GRANT OPTION;
8. minimize memory usage: cp /usr/share/mysql/my-small.cnf /etc/mysql/my.cnf
9. chmod 755 on /home and /home/letterbox and /home/letterbox/html
   files need 644

### (Install GUI: xorg, xfce4 and midori browser)

1. pacman -S xorg-server
2. install video driver: pacman -S xf86-video-fbdev xf86-video-vesa
3. pacman -S xfce4
4. pacman -S midori

(# Install python)
1. pacman -S python python-pip base-devel) need python2 , see below!
2. install GPIO package: pip install RPi.GPIO (use this!)
3. pip install requests (for http requests)

### Setup Camera

1. nano /boot/config.txt, add following lines to the end:

```
## Enable Camera
start_file=start_x.elf
fixup_file=fixup_x.dat
```

1. nano ~/.bashrc:

```
# add camera commands to path
export PATH=$PATH:/opt/vc/bin
```

1. to test camera: raspistill -o image.jpg 
2. install python lib: pip install picamera
3. install: sudo pacman -S python-pillow (PIL image lib)

### CONNECT SERVO

1. Signal pin to gpio pin 18
2. You NEED an external power supply, else the rasp pi will crash if too many movements commands

### PYTHON 2

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
   (3. create compile script:) only if you wanna write c code

```
#filename: compile.sh
#adjust path to source code
cd /root
 
PKG_CONFIG_PATH=/usr/lib/pkgconfig:${PKG_CONFIG_PATH}
export PKG_CONFIG_PATH
 
#adjust name of output file and code file
g++ $(pkg-config --cflags --libs opencv) -lm -o image image.c
```

## After Copying Scripts

### AUTOSTART PYTHON SCRIPT

#### Letterbox

1. create a file in folder /etc/systemd/system : letterbox.service
2. insert:

```
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

```
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




CONFIGURE TP-LINK MOBILE ROUTER
-------------------------------

first **upgarde firmware**! Then install configuration image or configure it manually.

### setup dhcp reservation

reserve mac adress of rasp pi to always assign it to 192.168.72.2
