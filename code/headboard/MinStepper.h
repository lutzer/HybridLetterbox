#ifndef MinStepper_h
#define MinStepper_h

#include <Arduino.h>

#define NUM_MOTOR_PINS 4
#define ACCELERATION 10

class MinStepper {

  private:
    uint8_t _pin[NUM_MOTOR_PINS];
    long _currentPos;
    long _targetPos; 

    float _speed;

    unsigned long  _stepInterval;
    unsigned long  _lastStepTime;

  public:
    MinStepper() {};
    MinStepper(uint8_t interface, uint8_t pin1, uint8_t pin2, uint8_t pin3, uint8_t pin4) {
      _pin[0] = pin1;
      _pin[1] = pin2;
      _pin[2] = pin3;
      _pin[3] = pin4;

      _speed = 0;
      _lastStepTime = 0;

      _currentPos = 0;
      _targetPos = 0;
    }

    void setSpeed(float speed) {
      _speed = speed;
    }

    void runSpeed() {
      
    }

    void run() {
      
    }

    void moveTo(long targetPos) {
      _targetPos = targetPos;
    }

    long currentPosition() {
      return _currentPos;
    }

    long distanceToGo() {
      return _targetPos - _currentPos;
    }

    void step8(long step) {
      switch (step & 0x7) {
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

    void setOutputPins(uint8_t mask) {
      for (byte i = 0; i < NUM_MOTOR_PINS; i++)
        digitalWrite(_pin[i], (mask & (1 << i)) ? HIGH : LOW );
    }

};

#endif
