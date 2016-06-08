#ifndef StepperMotor_h
#define StepperMotor_h

#include <Arduino.h>

#define MOTOR_MAX_SPEED 1000.0
#define MOTOR_ACCELLERATION 250.0
#define MOTOR_FULL_TURN 64*64
#define NUM_MOTOR_PINS 4

class StepperMotor {

  private:
      /// The current absolution position in steps.
    uint8_t _motorPin[NUM_MOTOR_PINS];
    unsigned long _lastStepTime;
    unsigned long _stepInterval;

  public:
    long currentPosition;
    float speed;

  public:

    StepperMotor() { };

    StepperMotor(byte pin1, byte pin2, byte pin3, byte pin4) {
      _motorPin[0] = pin1;
      _motorPin[1] = pin2;
      _motorPin[2] = pin3;
      _motorPin[3] = pin4;

      for (int i=0;i<NUM_MOTOR_PINS;i++)
        pinMode(_motorPin[i], OUTPUT);

      _stepInterval = 10000;

      _lastStepTime = 0;

      speed = 50;

    };

    void runSpeed() {

      unsigned long time = micros();
      unsigned long nextStepTime = _lastStepTime + _stepInterval;

      if (time >= nextStepTime) {

        _lastStepTime = time;
        
        if (speed > 0) {
            // Clockwise
            currentPosition += 1;
        }
        else {
            // Anticlockwise  
            currentPosition -= 1;
        }

      }

      step(currentPosition);
    };

    void moveTo(long position) {

    };

    void step(long step) {
      switch (step & 0x7)
      {
        case 0:    // 1000
        setOutputPins(0b0001);
        break;

        case 1:    // 1010
        setOutputPins(0b0101);
        break;

        case 2:    // 0010
        setOutputPins(0b0100);
        break;

        case 3:    // 0110
        setOutputPins(0b0110);
        break;

        case 4:    // 0100
        setOutputPins(0b0010);
        break;

        case 5:    //0101
        setOutputPins(0b1010);
        break;

        case 6:    // 0001
        setOutputPins(0b1000);
        break;

        case 7:    //1001
        setOutputPins(0b1001);
        break;
      }
    }

  private:

    void setOutputPins(uint8_t mask)
    {

      for (uint8_t i = 0; i < NUM_MOTOR_PINS; i++)
        digitalWrite(_motorPin[i], (mask & (1 << i)) ? HIGH : LOW );
    }

};

#endif

