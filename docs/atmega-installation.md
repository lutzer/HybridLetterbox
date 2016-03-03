# Setup ATmega328

see https://www.arduino.cc/en/Tutorial/ArduinoToBreadboard

1. download hardware configuration archive

## Pin Layouts

 ![Atmega328-pinout](images/Atmega328-pinout.png)

 ![Raspberry-Pi-GPIO-Layout-Model-B-Plus](images/Raspberry-Pi-GPIO-Layout-Model-B-Plus.png)



## Serial Connection with rasp pi

* Connect GND to GND, Atmega TX (pin2) to GPIO 15 (RXD), Atmega RX (pin3) to GPIO 14 (TXD)
* **Make sure atmega runs on 3.3V**
* prevent rasp pi from broadcasting boot messages over serial
  * `sudo nano /boot/cmdline.txt`
  * change content to `root=/dev/mmcblk0p2 rw rootwait console=tty1 selinux=0 plymouth.enable=0 smsc95xx.turbo_mode=N dwc_otg.lpm_enable=0 elevator=noop` (delete both entries with xxxx=ttyAMA0,115)
  * enable tty: `sudo systemctl enable getty\@tty1.service`

* Python test code:

  ```python
  import serial
  ser = serial.Serial(‘/dev/ttyAMA0’, 9600, timeout=1)
  ser.open()

  ser.write(“testing”)
  try:
      while 1:
          response = ser.readline()
          print response
  except KeyboardInterrupt:
      ser.close()
  ```