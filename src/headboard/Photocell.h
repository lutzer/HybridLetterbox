#ifndef Photocell_h
#define Photocell_h

#include <Arduino.h>

//reading debounce interval
#define CALIBRATION_READINGS 25
#define DEBOUNCE_INTERVALL 50

class Photocell {

  private:
    byte _resistorPin;
    byte _ledPin;

    bool _enabled = false; //led enabled?
    
    bool _reading = true; //previous reading, true = not blocked, false = blocked
    bool _blocked = false;

    long _lastChanged = 0;

    int _threshold = 0;

  public:

    Photocell(byte resistorPin, byte ledPin) {
      _resistorPin = resistorPin;
      _ledPin = ledPin;

      // setup led pin
      pinMode(_ledPin, OUTPUT);
      digitalWrite(_ledPin, LOW);

    };

    boolean calibrate() {

      int low = 0;
      int high = 1024;

      digitalWrite(_ledPin, LOW); // turn off led
      delay(100);
      for (int i=0;i < CALIBRATION_READINGS; i++) {
        low = max(low,analogRead(_resistorPin));
        delay(25);
      }
      digitalWrite(_ledPin, HIGH); // turn on led
      delay(100);
      for (int i=0;i < CALIBRATION_READINGS; i++) {
        high = min(high,analogRead(_resistorPin));
        delay(25);
      }
      digitalWrite(_ledPin, LOW); // turn off led

      //could not calibrate sensor
      if (low >= high)
        return false;
      
      _threshold = low + (high-low) / 2;
      return true;
    };

    void update() {

      if (!_enabled)
        return;

      long time = millis();

      if (time <= _lastChanged + DEBOUNCE_INTERVALL)
        return;

      int val = analogRead(_resistorPin);

      // currently not blocked
      if (val > _threshold) {
        // if previous reading was false (lightbarrier is not blocked anymore), send blocked signal
        if (_reading == false)
          _blocked = true;
          _lastChanged = time;
        _reading = true;
      // currently blocked
      } else {
        if (_reading == false) {
          _lastChanged = time;
        }
        _reading = false;
      }

    };

    boolean wasBlocked() {

      if (_enabled && _blocked) {
        _blocked = false;
        return true;
      }

      return false;
    }

    void enable(bool on) {

      // turn on led
      digitalWrite(_ledPin, on ? HIGH : LOW);
      _enabled = on;
    }

};

#endif
