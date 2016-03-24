# Letterbox Hardware

## Headboard

### Pin Layout

 ![Atmega168PinMap2](images/Atmega168PinMap2.png)

 ![driver-ic-of-motor](images/driver-ic-of-motor.png)

 ![Raspberry-Pi-GPIO-Layout-Model-B-Plus](images/Raspberry-Pi-GPIO-Layout-Model-B-Plus.png)

## Camera Board

* Transistor Base: 330 Ohm Resistor to GPIO
* Transitor: 547 NPN (Footprint: TO-92)
* LED 20mA Through hole White:  Resistor 100 Ohm each
* SMD LEDs white 3x20mA: http://www.produktinfo.conrad.com/datenblaetter/175000-199999/183097-da-01-en-LED_TOP_VIEW_NEUTRALWS_STW9T36B_D.pdf
  * missing triangular edge marks the vcc pins, opposite site is gnd **(check before soldering, normally it should be the other way around)**
  * resistor for SMD TRIPLE LED (60mA) 3.2 V: 33 Ohm


## Headboard

### Photoresistor

* Pin 23 (A0) with 10 kOhm pulldown resistor

### Serial Connector

* 10uF 50V Capacitor (Footprint: D5 L11)
* 10 kOhm Resistor to 5V
* TX: PIN1, RX: PIN0


### Reed Switch

* PIN4 with 10 kOhm Current limiting resistor

