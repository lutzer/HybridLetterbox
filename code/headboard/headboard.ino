/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-03-01 11:53:42
* @Last Modified by:   lutz
* @Last Modified time: 2016-03-01 16:34:43
*/

/* 
* Sketch for the attiny, placed on the Hybrid Letterboxes Pi Headboard,
* Manages Stepper motor, reed switch for positioning, and photoresistor for
* detecting Postcards
*/

#include <string.h>
#include "StepperMotorControl.h"

// PIN LAYOUTS
#define LED_STATUS_PIN 13 //IN5 on ULN2003 CONNECTED TO LED
#define MOTOR_PIN1  2 // IN1 on the ULN2003 driver 1
#define MOTOR_PIN2  3 // IN2 on the ULN2003 driver 1
#define MOTOR_PIN3  4 // IN3 on the ULN2003 driver 1
#define MOTOR_PIN4  5 // IN4 on the ULN2003 driver 1
#define REED_PIN 6 // CONNECT TO REED SWITCH

// SERIAL PARAMETERS
#define SERIAL_BUFFER_SIZE 16
#define SERIAL_END_CHARACTER '\n'
#define BAUD_RATE 9600

// SERIAL VARS
char serialBuffer[SERIAL_BUFFER_SIZE]; //allow only messages of the size of eight bytes
byte serialBufferPosition = 0;

// MOTOR VARS
StepperMotorControl stepperMotor(MOTOR_PIN1, MOTOR_PIN2, MOTOR_PIN3, MOTOR_PIN4, REED_PIN);

void setup() {

  //setup led pin
  pinMode(LED_STATUS_PIN, OUTPUT);
  
  // start serial port
  Serial.begin(BAUD_RATE);
  Serial.println("start\n");

  digitalWrite(LED_STATUS_PIN,HIGH);
  establishSerialContact();  // send a byte to establish contact until receiver responds
  digitalWrite(LED_STATUS_PIN,LOW);

  stepperMotor.calibrate();

}

void loop() {
 
  byte messageReceived = false;
  // read bytes from serial port
  while (Serial.available() > 0) {
    // get incoming byte:
    char inByte = Serial.read();

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

    //Serial.write(serialBuffer);
    
    if (compareSubString(serialBuffer,"led:1"))
      digitalWrite(LED_STATUS_PIN,HIGH);
    else if (compareSubString(serialBuffer,"led:0"))
      digitalWrite(LED_STATUS_PIN,LOW);
    else if (compareSubString(serialBuffer,"stepper:0"))
      stepperMotor.setPosition(STEPPER_START);
    else if (compareSubString(serialBuffer,"stepper:1"))
      stepperMotor.setPosition(STEPPER_TURN);
    else if (compareSubString(serialBuffer,"stepper:2"))
      stepperMotor.setPosition(STEPPER_EJECT);
    else if (compareSubString(serialBuffer,"start"))
      Serial.write("started");
    else
      Serial.write("error");
      
    clearSerialBuffer();
  }

  // update the stepper motors position
  stepperMotor.update();
  
}

void establishSerialContact() {
  while (Serial.available() <= 0) {
    Serial.write("waiting\n");
    blinkStatusLed(500);
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

