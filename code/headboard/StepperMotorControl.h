#ifndef StepperMotorControl_h
#define StepperMotorControl_h

#include <Arduino.h>
#include <Bounce2.h>
#include "MinStepper.h"

#define HALFSTEP 8
#define MOTOR_MAX_SPEED 1000.0
#define MOTOR_ACCELLERATION 250.0
#define MOTOR_FULL_TURN 64*64
#define NUM_MOTOR_PINS 4

//reed switch debounce interval
#define DEBOUNCE_INTERVAL 10 //in miliseconds

enum StepperPosition {
  STEPPER_START, // default position
  STEPPER_TURN, // turn by 180 degrees
  STEPPER_EJECT // throw out postcard
};

class StepperMotorControl {

  private:
    MinStepper stepper;
    long stepperStartPos = 0;

    Bounce reedSwitch;

    bool moving = false;

  public:
    
    StepperMotorControl() { };
    
    StepperMotorControl(byte motorPin1, byte motorPin2, byte motorPin3, byte motorPin4, byte reedPin) {
      // setup motor
      stepper = MinStepper(HALFSTEP, motorPin1, motorPin3, motorPin2, motorPin4);
      /*stepper.setMaxSpeed(MOTOR_MAX_SPEED);
      stepper.setAcceleration(MOTOR_ACCELLERATION);*/
      stepper.setSpeed(0);

      // setup reed switch
      pinMode(reedPin, INPUT_PULLUP);
      this->reedSwitch = Bounce();
      reedSwitch.attach(reedPin);
      reedSwitch.interval(DEBOUNCE_INTERVAL);
    }

    void calibrate() {

      long start1 = 0;
      long start2 = 0;

      Serial.println("cal:start\n");

      stepper.setSpeed(400);
      while (this->readReedSwitch() == HIGH) {
        this->stepper.runSpeed();
      }
      start1 = this->stepper.currentPosition(); //move slowly to end of reed switch
      while (this->readReedSwitch() == LOW) {
        this->stepper.runSpeed();
      }
      start2 = this->stepper.currentPosition();

      // calculate middle position
      this->stepperStartPos = (start2 - start1) / 2 + start1;

      stepper.setSpeed(0);
      Serial.println("cal:done\n");
    }

    void setPosition(StepperPosition position) {
      moving = true;
      Serial.write("move:start\n");
      if (position == STEPPER_EJECT)
        stepper.moveTo(stepperStartPos + MOTOR_FULL_TURN * 0.8);
      else if (position == STEPPER_TURN)
        stepper.moveTo(stepperStartPos + MOTOR_FULL_TURN * 0.5);
      else {
        stepper.moveTo(stepperStartPos);
      }
    }

    int readReedSwitch() {
      reedSwitch.update();
      return reedSwitch.read();
    }

    void update() {
      if (stepper.distanceToGo() != 0) {
        stepper.run();
      } else if (moving) {
        moving = false;
        Serial.write("move:done\n");
      }
    }
};

#endif
