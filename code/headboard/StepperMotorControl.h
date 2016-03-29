#ifndef StepperMotorControl_h
#define StepperMotorControl_h

#include <Arduino.h>
#include <Bounce2.h>
#include "AccelStepper.h"

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

  public:
    bool moving = false;

  private:
    AccelStepper stepper;
    Bounce reedSwitch;

  public:
    
    StepperMotorControl() { };
    
    StepperMotorControl(byte motorPin1, byte motorPin2, byte motorPin3, byte motorPin4, byte reedPin) {
      // setup motor
      stepper = AccelStepper(HALFSTEP, motorPin1, motorPin2, motorPin3, motorPin4);
      stepper.setMaxSpeed(MOTOR_MAX_SPEED);
      stepper.setAcceleration(MOTOR_ACCELLERATION);
      stepper.setSpeed(0);

      // setup reed switch
      pinMode(reedPin, INPUT_PULLUP);
      this->reedSwitch = Bounce();
      reedSwitch.attach(reedPin);
      reedSwitch.interval(DEBOUNCE_INTERVAL);
    }

    // TODO: add calibration error function
    void calibrate() {

      moving = true;

      long start1 = 0;
      long start2 = 0;

      this->readReedSwitch();
      delay(100);

      //check if it is already close to the start position, if yes, turn backwards
      stepper.setSpeed(-400);
      while (this->readReedSwitch() == LOW) {
        this->stepper.runSpeed();
      }

      // start forward calibration
      stepper.setSpeed(400);
      while (this->readReedSwitch() == HIGH) {
        this->stepper.runSpeed();
      }
      start1 = this->stepper.currentPosition(); //move slowly to end of reed switch
      while (this->readReedSwitch() == LOW) {
        this->stepper.runSpeed();
      }
      start2 = this->stepper.currentPosition();
      stepper.setSpeed(0);

      // calculate middle position
      long stepperStartPos = (start2 - start1) / 2 + start1;

      //move to start position
      stepper.moveTo(stepperStartPos);
      stepper.runToPosition();

      //reset current position to zero
      stepper.setCurrentPosition(0);

      moving = false;
    }

    void setPosition(StepperPosition position) {
      moving = true;
      if (position == STEPPER_EJECT)
        stepper.moveTo(MOTOR_FULL_TURN * 0.8);
      else if (position == STEPPER_TURN)
        stepper.moveTo(MOTOR_FULL_TURN * 0.5);
      else {
        stepper.moveTo(0);
      }
    }

    int readReedSwitch() {
      reedSwitch.update();
      return reedSwitch.read();
    }

    //returns true when reached position
    bool update() {
      if (stepper.distanceToGo() != 0) {
        stepper.run();
      } else if (moving) {
        moving = false;
        return true;
      }
      return false;
    }
};

#endif
