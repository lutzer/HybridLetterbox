#include <SoftwareServo.h>

#define SERVO_PIN 0

SoftwareServo servo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position

void setup() {
  servo.attach(SERVO_PIN);  // attaches the servo on pin 9 to the servo object
  servo.setMinimumPulse(850);
  servo.setMaximumPulse(2250);

}

void loop() {
    int pos;
    for(pos = 0; pos < 200; pos += 1) { 
        servo.write(0);              
        delay(15);                      
        SoftwareServo::refresh();
    } 
    for(pos = 200; pos>=1; pos-=1) {                                
        servo.write(180);              
        delay(15);                      
        SoftwareServo::refresh();
    } 
}

