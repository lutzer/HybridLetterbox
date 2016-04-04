/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-03-01 11:53:42
* @Last Modified by:   lutz
* @Last Modified time: 2016-03-03 11:46:09
*/

/* 
* Sketch for the atmega328, placed on the Hybrid Letterboxes Pi Headboard,
* Manages Stepper motor, reed switch for positioning, and photoresistor for
* detecting Postcards
* 
* Upload as "Lilypad Arduino" with atmega328.
*/

#include <string.h>
#include "StepperMotorControl.h"
#include "Photocell.h"

// PIN LAYOUTS
#define LED_STATUS_PIN 13 //IN5 on ULN2003 CONNECTED TO LED
#define PHOTORESISTOR_PIN A0 //ANALOG PIN FOR PHOTORESISTOR
#define PHOTORESISTOR_LED_PIN 3 //CONNECT PHOTORESISTOR LED TO THIS
#define MOTOR_PIN1  8 // IN1 on the ULN2003 driver 1
#define MOTOR_PIN2  7 // IN2 on the ULN2003 driver 1
#define MOTOR_PIN3  6 // IN3 on the ULN2003 driver 1
#define MOTOR_PIN4  5 // IN4 on the ULN2003 driver 1
#define REED_PIN 4 // CONNECT TO REED SWITCH

// SERIAL PARAMETERS
//#define SOFTWARE_SERIAL 1 // uncomment this line for using normal serial
#define SERIAL Serial // change to Serial for using normal Serial
#define RX_PIN 0 //only used  for software serial, rx = 0
#define TX_PIN 1 //only used for software serial, tx = 1
#define SERIAL_BUFFER_SIZE 16
#define SERIAL_END_CHARACTER '\n'
#define BAUD_RATE 9600

// OTHER PARAMETERS
#define CALIBRATION_TRIES 10

// SERIAL VARS
#ifdef SOFTWARE_SERIAL
#include <SoftwareSerial.h>
SoftwareSerial SERIAL(RX_PIN, TX_PIN);
#endif
char serialBuffer[SERIAL_BUFFER_SIZE]; //allow only messages of the size of eight bytes
byte serialBufferPosition = 0;

// MOTOR VARS
StepperMotorControl stepperMotor(MOTOR_PIN1, MOTOR_PIN3, MOTOR_PIN2, MOTOR_PIN4, REED_PIN);
Photocell photocell(PHOTORESISTOR_PIN,PHOTORESISTOR_LED_PIN);

// function makes the arduino reset
void (* resetArduino) (void) = 0;

void setup() {

  // setup led pin
  pinMode(LED_STATUS_PIN, OUTPUT);
  
  // start serial port
  #ifdef SOFTWARE_SERIAL
  pinMode(RX_PIN, INPUT);
  pinMode(TX_PIN, OUTPUT);
  #endif
  SERIAL.begin(BAUD_RATE);
  SERIAL.write("waiting\n");

  // send a byte to establish contact until receiver responds
  /*while (true) {
    if (readSerialMessages()) {
      if (compareSubString(serialBuffer,"start"))
         break;
      clearSerialBuffer();
    }
    //SERIAL.write("waiting\n");
    blinkStatusLed(50);
  }*/

  /*
  //calibrate photocell
  SERIAL.write("calibrate photocell\n");
  int i = 0;
  while(!photocell.calibrate()) {
    blinkStatusLed(100);
    if (i >= CALIBRATION_TRIES -1) {
      resetArduino();
    }
    i++;
  }*/

  SERIAL.write("calibrate motor\n");
  //calibrate stepper
  stepperMotor.calibrate();

  //enable photocell
  photocell.enable(true);

  digitalWrite(LED_STATUS_PIN,HIGH); // turn status led on
  
  clearSerialBuffer();
  SERIAL.write("started\n");
}

void loop() {
 
  // process message if there is one received
  if (readSerialMessages()) {
    
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
    else if (compareSubString(serialBuffer,"reset"))
      resetArduino();
    else
      SERIAL.write("?\n");

    clearSerialBuffer();
  }

  // update the stepper motors position
  if (stepperMotor.update())
    SERIAL.write("stp:e\n");

  // update photocell
  photocell.update();
}

boolean readSerialMessages() {
  while (SERIAL.available() > 0) {
    // get incoming byte:
    char inByte = SERIAL.read();
    
    if (inByte == SERIAL_END_CHARACTER) {
      //received end byte
      return true;
    } else if (serialBufferPosition < SERIAL_BUFFER_SIZE) {
      //add one byte
      serialBuffer[serialBufferPosition] = inByte;
      serialBufferPosition++;
    } else {
      //overflow
      clearSerialBuffer();
    }
    
    return false; // no end byte received
  }
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


