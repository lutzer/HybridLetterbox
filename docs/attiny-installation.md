# Configure Attiny for Letterbox Board



## Setup IDE

Install Attiny Support for Arduin iDE: 

* add `https://raw.githubusercontent.com/damellis/attiny/ide-1.6.x-boards-manager/package_damellis_attiny_index.json` to board manager preferences
* install **attiny** library from Board Manager

### Install Servo Lib

* download http://playground.arduino.cc/ComponentLib/Servo
  
* in arduino IDE: Include Library -> Add Zip File
  
* go to library folder, edit SoftwareServo.h, change:
  
  ``` c
  #include <WProgram.h> to #include <Arduino.h>
  ```

