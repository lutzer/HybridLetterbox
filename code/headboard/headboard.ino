/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-03-01 11:53:42
* @Last Modified by:   lutz
* @Last Modified time: 2016-03-03 11:46:09
*/

/* 
* Sketch for the attiny, placed on the Hybrid Letterboxes Pi Headboard,
* Manages Stepper motor, reed switch for positioning, and photoresistor for
* detecting Postcards
*/

#include <string.h>
#include "StepperMotorControl.h"
#include "Photocell.h"

// PIN LAYOUTS
#define LED_STATUS_PIN 13 //IN5 on ULN2003 CONNECTED TO LED
#define PHOTORESISTOR_PIN A0 //ANALOG PIN FOR PHOTORESISTOR
#define PHOTORESISTOR_LED_PIN 9 //CONNECT PHOTORESISTOR LED TO THIS
#define MOTOR_PIN1  8 // IN1 on the ULN2003 driver 1
#define MOTOR_PIN2  7 // IN2 on the ULN2003 driver 1
#define MOTOR_PIN3  6 // IN3 on the ULN2003 driver 1
#define MOTOR_PIN4  5 // IN4 on the ULN2003 driver 1
#define REED_PIN 4 // CONNECT TO REED SWITCH

// SERIAL PARAMETERS
#define SOFTWARE_SERIAL 1 // uncomment this line for using normal serial
#define SERIAL softwareSerial // change to Serial for using normal Serial
#define RX_PIN 0 //only used  for software serial
#define TX_PIN 1 //only used for software serial
#define SERIAL_BUFFER_SIZE 16
#define SERIAL_END_CHARACTER '\n'
#define BAUD_RATE 9600

// SERIAL VARS
#ifdef SOFTWARE_SERIAL
#include <SoftwareSerial.h>
SoftwareSerial SERIAL(RX_PIN, TX_PIN);
#endif
char serialBuffer[SERIAL_BUFFER_SIZE]; //allow only messages of the size of eight bytes
byte serialBufferPosition = 0;

// MOTOR VARS
StepperMotorControl stepperMotor(MOTOR_PIN1, MOTOR_PIN2, MOTOR_PIN3, MOTOR_PIN4, REED_PIN);
Photocell photocell(PHOTORESISTOR_PIN,PHOTORESISTOR_LED_PIN);

void setup() {

  // setup led pin
  pinMode(LED_STATUS_PIN, OUTPUT);
  
  // start serial port
  #ifdef SOFTWARE_SERIAL
  pinMode(RX_PIN, INPUT);
  pinMode(TX_PIN, OUTPUT);
  #endif
  SERIAL.begin(BAUD_RATE);

  // send a byte to establish contact until receiver responds
  while (SERIAL.available() <= 0) {
    SERIAL.write("waiting\n");
    blinkStatusLed(1000);
  }

  //calibrate photocell
  while (!photocell.calibrate())
  	blinkStatusLed(100);

  SERIAL.write("calibrate motor\n");
  //calibrate stepper
  stepperMotor.calibrate();

  //enable photocell
  SERIAL.write("calibrate pr\n");
  photocell.enable(true);

  SERIAL.write("initialized\n");

}

void loop() {
 
  byte messageReceived = false;
  // read bytes from serial port
  while (SERIAL.available() > 0) {
    // get incoming byte:
    char inByte = SERIAL.read();

    if (inByte == SERIAL_END_CHARACTER) {
      //received end byte
      messageReceived = true;
    } else if (serialBufferPosition < SERIAL_BUFFER_SIZE) {
      //add one byte
      serialBuffer[serialBufferPosition] = inByte;
      serialBufferPosition++;
    } else {
      //overflow
      clearSerialBuffer();
    }
  }

  // process message if there is one received
  if (messageReceived) {

    Serial.write(serialBuffer);
    
   	if (compareSubString(serialBuffer,"pr:?")) {
      char response[] = "pr:?\n";
      response[3] = photocell.isBlocked() ? '1' : '0';
      SERIAL.write(response);
   	} else if (compareSubString(serialBuffer,"stp:0") && !stepperMotor.moving) {
      stepperMotor.setPosition(STEPPER_START);
      SERIAL.write("stp:s\n");
   	} else if (compareSubString(serialBuffer,"stp:1") && !stepperMotor.moving) {
      stepperMotor.setPosition(STEPPER_TURN);
      SERIAL.write("stp:s\n");
    } else if (compareSubString(serialBuffer,"stp:2") && !stepperMotor.moving) {
      stepperMotor.setPosition(STEPPER_EJECT);
      SERIAL.write("stp:s\n");
    } else if (compareSubString(serialBuffer,"stp:c") && !stepperMotor.moving) {
      SERIAL.write("stp:c\n");
      stepperMotor.calibrate();
      SERIAL.write("stp:e\n");
    }
    else if (compareSubString(serialBuffer,"start"))
      SERIAL.write("started\n");
    else
      SERIAL.write("error\n");
      
    clearSerialBuffer();
  }

  // update the stepper motors position
  if (stepperMotor.update())
    SERIAL.write("stp:e\n");

  // update photocell
  photocell.update();
}

void clearSerialBuffer() {
  for (int i=0;i<SERIAL_BUFFER_SIZE;i++)
    serialBuffer[i] = (char)0;
  serialBufferPosition = 0;
}

bool compareSubString(char* string, String compareString) {
  for (int i=0;i<compareString.length();i++) {
    if (string[i] != compareString[i])
      return false;
  }
  return true;
}

void blinkStatusLed(int delaytime) {
  digitalWrite(LED_STATUS_PIN,HIGH);
  delay(delaytime);
  digitalWrite(LED_STATUS_PIN,LOW);
  delay(delaytime);
}
