#ifndef Photocell_h
#define Photocell_h

#include <Arduino.h>

//reading debounce interval
#define CALIBRATION_READINGS 25
#define DEBOUNCE_INTERVALL 10

class Photocell {

  private:
    byte _resistorPin;
    byte _ledPin;

    bool _changed = false;
    bool _reading = false;

    long _lastChanged = 0;

    int _threshold = 0;

  public:

    Photocell(byte resistorPin, byte ledPin) {
      _resistorPin = resistorPin;
      _ledPin = ledPin;

      // enable led pin
      pinMode(_ledPin, OUTPUT);
      digitalWrite(_ledPin, HIGH);

    };

    boolean calibrate() {

      int low = 0;
      int high = 0;

      digitalWrite(_ledPin, LOW); // turn off led
      delay(100);
      for (int i=0;i < CALIBRATION_READINGS; i++) {
        low = max(low,analogRead(_resistorPin));
        delay(25);
      }

      digitalWrite(_ledPin, LOW); // turn on led
      delay(100);
      for (int i=0;i < CALIBRATION_READINGS; i++) {
        high = min(high,analogRead(_resistorPin));
        delay(25);
      }

      //could not calibrate sensor
      if (low <= high)
        return false;
      
      _threshold = low + high / 2;
      return true;
    };

    void update() {

      long time = millis();

      if (time < _lastChanged + DEBOUNCE_INTERVALL)
        return;

      int val = analogRead(_resistorPin);

      if (val > _threshold) {
        if (_reading != val) {
          _changed = true;
          _lastChanged = time;
        }
        _reading = true;
      } else {
        _reading = false;
      }

      _lastChanged = time;

    };

    boolean isBlocked() {

      if (_changed && !_reading)
        return true;

      return false;
    }

};

#endif
